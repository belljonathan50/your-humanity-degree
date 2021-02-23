<template>
  <flying-words-page
    :padSampleSets="padSampleSets"
    :granularSampleSets="granularSampleSets"
    :padSampleSetStateId="'flyingWords2PadSampleSet'"
    :granularSampleSetStateId="'flyingWords2GranularSampleSet'"
  />
</template>

<script>
import { samples } from '../../../server/data/samples';
import FlyingWordsPage from '../components/FlyingWordsPage.vue';

export default {
  components: { FlyingWordsPage },
  data() {
    return {
      padSampleSets: samples.flyingWords2.pads,
      granularSampleSets: samples.flyingWords2.granular,
    };
  },
};
</script>