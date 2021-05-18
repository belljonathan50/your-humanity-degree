import EventEmitter from 'events';

import timeline from '../../../server/data/timeline';

class Timeline extends EventEmitter {
  constructor() {
    super();

    // set whichDate to 'date' or 'testDate'
    // (testDates are for testing purposes only and play everything faster)
    this.whichDate = 'date';
    // this.whichDate = 'testDate';

    this.gameState = null;
    this.timeout = null;
    this._setNextItemParams = this._setNextItemParams.bind(this);
  }

  setState(gameState) {
    this.gameState = gameState;
  }

  start() {
    this.startDate = Date.now();
    this.nextItemIndex = 0;
    const delay = timeline[this.nextItemIndex][this.whichDate];
    this.timeout = setTimeout(this._setNextItemParams, delay);
  }

  stop() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  async _setNextItemParams() {
    let item = timeline[this.nextItemIndex];
    const now = Date.now() - this.startDate;
    const currentItemDate = item[this.whichDate];
    const dateError = now - currentItemDate;

    await this.gameState.set(item.params);

    this.nextItemIndex++;

    if (this.nextItemIndex === timeline.length) {
      // this.start();
      // ot this.stop() (or do nothing actually it's the same),
      // if we don't want to loop,
      // and maybe emit a 'finished' event to display some message
      this.emit('finished');
    } else {
      item = timeline[this.nextItemIndex];
      const nextItemDate = item[this.whichDate];
      const delay = Math.max(0, nextItemDate - currentItemDate - dateError);
      this.timeout = setTimeout(this._setNextItemParams, delay);
    }
  }
};

export default Timeline;