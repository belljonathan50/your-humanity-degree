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
      state: this.$experience.states.globals,
      pages: [],
      currentPage: null,
      liveMode: false,
      blinkingCursor: '<strong class="blinking-cursor">_</strong>',
      toastMessage: '',
      // toastDisplayDuration: 500,
      // toastTimeout: null,
    };
  },
  watch: {
    toastMessage(newVal, oldVal) {
      this.onMessageChange(newVal);
    },
  },
  async mounted() {
    const schema = this.state.getSchema();
    const controls = {};

    /*
    controls.toastTimeout = new controllers.Slider({
      label: 'Message timeout',
      min: 500,
      max: 5000,
      step: 1,
      default: this.toastDisplayDuration,
      container: '#toast-controller',
      callback: value => {
        this.toastDisplayDuration = value;
      },
    });

    controls.toastDisplay = new controllers.TriggerButtons({
      label: 'Display message',
      options: ['display'],
      container: '#toast-controller',
      callback: async () => {
        if (this.toastTimeout !== null) {
          clearTimeout(this.toastTimeout);
          this.toastTimeout = null;
        }

        console.log(this.$refs.textarea.value);
        await this.state.set({
          showToast: true,
          toastMessage: this.$refs.textarea.value,
        });
        this.toastTimeout = setTimeout(async () => {
          await this.state.set({
            showToast: false,
          });
        }, this.toastDisplayDuration);
      },
    });
    //*/

    controls.toastToggle = new controllers.Toggle({
      label: 'Toast on/off',
      default: false,
      container: '#toast-controller',
      callback: async value => {
        await this.state.set({ showToast: value });
      },
    });

    this.state.subscribe(async updates => {
      if (updates.hasOwnProperty('currentPage')) {
        this.currentPage = updates.currentPage;
      }

      if (updates.hasOwnProperty('liveMode')) {
        this.liveMode = updates.liveMode;
      }
    });

    this.pages = this.state.getSchema().currentPage.list;
    const { currentPage, liveMode } = this.state.getValues();
    this.currentPage = currentPage;
    this.liveMode = liveMode;
    await this.state.set({ showToast: false, toastMessage: this.blinkingCursor });
  },
  methods: {
    async onClickTab(tab) {
      await this.state.set({ currentPage: tab }); 
    },
    async onModeChange(e) {
      const liveMode = e.target.checked;
      await this.state.set({ liveMode });
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
      console.log(toastMessage);
      await this.state.set({ toastMessage });
    },
  },
};
</script>