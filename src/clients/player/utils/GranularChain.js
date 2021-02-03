import * as audio from 'waves-audio';
import GranularSampler from './GranularSampler';

class GranularChain {
  constructor(buffer, rampDuration = 0) {
    this.rampDuration = rampDuration * 0.001;
    this.stopTimeout = null;

    this.granular = new GranularSampler({ buffer });
    this.filter = audio.audioContext.createBiquadFilter();
    this.distortion = audio.audioContext.createWaveShaper();
    this.gain = audio.audioContext.createGain();

    this.granular.connect(this.filter);
    this.filter.connect(this.distortion);
    this.distortion.connect(this.gain);
    this.gain.connect(audio.audioContext.destination);

    this.filter.type = 'lowpass';
    this.filter.Q.setValueAtTime(1, audio.audioContext.currentTime);
    this.filter.frequency.setValueAtTime(12000, audio.audioContext.currentTime);

    this.distortion.curve = this._makeDistortionCurve(0); // linear by default
    this.distortion.oversample = '4x';

    this.gain.gain.value = 0;
  }

  deinit() {
    if (this.playing || this.stopTimeout !== null) {
      this.stop();
    }
  }

  get buffer() {
    return this.granular.buffer;
  }

  set buffer(buffer) {
    this.granular.buffer = buffer;
  }

  start() {
    if (this.playing) return;
    this.playing = true;

    if (this.stopTimeout !== null) {
      clearTimeout(this.stopTimeout);
      this.stopTimeout = null;
    } else {
      // we didn't cancel a stop so we weren't already playing the granular
      this.granular.play();
    }

    const val = this.gain.gain.value;
    const now = audio.audioContext.currentTime
    this.gain.gain.cancelScheduledValues(now);
    this.gain.gain.setValueAtTime(val, now)
    this.gain.gain.linearRampToValueAtTime(1, now + this.rampDuration);
  }

  stop() {
    if (!this.playing) return;
    this.playing = false;

    this.stopTimeout = setTimeout(() => {
      this.granular.stop();
      this.stopTimeout = null;
    }, this.rampDuration);

    const val = this.gain.gain.value;
    const now = audio.audioContext.currentTime
    this.gain.gain.cancelScheduledValues(now);
    this.gain.gain.setValueAtTime(val, now)
    this.gain.gain.linearRampToValueAtTime(0, now + this.rampDuration)
  }

  setGranular(val) {
    this.granular.position = val;
  }

  setFilter(val) {
    const Q = Math.pow(val, 3) * 10 + 1;
    const freq = (1 - Math.pow(val, 0.1)) * 11900 + 100;
    this.filter.Q.setValueAtTime(Q, audio.audioContext.currentTime);
    this.filter.frequency.setValueAtTime(freq, audio.audioContext.currentTime);    
  }

  setDistortion(val) {
    this.distortion.curve = this._makeDistortionCurve(Math.pow(val, 2));
  }

  _makeDistortionCurve(amount = 0, res = 512) { // default
    amount = Math.min(Math.max(amount, 0), 1);
    res = res % 2 === 0 ? res + 1 : res;
    const mid = Math.floor(res / 2);
    const curve = new Float32Array(res);
    curve[mid] = 0;

    const gain = 1 - 0.8 * Math.pow(amount, 0.15);
    const factor = amount * 99 + 1;

    for (let i = 0; i < mid; i++) {
      curve[i] = (Math.pow(i / mid, factor) - 1) * gain; // [-1,0[
      curve[mid + i + 1] = (1 - Math.pow(1 - i / mid, factor)) * gain; // ]0,1]
    }

    return curve;
  }  
};

export default GranularChain;