import { useEffect, useRef } from "react";

export default function Stars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    class Star {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5 + 0.5; // very small stars
        this.speed = Math.random() * 0.2 + 0.05; // slow float
        this.alpha = Math.random() * 0.5 + 0.3; // faint glow
        this.twinkle = Math.random() * 0.02 + 0.01; // twinkle speed
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${this.alpha})`; // soft star color
        ctx.shadowColor = `rgba(200, 220, 255, ${this.alpha})`;
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      update() {
        this.y -= this.speed; // float upwards
        this.alpha += (Math.random() - 0.5) * this.twinkle; // twinkle effect
        if (this.alpha < 0.2) this.alpha = 0.2;
        if (this.alpha > 0.8) this.alpha = 0.8;

        if (this.y < -this.radius) {
          this.y = canvas.height + this.radius;
          this.x = Math.random() * canvas.width;
        }

        this.draw();
      }
    }

    const stars = Array.from({ length: 150 }, () => new Star());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => star.update());
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
