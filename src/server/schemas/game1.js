import survey from '../data/survey1';
import { samples } from '../data/samples';

// const nbBackgroundSets = samples.game1.background.length;
const nbAnswerSets = samples.game1.answers.length;

// const backgroundSampleSets = [];
// for (let i = 0; i < nbBackgroundSets; i++) {
//   backgroundSampleSets.push(i);
// }

const answerSampleSets = []
for (let i = 0; i < nbAnswerSets; i++) {
  answerSampleSets.push(i);
}

export default {
  survey: {
    type: 'any',
    default: survey,
  },
  /*
  surveySpeed: {
    type: 'float',
    min: 20,
    max: 60,
    default: 20,
  },
  //*/
  /*
  backgroundSampleSet: {
    type: 'enum',
    default: 0,
    list: backgroundSampleSets,
  },
  //*/
  answerSampleSet: {
    type: 'enum',
    default: 0,
    list: answerSampleSets,
  },
};