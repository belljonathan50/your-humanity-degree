import { samples } from '../data/samples';

const survey1NbSampleSets = samples.survey1.answers.length;
const survey1SampleSets = [];
for (let i = 0; i < survey1NbSampleSets; i++) {
  survey1SampleSets.push(i);
}

const survey2NbSampleSets = samples.survey2.answers.length;
const survey2SampleSets = [];
for (let i = 0; i < survey2NbSampleSets; i++) {
  survey2SampleSets.push(i);
}

const survey3NbSampleSets = samples.survey3.answers.length;
const survey3SampleSets = [];
for (let i = 0; i < survey3NbSampleSets; i++) {
  survey3SampleSets.push(i);
}

const flyingWords1NbPadSampleSets = samples.flyingWords1.pads.length;
const flyingWords1PadSampleSets = [];
for (let i = 0; i < flyingWords1NbPadSampleSets; i++) {
  flyingWords1PadSampleSets.push(i);
}

const puzzle1NbSampleSets = samples.puzzle1.pads.length;
const puzzle1SampleSets = [];
for (let i = 0; i < puzzle1NbSampleSets; i++) {
  puzzle1SampleSets.push(i);
}

export default {
  currentPage: {
    type: 'enum',
    default: 'welcome',
    list: [
      'loader',
      'welcome',
      'survey1',
      'flyingWords1',
      'flyingWords2',
      'survey2',
      'puzzle1',
      'flyingWords3',
      'survey3',
      'end',
      'thankyou',      
    ],
  },
  // survey 1 :
  survey1SampleSet: {
    type: 'enum',
    default: 0,
    list: survey1SampleSets,
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
  // flying words 1 :
  flyingWords1PadSampleSet: {
    type: 'enum',
    default: 0,
    list: flyingWords1PadSampleSets,
  },
  // flyingWords 2 :
  // not needed, will be imported directly from page
  // flyingWords2GranularSampleSet: {
  //   type: 'any',
  //   default: flyingWords2GranularSampleSets,
  // },
  // survey 2 :
  survey2SampleSet: {
    type: 'enum',
    default: 0,
    list: survey2SampleSets,
  },
  // puzzle :
  puzzle1SampleSet: {
    type: 'enum',
    default: 0,
    list: puzzle1SampleSets,
  },
  // flyingWords 3 :
  // not needed, will be imported directly from page
  // flyingWords3GranularSampleSet: {
  //   type: 'any',
  //   default: flyingWords3GranularSampleSets,
  // },
  // survey 3 :
  survey3SampleSet: {
    type: 'enum',
    default: 0,
    list: survey3SampleSets,
  },
};