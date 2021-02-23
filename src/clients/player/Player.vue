<template>
  <div id="main-container">
    <div class="page-wrapper">
      <transition name="fade">
        <component :is="currentPage" />
        <!-- </component> -->
      </transition>
    </div>
    <!--
    <music-loader
      :started="started"
      :style="{ visibility: showLoader ? 'visible' : 'hidden' }"
      @start="onStart"
    />
    -->
    <toast
      v-bind:class="{ hidden: !showToast || !liveMode }"
      :content="toastMessage"
    />
  </div>
</template>

<script>
import './pages';
import flyingWords from '../../server/data/flying-words';
import Timeline from './utils/Timeline';
import SimpleSampler from './utils/SimpleSampler';
import Toast from './components/Toast.vue';

const timeline = new Timeline();

export default {
  components: { Toast },
  data() {
    return {
      // started: false, // for automatic mode
      liveMode: false,
      currentPage: null,
      // showLoader: false,
      showToast: false,
      toastMessage: '',
      client: this.$experience.client,
      liveModeState: this.$experience.liveModeState,
      globalState: this.$experience.globalState,
      playerState: this.$experience.playerState,
      gameState: null,
    };
  },
  async mounted() {
    const { liveMode } = this.liveModeState.getValues();
    this.liveMode = liveMode;

    if (this.liveMode) {
      this.$experience.gameState = await this.client.stateManager.attach('games');
    } else {
      // display loader spinner here (please wait while loading instrumental score ...)
      this.$experience.gameState = await this.client.stateManager.create('games');

      // this.showLoader = true;
      // also load instrumental score mp3 here !
    }

    // make gameState available to all components :
    this.gameState = this.$experience.gameState;

    // live mode subscription in cas we want to display a message :
    this.liveModeState.subscribe(async updates => {
      if (updates.hasOwnProperty('liveMode')) {
        // this.liveMode = updates.liveMode;
      }
    });

    // global parameters subscriptions :
    this.globalState.subscribe(async updates => {
      if (updates.hasOwnProperty('showToast')) {
        this.showToast = updates.showToast;
      }

      if (updates.hasOwnProperty('toastMessage')) {
        this.toastMessage = updates.toastMessage;
      }

      if (updates.hasOwnProperty('connectedClients')) {
        // console.log(`connected clients : ${updates.connectedClients}`);
      }
    });

    this.gameState.subscribe(async updates => {
      if (updates.hasOwnProperty('currentPage')) {
        this.currentPage = updates.currentPage;
      }

      if (updates.hasOwnProperty('started')) {
        if (updates.started === true) {
          this.onStart();
        }
      }
    });

    await this.playerState.set({ unselectedFlyingWords: flyingWords });

    if (this.liveMode) {
      const {
        showToast,
        toastMessage,
        connectedClients
      } = this.globalState.getValues();

      const { currentPage } = this.gameState.getValues();

      this.currentPage = currentPage;
      this.showToast = showToast;
      this.toastMessage = toastMessage;
    } else {
      this.playerState.subscribe(async updates => {
        if (updates.started === true) {
          this.onStart();
        }
      });

      await this.gameState.set({ currentPage: 'loader' });
    }

    // in case we'd like to use simple sockets
    // (see also commented snippet in server/ControllerExperience.js) :
    // this.$experience.client.socket.addListener('liveMode', data => console.log(data));

    document.body.addEventListener('touchmove', this.preventTouchEvents, {
      passive: false
    });
  },
  beforeDestroy() {
    document.body.removeEventListener('touchmove', this.preventTouchEvents, {
      passive: false
    });
  },
  methods: {
    // see :
    // https://stackoverflow.com/questions/9251590/prevent-page-scroll-on-drag-in-ios-and-android
    preventTouchEvents(e) {
      e.preventDefault();
    },
    async onStart() {
      // this.started = true;

      // if (!this.$experience.audioBufferLoader.data.score) {
      //   await this.$experience.audioBufferLoader.load({
      //     score: 'sounds/score/score.mp3',
      //   });
      // }

      await this.$experience.gameState.set({ currentPage: 'welcome' });
      this.currentPage = this.$experience.gameState.getValues().currentPage;

      // this.showLoader = false;

      // inline delay :
      // see https://www.geeksforgeeks.org/how-to-delay-a-loop-in-javascript-using-async-await-with-promise/
      await (() => new Promise(resolve => setTimeout(() => {resolve()}, 5000)))();

      timeline.setState(this.gameState);
      timeline.start();

      const musicPlayer = new SimpleSampler(this.$experience.audio.audioContext);
      const buffer = this.$experience.audioBufferLoader.data.score;
      musicPlayer.play(buffer);

      timeline.on('finished', async () => {
        musicPlayer.stop();
        // this.started = false;
        // this.showLoader = true;
        await this.playerState.set({ started: false });
        await this.gameState.set({ currentPage: 'loader' });
      });
    },
  },
};
</script>
