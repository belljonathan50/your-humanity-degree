<template>
  <div>
    <div
      v-for="(letter, i) in splitWord"
      :style="{
        display: 'inline-block',
        transform: `translate(${current[i].x}px, ${current[i].y}px)`,
        opacity: `${current[i].opacity}`,
      }"
    >{{letter}}</div>
  </div>
</template>

<script>
export default {
  props: ['word'],
  data() {
    return {
      startDate: 0,
      duration: 1000,
      rafId: null,
      splitWord: [],
      src: [],
      dst: [],
      current: [],
    };
  },
  created() {
    const minX = -100;
    const maxX = 100;
    const minY = -100;
    const maxY = 100;

    const deltaX = maxX - minX;
    const deltaY = maxY - minY;

    this.splitWord = Array.from(this.word);

    for (let i = 0; i < this.splitWord.length; i++) {
      const initialState = {
        opacity: 1,
        x: 0,
        y: 0,
      };

      this.src.push({...initialState});
      this.current.push({...initialState});

      this.dst.push({
        opacity: 0,
        x: Math.random() * deltaX + minX,
        y: Math.random() * deltaY + minY,
      });
    }
  },
  mounted() {
    this.startDate = Date.now();
    this.rafId = window.requestAnimationFrame(this.updateAnimationFrame);
  },
  beforeDestroy() {
    window.cancelAnimationFrame(this.rafId);
  },
  methods: {
    updateAnimationFrame() {
      const frac = (Date.now() - this.startDate) / this.duration;
      if (frac <= 1) {
        for (let i = 0; i < this.splitWord.length; i++) {
          const src = this.src[i];
          const dst = this.dst[i];
          this.current[i] = {
            opacity: frac * (dst.opacity - src.opacity) + src.opacity,
            x: Math.floor(frac * (dst.x - src.x) + src.x),
            y: Math.floor(frac * (dst.y - src.y) + src.y),
          };
        }
        this.rafId = window.requestAnimationFrame(this.updateAnimationFrame);
        this.current = [...this.current];
      } else {
        this.current = this.dst;
        this.current = [...this.current];
        this.$emit('end');
      }
    }
  },
};
</script>