import EventEmitter from 'events';

const defaultParams = {
  minSpeed: 2, // per sec
  maxSpeed: 3, // per sec
  minInterval: 1, // secs
  maxInterval: 2, // secs
};

class FlyingWords extends EventEmitter {
  constructor(width, height, words, options = {}) {
    super();
    this.w = 100; // width;
    this.h = 100 * height / width; // height;
    this.rect = {
      left: this.w * -0.1,
      right: this.w * 1.1,
      top: this.h * -0.1,
      bottom: this.h * 1.1,
    };

    this.activeWords = [];
    this.inactiveWords = [];
    this.disabledWords = [];
    this.forbiddenWords = [];

    this.negativeWords = [];
    this.positiveWords = [];

    words.forEach((w, i) => {
      this.inactiveWords.push({
        // text: w.text,
        ...w,
        x: 0,
        y: 0,
        vy: 0,
        phase: 0,
        speed: 0,
        transitioning: false,
        transitionStartDate: 0,
      });

      if (w.score < 0) {
        this.negativeWords.push({...w});
      } else if (w.score > 0) {
        this.positiveWords.push({...w});
      }
    });

    this.transitionDuration = 1000;
    this.lastUpdate = 0;
    this.nextActivationDate = 0;
    this.params = Object.assign({}, defaultParams, options);
  }

  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  initFlyingWord(w) {
    const { minSpeed, maxSpeed } = this.params;
    w.x = this.random(this.w * 0.25, this.w * 0.75);
    w.y = this.rect.bottom;
    w.vy = this.random(minSpeed, maxSpeed);
    w.phase = Math.random();
    w.speed = this.random(0.05, 0.15);
    w.dx = this.random(5, 30);
  }

  start() {
    if (this.inactiveWords.length === 0) return;
    
    const now = Date.now();
    this.lastUpdate = now;
    this.nextActivationDate = now;
  }

  stop() {
    // nothing to do here ...
  }

  setNegativeWordsPercentage(val) {
    this.forbiddenWords = [];
    let nbWordsToForbid = 0;
    let wordsToForbid = [];

    if (val < 50) { // we must only forbid negative words
      nbWordsToForbid = ((val / 50)) * (this.negativeWords.length + 0.5);
      nbWordsToForbid = Math.floor(nbWordsToForbid);
      nbWordsToForbid = this.negativeWords.length - nbWordsToForbid;
      wordsToForbid = [...this.negativeWords];
    } else { // we must only forbid positive words
      nbWordsToForbid = ((100 - val) / 50) * (this.positiveWords.length + 0.5);
      nbWordsToForbid = Math.floor(nbWordsToForbid);
      nbWordsToForbid = this.positiveWords.length - nbWordsToForbid;
      wordsToForbid = [...this.positiveWords];
    }

    for (let i = 0; i < nbWordsToForbid; i++) {
      const randIndex = Math.floor(Math.random() * wordsToForbid.length);
      this.forbiddenWords.push(wordsToForbid.splice(randIndex, 1)[0].text);
    }
  }

  getDisplayedWords() {
    const res = [];
    this.activeWords.forEach(w => {
      // todo : find a more precise way to know if words are visible to the user
      if (w.y < this.h && w.y > 0) {
        res.push(w);
      }
    });
    return res;
  }

  disableWord(word, elements) {
    for (let i = 0; i < this.activeWords.length; i++) {
      if (this.activeWords[i].text === word.text) {
        const w = this.activeWords.splice(i, 1)[0];
        this.disabledWords.push(w);

        // sometimes css transition does not work (maybe because of pads overlay)
        // so we add this (magical) timeout :
        // (EDIT: neither works so we do it via javascript in update function)

        // setTimeout(() => {
        //   elements[word.text].classList.add('selected');
        // }, 100);

        // w.transitioning = true;
        // w.transitionStartDate = Date.now();
        this.emit('disabled', w.text, true);
        break;
      }
    }
  }

  enableWord(word, elements) {
    for (let i = 0; i < this.disabledWords.length; i++) {
      // console.log(word.text);
      //*
      if (this.disabledWords[i].text === word.text) {
        const w = this.disabledWords.splice(i, 1)[0];
        this.inactiveWords.push(w);
        break;
      }
      //*/
    }
  }

  update(elements) {
    const { minInterval, maxInterval } = this.params;
    const now = Date.now();
    const dt = (this.lastUpdate - now) * 0.001;
    this.lastUpdate = now;

    if (now >= this.nextActivationDate && this.inactiveWords.length > 0) {
      // we iterate until we find an "authorized" word to activate :
      for (let i = 0; i < this.inactiveWords.length; i++) {
        if (this.forbiddenWords.indexOf(this.inactiveWords[i].text) === -1) {
          const w = this.inactiveWords.splice(i, 1)[0];
          this.activeWords.push(w);
          this.initFlyingWord(w);
          // this.transitioning = false;
          // elements[w.text].style.opacity = 1;
          this.emit('disabled', w.text, false);
          this.nextActivationDate = now + this.random(minInterval, maxInterval) * 1000;
        }
      }
    }

    for (let i = this.activeWords.length - 1; i >= 0; i--) {
      const w = this.activeWords[i];
      w.y += w.vy * dt;

      if (w.y < this.rect.top) {
        this.activeWords.splice(i, 1)[0];
        this.inactiveWords.push(w);
        // elements[w.text].style.opacity = 0;
      } else {
        w.phase += w.speed * dt;
        w.phase -= Math.floor(w.phase); // clip to [0,1]
        const dx = Math.sin(w.phase * 2 * Math.PI);
        elements[w.text].style.left = `${w.x + dx * w.dx}%`;
        elements[w.text].style.top = `${w.y}%`;
      }
    }

    // this replaces the buggy css transition on opacity :
    /*
    for (let i = 0; i < this.disabledWords.length; i++) {
      const w = this.disabledWords[i];
      if (w.transitioning) {
        const frac = (now - w.transitionStartDate) / this.transitionDuration;
        if (frac > 1) {
          elements[w.text].style.opacity = 0;
          w.transitioning = false;
        } else {
          elements[w.text].style.opacity = 1 - frac;
        }
      }
    }
    */
  }
};

export default FlyingWords;