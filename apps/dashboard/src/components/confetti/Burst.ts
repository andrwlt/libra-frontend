import { Particle, ParticleConfig } from './Particle';

export interface BurstConfig {
  particleCount: number;
  particleConfig: ParticleConfig;
}

export class Burst {
  particles: Particle[] = [];

  constructor({ particleCount, particleConfig }: BurstConfig) {
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(particleConfig));
    }
  }

  update(time: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(time);
      if (this.particles[i].checkBounds()) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].draw(ctx);
    }
  }
}
