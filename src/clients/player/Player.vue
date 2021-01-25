<template>
  <div id="main-container">
    <transition name="fade">
      <component :is="currentPage" />
      </component>
    </transition>
  </div>
</template>

<script>
import './pages';
import flyingWords from '../../server/data/flying-words';

export default {
  data() {
    return {
      currentPage: null,
      globalState: this.$experience.states.globals,
      playerState: this.$experience.playerState,
    };
  },
  async mounted() {
    this.globalState.subscribe(async updates => {
      if (updates.currentPage) {
        this.currentPage = updates.currentPage;
      }
    });

    await this.playerState.set({ unselectedFlyingWords: flyingWords });

    const { currentPage } = this.globalState.getValues();    
    this.currentPage = currentPage;

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
