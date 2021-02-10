import { AbstractExperience } from '@soundworks/core/server';

class ControllerExperience extends AbstractExperience {
  constructor(server, clientTypes, options = {}) {
    super(server, clientTypes);

    // this.auth = this.require('auth');
  }

  async start() {
    super.start();
    const globals = await this.server.stateManager.attach('globals');
    globals.subscribe(updates => {

      // console.log(updates)
      if (updates.liveMode) {
        // do what is necessary here when live mode is toggled
      }
    });
  }

  enter(client) {
    super.enter(client);
  }

  exit(client) {
    super.exit(client);
  }
}

export default ControllerExperience;
