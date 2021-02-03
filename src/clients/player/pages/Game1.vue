<template>
  <div>
    <survey
      ref="survey"
      :data="surveyData"
      @click="onSurveyAnswerClicked"
    />
  </div>
</template>

<script>
import { samples } from '../../../server/data/samples';
import SimpleSampler from '../utils/SimpleSampler';
import Survey from '../components/Survey.vue';

export default {
  components: { Survey },
  data() {
    return {
      gameState: this.$experience.states.game1,
      playerState: this.$experience.playerState,
      surveyData: [],
      sampler: null,
      backgroundSampleSet: 0,
      answerSampleSet: 0,
    };
  },
  mounted() {
    // this.$experience.playInstrumentalPart(0);
    this.gameState.subscribe(async updates => {
      // if (updates.hasOwnProperty('surveySpeed')) {
      //   await this.$refs.survey.setSpeed(updates.surveySpeed);
      // }

      // if (updates.hasOwnProperty('backgroundSampleSet')) {
      //   this.backgroundSampleSet = updates.backgroundSampleSet;
      // }

      if (updates.hasOwnProperty('answerSampleSet')) {
        this.answerSampleSet = updates.answerSampleSet;
      }
    });

    this.surveyData = this.gameState.getValues().survey;
    this.sampler = new SimpleSampler(this.$experience.audio.audioContext);
  },
  methods: {
    async onSurveyAnswerClicked({ score, min, max }) {
      let result = 'neutral';

      if (score === max) {
        result = 'good';
      } else if (score === min) {
        result = 'bad';
      }

      const sampleSet = samples.game1.answers[this.answerSampleSet];
      const length = sampleSet[result].length;
      const sample = sampleSet[result][Math.floor(Math.random() * length)];
      const buffer = this.$experience.audioBufferLoader.data[sample];
      this.sampler.stop(); // in case we go too fast
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