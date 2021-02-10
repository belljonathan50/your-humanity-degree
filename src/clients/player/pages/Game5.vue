<template>
  <div>
    <div class="flex-grow-shrink flex-container" style="flex-basis: 50%;">
      <div class="title"> Game 5 </div>
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

    <div class="flex-grow-shrink" style="flex-basis: 50%;"></div>
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
      gameState: this.$experience.states.game5,
      playerState: this.$experience.playerState,
      words: [],
      padSampleSet: 0,
      enabledPads: [],
      disabledPads: [], // this one is a PadSurface prop !!! (todo : decouple ?)
      wordSampleSet: 0,
    };
  },
  computed: {
    padSamples() {
      return samples.game2.pads[this.padSampleSet];
    },
    wordSamples() {
      return samples.game5.words[this.wordSampleSet];
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
    this.gameState.subscribe(updates => {
      if (updates.hasOwnProperty('padSampleSet')) {
        this.padSampleSet = updates.padSampleSet;
      }

      // if (updates.hasOwnProperty('wordSampleSet')) {
      //   this.wordSampleSet = updates.wordSampleSet;
      // }      
    });

    // const { padSampleSet, wordSampleSet } = this.gameState.getValues();
    const { padSampleSet } = this.gameState.getValues();
    this.padSampleSet = padSampleSet;
    // this.wordSampleSet = wordSampleSet;
  },
  methods: {
    onClickPad(i) {
      // first compute min and max score here according to visible words' scores

      this.enabledPads.splice(this.enabledPads.indexOf(i), 1)[0];
      const w = this.words[i];

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