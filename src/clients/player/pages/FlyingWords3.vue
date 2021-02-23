<template>
  <flying-words-page
    :padSampleSets="padSampleSets"
    :granularSampleSets="granularSampleSets"
    :padSampleSetStateId="'flyingWords3PadSampleSet'"
    :granularSampleSetStateId="'flyingWords3GranularSampleSet'"
  />
</template>

<script>
import { samples } from '../../../server/data/samples';
import FlyingWordsPage from '../components/FlyingWordsPage.vue';

export default {
  components: { FlyingWordsPage },
  data() {
    return {
      padSampleSets: samples.flyingWords3.pads,
      granularSampleSets: samples.flyingWords3.granular,
    };
  },
};
</script>