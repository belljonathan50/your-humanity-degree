<template>
  <div id="controller-survey-3"></div>
</template>

<script>
import * as controllers from '@ircam/basic-controllers';

export default {
  mounted() {
    const state = this.$experience.gameState;
    const schema = state.getSchema();
    const controls = {};

    controls.surveySampleSet = new controllers.SelectList({
      label: 'answer sample set',
      options: schema.surveySampleSet.list,
      default: schema.surveySampleSet.default,
      container: '#controller-survey-3',
      callback: value => {
        state.set({ surveySampleSet: value });
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