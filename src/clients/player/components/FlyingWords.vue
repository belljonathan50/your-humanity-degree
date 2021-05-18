<template>
  <div class="flying-words">
    <!-- <canvas ref="canvas"/> -->
    <div class="flying-word"
      v-for="(word, i) in words"
      :ref="word.text">
      <div
        @click="onClickWord(word)"
        :style="{ 'pointer-events': disabled[word.text] ? 'none' : 'auto' }">
        <div
          v-if="disabled[word.text]"
          style="position: absolute; width: 100%; height: 100%;">
          <exploding-word
            :word="word.text"
            @end="onExplodingAnimationEnd(word)"/>
        </div>
        <div
          :style="{
            visibility: disabled[word.text] ? 'hidden' : 'visible',
            'white-space': 'nowrap',
          }">
          <nobr> {{ word.text }} </nobr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlyingWords from '../utils/FlyingWords';
import ExplodingWord from './ExplodingWord.vue';

export default {
  components: { ExplodingWord },
  props: [
    'words',
    'negativeWordsPercentage',
    'widthHeightRatio',
    'wordSamples',
    'disableTouchEvents',
  ],
  watch: {
    negativeWordsPercentage(newVal, oldVal) {
      this.flyingWords.setNegativeWordsPercentage(newVal);
    },
  },
  data() {
    return {
      rafId: null,
      disabled: {},
    };
  },
  computed: {
    wordElements() {
      const res = {};
      for (let i = 0; i < this.words.length; i++) {
        // 1 item array due to v-for :
        res[this.words[i].text] = this.$refs[this.words[i].text][0];
      }
      return res;
    },
  },
  created() {
    const width = 100;
    const height = 100 / this.widthHeightRatio;
    const options = {
      minSpeed: height * 0.05, // per sec
      maxSpeed: height * 0.1, // per sec
      minInterval: 2, // secs
      maxInterval: 3, // secs
    };

    this.words.forEach(w => {
      this.disabled[w.text] = false;
    });

    this.flyingWords = new FlyingWords(width, height, this.words, options);
    this.flyingWords.setNegativeWordsPercentage(this.negativeWordsPercentage);
    this.flyingWords.on('disabled', (wordText, disabled) => {
      // console.log(`${disabled ? 'dis' : 'en'}abling word ${wordText}`);
      this.disabled = Object.assign({}, this.disabled, {[wordText]: disabled});
    });
  },
  mounted() {
    // this.ctx = this.$refs.canvas.getContext('2d');
    this.flyingWords.start();
    this.rafId = window.requestAnimationFrame(this.updateAnimationFrame);
  },
  beforeDestroy() {
    this.flyingWords.stop();
    window.cancelAnimationFrame(this.rafId);
    this.rafId = null;
  },
  methods: {
    updateAnimationFrame() {
      // eventually update canvas context here
      this.flyingWords.update(this.wordElements);
      this.rafId = window.requestAnimationFrame(this.updateAnimationFrame);
    },
    onClickWord(word) {
      if (this.disableTouchEvents) return;
      
      // console.log(`clicked ${word.text} with score ${word.score}`);
      const displayedWords = this.flyingWords.getDisplayedWords();
      this.flyingWords.disableWord(word, this.wordElements);
      this.$emit('click', word, displayedWords);

      /*
      if (word.score < 0) {
        document.body.classList.add('bad-word-glow');
        setTimeout(() => {
          document.body.classList.remove('bad-word-glow');
        }, 500);
      }
      */
    },
    onExplodingAnimationEnd(word) {
      this.flyingWords.enableWord(word, this.wordElements);
    },
  },
};
</script>