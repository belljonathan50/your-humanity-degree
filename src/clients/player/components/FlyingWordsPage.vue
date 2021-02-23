<template>
  <div v-bind:class="{ shit: blinking }">
    <div class="flex-grow-shrink flex-container" style="flex-basis: 50%;">
      <div class="title"> Game 2 </div>
      <div style="text-align: center">
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
            :disabledSliders="[]"
            :disableTouchEvents="!showSliders"
            @change="onSliderValueChanged"
          />
        </div>
        <flying-words
          :words="words"
          :negativeWordsPercentage="negativeWordsPercentage"
          :widthHeightRatio="columns / rows"
          :wordSamples="[]"
          :disableTouchEvents="showSliders"
          @click="onClickWord"
        />
        <pad-surface
          :columns="columns"
          :rows="rows"
          :disableTouchEvents="showSliders"
          :disabledPads="playerState.getValues().disabledPads"
          :defaultPadTransforms="playerState.getValues().padTransforms"
          :padSamples="padSamples"
          :enabledStroke="true"
          :disabledStroke="false"
          :enabledFill="false"
          :disabledFill="true"
          @click="onClickPad"
          @padTransforms="onPadTransforms"
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
const granularChain = new GranularChain(null, 1000);

export default {
  components: { FlyingWords, PadSurface, MultiSlider },
  props: [
    'padSampleSets',
    'granularSampleSets',
    'padSampleSetStateId',
    'granularSampleSetStateId'
  ],
  data() {
    return {
      columns: 5,
      rows: 5,
      words,
      gameState: this.$experience.gameState,
      playerState: this.$experience.playerState,
      padSampleSetIndex: 0,
      padTransforms: [],
      granularSampleSetIndex: 0,
      showSliders: false,
      negativeWordsPercentage: 0,
      blinkTimeout: null,
      blinking: false,
      unsubscribe: () => {},
    }
  },
  computed: {
    padSamples() {
      return this.padSampleSets[this.padSampleSetIndex];
    },
    sliderBuffer() {
      const arr = this.granularSampleSets[this.granularSampleSetIndex];
      const sample = arr[Math.floor(Math.random() * (arr.length))];
      return this.$experience.audioBufferLoader.data[sample];
    }
  },
  async created() {
    this.unsubscribe = this.gameState.subscribe(updates => {
      if (updates.hasOwnProperty('flyingWordsShowSliders')) {
        this.showSliders = updates.flyingWordsShowSliders;
        if (this.showSliders) {
          // console.log('starting');
          granularChain.start();
        } else {
          // console.log('stopping');
          granularChain.stop();
        }
      }

      if (updates.hasOwnProperty('flyingWordsNegativeWordsPercentage')) {
        this.negativeWordsPercentage = updates.flyingWordsNegativeWordsPercentage;
      }

      if (updates.hasOwnProperty(this.padSampleSetStateId)) {
        this.padSampleSetIndex = updates[this.padSampleSetStateId];
      }

      if (updates.hasOwnProperty(this.granularSampleSetStateId)) {
        this.granularSampleSetIndex = updates[this.granularSampleSetStateId];
      }
    });

    console.log(this.sliderBuffer);
    granularChain.buffer = this.sliderBuffer;
    granularChain.setGranular(0);
    granularChain.setFilter(0);
    granularChain.setDistortion(0);

    const gameStateValues = this.gameState.getValues();

    const {
      flyingWordsShowSliders,
      flyingWordsNegativeWordsPercentage
    } = gameStateValues;

    this.showSliders = flyingWordsShowSliders;
    this.negativeWordsPercentage = flyingWordsNegativeWordsPercentage;
    this.padSampleSetIndex = gameStateValues[this.padSampleSetStateId];
    this.granularSampleSetIndex = gameStateValues[this.granularSampleSetStateId];

    ////////// SCORE STUFF :

    const { totalScore, minScore, maxScore } = this.playerState.getValues();
    // const normScore = maxScore === minScore
    //                 ? 0
    //                 : (totalScore - minScore) / (maxScore - minScore);
    const normScore = 1;

    const nbPads = this.columns * this.rows;
    const minEnabledPads = 5;
    const maxEnabledPads = nbPads - 5;

    const nbPadsToDisable = minEnabledPads +
                            Math.floor(
                              (1 - normScore) *
                              (maxEnabledPads - minEnabledPads)
                            );

    const disabledPads = [];
    const enabledPads = [];

    for (let i = 0; i < nbPads; i++) {
      enabledPads.push(i);
    }

    for (let i = 0; i < nbPadsToDisable; i++) {
      const index = Math.floor(Math.random() * enabledPads.length);
      disabledPads.push(enabledPads.splice(index, 1)[0]);
    }

    await this.playerState.set({
      disabledPads,
      unselectedFlyingWords: words,
    });
  },
  mounted() {
    // this MUST be in mounted hook, otherwise the beforeDestroy hook of the
    // previous instance of the component can execute granularChain.stop AFTER the
    // created hook of the new component executes granularChain.start, which leads
    // to the granular not playing in the new component instance ...
    if (this.showSliders) {
      // console.log('starting granular player');
      granularChain.start();
    }    
  },
  beforeDestroy() {
    this.unsubscribe();
    // console.log('stopping granular player');
    granularChain.stop();
    // await this.playerState.set({ padTransforms: this.padTransforms });
    // console.log(this.playerState.getValues().padTransforms);
  },
  methods: {
    // see flyingWords class' getDisplayedWords method
    // (activeWords are not included if they are out of bounds)
    async onClickWord(word, displayedWords) {
      let {
        unselectedFlyingWords,
        totalScore,
        minScore,
        maxScore,
      } = this.playerState.getValues();

      /*
      // is this still relevant ? or do we allow words to be reused ?
      // if we allow this, minScore and maxScore have to be updated on each
      // word clicked (see comment below), and not computed in mounted() 

      for (let i = unselectedFlyingWords.length - 1; i >= 0 ; i--) {
        const w = unselectedFlyingWords[i];

        if (w.text === word.text && w.score === word.score) {
          unselectedFlyingWords.splice(i, 1);
          break;
        }
      }
      //*/

      // now get all currently displayed words and their scores
      // to update minScore and maxScore

      let min = +Infinity;
      let max = -Infinity;

      displayedWords.forEach(w => {
        if (w.score > max) max = w.score;
        if (w.score < min) min = w.score;
      });

      totalScore += word.score;
      minScore += min;
      maxScore += max;

      await this.playerState.set({
        unselectedFlyingWords,
        totalScore,
        minScore,
        maxScore,
      });

      // the method based on requestAnimationFrame used in MultiSlider.vue's
      // blinkSlider method doesn't always work here ... investigate why :/

      if (word.score < 0) {
        this.blinking = false;
        await this.$nextTick();
        this.blinking = true;
        setTimeout(() => {
          this.blinking = false;
        }, 1000);
      }
    },
    onClickPad(i) {
      // todo ?
    },
    async onPadTransforms(padTransforms) {
      await this.playerState.set({ padTransforms });
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