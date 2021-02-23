import EventEmitter from 'events';

const parseDate = date => {
  if (Number.isInteger(date)) return date;

  const [ min, secms ] = date.split('\'');
  const [ sec, ms ] = secms.split('.');
  // Number('') returns 0 so the following is OK :
  const res = Number(min) * 60000 + Number(sec) * 1000 + Number(ms.substring(0,3));
  return res;
}

/*
// From Huihui's 13/02/2021 email :

0'00.0000 survey1
3'59.5739 flying words
6'46.7705 slider
7'36.1836 survay2
9'58.0262 game 5
11'23.9428 slider
12'23.9285 survay3
14'39.1956 end scene
15'34.8160 end of the piece's score
*/

const timeline = [
  {
    date: '0\'0.000',
    testDate: 0,
    params: {
      currentPage: 'survey1',
      survey1SampleSet: 0,
    },
  },
  {
    date: '0\'10.000',
    testDate: 2500,
    params: {
      survey1SampleSet: 1,
    },
  },
  {
    date: '3\'59.5739',
    testDate: 5000,
    params: {
      currentPage: 'flyingWords1',
      flyingWordsShowSliders: false,
      flyingWordsNegativeWordsPercentage: 50,
    },
  },
  {
    date: '6\'46.7705',
    testDate: 10000,
    params: {
      currentPage: 'flyingWords2',
      flyingWordsShowSliders: true,
    },
  },
  {
    date: '7\'36.1836',
    testDate: 15000,
    params: {
      currentPage: 'survey2',
    },
  },
  {
    date: '9\'58.0262',
    testDate: 20000,
    params: {
      currentPage: 'puzzle1',
    },
  },
  {
    date: '11\'23.9428',
    testDate: 25000,
    params: {
      currentPage: 'flyingWords3',
      flyingWordsShowSliders: true,
    },
  },
  {
    date: '12\'23.9285',
    testDate: 30000,
    params: {
      currentPage: 'survey3',
    },
  },
  {
    date: '14\'39.1956',
    testDate: 35000,
    params: {
      currentPage: 'end',
    },
  },
  {
    date: '15\'34.8160',
    testDate: 40000,
    params: {
      currentPage: 'thankyou',
    },
  },
  // special mandatory end item allowing to loop over immediately (or stop)
  {
    date: '15\'39.8160', // endDate
    testDate: 45000,
    params: {
      currentPage: 'loader',
    },
  },
];

class Timeline extends EventEmitter {
  constructor() {
    super();
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
    const delay = parseDate(timeline[this.nextItemIndex][this.whichDate]);
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
    const currentItemDate = parseDate(item[this.whichDate]);
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
      const nextItemDate = parseDate(item[this.whichDate]);
      const delay = nextItemDate - currentItemDate - dateError
      this.timeout = setTimeout(this._setNextItemParams, delay);
    }
  }
};

export default Timeline;