class PadAnimator {
  constructor() {
    this.duration = 3000;

    this.minScale = 0.5;
    this.maxScale = 1.1;
    this.scalePeriods = Math.random() * 3 + 1;
    this.scalePeriods *= Math.random() < 0.5 ? 1 : -1;

    this.minDist = -1;
    this.maxDist = 1;
    this.distPeriods = Math.random() * 3 + 1;
    this.distPeriods *= Math.random() < 0.5 ? 1 : -1;

    this.accumAngle = (Math.random() * 6.28 + 3.14);
    this.accumAngle *= (Math.random() < 0.5 ? 1 : -1);
  }

  start(padTransform) {
    const { scale, offsetX, offsetY } = padTransform;
    const dist = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    const angle = Math.atan2(offsetY, offsetX);

    let scalePhase = (scale - this.minScale) / (this.maxScale - this.minScale);
    scalePhase = Math.asin(scalePhase * 2 - 1);

    let distPhase = (dist - this.minDist) / (this.maxDist - this.minDist);
    distPhase = Math.asin(distPhase * 2 - 1);

    this.startTransform = { angle, scalePhase, distPhase };
    this.startDate = Date.now();
    this.moving = true;
  }

  update(padTransform) {
    if (!this.moving) return false;

    const now = Date.now();
    const frac = Math.pow((Date.now() - this.startDate) / this.duration, 0.3);

    this.scalePhase = this.startTransform.scalePhase + frac * this.scalePeriods;
    this.scalePhase -= Math.floor(this.scalePhase); 
    this.scale = Math.sin(this.scalePhase * 2 * Math.PI) * 0.5 + 0.5; // map to [0,1]
    this.scale *= (this.maxScale - this.minScale);
    this.scale += this.minScale;

    this.distPhase = this.startTransform.distPhase + frac * this.distPeriods;
    this.distPhase -= Math.floor(this.distPhase);
    this.dist = Math.sin(this.distPhase * 2 * Math.PI) * 0.5 + 0.5; // map to [0,1]
    this.dist *= (this.maxDist - this.minDist);
    this.dist += this.minDist;

    this.angle = this.startTransform.angle + frac * this.accumAngle;
    // const delta = now - this.prevDate;
    // const { scale, offsetX, offsetY } = padTransform;

    padTransform.scale = this.scale;
    padTransform.offsetX = Math.cos(this.angle) * this.dist;
    padTransform.offsetY = Math.sin(this.angle) * this.dist;

    if (frac >= 1) {
      this.moving = false;
    }

    return true;
  }
};

export default PadAnimator;