<template>
  <div>
    <div class="flex-grow-shrink" style="flex-basis: 50%;">
      <div class="title"> Game 2 </div>
      <div class="subtitle">
        Click the words
        <br>
        that suit you
      </div>
    </div>

    <div class="flex-grow-noshrink">
      <div class="pads-wrapper">
        <div class="multislider-wrapper">
          <multi-slider
            v-bind:class="showSliders ? '' : 'hidden'"
            :sliders="3"
            :disabledSliders="[1]"
            :disableTouchEvents="!showSliders"
            @change="onSliderValueChanged"
          />
        </div>
        <flying-words
          :words="words"
          :wordSamples="wordSamples"
          :disableTouchEvents="showSliders"
          @click="onClickWord"
        />
        <pad-surface
          :columns="5"
          :rows="5"
          :disableTouchEvents="showSliders"
          :disabledPads="playerState.getValues().disabledPads"
          :padSamples="padSamples"
          :enabledStroke="true"
          :disabledStroke="false"
          :enabledFill="false"
          :disabledFill="true"
          @click="onClickPad"
        />
      </div>
    </div>

    <div class="flex-grow-shrink" style="flex-basis: 50%;"></div>
  </div>
</template>

<script>
import { samples } from '../../../server/data/samples';
import words from '../../../server/data/flying-words';
import GranularChain from '../utils/GranularChain';
import FlyingWords from '../components/FlyingWords.vue';
import PadSurface from '../components/PadSurface.vue';
import MultiSlider from '../components/MultiSlider.vue';

// see --multislider-fade-duration var in your-humanity-degree.css
// argument should be the same value in ms
const granularChain = new GranularChain(null, 5000);

export default {
  components: { FlyingWords, PadSurface, MultiSlider },
  data() {
    return {
      words,
      gameState: this.$experience.states.game2,
      playerState: this.$experience.playerState,
      padSampleSet: 0,
      wordSampleSet: 0,
      showSliders: false,
      // granularChain: null,
    }
  },
  computed: {
    padSamples() {
      return samples.game2.pads[this.padSampleSet];
    },
    wordSamples() {
      return samples.game2.words[this.wordSampleSet];
    },
    sliderBuffer() {
      const arr = samples.game3.sliders[0];
      const sample = arr[Math.round(Math.random() * (arr.length - 1))];
      return this.$experience.audioBufferLoader.data[sample];
    }
  },
  async created() {
    const { totalScore, minScore, maxScore } = this.playerState.getValues();
    // const normScore = maxScore === minScore
    //                 ? 0
    //                 : (totalScore - minScore) / (maxScore - minScore);
    const normScore = 1;

    const minEnabledPads = 5;
    const maxEnabledPads = 20;
    const nbPadsToDisable = minEnabledPads +
                            Math.floor(
                              (1 - normScore) *
                              (maxEnabledPads - minEnabledPads)
                            );

    const disabledPads = [];
    const enabledPads = [];
    for (let i = 0; i < 25; i++) { enabledPads.push(i); }

    for (let i = 0; i < nbPadsToDisable; i++) {
      const index = Math.floor(Math.random() * enabledPads.length);
      disabledPads.push(enabledPads.splice(index, 1)[0]);
    }

    granularChain.buffer = this.sliderBuffer;
    granularChain.setGranular(0);
    granularChain.setFilter(0);
    granularChain.setDistortion(0);

    await this.playerState.set({
      disabledPads,
      unselectedFlyingWords: words,
    });
  },
  async mounted() {    
    this.gameState.subscribe(updates => {
      if (updates.hasOwnProperty('showSliders')) {
        this.showSliders = updates.showSliders;
        if (this.showSliders) {
          granularChain.start();
        } else {
          granularChain.stop();
        }
      }

      if (updates.hasOwnProperty('padSampleSet')) {
        this.padSampleSet = updates.padSampleSet;
      }

      if (updates.hasOwnProperty('wordSampleSet')) {
        this.wordSampleSet = updates.wordSampleSet;
      }      
    });

    const {
      showSliders,
      padSampleSet,
      wordSampleSet
    } = this.gameState.getValues();

    this.showSliders = showSliders;
    if (this.showSliders) {
      granularChain.start();
    // } else {
    //   granularChain.stop();
    }

    this.padSampleSet = padSampleSet;
    this.wordSampleSet = wordSampleSet;

    let { minScore, maxScore } = this.playerState.getValues();

    words.forEach(w => {
      if (w.score < 0) minScore += w.score;
      if (w.score > 0) maxScore += w.score;
    });

    await this.playerState.set({ minScore, maxScore });
  },
  beforeDestroy() {
    // this.granularChain.deinit();
    // this.granularChain = null;
    granularChain.stop();
  },
  methods: {
    async onClickWord(word) {
      const { unselectedFlyingWords, totalScore } = this.playerState.getValues();

      for (let i = unselectedFlyingWords.length - 1; i >= 0 ; i--) {
        const w = unselectedFlyingWords[i];

        if (w.text === word.text && w.score === word.score) {
          unselectedFlyingWords.splice(i, 1);
          break;
        }
      }

      await this.playerState.set({
        unselectedFlyingWords,
        totalScore: totalScore + word.score,
      });
    },
    onClickPad(i) {
      // todo ?
    },
    onSliderValueChanged(i, val) {
      switch (i) {
        case 0:
          granularChain.setGranular(val);
          break;
        case 1:
          granularChain.setFilter(val);
          break;
        case 2:
          granularChain.setDistortion(val);
          break;
        default:
          break;
      }
    },
  }
};
</script>