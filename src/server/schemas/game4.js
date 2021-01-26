import survey from '../data/survey2';
import { samples } from '../data/samples';

const nbBackgroundSets = samples.game1.background.length;
const nbTriggerSets = samples.game1.triggers.length;

const backgroundSampleSets = [];
for (let i = 0; i < nbBackgroundSets; i++) {
  backgroundSampleSets.push(i);
}

const triggerSampleSets = []
for (let i = 0; i < nbTriggerSets; i++) {
  triggerSampleSets.push(i);
}

export default {
  survey: {
    type: 'any',
    default: survey,
  },
  surveySpeed: {
    type: 'float',
    min: 20,
    max: 60,
    default: 20,
  },
  backgroundSampleSet: {
    type: 'enum',
    default: 0,
    list: backgroundSampleSets,
  },
  triggerSampleSet: {
    type: 'enum',
    default: 0,
    list: triggerSampleSets,
  },
};