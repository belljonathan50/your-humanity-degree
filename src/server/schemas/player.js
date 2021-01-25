export default {
  totalScore: {
    type: 'integer',
    min: -Infinity,
    max: +Infinity,
    default: 0,
  },
  minScore: {
    type: 'integer',
    min: -Infinity,
    max: +Infinity,
    default: 0,
  },
  maxScore: {
    type: 'integer',
    min: -Infinity,
    max: +Infinity,
    default: 0,
  },
  disabledPads: {
    type: 'any',
    default: [],
  },
  unselectedFlyingWords: {
    type: 'any',
    default: [],
  }
};