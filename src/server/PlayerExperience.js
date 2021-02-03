import { AbstractExperience } from '@soundworks/core/server';

class PlayerExperience extends AbstractExperience {
  constructor(server, clientTypes, options = {}) {
    super(server, clientTypes);

    this.platform = this.require('platform');
    this.audioBufferLoader = this.require('audio-buffer-loader');
  }

  async start() {
    super.start();
    this.globalState = await this.server.stateManager.attach('globals');
  }

  async enter(client) {
    super.enter(client);
    let { connectedClients } = this.globalState.getValues();
    connectedClients++;
    await this.globalState.set({ connectedClients });
  }

  async exit(client) {
    super.exit(client);
    let { connectedClients } = this.globalState.getValues();
    connectedClients--;
    await this.globalState.set({ connectedClients });
  }
}

export default PlayerExperience;
