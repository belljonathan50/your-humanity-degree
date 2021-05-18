<template>
  <div class="survey" ref="survey">
    <div
      style="
        position: absolute;
        width: 100%;
        padding: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
      <div class="instruction" v-html="title"></div>
    </div>

    <div v-for="(item, i) in data" class="flex-grow-noshrink">
      <transition name="slide">
        <div class="item-wrapper" v-if="show === i">
          <div class="item">
            <div class="question"> {{ item.question }} </div>
            <div class="answers">
              <div class="answer" v-for="(answer, j) in item.answers"
                :set="uid = `${i}-${j}`">
                <input type="radio" 
                  :ref="uid" :id="uid" :name="item.question" :value="answer[1]"
                  @change="onAnswerClicked(i, j)">
                <div class="input-radio-substitute"></div>
                <label :for="uid"> {{ answer[0] }} </label>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'title', 'data', 'offset' ],
  data() {
    return {
      // show: 0,
      currentItem: 0,
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
    show() {
      return (this.currentItem + this.offset) % this.data.length;
    },
  },
  async mounted() {
    // do something ?
  },
  methods: {
    onAnswerClicked(i, j) {
      const item = this.data[i];

      let min = +Infinity;
      let max = -Infinity;

      item.answers.forEach(a => {
        const score = a[1];
        min = score < min ? score : min;
        max = score > max ? score : max;
      });

      const score = item.answers[j][1];
      this.$emit('click', { score, min, max });

      const transDur = document.body.style.getPropertyValue('--survey-transition-duration');

      if (min === max || (score !== min && score !== max)) {
        this.$refs.survey.style.setProperty('--transition-duration', transDur);
        this.$refs.survey.style.setProperty('--fg-color', 'white');
        this.$refs.survey.style.setProperty('--bg-color', 'black');
      } else  if (score === min) {
        this.$refs.survey.style.setProperty('--transition-duration', 0);
        this.$refs.survey.style.setProperty('--fg-color', 'white');
        this.$refs.survey.style.setProperty('--bg-color', 'black');

        document.body.classList.add('blink');
        setTimeout(() => {
          document.body.classList.remove('blink');
        }, 500);
      } else if (score === max) {
        const hue = Math.random() * 360;
        const fontColor = (hue >= 30 && hue <= 190) ? 'black' : 'white';

        const transDur = document.body.style.getPropertyValue('--survey-transition-duration');
        this.$refs.survey.style.setProperty('--transition-duration', transDur);
        this.$refs.survey.style.setProperty('--fg-color', fontColor);
        this.$refs.survey.style.setProperty('--bg-color', `hsl(${hue}, 100%, 50%)`);        
      }

      setTimeout(() => {
        // this.currentItem++;
        this.currentItem = (this.currentItem + 1) % this.data.length;
      }, 500);
    },
  },
};
</script>