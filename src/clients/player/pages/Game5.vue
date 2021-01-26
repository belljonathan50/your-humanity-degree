<template>
  <div>
    <div class="title"> Game 5 </div>
    <div class="pads-wrapper beethoven">
      <pad-surface
        :columns="6"
        :rows="6"
        :words="words"
        :padSamples="padSamples"
        :disabledPads="disabledPads"
        :enabledStroke="true"
        :disabledStroke="false"
        :enabledFill="true"
        :disabledFill="false"
        @click="onClickPad"
      />
    </div>
  </div>
</template>

<script>
import { samples } from '../../../server/data/samples';
import words from '../../../server/data/beethoven-words';
import PadSurface from '../components/PadSurface.vue';

export default {
  components: { PadSurface },
  data() {
    return {
      gameState: this.$experience.states.game5,
      playerState: this.$experience.playerState,
      words: [],
      padSampleSet: 0,
      disabledPads: [],
      wordSampleSet: 0,
    };
  },
  computed: {
    // padSamples() {
    //   return samples.game2.pads[this.padSampleSet];
    // },
    wordSamples() {
      return samples.game5.words[this.wordSampleSet];
    },
  },
  created() {
    const tmp = words.slice(0);

    // scramble the original words so that order is always different
    for (let i = 0; i < words.length; i++) {
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
      this.disabledPads.push(i);
      const w = this.words[i];
      console.log(w.text, w.score);
    },
  },
};
</script>