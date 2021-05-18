import * as audio from 'waves-audio';

class GranularSampler {
  constructor(options = {}) {
    this.engine = new audio.GranularEngine(options);
    this.engine.periodAbs = 0.02;
    this.duration = this.engine.buffer ? this.engine.buffer.duration : 0;
    this.normalizedPosition = 0;
    this.playing = false;
  }

  connect(node) {
    this.engine.connect(node);
  }

  disconnect() {
    this.engine.disconnect();
  }

  get buffer() {
    return this.engine.buffer;
  }

  set buffer(buffer) {
    this.engine.buffer = buffer;
    this.duration = buffer ? buffer.duration : 0;
    this._updatePosition();
  }

  get position() {
    return this.normalizedPosition;
  }

  set position(value) {
    this.normalizedPosition = value;
    this._updatePosition();
  }

  _updatePosition() {
    this.engine.position = this.normalizedPosition * this.duration;
  }

  play() {
    if (!this.playing) {
      audio.getScheduler().add(this.engine);
      this.playing = true;
    }
  }

  stop() {
    if (this.playing) {
      audio.getScheduler().remove(this.engine);
      this.playing = false;
    }
  }
};

export default GranularSampler;