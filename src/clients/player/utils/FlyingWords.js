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
      top: this.h * -0.15,
      bottom: this.h * 1.15,
    };

    this.negativeWordsProba = 0.5;

    this.activeWords = [];
    this.inactiveWords = [];
    this.disabledWords = [];

    words.forEach((w, i) => {
      this.inactiveWords.push({
        // text: w.text, score: w.score,
        ...w,
        x: 0,
        y: 0,
        vy: 0,
        phase: 0,
        speed: 0,
      });
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
    this.negativeWordsProba = val * 0.01;
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
        this.emit('disabled', w.text, true);
        break;
      }
    }
  }

  enableWord(word, elements) {
    for (let i = 0; i < this.disabledWords.length; i++) {
      if (this.disabledWords[i].text === word.text) {
        const w = this.disabledWords.splice(i, 1)[0];
        this.inactiveWords.push(w);
        break;
      }
    }
  }

  update(elements) {
    const { minInterval, maxInterval } = this.params;
    const now = Date.now();
    const dt = (this.lastUpdate - now) * 0.001;
    this.lastUpdate = now;


    if (now >= this.nextActivationDate && this.inactiveWords.length > 0) {
      // first choose if we must pick a positive or a negative word :
      let pickNegative = null;
      if (this.negativeWordsProba === 0) {
        pickNegative = false;
      } else if (this.negativeWordsProba === 1) {
        pickNegative = true;
      } else {
        const r = Math.floor(Math.random() * 1001) / 1000;
        pickNegative = r < this.negativeWordsProba;
      }
      
      // then pick the word :
      for (let i = 0; i < this.inactiveWords.length; i++) {
        const { score } = this.inactiveWords[i];
        if ((pickNegative && score < 0) || (!pickNegative && score >= 0)) {
          const w = this.inactiveWords.splice(i, 1)[0];          
          this.activeWords.push(w);
          this.initFlyingWord(w);
          this.emit('disabled', w.text, false);
          this.nextActivationDate = now + this.random(minInterval, maxInterval) * 1000;
          break;
        }
      }
    }

    for (let i = this.activeWords.length - 1; i >= 0; i--) {
      const w = this.activeWords[i];
      w.y += w.vy * dt;

      if (w.y < this.rect.top) {
        this.activeWords.splice(i, 1)[0];
        this.inactiveWords.push(w);
      } else {
        w.phase += w.speed * dt;
        w.phase -= Math.floor(w.phase); // clip to [0,1]
        const dx = Math.sin(w.phase * 2 * Math.PI);
        elements[w.text].style.left = `${w.x + dx * w.dx}%`;
        elements[w.text].style.top = `${w.y}%`;
      }
    }
  }
};

export default FlyingWords;