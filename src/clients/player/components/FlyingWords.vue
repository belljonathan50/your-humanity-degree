<template>
  <div class="flying-words">
    <!-- <canvas ref="canvas"/> -->
    <div class="flying-word"
      v-for="word in words"
      :ref="word.text">
      <div @click="onClickWord(word)">
        {{ word.text }}
      </div>
    </div>
  </div>
</template>

<script>
import FlyingWords from '../utils/FlyingWords';

export default {
  props: [ 'words', 'wordSamples', 'disableTouchEvents' ],
  data() {
    return {
      rafId: null,
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
    // const { width, height } = this.layoutVars;
    const width = 100;
    const height = 100;
    const options = {
      minSpeed: height * 0.05, // per sec
      maxSpeed: height * 0.1, // per sec
      minInterval: 2, // secs
      maxInterval: 3, // secs
    };
    console.log('creating new FlyingWords class with words :');
    console.log(this.words);
    this.flyingWords = new FlyingWords(width, height, this.words, options);
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
      
      console.log(`clicked ${word.text} with score ${word.score}`);
      this.flyingWords.disableWord(word, this.wordElements);
      this.$emit('click', word);

      document.body.classList.add('blink');
      setTimeout(() => {
        document.body.classList.remove('blink');
      }, 500);
    },
  },
};
</script>