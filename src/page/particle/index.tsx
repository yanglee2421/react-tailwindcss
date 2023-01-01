import { useClass } from "@/hook";
import { useEffect, useRef, useState } from "react";
import style from "./particle.module.scss";
import { Layout } from "antd";
const cn = useClass(style);
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [window, setWindow] = useState({
    innerWidth: globalThis.innerWidth,
    innerHeight: globalThis.innerHeight,
  });
  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const particle = 50;
    const lineDistance = 120;
    const colorRGB = `254, 250, 244`;
    const particles: Particle[] = [];
    class Particle {
      constructor(
        public x: number,
        public y: number,
        public velocityX: number,
        public velocityY: number,
        public size: number,
        public color: string
      ) {}
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
      }
      update() {
        if (this.x < 0 || this.x > canvas.width) {
          this.velocityX *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.velocityY *= -1;
        }
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.draw();
      }
    }
    const getRandomArbitrary = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const createParticles = () => {
      for (let i = 0; i < particle; i++) {
        const size = getRandomArbitrary(1, 3);
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const velocityX = getRandomArbitrary(-2, 2);
        const velocityY = getRandomArbitrary(-2, 2);
        const color = `rgba(${colorRGB}, ${1 - size / 3})`;
        particles.push(new Particle(x, y, velocityX, velocityY, size, color));
      }
    };
    const connect = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < particles.length; j++) {
          const p1 = particles.at(i)!;
          const p2 = particles.at(j)!;
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          if (distance < lineDistance) {
            ctx.strokeStyle = `rgba(${colorRGB}, ${
              1 - distance / lineDistance
            })`;
            ctx.beginPath();
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };
    const animate = () => {
      requestAnimationFrame(animate);
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
      });
      connect();
    };
    createParticles();
    animate();
  }, [window]);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    globalThis.addEventListener(
      "resize",
      () => {
        setWindow((prev) => ({
          ...prev,
          innerWidth: globalThis.innerWidth,
          innerHeight: globalThis.innerHeight,
        }));
      },
      { signal }
    );
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <Layout className={cn("partcle")}>
      <canvas ref={canvasRef}></canvas>
    </Layout>
  );
};
