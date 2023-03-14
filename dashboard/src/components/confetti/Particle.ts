const drawRectangle = (params: {
  ctx: CanvasRenderingContext2D;
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  hue: any;
  opacity: any;
}) => {
  const {
    ctx,
    position: { x, y },
    size: { width, height },
    rotation,
    hue,
    opacity,
  } = params;
  ctx.save();
  ctx.beginPath();
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.rect(-width / 2, -height / 2, width, height);
  ctx.fillStyle = 'hsla(' + hue + 'deg, 90%, 65%, ' + opacity + '%)';
  ctx.fill();
  ctx.restore();
};

const generateVelocity = (explosionPower: number) => {
  let t = Math.random() - 0.5;
  let i = Math.random() - 0.7;
  let n = Math.sqrt(t * t + i * i);
  i /= n;

  return { x: (t /= n) * (Math.random() * explosionPower), y: i * (Math.random() * explosionPower) };
};

export interface ParticleConfig {
  x: number;
  y: number;
  size: number;
  explosionPower: number;
  gravity: number;
  fade: boolean;
}

export class Particle {
  size: { width: number; height: number };
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  rotation: number;
  rotationSpeed: number;
  hue: number;
  opacity: number;
  lifetime: number;
  gravity: number;
  fade: boolean;

  constructor(config: ParticleConfig) {
    this.size = {
      width: (16 * Math.random() + 4) * config.size,
      height: (4 * Math.random() + 4) * config.size,
    };
    this.position = {
      x: config.x - this.size.width / 2,
      y: config.y - this.size.height / 2,
    };
    this.gravity = config.gravity;
    this.fade = config.fade;
    this.velocity = generateVelocity(config.explosionPower);
    this.rotation = 360 * Math.random();
    this.rotationSpeed = 10 * (Math.random() - 0.5);
    this.hue = 360 * Math.random();
    this.opacity = 100;
    this.lifetime = Math.random() + 0.25;
  }

  update(time: number) {
    this.velocity.y += this.gravity * (this.size.width / (10 * 1)) * time;
    this.velocity.x += 25 * (Math.random() - 0.5) * time;
    this.velocity.y *= 0.98;
    this.velocity.x *= 0.98;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.rotation += this.rotationSpeed;
    this.fade && (this.opacity -= this.lifetime);
  }

  checkBounds(): boolean {
    return this.position.y - 2 * this.size.width > 2 * window.innerHeight;
  }

  draw(ctx: CanvasRenderingContext2D) {
    drawRectangle({
      ctx,
      position: this.position,
      size: this.size,
      rotation: this.rotation,
      hue: this.hue,
      opacity: this.opacity,
    });
  }
}
