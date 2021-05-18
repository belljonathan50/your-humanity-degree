<template>
  <survey-page
    :title="`What about <br> you compare <br> to Beethoven?`"
    :surveyData="surveyData"
    :offset="0"
    :sampleSets="sampleSets"
    :sampleSetStateId="'surveySampleSet'"
  />
</template>

<script>
import surveyData from '../../../server/data/survey3';
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