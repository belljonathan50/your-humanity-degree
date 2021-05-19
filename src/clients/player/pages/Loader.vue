<template>
  <div>
    <div class="flex-container flex-grow-noshrink" style="height: 50%;">
      <div class="title">
        Your humanity degree
      </div>
    </div>
    <div class="flex-container flex-grow-noshrink" style="height: 50%;">

      <template v-if="!started">
        <button
          @click="onStart"
          style="
            color: white;
            border: 1px solid white;
            border-radius: 0;
            font-size: 1.4em;
            line-height: 1em;
            padding: .5em 1em;
            background: rgba(255,255,255,0.1);
          ">
          play
        </button>
      </template>

      <template v-else>
        <div style="width: 30%;">
          <svg
            viewBox="-1 -1 102 102"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            fill="none">
            <path :d="`
              M 100 50
              A 50 50 0 ${largeArc} ${sweep} ${endx} ${endy}
            `"/>
          </svg>
        </div>
        <div style="margin-top: 1.4em;"> Loading music, please wait ... </div>
      </template>
    </div>
  </div>
</template>

<script>
const pi2 = Math.PI * 2;
const pi3 = Math.PI * 3;
const pi4 = Math.PI * 4;

export default {
  props: [ 'color' ],
  data() {
    return {
      started: false,
      largeArc: 0,
      sweep: 0,
      endx: 100,
      endy: 50,
      rafId: null,
      speed: Math.PI, // in radians per second
      angle: 0,
    };
  },
  beforeDestroy() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  },
  methods: {
    async onStart() {
      this.started = true;

      /*
      if (!this.$experience.audioBufferLoader.data.score) {
        this.lastDate = Date.now();
        this.rafId = requestAnimationFrame(this.updateAnimationFrame);

        await this.$experience.audioBufferLoader.load({
          score: 'sounds/score/score.mp3',
        });
      }
      //*/

      if (!this.$experience.scorePlayer) {
        this.lastDate = Date.now();
        this.rafId = requestAnimationFrame(this.updateAnimationFrame);

        this.$experience.scorePlayer = new Audio('sounds/score/score.mp3');
        this.$experience.scorePlayer.loop = false;
        // we can eventually adjust volume :
        // this.audio.volume = 0.5;
        const p = new Promise(async (resolve, reject) => {

          this.$experience.scorePlayer.addEventListener('canplaythrough', async event => {
            console.log('we should be able to play through whole score, we might start now');
            // this.audio.play();
            resolve();
          });
        });

        // mandatory on safari
        // see https://stackoverflow.com/questions/49792768/js-html5-audio-why-is-canplaythrough-not-fired-on-ios-safari
        this.$experience.scorePlayer.load();
        
        await p;
      // } else {
      //   this.audio.pause();
      //   this.audio.currentTime = 0;
      //   this.audio.play();
      }

      await this.$experience.playerState.set({ started: true });
    },
    updateAnimationFrame() {
      // do stuff
      const now = Date.now();
      const delta = now - this.lastDate;
      const deltaAngle = delta * this.speed / 1000;

      this.angle += deltaAngle;

      if (this.angle >= pi4) {
        this.angle = this.angle - Math.floor(this.angle / pi4) * pi4;
      }

      this.endx = Math.cos(this.angle) * 50 + 50;
      this.endy = Math.sin(this.angle) * -50 + 50;

      if (this.angle < pi2) {
        this.sweep = 0;
        this.largeArc = this.angle < Math.PI ? 0 : 1;
      } else {
        this.sweep = 1;
        this.largeArc = this.angle < pi3 ? 1 : 0;
      }

      this.lastDate = now;
      this.rafId = requestAnimationFrame(this.updateAnimationFrame);
    },
  },
};
</script>