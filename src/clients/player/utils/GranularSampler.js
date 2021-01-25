import * as audio from 'waves-audio';

class GranularSampler {
  constructor(options = {}) {
    this.engine = new audio.GranularEngine(options);
    this.duration = this.engine.buffer ? this.engine.buffer.duration : 0;
    this.normalizedPosition = 0;
  }

  connect(node) {
    this.engine.connect(node);
  }

  disconnect() {
    this.engine.disconnect();
  }

  get buffer() {
    return this.engine.buffer;
  }

  set buffer(buffer) {
    this.engine.buffer = buffer;
    this.duration = buffer.duration;
    this._updatePosition();
  }

  get position() {
    return this.normalizedPosition;
  }

  set position(value) {
    this.normalizedPosition = value;
    this._updatePosition();
  }

  _updatePosition() {
    this.engine.position = this.normalizedPosition * this.duration;
  }

  play() {
    audio.getScheduler().add(this.engine);
  }

  stop() {
    audio.getScheduler().remove(this.engine);
  }
};

export default GranularSampler;