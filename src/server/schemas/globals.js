// import survey1 from '../data/survey1';
// import survey2 from '../data/survey2';
// import words from '../data/words';
import { samples } from '../data/samples';

export default {
  liveMode: {
    type: 'boolean',
    default: false,
  },
  currentPage: {
    type: 'enum',
    default: 'welcome',
    list: [
      'welcome',
      'game1',
      'game2',
      'game3',
      'game4',
      'game5',
      'thankyou',      
    ],
  },
  // survey1: {
  //   type: 'any',
  //   default: survey1,
  // },
  // words: {
  //   type: 'any',
  //   default: words,
  // },
  // survey2: {
  //   type: 'any',
  //   default: survey2,
  // },
  samples: {
    type: 'any',
    default: samples,
  },
};