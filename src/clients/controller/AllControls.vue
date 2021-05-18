<template>
  <div id="all-controls"></div>
</template>

<script>
import * as controllers from '@ircam/basic-controllers';

export default {
  mounted() {
    const state = this.$experience.gameState;
    const schema = state.getSchema();
    const controls = {};

    const pages = [ ...schema.currentPage.list ];
    const loaderPageIndex = pages.indexOf('loader');
    if (loaderPageIndex !== -1) {
      pages.splice(loaderPageIndex, 1);
    }

    controls.currentPage = new controllers.SelectButtons({
      label: 'current page',
      options: pages,
      default: pages[0],
      container: '#all-controls',
      callback: value => {
        state.set({ currentPage: value });
      },
    });

    const surveyGroup = new controllers.Group({
      label: 'survey',
      default: 'opened',
      container: '#all-controls',
    });

    controls.surveyData = new controllers.SelectList({
      label: 'survey data set',
      options: schema.surveyData.list,
      default: schema.surveyData.default,
      container: surveyGroup,
      callback: value => {
        state.set({ surveyData: value });
      },
    });

    controls.surveySampleSet = new controllers.SelectList({
      label: 'answer sample set',
      options: schema.surveySampleSet.list,
      default: schema.surveySampleSet.default,
      container: surveyGroup,
      callback: value => {
        state.set({ surveySampleSet: value });
      },
    });

    const flyingWordsGroup = new controllers.Group({
      label: 'flying words',
      default: 'opened',
      container: '#all-controls',
    });

    controls.flyingWordsShowSliders = new controllers.Toggle({
      label: 'show sliders',
      default: schema.flyingWordsShowSliders.default,
      container: flyingWordsGroup,
      callback: value => {
        state.set({ flyingWordsShowSliders: value });
      },
    });

    controls.flyingWordsNegativeWordsPercentage = new controllers.Slider({
      label: 'negative words %',
      min: 0,
      max: 100,
      step: 1,
      default: 50,
      container: flyingWordsGroup,
      callback: value => {
        state.set({ flyingWordsNegativeWordsPercentage: value });
      },
    });

    /*
    controls.flyingWordsPadSampleSet = new controllers.SelectList({
      label: 'pad sample set',
      options: schema.flyingWordsPadSampleSet.list,
      default: schema.flyingWordsPadSampleSet.default,
      container: flyingWordsGroup,
      callback: value => {
        state.set({ flyingWordsPadSampleSet: value });
      },
    });
    */

    controls.flyingWordsGranularSampleSet = new controllers.SelectList({
      label: 'granular sample set',
      options: schema.flyingWordsGranularSampleSet.list,
      default: schema.flyingWordsGranularSampleSet.default,
      container: flyingWordsGroup,
      callback: value => {
        state.set({ flyingWordsGranularSampleSet: value });
      },
    });

    /*
    const puzzleGroup = new controllers.Group({
      label: 'puzzle',
      default: 'opened',
      container: '#all-controls',
    });

    controls.puzzleSampleSet = new controllers.SelectList({
      label: 'pad sample set',
      options: schema.puzzleSampleSet.list,
      default: schema.puzzleSampleSet.default,
      container: puzzleGroup,
      callback: value => {
        state.set({ puzzleSampleSet: value });
      },
    });
    */

    // get state updates for all params :

    state.subscribe(updates => {
      Object.keys(updates).forEach(param => {
        if (controls.hasOwnProperty(param)) {
          controls[param].value = updates[param];
        }
      });
    });

    // get current param values :

    const values = state.getValues();

    Object.keys(values).forEach(param => {
      if (controls.hasOwnProperty(param)) {
        controls[param].value = values[param];
      }
    });
  },
};
</script>