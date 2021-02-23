<template>
  <div id="controller-survey-2"></div>
</template>

<script>
import * as controllers from '@ircam/basic-controllers';

export default {
  mounted() {
    const state = this.$experience.gameState;
    const schema = state.getSchema();
    const controls = {};

    controls.survey2SampleSet = new controllers.SelectButtons({
      label: 'answer sample set',
      options: schema.survey2SampleSet.list,
      default: schema.survey2SampleSet.default,
      container: '#controller-survey-2',
      callback: value => {
        state.set({ survey2SampleSet: value });
      },
    });

    state.subscribe(updates => {
      Object.keys(updates).forEach(param => {
        if (controls.hasOwnProperty(param)) {
          controls[param].value = updates[param];
        }
      });
    });

    const values = state.getValues();

    Object.keys(values).forEach(param => {
      if (controls.hasOwnProperty(param)) {
        controls[param].value = values[param];
      }
    });
  },
};
</script>