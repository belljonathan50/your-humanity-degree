<template>
  <div>
    <div class="title"> Game 3 </div>
    <div class="pads-wrapper">
      <div class="multislider-wrapper">
        <multi-slider
          :sliders="3"
          @change="onSliderValueChanged"
        />
      </div>
      <flying-words
        :words="playerState.getValues().unselectedFlyingWords"
        :wordSamples="[]"
        @click="onClickWord"
      />
      <pad-surface
        :columns="5"
        :rows="5"
        :disableTouchEvents="true"
        :disabledPads="playerState.getValues().disabledPads"
        :enabledStroke="true"
        :disabledStroke="false"
        :enabledFill="false"
        :disabledFill="true"
      />
    </div>
  </div>
</template>

<script>
import { samples } from '../../../server/data/samples';
import GranularSampler from '../utils/GranularSampler';
import FlyingWords from '../components/FlyingWords.vue';
import PadSurface from '../components/PadSurface.vue';
import MultiSlider from '../components/MultiSlider.vue';

export default {
  components: { FlyingWords, PadSurface, MultiSlider },
  data() {
    return {
      audioContext: this.$experience.audio.audioContext,
      gameState: this.$experience.states.game3,
      playerState: this.$experience.playerState,
    }
  },
  computed: {
    sliderBuffer() {
      const arr = samples.game3.sliders[0];
      const sample = arr[Math.round(Math.random() * (arr.length - 1))];
      return this.$experience.audioBufferLoader.data[sample];
    }
  },
  mounted() {
    this.granular = new GranularSampler({ buffer: this.sliderBuffer });
    this.filter = this.audioContext.createBiquadFilter();
    this.distortion = this.audioContext.createWaveShaper();

    this.granular.connect(this.filter);
    this.filter.connect(this.distortion);
    this.distortion.connect(this.audioContext.destination);

    this.filter.type = 'lowpass';
    this.filter.Q.setValueAtTime(1, this.audioContext.currentTime);
    this.filter.frequency.setValueAtTime(12000, this.audioContext.currentTime);

    this.distortion.curve = this.makeDistortionCurve(0); // linear by default
    this.distortion.oversample = '4x';

    this.granular.play();
  },
  beforeDestroy() {
    this.granular.stop();
    this.granular.disconnect();
    this.granular = null;

    this.filter.disconnect();
    this.filter = null;

    this.distortion.disconnect();
    this.distortion = null;
  },
  methods: {
    makeDistortionCurve(amount = 0, res = 512) { // default
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
    },
    onSliderValueChanged(i, val) {
      switch (i) {
        case 0:
          this.granular.position = val;
          break;
        case 1:
          const Q = Math.pow(val, 3) * 10 + 1;
          const freq = (1 - Math.pow(val, 0.1)) * 11900 + 100;
          this.filter.Q.setValueAtTime(Q, this.audioContext.currentTime);
          this.filter.frequency.setValueAtTime(freq, this.audioContext.currentTime);
          break;
        case 2:
          this.distortion.curve = this.makeDistortionCurve(Math.pow(val, 2));
          break;
        default:
          break;
      }
    },
    onClickWord(word) {
      // will never be used because multislider overlay is preventing clicks
    },
  },
};
</script>