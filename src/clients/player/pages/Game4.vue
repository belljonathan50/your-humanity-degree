<template>
  <div class="flex-container">
    <div class="title flex-shrink-nogrow"> Game 4 </div>
    <div class="cropped flex-grow-shrink">
      <survey
        ref="survey"
        :data="surveyData"
        @change="onSurveyItemChange"
      />
    </div>
  </div>
</template>

<script>
import { samples } from '../../../server/data/samples';
import Survey from '../components/Survey.vue';

export default {
  components: { Survey },
  data() {
    return {
      gameState: this.$experience.states.game4,
      playerState: this.$experience.playerState,
      surveyData: [],
      backgroundSampleSet: 0,
      triggerSampleSet: 0,
    };
  },
  mounted() {
    // this.$experience.playInstrumentalPart(0);
    this.gameState.subscribe(async updates => {
      if (updates.hasOwnProperty('surveySpeed')) {
        await this.$refs.survey.setSpeed(updates.surveySpeed);
      }

      if (updates.hasOwnProperty('backgroundSampleSet')) {
        this.backgroundSampleSet = updates.backgroundSampleSet;
      }

      if (updates.hasOwnProperty('triggerSampleSet')) {
        this.triggerSampleSet = updates.triggerSampleSet;
      }
    });

    const { survey, surveySpeed } = this.gameState.getValues();
    this.surveyData = survey;
    this.surveyData.forEach(item => { item.answered = false; });

    this.$refs['survey'].setSpeed(surveySpeed);
  },
  methods: {
    async onSurveyItemChange(data) { // data : { q: i, a: j, newScore, deltaScore, totalScore }  }
      if (!this.surveyData[data.q].answered) {
        const answers = this.surveyData[data.q].answers;
        let min = +Infinity;
        let max = -Infinity;

        answers.forEach(answer => {
          const score = answer[1];
          min = score < min ? score : min;
          max = score > max ? score : max;
        });

        this.surveyData[data.q].answered = true;
      }

      const { totalScore, minScore, maxScore } = this.playerState.getValues();
      await this.playerState.set({ totalScore: totalScore + data.deltaScore });
    },
  },
};
</script>