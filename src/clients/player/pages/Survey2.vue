<template>
  <survey-page
    :title="`He said those, <br> do you agree?`"
    :surveyData="surveyData"
    :offset="0"
    :sampleSets="sampleSets"
    :sampleSetStateId="'surveySampleSet'"
  />
</template>

<script>
import surveyData from '../../../server/data/survey2';
import { samples } from '../../../server/data/samples';
import SurveyPage from '../components/SurveyPage.vue';

export default {
  components: { SurveyPage },
  data() {
    return {
      surveyData,
      sampleSets: samples.surveys.answers,
    };
  },
};
</script>