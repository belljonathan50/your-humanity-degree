<template>
  <div
    style="
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    ">
    <div
      style="
        flex: 0 1 auto;
        display: flex;
        flex-direction: row;
        font-size: 2rem;
        color: white;
        background-color: black;
      ">
      <div style="flex: 1 1 auto; padding: 2rem;">
        Your Humanity Degree
      </div>
      <div style="flex: 0 1 auto; padding: 2rem;">
        live mode <input type="checkbox" @change="onModeChange" v-model="liveMode"/>
      </div>
    </div>
    <div
      style="
        font-size: 1.5rem;
        padding: 1.5rem;
        background-color: #333;
      ">
      <textarea
        rows="10"
        style="width: 100%; resize: none;"
        v-model="toastMessage">
      </textarea>
      <div id="toast-controller">
      </div>
    </div>
    <div
      style="
        flex: 1 0 auto;
        font-size: 1.5rem;
        color: black;
        background-color: #aaa;
      ">
      <tabs :pages="pages" :currentPage="currentPage" v-on:tab="onClickTab" />
      <div
        style="
          padding: 5px;
        ">
        <component :is="currentPage" />
      </div>
    </div>
  </div>
</template>

<script>
import * as controllers from '@ircam/basic-controllers';
import Tabs from './components/Tabs.vue';
import './pages';

export default {
  components: { Tabs },
  data() {
    return {
      liveModeState: this.$experience.liveModeState,
      globalState: this.$experience.globalState,
      gameState: this.$experience.gameState,
      pages: [],
      currentPage: null,
      liveMode: false,
      blinkingCursor: '<strong class="blinking-cursor">_</strong>',
      toastMessage: '',
      unsubscriptions: [],
    };
  },
  watch: {
    toastMessage(newVal, oldVal) {
      this.onMessageChange(newVal);
    },
  },
  async mounted() {
    const controls = {};

    controls.toastToggle = new controllers.Toggle({
      label: 'Toast on/off',
      default: false,
      container: '#toast-controller',
      callback: async value => {
        await this.globalState.set({ showToast: value });
      },
    });

    const unsubscribeGameState = this.gameState.subscribe(async updates => {
      if (updates.hasOwnProperty('currentPage')) {
        this.currentPage = updates.currentPage;
      }
    });

    const unsubscribeLiveModeState = this.liveModeState.subscribe(async updates => {
      if (updates.hasOwnProperty('liveMode')) {
        this.liveMode = updates.liveMode;
      }
    });

    this.unsubscriptions = [ unsubscribeGameState, unsubscribeLiveModeState ];

    this.pages = this.gameState.getSchema().currentPage.list;
    this.liveMode = this.liveModeState.getValues().liveMode;
    this.currentPage = this.gameState.getValues().currentPage;

    await this.globalState.set({ toastMessage: this.blinkingCursor });
  },
  beforeDestroy() {
    this.unsubscriptions.forEach(unsubscribe => { unsubscribe(); });
  },
  methods: {
    async onClickTab(tab) {
      await this.gameState.set({ currentPage: tab }); 
    },
    async onModeChange(e) {
      const liveMode = e.target.checked;
      await this.liveModeState.set({ liveMode });
    },
    async onMessageChange(newValue) {
      // neat solution found here :
      // https://developpaper.com/handling-line-breaks-and-spaces-in-textarea/
      let arr = [];
      const split = newValue.split('\n')
      split.forEach((item, i) => {
        const cursor = (i === (split.length - 1)) ? this.blinkingCursor : null;
        if (item !== '') {
          arr.push(`<span>${item}${cursor || ''}</span>`)
        } else {
          arr.push(`<span>${cursor || ' '}</span>`);
        }
      });
      arr[arr.length - 1]
      const toastMessage = `${arr.join('<br>')}`;//${this.blinkingCursor}`;
      // console.log(toastMessage);
      await this.globalState.set({ toastMessage });
    },
  },
};
</script>