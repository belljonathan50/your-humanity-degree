<template>
  <div class="flex-container">
    <div class="title flex-shrink-nogrow"> Game 1 </div>
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
      gameState: this.$experience.states.game1,
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
    // onSurveyItemChange({ question, answer }) {
    //   // TODO : keep track of survey results locally so that if a user changes its
    //   // response before item disappears we can still update the score

    //   const { totalScore, minScore, maxScore } = this.gameState.getValues();

    //   const item = this.surveyData[question];
    //   const q = item.question;
    //   const answers = item.answers;
    //   const a = item.answers[answer];
    //   console.log('question :');
    //   console.log(q);
    //   console.log('answer :');
    //   console.log(a);
    // },
    async onSurveyItemChange(data) { // data : { q: i, a: j, newScore, deltaScore, totalScore }
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
      
      // console.log(`item [${q},${a}] was selected with a score of ${newScore}`);
      // console.log(`total score is now ${totalScore}`);
    },
  }
};
</script>