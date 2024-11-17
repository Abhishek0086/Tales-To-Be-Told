import React, { useEffect, useRef, useState } from 'react';
import { Book, Sparkles, Library, Sun, Moon, Cloud, Stars,  Flame, Droplets } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/Card';

const THEMES = {
  cosmic: {
    name: 'Cosmic',
    icon: Stars,
    background: '#1b1f54', // Deep space blue
    particleColor: 'rgba(135, 206, 250, 0.9)', // Sky blue
    particleCount: 250,
    particleSpeed: 1,
    particleSize: 3,
    fadeSpeed: 0.05,
  },
  fire: {
    name: 'Fire',
    icon: Flame,
    background: '#ff4500', // Bright orange-red
    particleColor: 'rgba(255, 255, 102, 0.9)', // Bright yellow
    particleCount: 200,
    particleSpeed: 2.5,
    particleSize: 4,
    fadeSpeed: 0.1,
  },
  ocean: {
    name: 'Ocean',
    icon: Droplets,
    background: '#0077be', // Vivid ocean blue
    particleColor: 'rgba(0, 255, 255, 0.9)', // Aqua
    particleCount: 180,
    particleSpeed: 0.7,
    particleSize: 3.5,
    fadeSpeed: 0.07,
  },
  forest: {
    name: 'Forest',
    icon: Cloud,
    background: '#228b22', // Forest green
    particleColor: 'rgba(173, 255, 47, 0.9)', // Bright lime green
    particleCount: 200,
    particleSpeed: 1,
    particleSize: 3,
    fadeSpeed: 0.08,
  },
  desert: {
    name: 'Desert',
    icon: Sun,
    background: '#f4a460', // Sandy orange
    particleColor: 'rgba(255, 223, 0, 0.9)', // Bright golden yellow
    particleCount: 150,
    particleSpeed: 1.2,
    particleSize: 3.5,
    fadeSpeed: 0.09,
  },
  night: {
    name: 'Night',
    icon: Moon,
    background: '#191970', // Midnight blue
    particleColor: 'rgba(218, 112, 214, 0.9)', // Orchid purple
    particleCount: 250,
    particleSpeed: 0.8,
    particleSize: 2.5,
    fadeSpeed: 0.1,
  }
};


const CosmicHome = () => {
  const bgRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('cosmic');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const canvas = bgRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles based on current theme
    const theme = THEMES[currentTheme];
    const newParticles = Array.from({ length: theme.particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * theme.particleSize,
      speed: Math.random() * theme.particleSpeed,
      angle: Math.random() * Math.PI * 2, // For more varied movement
      spin: Math.random() * 0.02 - 0.01   // For rotation
    }));
    
    setParticles(newParticles);
    
    const animate = () => {
      ctx.fillStyle = `${theme.background}${Math.floor(theme.fadeSpeed * 255).toString(16).padStart(2, '0')}`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.fillStyle = theme.particleColor;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        
        // Update particle position with varied movement
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.angle += particle.spin;
        
        // Wrap particles around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [currentTheme]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <canvas ref={bgRef} className="absolute inset-0 -z-10" />
      
      <div className="relative z-10">
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-purple-300" />
                Tales To Be Heard
              </h1>
              <nav className="space-x-4">
                <button className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white 
                                 hover:bg-white/20 transition-all duration-300 border border-white/30">
                  Create Story
                </button>
                <button className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white 
                                 hover:bg-white/20 transition-all duration-300 border border-white/30">
                  Library
                </button>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Create Your Story</CardTitle>
                <CardDescription className="text-gray-200">
                  Choose a theme and begin your journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {Object.entries(THEMES).map(([key, theme]) => {
                    const IconComponent = theme.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => setCurrentTheme(key)}
                        className={`p-4 rounded-lg border transition-all duration-300 flex flex-col items-center gap-2
                                  ${currentTheme === key 
                                    ? 'bg-white/20 border-white/50' 
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                      >
                        <IconComponent className={`w-6 h-6 ${currentTheme === key ? 'text-white' : 'text-gray-400'}`} />
                        <span className={`text-sm ${currentTheme === key ? 'text-white' : 'text-gray-400'}`}>
                          {theme.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <textarea 
                  className="w-full p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/20 
                           text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent h-32"
                  placeholder="Describe your adventure..."
                />
                <button className="mt-4 w-full px-6 py-3 rounded-lg bg-purple-600/80 text-white 
                                 hover:bg-purple-600 transition-all duration-300">
                  Generate Story
                </button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sun className="text-yellow-300" />
                  Story of the Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    The Cosmic Explorer
                  </h3>
                  <p className="text-gray-200">
                    Journey through the stars with today's featured tale...
                  </p>
                  <button className="w-full px-6 py-3 rounded-lg bg-white/10 text-white 
                                   hover:bg-white/20 transition-all duration-300 border border-white/30">
                    Read Now
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CosmicHome;