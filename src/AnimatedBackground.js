import React, { useEffect, useRef } from 'react';

const AnimatedBackground = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Resize canvas to fill window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial resize
    resizeCanvas();
    
    // Resize listener
    window.addEventListener('resize', resizeCanvas);

    // Particle class for flexible particle generation
    class Particle {
      constructor(config) {
        const { 
          x = Math.random() * canvas.width, 
          y = Math.random() * canvas.height, 
          color = '#FFFFFF',
          size = { min: 2, max: 4 },
          speed = 0.5,
          shape = 'circle'
        } = config;

        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * (size.max - size.min) + size.min;
        this.speedX = (Math.random() - 0.5) * speed;
        this.speedY = (Math.random() - 0.5) * speed;
        this.shape = shape;
      }

      draw() {
        context.fillStyle = this.color;
        
        switch(this.shape) {
          case 'star':
            this.drawStar();
            break;
          case 'heart':
            this.drawHeart();
            break;
          case 'leaf':
            this.drawLeaf();
            break;
          case 'butterfly':
            this.drawButterfly();
            break;
          case 'smoke':
            this.drawSmoke();
            break;
          default:
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fill();
        }
      }

      drawStar() {
        context.save();
        context.translate(this.x, this.y);
        context.beginPath();
        for (let i = 0; i < 5; i++) {
          context.rotate(Math.PI * 2 / 5);
          context.lineTo(0, 0 - this.size * 1.5);
          context.lineTo(0, 0 - this.size);
        }
        context.closePath();
        context.fill();
        context.restore();
      }

      drawHeart() {
        context.save();
        context.translate(this.x, this.y);
        context.beginPath();
        context.moveTo(0, 0);
        context.bezierCurveTo(this.size, -this.size, this.size * 2, this.size, 0, this.size * 2);
        context.bezierCurveTo(-this.size * 2, this.size, -this.size, -this.size, 0, 0);
        context.fill();
        context.restore();
      }

      drawLeaf() {
        context.save();
        context.translate(this.x, this.y);
        context.beginPath();
        context.ellipse(0, 0, this.size * 1.5, this.size, Math.PI / 4, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      drawButterfly() {
        context.save();
        context.translate(this.x, this.y);
        context.beginPath();
        context.ellipse(0, 0, this.size * 1.5, this.size, 0, 0, Math.PI * 2);
        context.ellipse(this.size * 2, 0, this.size * 1.5, this.size, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      drawSmoke() {
        context.save();
        context.translate(this.x, this.y);
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2);
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
    }

    // Particle generation based on theme
    const particles = [];
    const { particles: particleConfig } = theme.animation || { particles: {} };
    const {
      count = 20,
      shape = 'circle',
      color = '#FFFFFF',
      size = { min: 2, max: 4 },
      speed = 0.5
    } = particleConfig;

    for (let i = 0; i < count; i++) {
      particles.push(new Particle({
        color,
        size,
        speed,
        shape
      }));
    }

    // Animation loop
    const animate = () => {
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Request next animation frame
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 opacity-50 pointer-events-none" 
    />
  );
};

export default AnimatedBackground;