// WORK IN PROGRESS : NOT WORKING AT ALL, FLYING WORDS IS USED FOR NOW

const defaultParams = {
  n: 8, // nb of boids
  nn: 4, // nb of nearest neighbours to take into account for navigation
  follow: 2, // tendancy to follow nearest neighbours
  avoid: 2, // tendancy to avoid nearest neighbours
  // speed: 1,
  minSpeed: 1,
  maxSpeed: 2,
  inertia: 10,
  radius: 10, // interaction radius of each boid
}

class Boid {
  constructor() {
    this.p = [0, 0]; // position
    this.v = [0, 0]; // velocity
  }

  updateTrajectory() {

  }
};

class Boids {
  constructor(params = {}) {
    this.params = Object.assign(params, defaultParams);
    this.params.nn = Math.min(this.params.n, this.params.nn);

    this.boids = [];
    for (let i = 0; i < this.params.n; i++) {
      this.boids.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      });
    }
  }

  distance(b1, b2) {
    const dx = b1.x - b2.x;
    const dy = b1.y - b2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  getNearestNeighbours(boidIndex) {
    const res = [];
    const boid = this.boids[boidIndex];
    const distances = [];
    
    // this.boids.forEach(b => {
    //   b.distance = this.distance(boid, b);
    //   // distances.push(this.distance(boid, b));
    // });

    this.boids.forEach((b, i) => {
      if (i !== boidIndex) {
        if (res.length < this.params.nn) {
          res.push(b);
          distances.push(this.distance(boid, b));
        } else {
          // find actual farthest :
          let maxDist = distances[0];
          let farthest = 0;

          for (let j = 1; j < res.length; j++) {
            if (distances[j] > maxDist) {
              maxDist = distances[j];
              farthest = j;
            }
          }

          // then replace it

          // find if there is a nearest neighbour
          res.sort((b1, b2) => {
            if (b1.distance < b2.distance) return -1;
            if (b1.distance > b2.distance) return 1;
            return 0;
          });
          if ()
        }
      }
    });
  }

  updateVelocityFromNeighbours() {
    this.boids.forEach((b, i) => {
      const nn = this.getNearestNeighbours(i);
    });
  }

  updateBoidPositions() {
    this.boids.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;
    });
  }

  update() {
    this.computeNewVelocities();
    this.updateBoidPositions();
  }
};