import { Burst, BurstConfig } from './Burst';

interface ConfettiConfig {
  gravity: number;
  particleCount: number;
  particleSize: number;
  explosionPower: number;
  destroyTarget: boolean;
  fade: boolean;
}

const defaultConfig: ConfettiConfig = {
  gravity: 10,
  particleCount: 100,
  particleSize: 1,
  explosionPower: 25,
  destroyTarget: false,
  fade: true,
};

export class Confetti {
  config: ConfettiConfig = defaultConfig;
  ctx: CanvasRenderingContext2D | null;
  deltaTime: number;
  time: number;
  bursts: any;

  constructor(config?: ConfettiConfig) {
    if (config) this.config = config;
    this.ctx = null;
    this.time = 0;
    this.deltaTime = 0;
    this.bursts = [];

    this.setupCanvas();
    window.requestAnimationFrame((t) => this.update(t));
  }

  setupCanvas() {
    const canvas = document.createElement('canvas');
    this.ctx = canvas.getContext('2d');
    canvas.width = 2 * window.innerWidth;
    canvas.height = 2 * window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.margin = '0';
    canvas.style.padding = '0';
    canvas.style.zIndex = '999999999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    window.addEventListener('resize', () => {
      canvas.width = 2 * window.innerWidth;
      canvas.height = 2 * window.innerHeight;
    });
  }

  explode(position: { x: number; y: number }) {
    const config: BurstConfig = {
      particleCount: this.config.particleCount,
      particleConfig: {
        x: position.x,
        y: position.y,
        size: this.config.particleSize,
        explosionPower: this.config.explosionPower,
        gravity: this.config.gravity,
        fade: this.config.fade,
      },
    };
    this.bursts.push(new Burst(config));
  }

  update(time: number) {
    this.deltaTime = (time - this.time) / 1000;
    this.time = time;

    for (let i = this.bursts.length - 1; i >= 0; i--) {
      this.bursts[i].update(this.deltaTime);

      if (!this.bursts[i].particles.length) {
        this.bursts.splice(i, 1);
      }
    }

    this.draw();
    window.requestAnimationFrame((t) => this.update(t));
  }

  draw() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, 2 * window.innerWidth, 2 * window.innerHeight);
      this.bursts.forEach((burst: Burst) => {
        burst.draw(this.ctx as CanvasRenderingContext2D);
      });
    }
  }
}
