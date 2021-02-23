<template>
  <div id="controller-flying-words-1"></div>
</template>

<script>
import * as controllers from '@ircam/basic-controllers';

export default {
  mounted() {
    const state = this.$experience.gameState;
    const schema = state.getSchema();
    const controls = {};

    // controls.flyingWordsShowSliders = new controllers.Toggle({
    //   label: 'show sliders',
    //   default: schema.flyingWordsShowSliders.default,
    //   container: '#controller-flying-words-1',
    //   callback: value => {
    //     state.set({ flyingWordsShowSliders: value });
    //   },
    // });

    controls.flyingWords1PadSampleSet = new controllers.SelectButtons({
      label: 'pad sample set',
      options: schema.flyingWords1PadSampleSet.list,
      default: schema.flyingWords1PadSampleSet.default,
      container: '#controller-flying-words-1',
      callback: value => {
        state.set({ flyingWords1PadSampleSet: value });
      },
    });

    controls.flyingWordsNegativeWordsPercentage = new controllers.Slider({
      label: 'negative words %',
      min: 0,
      max: 100,
      step: 1,
      default: 50,
      container: '#controller-flying-words-1',
      callback: value => {
        state.set({ flyingWordsNegativeWordsPercentage: value });
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