<template>
  <div class="multislider">
    <svg
      :width="sliders * 30" height="100"
      :viewBox="`0 0 ${sliders * 30} 100`">
      <template v-for="(s, i) in layoutVars">
        <rect class="bg"
          v-bind:class="{
            disabled: disabled.indexOf(i) !== -1,
            // disabled.indexOf(i) !== -1 ? 'disabled' : '',
            blinking: blinking[i],
            // blinking.indexOf(i) !== -1 ? 'blinking' : '',
          }"
          :ref="`bg-${i}`"
          :x="s.x"
          :y="s.y"
          :width="s.width"
          :height="s.height"
        />
      </template>
      <template v-for="(s, i) in layoutVars">
        <rect class="fg"
          v-bind:class="{
            disabled: disabled.indexOf(i) !== -1,
            // disabled.indexOf(i) !== -1 ? 'disabled' : '',
            blinking: blinking[i],
            // blinking.indexOf(i) !== -1 ? 'blinking' : '',
          }"
          :ref="`fg-${i}`"
          :x="s.x"
          :y="(s.height + s.y) - (sliderValues[i] * s.height)"
          :width="s.width"
          :height="sliderValues[i] * s.height"
        />
      </template>
    </svg>
  </div>
</template>

<script>
export default {
  props: [ 'sliders', 'disabledSliders', 'disableTouchEvents' ],
  data() {
    return {
      sliderValues: [],
      blinking: [],
      prevTouch: null, 
    };
  },
  computed: {
    layoutVars() {
      const spacer = 0;
      const width = this.sliders * 30;
      const sliderWidth = (width - (this.sliders + 1) * spacer) / this.sliders;
      const height = 100;
      const sliderHeight = height - 2 * spacer;

      const sliders = [];
      for (let i = 0; i < this.sliders; i++) {
        sliders.push({
          x: (i + 1) * spacer + i * sliderWidth,
          y: spacer,
          width: sliderWidth,
          height: sliderHeight,
        });
      }
      return sliders;
    },
    sliderElements() {
      const res = [];
      for (let i = 0; i < this.sliders; i++) {
        const bg = this.$refs[`bg-${i}`][0];
        const fg = this.$refs[`fg-${i}`][0];
        res.push({ bg, fg });
      }
      return res;
    },
    disabled() {
      let res = [];
      if (Array.isArray(this.disabledSliders)) {
        res = this.disabledSliders;
      }
      return res;
    },
  },
  created() {
    for (let i = 0; i < this.sliders; i++) {
      this.sliderValues.push(0);
      this.blinking.push(false);
    }
    this.sliderValues = [...this.sliderValues];
    this.blinking = [...this.blinking];
  },
  mounted() {
    document.body.addEventListener('touchstart', this.onTouchEvent);
    document.body.addEventListener('touchmove', this.onTouchEvent);
    document.body.addEventListener('touchend', this.onTouchEnd);    
  },
  beforeDestroy() {
    document.body.removeEventListener('touchstart', this.onTouchEvent);
    document.body.removeEventListener('touchmove', this.onTouchEvent);
    document.body.removeEventListener('touchend', this.onTouchEnd);
  },
  methods: {
    getValueIfInside(x, y, rect) {
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        const h = rect.bottom - rect.top;
        return 1 - (y - rect.top) / h;
      }
      return -1;
    },
    onTouchEnd(e) {
      // console.log('ending touch');
      this.prevTouch = null;
    },
    onTouchEvent(e) {
      e.preventDefault();
      if (this.disableTouchEvents) return;

      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      let slider = null;

      // check if we are in a slider
      this.sliderElements.forEach((s, i) => {
        if (Array.isArray(this.disabled) && this.disabled.indexOf(i) === -1) {
          const rect = s.bg.getBoundingClientRect();
          const val = this.getValueIfInside(x, y, rect);

          if (val !== -1) {
            slider = i;
            this.sliderValues[i] = val;
            this.sliderValues = [...this.sliderValues];
            this.$emit('change', i, val);
          }
        }
      });

      // if we were in a slider ...
      if (this.prevTouch && this.prevTouch.s !== null) {
        // ... and we are not anymore
        if (slider === null) {
          const i = this.prevTouch.s;
          let val = this.sliderValues[i];
          const s = this.sliderElements[i];
          const rect = s.bg.getBoundingClientRect();

          if (y > rect.bottom) {
            val = 0;
          } else if (y < rect.top) {
            val = 1;
          }

          this.sliderValues[i] = val;
          this.sliderValues = [...this.sliderValues];
          this.$emit('change', i, val);
        // ... and we enter a new one
        } else if (slider !== this.prevTouch.s) {
          // BLINK AND / OR PLAY SOUND
          // console.log('entering new slider');
          this.blinkSlider(slider);
        }
      }

      // if we touch a new slider
      if (!this.prevTouch && slider !== null) {
        // BLINK AND / OR PLAY SOUND
        // console.log('touching new slider');
        this.blinkSlider(slider);
      }

      // update prev touch information :
      this.prevTouch = { x, y, s: slider };
    },
    async blinkSlider(slider) {
      // solution found here :
      // https://github.com/vuejs/vue/issues/11338#issuecomment-618341624
      this.blinking.forEach((item, i) => {
        this.blinking[i] = false;
      });
      this.blinking = [...this.blinking];

      await this.$nextTick();

      requestAnimationFrame(() => {
        this.blinking[slider] = true;
        this.blinking = [...this.blinking];
      });
    }
  },
};
</script>