import {
  samples,
  surveyData,
} from '../data';

const surveyNbDatasets = Object.keys(surveyData).length;
const surveyDatasets = [];
for (let i = 0; i < surveyNbDatasets; i++) {
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
    default: 6000,
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
  // survey general :
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
  // puzzle general :
  puzzleSampleSet: {
    type: 'enum',
    default: puzzleSampleSets[0],
    list: puzzleSampleSets,
  },
};