import Vue from 'vue';
import Welcome from './Welcome.vue';
import Survey1 from './Survey1.vue';
import Survey2 from './Survey2.vue';
import Survey3 from './Survey3.vue';
import Survey4 from './Survey4.vue';
import FlyingWords1 from './FlyingWords1.vue';
import FlyingWords2 from './FlyingWords2.vue';
import FlyingWords3 from './FlyingWords3.vue';
import Puzzle1 from './Puzzle1.vue';
import End from './End.vue';
import ThankYou from './ThankYou.vue';

const pages = {
  welcome: Welcome,
  survey1: Survey1,
  survey2: Survey2,
  survey3: Survey3,
  survey4: Survey4,
  flyingWords1: FlyingWords1,
  flyingWords2: FlyingWords2,
  flyingWords3: FlyingWords3,
  puzzle1: Puzzle1,
  end: End,
  thankyou: ThankYou,
};

Object.keys(pages).forEach(p => {
  Vue.component(p, pages[p]);
});

export default pages;

// Vue.component('welcome', Welcome);
// Vue.component('survey1', Survey1);
// Vue.component('survey2', Survey2);
// Vue.component('survey3', Survey3);
// Vue.component('survey4', Survey4);
// Vue.component('flyingWords1', FlyingWords1);
// Vue.component('flyingWords2', FlyingWords2);
// Vue.component('flyingWords3', FlyingWords3);
// Vue.component('puzzle1', Puzzle1);
// Vue.component('end', End);
// Vue.component('thankyou', ThankYou);
