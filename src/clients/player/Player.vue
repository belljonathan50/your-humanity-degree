<template>
  <div id="main-container">
    <div class="page-wrapper">
      <transition name="fade">
        <component :is="currentPage" />
      </transition>
    </div>
    <toast
      v-bind:class="{ hidden: !showToast || !liveMode }"
      :content="toastMessage"
    />
    <notification
      v-bind:class="{ hidden: !showNotification }"
      :content="notificationMessage"
    />
  </div>
</template>

<script>
import './pages';
import { flyingWords } from '../../server/data';
import Timeline from './utils/Timeline';
import SimpleSampler from './utils/SimpleSampler';
import Notification from './components/Notification.vue';
import Toast from './components/Toast.vue';

const timeline = new Timeline();

export default {
  components: { Notification, Toast },
  data() {
    return {
      // started: false, // for automatic mode
      liveMode: false,
      currentPage: null,
      // showLoader: false,
      showToast: false,
      toastMessage: '',
      showNotification: false,
      notificationMessage: '',
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
      this.$experience.gameState = await this.client.stateManager.create('games');
    }

    // make gameState available to all components :

    this.gameState = this.$experience.gameState;

    ////////// live mode subscription (in case we want to display a message) :

    this.liveModeState.subscribe(async updates => {
      if (updates.hasOwnProperty('liveMode')) {
        // this.liveMode = updates.liveMode;
      }
    });

    ////////// global parameters subscriptions :

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

    ////////// game parameters subscriptions :

    this.gameState.subscribe(async updates => {
      if (updates.hasOwnProperty('currentPage')) {
        this.currentPage = updates.currentPage;
      }

      if (updates.hasOwnProperty('hideNotificationDelay')) {
        this.hideNotificationDelay = updates.hideNotificationDelay;
      }

      if (updates.hasOwnProperty('showNotification')) {
        this.showNotification = updates.showNotification;
      }

      if (updates.hasOwnProperty('notificationMessage')) {

        if (this.notificationTimeout) {
          clearTimeout(this.notificationTimeout);
          this.notificationTimeout = null;
        };

        this.notificationMessage = updates.notificationMessage;
        this.showNotification = true;

        if (this.hideNotificationDelay >= 0) {
          this.notificationTimeout = setTimeout(() => {
            this.showNotification = false;
          }, this.hideNotificationDelay);
        }
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
      const { hideNotificationDelay } = this.gameState.getValues();

      this.hideNotificationDelay = hideNotificationDelay;

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

    document.body.addEventListener(
      'touchmove',
      this.preventTouchEvents,
      { passive: false }
    );
  },
  beforeDestroy() {
    document.body.removeEventListener(
      'touchmove',
      this.preventTouchEvents,
      { passive: false }
    );
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

      this.$experience.scorePlayer.currentTime = 0;
      this.$experience.scorePlayer.play();
      // const musicPlayer = new SimpleSampler(this.$experience.audio.audioContext);
      // const buffer = this.$experience.audioBufferLoader.data.score;
      // musicPlayer.play(buffer);

      timeline.on('finished', async () => {
        this.$experience.scorePlayer.pause();
        // musicPlayer.stop();

        // this.started = false;
        // this.showLoader = true;
        await this.playerState.set({ started: false });
        await this.gameState.set({ currentPage: 'loader' });
      });
    },
  },
};
</script>
