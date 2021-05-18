import Vue from 'vue';
import Loader from './Loader.vue';
import Welcome from './Welcome.vue';
import Survey from './Survey.vue';
import FlyingWords from './FlyingWords.vue';
import Puzzle from './Puzzle.vue';
import End from './End.vue';
import ThankYou from './ThankYou.vue';

const pages = {
  loader: Loader,
  welcome: Welcome,
  survey: Survey,
  flyingWords: FlyingWords,
  puzzle: Puzzle,
  end: End,
  thankyou: ThankYou,
};

Object.keys(pages).forEach(p => {
  Vue.component(p, pages[p]);
});

export default pages;
