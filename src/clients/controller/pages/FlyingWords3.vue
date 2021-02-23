<template>
  <div id="controller-flying-words-3"></div>
</template>

<script>
import * as controllers from '@ircam/basic-controllers';

export default {
  mounted() {
    const state = this.$experience.gameState;
    const schema = state.getSchema();
    const controls = {};

    // controls.flyingWords3PadSampleSet = new controllers.SelectButtons({
    //   label: 'pad sample set',
    //   options: schema.flyingWords3PadSampleSet.list,
    //   default: schema.flyingWords3PadSampleSet.default,
    //   container: '#controller-flying-words-3',
    //   callback: value => {
    //     state.set({ flyingWords3PadSampleSet: value });
    //   },
    // });

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