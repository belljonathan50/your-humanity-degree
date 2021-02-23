<template>
  <div class="pads">
    <svg
      :width="layoutVars.width"
      :height="layoutVars.height"
      :viewBox="`0 0 ${layoutVars.width} ${layoutVars.height}`">
      <path :d="layoutVars.path" />
      <rect
        v-for="(pad, i) in layoutVars.pads"
        :ref="`pad-${i}`"
        :x="pad.x" :y="pad.y" :width="pad.size" :height="pad.size"
        v-bind:class="[
          disabledPads.indexOf(i) !== -1 ? 'disabled' : '',
          enabledStroke ? 'enabled-stroke' : '',
          disabledStroke ? 'disabled-stroke' : '',
          enabledFill ? 'enabled-fill' : '',
          disabledFill ? 'disabled-fill' : '',
        ]"
      />
    </svg>

    <div v-if="Array.isArray(words)" class="pad-words-wrapper">
    <div class="pad-words"
      :style="`
        grid-template-columns: repeat(${columns}, 1fr);
      `">
      <!--
      right formatting found here :
      https://stackoverflow.com/questions/48381670/vuejs-transform-rotate-style-inline
      -->
      <div
        v-for="(pad, i) in layoutVars.pads"
        :style="{
          // 'font-size': `${1.5 * pad.size / pad.word.text.length}vw`,
          // 'font-size': `${Math.random() + 1}rem`,
          'font-size': '1rem',
          'line-height': '1rem',
          'grid-column': `${Math.floor(i % columns) + 1}`,
          'grid-row': `${Math.floor(i / columns) + 1}`,
          transform: `translate(
            ${(pad.offsetX + (layoutVars.padSize - pad.size) * 0.5) * (100 / layoutVars.padSize)}%,
            ${(pad.offsetY + (layoutVars.padSize - pad.size) * 0.5) * (100 / layoutVars.padSize)}%
          )`,
        }"
      >
        <div
          :style="{
            width: `${100 * pad.size / layoutVars.padSize}%`,
            height: `${100 * pad.size / layoutVars.padSize}%`,
          }"
        >
        <div>
          {{ disabledPads.indexOf(i) === -1 ? pad.word.text : '' }}
        </div>
        </div>
      </div>
    </div>
    </div>
  </div>  
</template>

<script>
import PadAnimator from '../utils/PadAnimator';
import SimpleSampler from '../utils/SimpleSampler';

export default {
  props: [
    'columns',
    'rows',
    'disableTouchEvents',
    'disableTouchMove',
    'defaultPadTransforms',
    'disablePadAnimations',
    'disabledPads',
    'padSamples',
    'enabledStroke',
    'disabledStroke',
    'enabledFill',
    'disabledFill',
    'words',
  ],
  data() {
    return {
      rafId: null,
      audioPlayers: [],
      padTransforms: [],
      padAnimators: [],
    };
  },
  computed: {
    layoutVars() {
      const spacer = 2;
      const width = 100;
      const padSize = (width - spacer * (this.columns + 1)) / this.columns;
      const height = (this.rows + 1) * spacer + this.rows * padSize;
      const pads = [];
      // see cuixiping's answer in :
      // https://stackoverflow.com/questions/3742479/how-to-cut-a-hole-in-an-svg-rectangle
      // first we create the surface
      let path = `M0 0 h${width} v${height} h-${width}z`; // clockwise
      // then we add holes in the surface      
      for (let r = 0; r < this.rows; r++) {
        for (let k = 0; k < this.columns; k++) {
          let { scale, offsetX, offsetY } = this.padTransforms[r * this.columns + k];
          const actualPadSize = padSize * scale;          
          const scaleOffset = (padSize - actualPadSize) * 0.5; // padSize - padSize * scale
          // compute actual offsets from [-1, 1] values so that they never go out of the max pad size
          offsetX *= scaleOffset;
          offsetY *= scaleOffset;

          const x = (k + 1) * spacer + k * padSize + offsetX + scaleOffset;
          const y = (r + 1) * spacer + r * padSize + offsetY + scaleOffset;
          path += ` M${x} ${y} v${actualPadSize} h${actualPadSize} v-${actualPadSize}z`; // anticlockwise
          pads.push({ x, y, offsetX, offsetY, size: actualPadSize }); // and we also return vars to create the svg rectangles
        }
      }

      if (Array.isArray(this.words)) {
        pads.forEach((pad, i) => {
          pad.word = this.words[i];
        });
      }

      return { width, height, padSize, path, pads };
    },
    padElements() {
      const res = [];
      for (let i = 0; i < this.columns * this.rows; i++) {
        res.push(this.$refs[`pad-${i}`][0]); // we get a 1 item array due to v-for
        res[i].padIsDisabled = this.disabledPads.indexOf(i) !== -1;
      }
      return res;
    },
  },
  created() {
    const nPads = this.columns * this.rows;
    for (let i = 0; i < nPads; i++) {
      this.audioPlayers.push(new SimpleSampler(this.$experience.audio.audioContext));
      this.padTransforms.push({
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        // scale: Math.random() * 0.5 + 0.5,
        // offsetX: (Math.random() - 0.5) * 2,
        // offsetY: (Math.random() - 0.5) * 2,
      });
      this.padAnimators.push(new PadAnimator());
    }

    if (Array.isArray(this.defaultPadTransforms)) {
      // console.log(this.defaultPadTransforms);
      this.defaultPadTransforms.forEach((transform, i) => {
        this.padTransforms[i] = transform;
      });
    }    
  },
  mounted() {
    document.body.addEventListener('touchstart', this.onTouchStart);
    document.body.addEventListener('touchmove', this.onTouchMove);
    document.body.addEventListener('touchend', this.onTouchEnd);

    this.rafId = window.requestAnimationFrame(this.updateAnimationFrame);
  },
  // looks like this hook doesn't exist in vue 3 anymore
  // todo : find replacement
  // update : there is a beforeUnmount instead
  beforeDestroy() {
    document.body.removeEventListener('touchstart', this.onTouchStart);
    document.body.removeEventListener('touchmove', this.onTouchMove);
    document.body.removeEventListener('touchend', this.onTouchEnd);

    window.cancelAnimationFrame(this.rafId);
    this.rafId = null;

    // this.$emit('padTransforms', this.padTransforms);
  },
  methods: {
    play(padIndex) {
      // start sample
      if (Array.isArray(this.padSamples) && this.padSamples[padIndex]) {
        const buffer = this.$experience.audioBufferLoader.data[this.padSamples[padIndex]];
        this.audioPlayers[padIndex].play(buffer);
      }
    },
    stop(padIndex) {
      // stop sample ?
    },
    isInside(x, y, pad) {
      var rect = pad.getBoundingClientRect();
      return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;      
    },
    updateAnimationFrame() {
      // do the stuff
      let moved = false;
      this.padAnimators.forEach((animator, i) => {
        if (animator.update(this.padTransforms[i])) { moved = true; }
      });

      if (moved) {
        this.padTransforms = [...this.padTransforms];
        this.$emit('padTransforms', this.padTransforms);
      }

      this.rafId = window.requestAnimationFrame(this.updateAnimationFrame);
    },
    onTouchStart(e) {
      e.preventDefault();
      if (this.disableTouchEvents) return;

      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      for (let i = 0; i < this.padElements.length; i++) {
        const p = this.padElements[i];
        if (this.isInside(x, y, p) && !p.padIsDisabled) {
          p.padIsActive = true;
          p.classList.add('active');
          this.$emit('click', i);
          this.play(i);

          if (!this.disablePadAnimations) {
            setTimeout(() => {
              this.padAnimators[i].start(this.padTransforms[i]);
            }, 100);
          }
        }
      }
    },
    async onTouchMove(e) {
      e.preventDefault();
      if (this.disableTouchEvents) return;
      
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      for (let i = 0; i < this.padElements.length; i++) {
        const p = this.padElements[i];
        if (this.isInside(x, y, p)) {
          if (!p.padIsActive && !p.padIsDisabled && !this.disableTouchMove) {
            p.padIsActive = true;
            p.classList.add('active');
            this.play(i);
            
            if (!this.disablePadAnimations) {
              setTimeout(() => {
                this.padAnimators[i].start(this.padTransforms[i]);
              }, 100);
            }
          }
        } else if (p.padIsActive) {
          p.padIsActive = false;
          p.classList.remove('active');
          this.stop(i);
        }
      }
    },
    onTouchEnd(e) {
      if (this.disableTouchEvents) return;
      
      for (var i = 0; i < this.padElements.length; i++) {
        const p = this.padElements[i];
        if (p.padIsActive) {
          p.padIsActive = false;
          p.classList.remove('active');
          this.stop(i);
        }
      }
    },
  }
};
</script>