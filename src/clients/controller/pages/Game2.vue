<template>
  <div id="controller-game2">
  </div>
</template>

<script>
import * as controllers from '@ircam/basic-controllers';

export default {
  mounted() {
    const state = this.$experience.states.game2;
    const schema = state.getSchema();

    const controls = {};

    controls.padSampleSet = new controllers.SelectButtons({
      label: 'Pads sample set',
      options: schema.padSampleSet.list,
      default: schema.padSampleSet.default,
      container: '#controller-game2',
      callback: value => {
        state.set({ padSampleSet: value });
      },
    });

    controls.wordSampleSet = new controllers.SelectButtons({
      label: 'Words sample set',
      options: schema.wordSampleSet.list,
      default: schema.wordSampleSet.default,
      container: '#controller-game2',
      callback: value => {
        state.set({ wordSampleSet: value });
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
    console.log(values);
    Object.keys(values).forEach(param => {
      if (controls.hasOwnProperty(param)) {
        controls[param].value = values[param];
      }
    });
  },
};
</script>