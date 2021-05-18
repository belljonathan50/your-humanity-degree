import { AbstractExperience } from '@soundworks/core/client';
import renderInitializationScreens from '@soundworks/template-helpers/client/render-initialization-screens.js';

import Vue from 'vue';
import Controller from './Controller.vue';

class ControllerExperience extends AbstractExperience {
  constructor(client, config, $container) {
    super(client);

    this.config = config;
    this.$container = $container;
    this.rafId = null;

    // require plugins if needed
    // this.auth = this.require('auth');

    renderInitializationScreens(client, config, $container);
  }

  async start() {
    super.start();

    this.liveModeState = await this.client.stateManager.attach('liveMode');
    this.globalState = await this.client.stateManager.attach('globals');
    this.gameState = await this.client.stateManager.attach('games');
    this.controllerState = await this.client.stateManager.attach('controller');

    Vue.prototype.$experience = this;
    this.vue = new Vue({
      el: this.$container,
      render: h => h(Controller),
    });
  }
}

export default ControllerExperience;
