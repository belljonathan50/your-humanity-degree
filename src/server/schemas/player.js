// don't use +Infinity or -Infinity here
// it will make state updates fail silently :/

export default {
  started: {
    type: 'boolean',
    default: false,
  },
  totalScore: {
    type: 'integer',
    min: -1e9,
    max: 1e9,
    default: 0,
  },
  minScore: {
    type: 'integer',
    min: -1e9,
    max: 1e9,
    default: 0,
  },
  maxScore: {
    type: 'integer',
    min: -1e9,
    max: 1e9,
    default: 0,
  },
  disabledPads: {
    type: 'any',
    default: [],
  },
  padTransforms: {
    type: 'any',
    default: [],
  },
  unselectedFlyingWords: {
    type: 'any',
    default: [],
  }
};