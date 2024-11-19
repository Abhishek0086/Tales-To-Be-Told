import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

const UniverseLanding = () => {
  const mountRef = useRef(null);
  const [isZooming, setIsZooming] = useState(false);
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Particle geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 15000;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Create particles with random positions and colors
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 1000;
      positions[i + 1] = (Math.random() - 0.5) * 1000;
      positions[i + 2] = (Math.random() - 0.5) * 1000;
      
      // Color - creating a nebula effect with purples, blues, and pinks
      colors[i] = Math.random() * 0.5 + 0.5; // R
      colors[i + 1] = Math.random() * 0.3; // G
      colors[i + 2] = Math.random() * 0.5 + 0.5; // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Position camera
    camera.position.z = 500;
    
    // Animation state
    let frame = 0;
    let zoomProgress = 0;

    // Text animation setup
    const animateText = (progress) => {
      if (titleRef.current && descriptionRef.current && buttonRef.current) {
        const scale = 1 + progress * 2;
        const opacity = 1 - progress;
        const blur = progress * 10;
        
        // Animate title
        titleRef.current.style.transform = `scale(${scale}) translateZ(${progress * 500}px)`;
        titleRef.current.style.opacity = opacity;
        titleRef.current.style.filter = `blur(${blur}px)`;
        
        // Animate description with delay
        const descDelay = Math.max(0, (progress - 0.2) * 1.25);
        descriptionRef.current.style.transform = `scale(${scale * 0.8}) translateZ(${progress * 400}px)`;
        descriptionRef.current.style.opacity = Math.max(0, 1 - descDelay);
        descriptionRef.current.style.filter = `blur(${blur * 0.8}px)`;
        
        // Animate button with more delay
        const buttonDelay = Math.max(0, (progress - 0.4) * 1.67);
        buttonRef.current.style.transform = `scale(${scale * 0.6}) translateZ(${progress * 300}px)`;
        buttonRef.current.style.opacity = Math.max(0, 1 - buttonDelay);
        buttonRef.current.style.filter = `blur(${blur * 0.6}px)`;
      }
    };
    
    // Animation loop
    const animate = () => {
      frame = requestAnimationFrame(animate);
      
      // Rotate particle system slowly
      particleSystem.rotation.x += 0.0001;
      particleSystem.rotation.y += 0.0002;
      
      // Handle zooming animation
      if (isZooming) {
        zoomProgress += 0.01;
        camera.position.z = 500 * (1 - zoomProgress);
        particlesMaterial.opacity = Math.max(0, 1 - zoomProgress * 2);
        
        // Animate text elements
        animateText(zoomProgress);
        
        if (zoomProgress >= 1) {
          cancelAnimationFrame(frame);
          navigate('/home');
          return;
        }
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frame);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [isZooming, navigate]);

  return (
    <div className="relative">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="relative z-10 h-screen flex flex-col items-center justify-center text-white perspective-1000">
        <h1 
          ref={titleRef}
          className="text-6xl font-bold mb-8 text-center transition-all duration-300 transform-gpu"
          style={{ transformStyle: 'preserve-3d' }}
        >
          Tales To Be Heard
        </h1>
        <p 
          ref={descriptionRef}
          className="text-xl mb-12 text-center max-w-2xl px-4 transition-all duration-300 transform-gpu"
          style={{ transformStyle: 'preserve-3d' }}
        >
          Embark on a journey through stories as vast as the universe itself
        </p>
        <button
          ref={buttonRef}
          onClick={() => setIsZooming(true)}
          className="px-8 py-4 text-lg bg-white/10 backdrop-blur-sm rounded-full 
                   hover:bg-white/20 transition-all duration-300 border border-white/30 transform-gpu"
          style={{ transformStyle: 'preserve-3d' }}
        >
          Begin Your Journey
        </button>
      </div>
    </div>
  );
};

export default UniverseLanding;