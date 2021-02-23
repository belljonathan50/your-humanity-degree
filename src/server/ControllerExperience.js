import { AbstractExperience } from '@soundworks/core/server';

class ControllerExperience extends AbstractExperience {
  constructor(server, clientTypes, options = {}) {
    super(server, clientTypes);

    // this.auth = this.require('auth');
  }

  async start() {
    super.start();
    const liveModeState = await this.server.stateManager.attach('liveMode');
    /*
    liveModeState.subscribe(updates => {
      if (updates.hasOwnProperty('liveMode')) {
        this.server.sockets.broadcast(null, this, 'liveMode', updates.liveMode);
      }
    });
    //*/
  }

  enter(client) {
    super.enter(client);
  }

  exit(client) {
    super.exit(client);
  }
}

export default ControllerExperience;
