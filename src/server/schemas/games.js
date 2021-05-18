import {
  samples,
  surveyData,
} from '../data';

const surveyNbDatasets = Object.keys(surveyData).length;
const surveyDatasets = [];
for (let i = 0; i < surveyNbDatasets; i++) {
  // surveyDatasets.push(`${i + 1}`);
  surveyDatasets.push(Object.keys(surveyData)[i]);
}

const surveyNbSampleSets = samples.survey.answers.length;
const surveySampleSets = [];
for (let i = 0; i < surveyNbSampleSets; i++) {
  surveySampleSets.push(`${i + 1}`);
}

const flyingWordsNbPadSampleSets = samples.flyingWords.pads.length;
const flyingWordsPadSampleSets = [];
for (let i = 0; i < flyingWordsNbPadSampleSets; i++) {
  flyingWordsPadSampleSets.push(`${i + 1}`);
}

const flyingWordsNbGranularSampleSets = samples.flyingWords.granular.length;
const flyingWordsGranularSampleSets = [];
for (let i = 0; i < flyingWordsNbGranularSampleSets; i++) {
  flyingWordsGranularSampleSets.push(`${i + 1}`);
}

const puzzleNbSampleSets = samples.puzzle.pads.length;
const puzzleSampleSets = [];
for (let i = 0; i < puzzleNbSampleSets; i++) {
  puzzleSampleSets.push(`${i + 1}`);
}

export default {
  showNotification: {
    type: 'boolean',
    default: false,
  },
  // if < 0 : don't use timeout, user must use showNotification "manually"
  hideNotificationDelay: {
    type: 'integer',
    min: -1,
    max: 1e9,
    default: 5000,
  },
  notificationMessage: {
    type: 'any',
    default: '',
  },
  currentPage: {
    type: 'enum',
    default: 'welcome',
    list: [
      'loader',
      'welcome',
      'survey',
      'flyingWords',
      'puzzle',
      'end',
      'thankyou',      
    ],
  },
  // currentPage: {
  //   type: 'enum',
  //   default: pageIds[0],
  //   list: pageIds,
  // },  
  surveyData: {
    type: 'enum',
    default: surveyDatasets[0],
    list: surveyDatasets,
  },
  surveySampleSet: {
    type: 'enum',
    default: surveySampleSets[0],
    list: surveySampleSets,
  },
  // survey 1 :
  // survey1SampleSet: {
  //   type: 'enum',
  //   default: 0,
  //   list: survey1SampleSets,
  // },
  // flying words general :
  flyingWordsShowSliders: {
    type: 'boolean',
    default: false,
  },
  flyingWordsNegativeWordsPercentage: {
    type: 'float',
    min: 0,
    max: 100,
    default: 50,
  },
  flyingWordsPadSampleSet: {
    type: 'enum',
    default: flyingWordsPadSampleSets[0],
    list: flyingWordsPadSampleSets,
  },
  flyingWordsGranularSampleSet: {
    type: 'enum',
    default: flyingWordsGranularSampleSets[0],
    list: flyingWordsGranularSampleSets,
  },
  // flying words 1 :
  // flyingWords1PadSampleSet: {
  //   type: 'enum',
  //   default: flyingWords1PadSampleSets[0],
  //   list: flyingWords1PadSampleSets,
  // },
  // flyingWords 2 :
  // not needed, will be imported directly from page
  // flyingWords2GranularSampleSet: {
  //   type: 'any',
  //   default: flyingWords2GranularSampleSets,
  // },
  // survey 2 :
  // survey2SampleSet: {
  //   type: 'enum',
  //   default: 0,
  //   list: survey2SampleSets,
  // },
  // puzzle general :
  puzzleSampleSet: {
    type: 'enum',
    default: puzzleSampleSets[0],
    list: puzzleSampleSets,
  },
  // puzzle 1 :
  // puzzle1SampleSet: {
  //   type: 'enum',
  //   default: puzzle1SampleSets[0],
  //   list: puzzle1SampleSets,
  // },
  // flyingWords 3 :
  // not needed, will be imported directly from page
  // flyingWords3GranularSampleSet: {
  //   type: 'any',
  //   default: flyingWords3GranularSampleSets,
  // },
  // survey 3 :
  // survey3SampleSet: {
  //   type: 'enum',
  //   default: 0,
  //   list: survey3SampleSets,
  // },
};