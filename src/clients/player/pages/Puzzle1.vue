<template>
  <div>
    <div class="flex-grow-shrink flex-container" style="flex-basis: 50%;">
      <div class="title">
        <!-- put something here -->
      </div>
      <div class="subtitle">
        <!-- put something here -->
      </div>
    </div>

    <div class="flex-grow-noshrink">
      <!-- <div class="pads-wrapper beethoven"> -->
      <div class="pads-wrapper">
        <image-scrambler
          :columns="columns"
          :rows="rows"
          :image="'beethoven_square.jpg'"
        />
        <pad-surface
          :columns="columns"
          :rows="rows"
          :words="words"
          :padSamples="padSamples"
          :disableTouchMove="true"
          :disablePadAnimations="true"
          :disabledPads="disabledPads"
          :enabledStroke="true"
          :disabledStroke="false"
          :enabledFill="true"
          :disabledFill="false"
          @click="onClickPad"
        />
      </div>
    </div>

    <div class="flex-grow-shrink" style="flex-basis: 50%;">
      <!-- put something here -->
    </div>
  </div>
</template>

<script>
import { samples } from '../../../server/data/samples';
import beethovenWords from '../../../server/data/beethoven-words';
import ImageScrambler from '../components/ImageScrambler.vue';
import PadSurface from '../components/PadSurface.vue';

export default {
  components: { ImageScrambler, PadSurface },
  data() {
    return {
      columns: 9,
      rows: 9,
      gameState: this.$experience.gameState,
      playerState: this.$experience.playerState,
      words: [],
      sampleSetIndex: 0,
      enabledPads: [],
      disabledPads: [], // this one is a PadSurface prop !!! (todo : decouple ?)
      unsubscribe: () => {},
    };
  },
  computed: {
    padSamples() {
      return samples.puzzle1.pads[this.sampleSetIndex];
    },
  },
  created() {
    const nPads = this.columns * this.rows;
    const tmp = [];
    for (let i = 0; i < nPads; i++) {
      this.enabledPads.push(i);
      tmp.push(Object.assign({}, beethovenWords[i % beethovenWords.length]));
    }

    // scramble the original words so that order is always different
    for (let i = 0; i < nPads; i++) {
      const rand = Math.floor(Math.random() * tmp.length);
      this.words.push(tmp.splice(rand, 1)[0]);
    }
  },
  mounted() {
    this.unsubscribe = this.gameState.subscribe(updates => {
      if (updates.hasOwnProperty('puzzle1SampleSet')) {
        this.sampleSetIndex = updates.puzzle1SampleSet;
      }
    });

    const { puzzle1SampleSet } = this.gameState.getValues();
    this.sampleSetIndex = puzzle1SampleSet;
    // this.wordSampleSet = wordSampleSet;
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    onClickPad(i) {
      this.enabledPads.splice(this.enabledPads.indexOf(i), 1)[0];
      const w = this.words[i];

      // update player state variables according to visible words :

      let min = w.score;
      let max = w.score;
      this.enabledPads.forEach(index => {
        const word = this.words[index];
        if (word.score < min) min = word.score;
        if (word.score > max) max = word.score;
      });

      let { totalScore, minScore, maxScore } = this.playerState.getValues();

      totalScore += w.score;
      minScore += min;
      maxScore += max;

      this.playerState.set({ totalScore, minScore, maxScore });

      // update pad enablement / disablement propagation according to score

      if (w.score < 0) {
        const nbPadsToEnable = Math.min(this.disabledPads.length, Math.floor(Math.random() * 2) + 1);
        for (let j = 0; j < nbPadsToEnable; j++) {
          const rand = Math.floor(Math.random() * this.disabledPads.length);
          // assign new random word to pad
          const word = beethovenWords[Math.floor(Math.random() * beethovenWords.length)];
          this.words[this.disabledPads[rand]] = word;
          this.words = [...this.words];
            // enable pad back
          this.enabledPads.push(this.disabledPads.splice(rand, 1)[0]);
        }
      } else if (w.score > 0) {
        const nbPadsToDisable = Math.min(this.enabledPads.length, Math.floor(Math.random() * 2) + 1);
        for (let j = 0; j < nbPadsToDisable; j++) {
          const rand = Math.floor(Math.random() * this.enabledPads.length);
          this.disabledPads.push(this.enabledPads.splice(rand, 1)[0]);
        }
      }

      this.disabledPads.push(i);
    },
  },
};
</script>