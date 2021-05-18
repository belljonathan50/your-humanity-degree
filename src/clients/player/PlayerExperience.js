import { AbstractExperience } from '@soundworks/core/client';
import renderInitializationScreens from '@soundworks/template-helpers/client/render-initialization-screens.js';
import * as audio from 'waves-audio';

import Vue from 'vue';
import Player from './Player.vue';

class PlayerExperience extends AbstractExperience {
  constructor(client, config = {}, $container) {
    super(client);

    this.config = config;
    this.$container = $container;
    this.audio = audio;
    this.scorePlayer = null;
    this.rafId = null;
    console.log(navigator.userAgent);

    this.platform = this.require('platform');
    this.audioBufferLoader = this.require('audio-buffer-loader');

    renderInitializationScreens(client, config, $container);
  }

  async start() {
    super.start();

    this.liveModeState = await this.client.stateManager.attach('liveMode');
    this.globalState = await this.client.stateManager.attach('globals');
    this.playerState = await this.client.stateManager.create('player');

    Vue.prototype.$experience = this;

    this.vue = new Vue({
      el: this.$container,
      render: h => h(Player),
    });
  }
}

export default PlayerExperience;
