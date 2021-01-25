<template>
  <div class="multislider">
    <svg :width="sliders * 30" height="100" :viewBox="`0 0 ${sliders * 30} 100`">
      <template v-for="(s, i) in layoutVars">
        <rect class="bg"
          :ref="`bg-${i}`"
          :x="s.x"
          :y="s.y"
          :width="s.width"
          :height="s.height"
        />
        <rect class="fg"
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
  props: [ 'sliders' ],
  data() {
    return {
      handleHeight: 5,
      sliderValues: [],
    };
  },
  computed: {
    layoutVars() {
      const spacer = 2;
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
  },
  created() {
    for (let i = 0; i < this.sliders; i++) {
      this.sliderValues.push(0);
    }
    this.sliderValues = [...this.sliderValues];
  },
  mounted() {
    // document.body.addEventListener('touchstart', this.onTouchStart);
    // document.body.addEventListener('touchmove', this.onTouchMove);
    // document.body.addEventListener('touchend', this.onTouchEnd);    
    document.body.addEventListener('touchstart', this.onTouchEvent);
    document.body.addEventListener('touchmove', this.onTouchEvent);
  },
  beforeDestroy() {
    // document.body.removeEventListener('touchstart', this.onTouchStart);
    // document.body.removeEventListener('touchmove', this.onTouchMove);
    // document.body.removeEventListener('touchend', this.onTouchEnd);
    document.body.removeEventListener('touchstart', this.onTouchEvent);
    document.body.removeEventListener('touchmove', this.onTouchEvent);
  },
  methods: {
    getValueIfInside(x, y, slider) {
      var rect = slider.bg.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        const h = rect.bottom - rect.top;
        return 1 - (y - rect.top) / h;
      }
      return -1;
    },
    onTouchEvent(e) {
      e.preventDefault();
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      this.sliderElements.forEach((s, i) => {
        const val = this.getValueIfInside(x, y, s);
        if (val !== -1) {
          this.sliderValues[i] = val;
          this.sliderValues = [...this.sliderValues];
          this.$emit('change', i, val);
          // this.$emit('change', this.sliderValues);
        }
      });
    },
    // onTouchStart(e) {
    // },
    // onTouchMove(e) {
    // },
    // onTouchEnd(e) {
    // },
  },
};
</script>