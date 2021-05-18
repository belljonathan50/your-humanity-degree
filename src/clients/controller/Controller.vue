<template>
  <div
    style="
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    ">

    <!--------------------------------- HEADER -------------------------------->
    <div
      style="
        flex: 0 1 auto;
        display: flex;
        flex-direction: row;
        font-size: 2rem;
        color: white;
        background-color: black;
      ">
      <!-------------------------------- TITLE -------------------------------->
      <div style="flex: 1 1 auto; padding: 2rem;">
        Your Humanity Degree
      </div>
      <!------------------------------ LIVE MODE ------------------------------>
      <div style="flex: 0 1 auto; padding: 2rem;">
        live mode
        <input type="checkbox" @change="onModeChange" v-model="liveMode"/>
      </div>
    </div>

    <!--------------------------------- TOAST --------------------------------->
    <div
      style="
        font-size: 1.5rem;
        padding: 1.5rem;
        background-color: #333;
      ">
      <textarea
        rows="5"
        style="width: 100%; resize: none;"
        v-model="toastMessage">
      </textarea>
      <div id="toast-controller">
      </div>
    </div>


    <!-------------------------- ALL OTHER CONTROLS --------------------------->
    <div
      style="
        flex: 1 0 auto;
        font-size: 1.5rem;
        color: black;
        background-color: #aaa;
      ">
      <!------------------------------- TABS ---------------------------------->
      <tabs
        :pages="controllerPages"
        :currentPage="currentControllerPage"
        v-on:tab="onClickTab" />
      <!----------------------------- CONTROLS -------------------------------->
      <div
        style="
          padding: 5px;
        ">
        <all-controls />
      </div>
    </div>
  </div>
</template>

<script>
import * as controllers from '@ircam/basic-controllers';
import Tabs from './Tabs.vue';
import AllControls from './AllControls.vue';

export default {
  components: { Tabs, AllControls },
  data() {
    return {
      liveModeState: this.$experience.liveModeState,
      globalState: this.$experience.globalState,
      gameState: this.$experience.gameState,
      controllerState: this.$experience.controllerState,
      controllerPages: null,
      currentControllerPage: null,
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

    const unsubscribeControllerState = this.controllerState.subscribe(async updates => {
      if (updates.hasOwnProperty('currentPage')) {
        this.currentControllerPage = updates.currentPage;
      }
    });

    const unsubscribeLiveModeState = this.liveModeState.subscribe(async updates => {
      if (updates.hasOwnProperty('liveMode')) {
        this.liveMode = updates.liveMode;
      }
    });

    this.unsubscriptions = [
      unsubscribeControllerState,
      unsubscribeLiveModeState,
    ];

    this.controllerPages = this.controllerState.getSchema().currentPage.list;
    this.currentControllerPage = this.controllerState.getValues().currentPage;
    this.liveMode = this.liveModeState.getValues().liveMode;

    await this.globalState.set({ toastMessage: this.blinkingCursor });
  },
  beforeDestroy() {
    this.unsubscriptions.forEach(unsubscribe => { unsubscribe(); });
  },
  methods: {
    async onClickTab(tab) {
      await this.controllerState.set({ currentPage: tab });
      switch (tab) {
        case 'welcome':
          await this.gameState.set({
            currentPage: 'welcome'
          });
          break;
        case 'survey1':
          await this.gameState.set({
            currentPage: 'survey',
            surveyData: 'survey1',
          });
          break;
        case 'flyingWords1':
          await this.gameState.set({
            currentPage: 'flyingWords',
            flyingWordsShowSliders: false,
          });
          break;
        case 'survey2':
          await this.gameState.set({
            currentPage: 'survey',
            surveyData: 'survey2',
          });
          break;
        case 'flyingWords2':
          await this.gameState.set({
            currentPage: 'flyingWords',
            flyingWordsShowSliders: true,
          });
          break;
        case 'survey3':
          await this.gameState.set({
            currentPage: 'survey',
            surveyData: 'survey3',
          });
          break;
        case 'flyingWords3':
          await this.gameState.set({
            currentPage: 'flyingWords',
            flyingWordsShowSliders: false,
          });
          break;
        case 'survey4':
          await this.gameState.set({
            currentPage: 'survey',
            surveyData: 'survey4',
          });
          break;
        case 'flyingWords4':
          await this.gameState.set({
            currentPage: 'flyingWords',
            flyingWordsShowSliders: true,
          });
          break;
        case 'puzzle1':
          await this.gameState.set({
            currentPage: 'puzzle',
          });
          break;
        case 'end':
          await this.gameState.set({
            currentPage: 'end',
          });
          break;
        case 'thankyou':
          await this.gameState.set({
            currentPage: 'thankyou',
          });
          break;
        default:
          break;
      }
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