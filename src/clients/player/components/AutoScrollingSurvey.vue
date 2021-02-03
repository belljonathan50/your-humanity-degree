<template>
  <div class="survey-wrapper" ref="surveyWrapper">
  <div class="survey" ref="survey">
    <div class="item" v-for="(item, i) in data">
      <div class="question"> {{ item.question }} </div>
      <div class="answers">
        <div class="answer" v-for="(answer, j) in item.answers"
          :set="uid = `${i}-${j}`">
          <input type="radio" 
            :ref="uid" :id="uid" :name="item.question" :value="answer[1]"
            @change="onRadioItemChanged(i, j, answer[1])">
          <div class="input-radio-substitute"></div>
          <label :for="uid"> {{ answer[0] }} </label>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>  
export default {
  props: ['data'],
  data() {
    return {
      rafId: null,
      totalScore: 0,
      viewHeight: 0,
      contentHeight: 0,
      yoffset: 0,
      lastUpdate: 0,
      speed: 30, // px/sec
    };
  },
  computed: {
    items() {
      const res = [];
      this.data.forEach((q, i) => {
        q.answers.forEach((a, j) => {
          // each ref is a single element array due to v-for directive :
          const item = this.$refs[`${i}-${j}`][0];
          res.push(item);
        });
      });
      return res;
    },
  },
  async mounted() {
    this.lastUpdate = Date.now();
    this.rafId = window.requestAnimationFrame(this.updateAnimationFrame);

    // see nnjeim's answer in
    // https://forum.vuejs.org/t/how-to-watch-the-height-change-dom-of-an-element-in-vuejs/21290/3
    await this.$nextTick(); // wait for the item list to render (?)
    this.viewHeight = this.$refs.surveyWrapper.clientHeight;
    this.contentHeight = this.$refs.survey.clientHeight;
    this.yoffset = this.viewHeight;
  },
  // this hook has been replaced by "beforeUnmount" in vuejs 3 :
  beforeDestroy() {
    window.cancelAnimationFrame(this.rafId);
    this.rafId = null;
  },
  methods: {
    // for some reason this method has to be async to not throw an error when
    // invoked from parent with "this.$refs.survey.setSpeed(x)"
    // (still working despite of throwing an error, though)

    // in pixels per second
    // todo : change to screens per second ?
    async setSpeed(newSpeed) {
      this.speed = newSpeed;
    },
    updateAnimationFrame() {
      const now = Date.now();
      const delta = now - this.lastUpdate;
      this.lastUpdate = now;

      this.$refs.survey.style.top = `${this.yoffset}px`;
      this.yoffset -= this.speed * delta * 0.001;

      if (this.yoffset < -this.contentHeight) return;

      this.rafId = window.requestAnimationFrame(this.updateAnimationFrame);
    },
    onRadioItemChanged(i, j, newScore) {
      const previousScore = this.totalScore;

      this.totalScore = this.items.reduce((acc, item) => {
        return item.checked ? acc + Number(item.value) : acc;
      }, 0);

      const deltaScore = this.totalScore - previousScore;

      this.$emit('change', {
        q: i,
        a: j,
        newScore,
        deltaScore,
        totalScore: this.totalScore
      });
    },
  },
};
</script>