import React, { useEffect, useRef } from 'react';
import { Book, Sparkles, Library, Sun } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/Card';

const CosmicHome = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    // Background animation setup
    const canvas = bgRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Star parameters
    const stars = [];
    const starCount = 200;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(13, 13, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update stars
      stars.forEach(star => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(star.x, star.y, star.size, star.size);
        
        star.y = (star.y + star.speed) % canvas.height;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

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
                  Where would you like your story to take you today?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea 
                  className="w-full p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/20 
                           text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent h-32"
                  placeholder="Describe your cosmic adventure..."
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