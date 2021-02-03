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

    controls.showSliders = new controllers.Toggle({
      label: 'show sliders',
      default: schema.showSliders.default,
      container: '#controller-game2',
      callback: value => {
        state.set({ showSliders: value });
      },
    });

    controls.padSampleSet = new controllers.SelectButtons({
      label: 'Pad samples',
      options: schema.padSampleSet.list,
      default: schema.padSampleSet.default,
      container: '#controller-game2',
      callback: value => {
        state.set({ padSampleSet: value });
      },
    });

    /*
    controls.wordSampleSet = new controllers.SelectButtons({
      label: 'Word samples',
      options: schema.wordSampleSet.list,
      default: schema.wordSampleSet.default,
      container: '#controller-game2',
      callback: value => {
        state.set({ wordSampleSet: value });
      },
    });
    */

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