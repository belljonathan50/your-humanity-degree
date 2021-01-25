<template>
  <div id="controller-game1">
  </div>
</template>

<script>
import * as controllers from '@ircam/basic-controllers';

export default {
  mounted() {
    const state = this.$experience.states.game1;
    const schema = state.getSchema();

    const controls = {};

    controls.surveySpeed = new controllers.Slider({
      label: 'Survey speed',
      min: 20,
      max: 60,
      step: 1,
      default: 20,
      container: '#controller-game1',
      callback: value => {
        state.set({ surveySpeed: value });
      },
    });

    controls.backgroundSampleSet = new controllers.SelectButtons({
      label: 'Background sample set',
      options: schema.backgroundSampleSet.list,
      default: schema.backgroundSampleSet.default,
      container: '#controller-game1',
      callback: value => {
        state.set({ backgroundSampleSet: value });
      },
    });

    controls.triggerSampleSet = new controllers.SelectButtons({
      label: 'Trigger sample set',
      options: schema.triggerSampleSet.list,
      default: schema.triggerSampleSet.default,
      container: '#controller-game1',
      callback: value => {
        state.set({ triggerSampleSet: value });
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