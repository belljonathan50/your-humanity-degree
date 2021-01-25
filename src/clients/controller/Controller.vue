<template>
  <div
    style="
      height: 100%;
      display: flex;
      flex-direction: column;
    ">
    <div
      style="
        flex: 0 1 auto;
        display: flex;
        flex-direction: row;
        font-size: 20px;
        color: white;
        background-color: black;
      ">
      <div style="flex: 1 1 auto; padding: 20px;">
        Your Humanity Degree
      </div>
      <div style="flex: 0 1 auto; padding: 20px;">
        live mode <input type="checkbox" @change="onModeChange" v-model="liveMode"/>
      </div>
    </div>
    <div
      style="
        flex: 1 0 auto;
        font-size: 14px;
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
import Tabs from './components/Tabs.vue';
import './pages';

export default {
  components: { Tabs },
  data() {
    return {
      pages: [],
      currentPage: null,
      liveMode: false,
    };
  },
  async mounted() {
    this.$experience.states.globals.subscribe(async updates => {
      if (updates.hasOwnProperty('currentPage')) {
        this.currentPage = updates.currentPage;
      }

      if (updates.hasOwnProperty('liveMode')) {
        this.liveMode = updates.liveMode;
      }
    });

    // console.log('mounted !');
    this.pages = this.$experience.states.globals.getSchema().currentPage.list;
    const { currentPage, liveMode } = this.$experience.states.globals.getValues();
    this.currentPage = currentPage;
    this.liveMode = liveMode;
  },
  methods: {
    async onClickTab(tab) {
      await this.$experience.states.globals.set({ currentPage: tab }); 
    },
    async onModeChange(e) {
      const liveMode = e.target.checked;
      await this.$experience.states.globals.set({ liveMode });
    },
  },
};
</script>