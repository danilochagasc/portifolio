import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit,
  OnDestroy,
  NgZone,
  inject,
  viewChild,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

@Component({
  selector: 'app-network-bg',
  template: `<canvas #canvas></canvas>`,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkBg implements OnInit, OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly el = inject(ElementRef);

  readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animId = 0;
  private mouseX = -1000;
  private mouseY = -1000;
  private readonly PARTICLE_COUNT = 60;
  private readonly CONNECTION_DIST = 150;
  private readonly MOUSE_RADIUS = 180;

  private onMouseMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  private onResize = () => this.resize();

  ngOnInit(): void {
    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.initParticles();

    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });

    this.zone.runOutsideAngular(() => this.animate());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);
  }

  private resize(): void {
    const canvas = this.canvasRef().nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  private initParticles(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.particles = [];

    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
      });
    }
  }

  private animate(): void {
    this.animId = requestAnimationFrame(() => this.animate());
    const w = window.innerWidth;
    const h = window.innerHeight;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, w, h);

    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-primary')
      .trim() || '#3b82f6';

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    }

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.CONNECTION_DIST) {
          const opacity = (1 - dist / this.CONNECTION_DIST) * 0.15;
          ctx.strokeStyle = this.hexToRgba(accentColor, opacity);
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const p of this.particles) {
      const dx = p.x - this.mouseX;
      const dy = p.y - this.mouseY;
      const distMouse = Math.sqrt(dx * dx + dy * dy);
      const nearMouse = distMouse < this.MOUSE_RADIUS;

      const opacity = nearMouse
        ? 0.15 + (1 - distMouse / this.MOUSE_RADIUS) * 0.4
        : 0.15;
      const radius = nearMouse
        ? p.radius + (1 - distMouse / this.MOUSE_RADIUS) * 1.5
        : p.radius;

      ctx.fillStyle = this.hexToRgba(accentColor, opacity);
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();

      if (nearMouse) {
        for (const other of this.particles) {
          if (other === p) continue;
          const odx = p.x - other.x;
          const ody = p.y - other.y;
          const oDist = Math.sqrt(odx * odx + ody * ody);
          if (oDist < this.MOUSE_RADIUS) {
            const lineOpacity = (1 - oDist / this.MOUSE_RADIUS) * 0.2;
            ctx.strokeStyle = this.hexToRgba(accentColor, lineOpacity);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }
    }
  }

  private hexToRgba(hex: string, alpha: number): string {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
}
