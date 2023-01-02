import { useClass, useResize } from "@/hook";
import { useEffect, useRef, useState } from "react";
import style from "./particle.module.scss";
import { Layout } from "antd";
const cn = useClass(style);
class Particle {
  constructor(
    public x: number,
    public y: number,
    public velocityX: number,
    public velocityY: number,
    public size: number,
    public color: string,
    public canvas: HTMLCanvasElement
  ) {}
  draw() {
    const ctx = this.canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
  update() {
    if (this.x < 0 || this.x > this.canvas.width) {
      this.velocityX *= -1;
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.velocityY *= -1;
    }
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.draw();
  }
}
const particle = 50;
const colorRGB = `254, 250, 244`;
const lineDistance = 120;
const particles: Particle[] = [];
let interParticle: null | Particle = null;
const getRandomArbitrary = (min: number, max: number) =>
  Math.random() * (max - min) + min;
const createParticles = (canvas: HTMLCanvasElement, particles: Particle[]) => {
  if (particles.length) return;
  for (let i = 0; i < particle; i++) {
    const size = getRandomArbitrary(1, 3);
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const velocityX = getRandomArbitrary(-1, 1);
    const velocityY = getRandomArbitrary(-1, 1);
    const color = `rgba(${colorRGB}, ${1 - size / 3})`;
    particles.push(
      new Particle(x, y, velocityX, velocityY, size, color, canvas)
    );
  }
};
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [window, setWindow] = useState({
    innerWidth: globalThis.innerWidth,
    innerHeight: globalThis.innerHeight,
  });
  const [ref] = useResize((width, height) =>
    setWindow((prev) => ({ ...prev, innerWidth: width, innerHeight: height }))
  );
  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d")!;
    const connect = () => {
      particles.forEach((p1) => {
        particles.forEach((p2) => {
          if (p1 === p2) return;
          const x = Math.abs(p1.x - p2.x);
          if (x > lineDistance) return;
          const y = Math.abs(p1.y - p2.y);
          if (y > lineDistance) return;
          const distance = Math.sqrt(x ** 2 + y ** 2);
          if (distance > lineDistance) return;
          ctx.strokeStyle = `rgba(${colorRGB}, ${1 - distance / lineDistance})`;
          ctx.beginPath();
          ctx.lineWidth = 0.8;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });
      });
    };
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
      });
      connect();
    };
    const bindEvent = () => {
      canvas.addEventListener("mouseover", (e) => {
        if (!interParticle) {
          interParticle = new Particle(
            e.x,
            e.y,
            0,
            0,
            2,
            `rgba(${colorRGB},1)`,
            canvas
          );
          particles.push(interParticle);
        }
      });
      canvas.addEventListener("mousemove", (e) => {
        if (!interParticle) return;
        console.log(particles.length);
        interParticle.x = e.x;
        interParticle.y = e.y;
      });
      canvas.addEventListener("mouseout", () => {
        if (!interParticle) return;
        if (particles.includes(interParticle)) {
          particles.splice(particles.indexOf(interParticle), 1);
          interParticle = null;
        }
      });
    };
    createParticles(canvas, particles);
    bindEvent();
    animate();
  }, [window]);
  return (
    <Layout
      ref={ref}
      className={cn("partcle")}
    >
      <canvas ref={canvasRef}></canvas>
    </Layout>
  );
};
