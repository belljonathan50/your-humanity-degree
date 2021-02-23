<template>
  <div id="controller-flying-words-2"></div>
</template>

<script>
import * as controllers from '@ircam/basic-controllers';

export default {
  mounted() {
    const state = this.$experience.gameState;
    const schema = state.getSchema();
    const controls = {};

    // controls.flyingWords2PadSampleSet = new controllers.SelectButtons({
    //   label: 'pad sample set',
    //   options: schema.flyingWords2PadSampleSet.list,
    //   default: schema.flyingWords2PadSampleSet.default,
    //   container: '#controller-flying-words-2',
    //   callback: value => {
    //     state.set({ flyingWords2PadSampleSet: value });
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