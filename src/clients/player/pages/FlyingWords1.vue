<template>
  <flying-words-page
    :padSampleSets="padSampleSets"
    :granularSampleSets="granularSampleSets"
    :padSampleSetStateId="'flyingWords1PadSampleSet'"
    :granularSampleSetStateId="'flyingWords1GranularSampleSet'"
  />
</template>

<script>
import { samples } from '../../../server/data/samples';
import FlyingWordsPage from '../components/FlyingWordsPage.vue';

export default {
  components: { FlyingWordsPage },
  data() {
    return {
      padSampleSets: samples.flyingWords1.pads,
      granularSampleSets: samples.flyingWords1.granular,
    };
  },
};
</script>