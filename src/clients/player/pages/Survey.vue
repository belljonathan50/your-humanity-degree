<template>
  <div>
    <survey-component
      :title="title"
      :data="items"
      :offset="0"
      @click="onSurveyAnswerClicked"
    />
  </div>
</template>

<script>
import { samples, surveyData } from '../../../server/data';
import SimpleSampler from '../utils/SimpleSampler';
import SurveyComponent from '../components/Survey.vue';

export default {
  components: { SurveyComponent },
  data() {
    return {
      gameState: this.$experience.gameState,
      playerState: this.$experience.playerState,
      sampler: null,
      sampleSets: samples.survey.answers,
      sampleSetIndex: 0,
      title: '',
      items: [],
      unsubscribe: () => {},
    };
  },
  mounted() {
    this.unsubscribe = this.gameState.subscribe(async updates => {
      if (updates.hasOwnProperty('surveyData')) {
        const { title, items } = surveyData[updates.surveyData];
        this.title = title;
        this.items = items;
      }

      if (updates.hasOwnProperty('surveySampleSet')) {
        this.sampleSetIndex = updates.surveySampleSet;
      }
    });

    // const { surveyData, surveySampleSet } = this.gameState.getValues();
    // this.title = surveyData.title;
    // this.items = surveyData.items;
    // this.sampleSetIndex = surveySampleSet;

    const gameStateValues = this.gameState.getValues();
    const { title, items } = surveyData[gameStateValues.surveyData];
    this.title = title;
    this.items = items;
    this.sampleSetIndex = gameStateValues.surveySampleSet;

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