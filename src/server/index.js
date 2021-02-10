import 'source-map-support/register';
import { Server } from '@soundworks/core/server';
import path from 'path';
import serveStatic from 'serve-static';
import compile from 'template-literal';

import pluginAuthFactory from 'soundworks-plugin-auth/server';
import pluginPlatformFactory from '@soundworks/plugin-platform/server';
import pluginAudioBufferLoaderFactory from '@soundworks/plugin-audio-buffer-loader/server';

import globals from './schemas/globals';
import game1 from './schemas/game1';
import game2 from './schemas/game2';
import game3 from './schemas/game3';
import game4 from './schemas/game4';
import game5 from './schemas/game5';
import player from './schemas/player';

import PlayerExperience from './PlayerExperience.js';
import ControllerExperience from './ControllerExperience.js';

import getConfig from './utils/getConfig.js';
import protectRoutes from './utils/protectRoutes.js';

const ENV = process.env.ENV || 'default';
const config = getConfig(ENV);
const server = new Server();

// html template and static files (in most case, this should not be modified)
server.templateEngine = { compile };
server.templateDirectory = path.join('.build', 'server', 'tmpl');
server.router.use(serveStatic('public'));
server.router.use('build', serveStatic(path.join('.build', 'public')));
server.router.use('vendors', serveStatic(path.join('.vendors', 'public')));

console.log(config.env);

protectRoutes(server, {
  clients: ['controller'],
  login: 'admin',
  password: process.env.AUTH_PLUGIN_PASSWORD || config.env.password,
});

console.log(`
--------------------------------------------------------
- launching "${config.app.name}" in "${ENV}" environment
- [pid: ${process.pid}]
--------------------------------------------------------
`);

// -------------------------------------------------------------------
// register plugins
// -------------------------------------------------------------------
// server.pluginManager.register(pluginName, pluginFactory, [pluginOptions], [dependencies])

/*
server.pluginManager.register('auth', pluginAuthFactory, {
  // defined e.g. from heroku or balena-cloud dashboard
  password: process.env.AUTH_PLUGIN_PASSWORD || config.env.password,
}, []);
//*/

server.pluginManager.register('audio-buffer-loader', pluginAudioBufferLoaderFactory, {}, []);
server.pluginManager.register('platform', pluginPlatformFactory, {}, []);

// -------------------------------------------------------------------
// register schemas
// -------------------------------------------------------------------
// server.stateManager.registerSchema(name, schema);
server.stateManager.registerSchema('globals', globals);
server.stateManager.registerSchema('game1', game1);
server.stateManager.registerSchema('game2', game2);
server.stateManager.registerSchema('game3', game3);
server.stateManager.registerSchema('game4', game4);
server.stateManager.registerSchema('game5', game5);
server.stateManager.registerSchema('player', player); // created client side

(async function launch() {
  try {
    await server.stateManager.create('globals');
    await server.stateManager.create('game1');
    await server.stateManager.create('game2');
    await server.stateManager.create('game3');
    await server.stateManager.create('game4');
    await server.stateManager.create('game5');

    // @todo - check how this behaves with a node client...
    await server.init(config, (clientType, config, httpRequest) => {
      return {
        clientType: clientType,
        app: {
          name: config.app.name,
          author: config.app.author,
        },
        env: {
          type: config.env.type,
          websockets: config.env.websockets,
          assetsDomain: config.env.assetsDomain,
        }
      };
    });

    const playerExperience = new PlayerExperience(server, 'player');
    const controllerExperience = new ControllerExperience(server, 'controller');

    // start all the things
    await server.start();
    playerExperience.start();
    controllerExperience.start();

  } catch (err) {
    console.error(err.stack);
  }
})();

process.on('unhandledRejection', (reason, p) => {
  console.log('> Unhandled Promise Rejection');
  console.log(reason);
});
