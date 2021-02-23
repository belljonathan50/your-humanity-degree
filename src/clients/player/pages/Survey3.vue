<template>
  <survey-page
    :surveyData="surveyData"
    :offset="52"
    :sampleSets="sampleSets"
    :sampleSetStateId="'survey3SampleSet'"
  />
</template>

<script>
import surveyData from '../../../server/data/survey';
import { samples } from '../../../server/data/samples';
import SurveyPage from '../components/SurveyPage.vue';

export default {
  components: { SurveyPage },
  data() {
    return {
      surveyData,
      sampleSets: samples.survey3.answers,
    };
  },
};
</script>