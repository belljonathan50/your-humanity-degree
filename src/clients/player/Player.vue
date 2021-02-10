<template>
  <div id="main-container">
    <div class="page-wrapper">
      <transition name="fade">
        <component :is="currentPage" />
        </component>
      </transition>
    </div>
    <toast
      v-bind:class="{ hidden: !showToast }"
      :content="toastMessage"
    />
  </div>
</template>

<script>
import './pages';
import flyingWords from '../../server/data/flying-words';
import Toast from './components/Toast.vue';

export default {
  components: { Toast },
  data() {
    return {
      currentPage: null,
      showToast: false,
      toastMessage: '',
      globalState: this.$experience.states.globals,
      playerState: this.$experience.playerState,
    };
  },
  async mounted() {
    this.globalState.subscribe(async updates => {
      if (updates.hasOwnProperty('currentPage')) {
        this.currentPage = updates.currentPage;
      }

      if (updates.hasOwnProperty('showToast')) {
        this.showToast = updates.showToast;
      }

      if (updates.hasOwnProperty('toastMessage')) {
        this.toastMessage = updates.toastMessage;
      }

      if (updates.hasOwnProperty('connectedClients')) {
        console.log(`connected clients : ${updates.connectedClients}`);
      }
    });

    await this.playerState.set({ unselectedFlyingWords: flyingWords });

    const {
      currentPage,
      showToast,
      toastMessage,
      connectedClients
    } = this.globalState.getValues();

    this.currentPage = currentPage;
    this.showToast = showToast;
    this.toastMessage = toastMessage;
    // console.log(`connected clients : ${connectedClients}`);

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
  },
};
</script>
