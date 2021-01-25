class SimpleSampler {
  constructor(ctx, dst = null) {
    this.ctx = ctx;
    this.playing = false;
    this.src = null;
    this.vol = ctx.createGain();
    this.vol.connect(dst || ctx.destination);
  }

  play(buffer, bufferOffset = 0) {
    if (this.playing) return;

    const duration = buffer.duration - bufferOffset;
    const now = this.ctx.currentTime;

    this.src = this.ctx.createBufferSource();
    this.src.buffer = buffer;
    this.src.connect(this.vol);
    this.vol.gain.setValueAtTime(1, now);

    this.src.addEventListener('ended', () => { this.playing = false; });
    this.src.start(now, bufferOffset, duration);

    this.playing = true;
  }

  stop() {
    if (!this.playing) return;

    const now = this.ctx.currentTime;
    this.vol.gain.setValueAtTime(0, now);
    this.src.stop(now);
    this.playing = false;
  }
};

export default SimpleSampler;