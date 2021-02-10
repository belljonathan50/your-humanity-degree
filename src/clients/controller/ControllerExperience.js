import { AbstractExperience } from '@soundworks/core/client';
import renderInitializationScreens from 'soundworks-template-helpers/client/render-initialization-screens.js';

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
    this.states = {};

    this.states.globals = await this.client.stateManager.attach('globals');
    this.states.game1 = await this.client.stateManager.attach('game1');
    this.states.game2 = await this.client.stateManager.attach('game2');

    Vue.prototype.$experience = this;
    this.vue = new Vue({
      el: this.$container,
      render: h => h(Controller),
    });
  }
}

export default ControllerExperience;
