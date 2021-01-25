import flyingWords from '../data/flying-words';
import { samples } from '../data/samples';

const nbPadSets = samples.game2.pads.length;
const nbWordSets = samples.game2.words.length;

const padSampleSets = [];
for (let i = 0; i < nbPadSets; i++) {
  padSampleSets.push(i);
}

const wordSampleSets = []
for (let i = 0; i < nbWordSets; i++) {
  wordSampleSets.push(i);
}

export default {
  words: {
    type: 'any',
    default: flyingWords,
  },
  // add flying words parameters here
  padSampleSet: {
    type: 'enum',
    default: 0,
    list: padSampleSets,
  },
  wordSampleSet: {
    type: 'enum',
    default: 0,
    list: wordSampleSets,
  },
};