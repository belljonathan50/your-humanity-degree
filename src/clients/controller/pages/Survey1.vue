<template>
  <div id="controller-survey-1"></div>
</template>

<script>
import * as controllers from '@ircam/basic-controllers';

export default {
  mounted() {
    const state = this.$experience.gameState;
    const schema = state.getSchema();
    const controls = {};

    controls.survey1SampleSet = new controllers.SelectButtons({
      label: 'answer sample set',
      options: schema.survey1SampleSet.list,
      default: schema.survey1SampleSet.default,
      container: '#controller-survey-1',
      callback: value => {
        state.set({ survey1SampleSet: value });
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