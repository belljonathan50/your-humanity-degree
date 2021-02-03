<template>
  <div id="main-container">
    <div class="page-wrapper">
      <transition name="fade">
        <component :is="currentPage" />
        </component>
      </transition>
    </div>
    <toast
      :class="showToast ? '' : 'hidden'"
      :content="toastContent"
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
      toastContent: 'yaboodabidoo',
      globalState: this.$experience.states.globals,
      playerState: this.$experience.playerState,
    };
  },
  async mounted() {
    this.globalState.subscribe(async updates => {
      if (updates.hasOwnProperty('currentPage')) {
        this.currentPage = updates.currentPage;
      }

      if (updates.hasOwnProperty('toastContent')) {
        this.toastContent = updates.toastContent;
      }

      if (updates.hasOwnProperty('connectedClients')) {
        console.log(`connected clients : ${updates.connectedClients}`);
      }
    });

    await this.playerState.set({ unselectedFlyingWords: flyingWords });

    const { currentPage, toastContent, connectedClients } = this.globalState.getValues();    
    this.currentPage = currentPage;
    console.log(`connected clients : ${connectedClients}`);
    // this.toastContent = toastContent;

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
