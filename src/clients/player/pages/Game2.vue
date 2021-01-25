<template>
  <div>
    <div class="title"> Game 2 </div>
    <div class="subtitle">
      Click the words
      <br>
      that suit you
    </div>
    <div class="pads-wrapper">
      <flying-words
        :words="words"
        :wordSamples="wordSamples"
        @click="onClickWord"
      />
      <pad-surface
        :columns="5"
        :rows="5"
        :disabledPads="playerState.getValues().disabledPads"
        :padSamples="padSamples"
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
import words from '../../../server/data/flying-words';
import FlyingWords from '../components/FlyingWords.vue';
import PadSurface from '../components/PadSurface.vue';

export default {
  components: { FlyingWords, PadSurface },
  data() {
    return {
      words,
      gameState: this.$experience.states.game2,
      playerState: this.$experience.playerState,
      padSampleSet: 0,
      wordSampleSet: 0,
    }
  },
  computed: {
    padSamples() {
      return samples.game2.pads[this.padSampleSet];
    },
    wordSamples() {
      return samples.game2.words[this.wordSampleSet];
    },
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

    await this.playerState.set({
      disabledPads,
      unselectedFlyingWords: words,
    });
  },
  async mounted() {    
    this.gameState.subscribe(updates => {
      if (updates.hasOwnProperty('padSampleSet')) {
        this.padSampleSet = updates.padSampleSet;
      }

      if (updates.hasOwnProperty('wordSampleSet')) {
        this.wordSampleSet = updates.wordSampleSet;
      }      
    });

    const { padSampleSet, wordSampleSet } = this.gameState.getValues();
    this.padSampleSet = padSampleSet;
    this.wordSampleSet = wordSampleSet;

    let { minScore, maxScore } = this.playerState.getValues();

    words.forEach(w => {
      if (w.score < 0) minScore += w.score;
      if (w.score > 0) maxScore += w.score;
    });

    await this.playerState.set({ minScore, maxScore });
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
    }
  }
};
</script>