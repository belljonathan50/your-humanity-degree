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
    this.rafId = null;
    console.log(navigator.userAgent);

    this.platform = this.require('platform');
    this.audioBufferLoader = this.require('audio-buffer-loader');

    renderInitializationScreens(client, config, $container);
  }

  async start() {
    super.start();

    this.playerState = await this.client.stateManager.create('player');

    this.states = {};
    this.states.globals = await this.client.stateManager.attach('globals');
    this.states.game1 = await this.client.stateManager.attach('game1');
    this.states.game2 = await this.client.stateManager.attach('game2');
    this.states.game3 = await this.client.stateManager.attach('game3');
    this.states.game4 = await this.client.stateManager.attach('game4');
    this.states.game5 = await this.client.stateManager.attach('game5');

    Vue.prototype.$experience = this;

    this.vue = new Vue({
      el: this.$container,
      render: h => h(Player),
    });
  }

  // _getPartNameFromIndex(i) {
  //   return `score/part-${(i+1)<10?'0':''}${(i+1)}`;
  // }

  // playInstrumentalPart(partIndex, bufferOffset = 0) {
  //   const name = this._getPartNameFromIndex(partIndex);
  //   console.log('starting buffer ' + name);
  //   const buffer = this.audioBufferLoader.data[name];
  //   const duration = buffer.duration - bufferOffset;
  //   const now = this.audioContext.currentTime;

  //   const src = this.audioContext.createBufferSource();
  //   src.buffer = buffer;
  //   src.connect(this.audioContext.destination);
  //   src.start(now, bufferOffset, duration); // offset in seconds  
  //   src.addEventListener('ended', () => {
  //     if (partIndex + 1 < nbScoreParts) {
  //       this.playInstrumentalPart(partIndex + 1);
  //     }
  //     console.log('buffer ' + name + ' ended');
  //   });
  // }
}

export default PlayerExperience;
