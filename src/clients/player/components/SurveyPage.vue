<template>
  <div>
    <survey
      :data="surveyData"
      :offset="offset"
      @click="onSurveyAnswerClicked"
    />
  </div>
</template>

<script>
import { samples } from '../../../server/data/samples';
import SimpleSampler from '../utils/SimpleSampler';
import Survey from './Survey.vue';

export default {
  components: { Survey },
  // surveyData should be imported from ../../../server/data/surveyX
  // sampleSets sould be defined as samples.surveyX.answers, samples being
  // imported from ../../../server/data/samples
  // sampleSetStateId should be surveyXSampleSet (as defined in games schema)
  props: [ 'surveyData', 'offset', 'sampleSets', 'sampleSetStateId' ],
  data() {
    return {
      gameState: this.$experience.gameState,
      playerState: this.$experience.playerState,
      sampler: null,
      sampleSetIndex: 0,
      unsubscribe: () => {},
    };
  },
  mounted() {
    this.unsubscribe = this.gameState.subscribe(async updates => {
      if (updates.hasOwnProperty(this.sampleSetStateId)) {
        this.sampleSetIndex = updates[this.sampleSetStateId];
      }
    });

    this.sampleSetIndex = this.gameState.getValues()[this.sampleSetStateId];
    this.sampler = new SimpleSampler(this.$experience.audio.audioContext);
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    async onSurveyAnswerClicked({ score, min, max }) {
      let result = 'neutral';

      if (score === max) {
        result = 'good';
      } else if (score === min) {
        result = 'bad';
      }

      if (min === max) {
        result = 'neutral';
      }

      const sampleSet = this.sampleSets[this.sampleSetIndex];

      const length = sampleSet[result].length;
      const sample = sampleSet[result][Math.floor(Math.random() * length)];
      const buffer = this.$experience.audioBufferLoader.data[sample];

      this.sampler.stop(); // in case we went too fast (todo : allow polyphony instead)
      this.sampler.play(buffer);

      let { totalScore, minScore, maxScore } = this.playerState.getValues();

      totalScore += score;
      minScore += min;
      maxScore += max;

      await this.playerState.set({ totalScore, minScore, maxScore });
    },
  },
};
</script>