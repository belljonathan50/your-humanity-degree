import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { audioContext } from 'waves-audio';
import { Client } from '@soundworks/core/client';
import initQoS from '@soundworks/template-helpers/client/init-qos.js';

import pluginPlatformFactory from '@soundworks/plugin-platform/client';
import pluginAudioBufferLoaderFactory from '@soundworks/plugin-audio-buffer-loader/client';

// import devicemotion from '@ircam/devicemotion';

import PlayerExperience from './PlayerExperience.js';
import { files } from '../../server/data/samples';

const config = window.soundworksConfig;

// UNCOMMENT THIS TO USE DEVICEMOTION :

// pluginPlatformFactory.addFeatureDefinition({
//   id: 'devicemotion',
//   initialize: async () => {
//     const result = await devicemotion.requestPermission();
//     return (result === 'granted' ? true : false);
//   },
// });

// from :
// https://gist.github.com/Craga89/2829457
// CSS grid not supported on ios safari < 10.3 : https://caniuse.com/css-grid
// (and lots of other stuff buggy anyway)

pluginPlatformFactory.addFeatureDefinition({
  id: 'iosversion',
  initialize: () => {
    var ios = parseFloat(
      ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
      .replace('undefined', '3_2').replace('_', '.').replace('_', '')
    ) || false;

    if (!ios || (ios && ios >= 10.3)) {
      // console.log('not ios or ios > 10.2 :)');
      return true;
    }

    // console.log('ios < 10.3 :(');
    return false;
  },
});

async function launch($container, index) {
  try {
    const client = new Client();

    // -------------------------------------------------------------------
    // register plugins
    // -------------------------------------------------------------------
    // client.pluginManager.register(pluginName, pluginFactory, [pluginOptions], [dependencies])
    client.pluginManager.register('audio-buffer-loader', pluginAudioBufferLoaderFactory, {
      data: files,
    }, []);

    client.pluginManager.register('platform', pluginPlatformFactory, {
      features: [
        ['web-audio', audioContext],
        // ['devicemotion'],
        ['iosversion'],
      ],
    });

    // -------------------------------------------------------------------
    // launch application
    // -------------------------------------------------------------------
    await client.init(config);
    // see https://github.com/collective-soundworks/soundworks/issues/36#issuecomment-844984779
    // initQoS(client);
    initQoS(client, { visibilityChange: false });

    const experience = new PlayerExperience(client, config, $container);
    // store exprience for emulated clients
    // experiences.add(experience);

    document.body.classList.remove('loading');

    // start all the things
    await client.start();
    experience.start();

    return Promise.resolve();
  } catch(err) {
    console.error(err);
  }
}

// -------------------------------------------------------------------
// bootstrapping
// -------------------------------------------------------------------
const $container = document.querySelector('#__soundworks-container');
launch($container, 0);
