import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Wand2, 
  Rocket, 
  Crown, 
  Compass, 
  TreePine,
  Ghost,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/Card';
import AnimatedBackground from './AnimatedBackground';  // Extracted AnimatedBackground component

// THEMES object remains the same as in the previous implementation
const THEMES = {
  fantasy: {
    name: 'Fantasy',
    icon: Wand2,
    gradient: 'bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500',
    accentColor: 'text-purple-300',
    glassStyle: 'bg-white/20 hover:bg-white/30 backdrop-blur-md',
    buttonStyle: 'bg-purple-500/30 hover:bg-purple-500/40',
    animation: {
      particles: {
        shape: 'star',
        color: '#FFD700',
        count: 20,
        size: { min: 2, max: 4 },
        speed: 0.5,
        spin: true
      }
    }
  },
  scifi: {
    name: 'Sci-Fi',
    icon: Rocket,
    gradient: 'bg-gradient-to-br from-cyan-500 via-blue-400 to-indigo-500',
    accentColor: 'text-cyan-300',
    glassStyle: 'bg-white/20 hover:bg-white/30 backdrop-blur-md',
    buttonStyle: 'bg-blue-500/30 hover:bg-blue-500/40',
    animation: {
      particles: {
        shape: 'circle',
        color: '#00FFFF',
        count: 25,
        size: { min: 1, max: 3 },
        speed: 1,
        pulse: true
      }
    }
  },
  fairytale: {
    name: 'Fairy Tale',
    icon: Crown,
    gradient: 'bg-gradient-to-br from-pink-400 via-rose-300 to-yellow-300',
    accentColor: 'text-pink-300',
    glassStyle: 'bg-white/20 hover:bg-white/30 backdrop-blur-md',
    buttonStyle: 'bg-pink-500/30 hover:bg-pink-500/40',
    animation: {
      particles: {
        shape: 'heart',
        color: '#FF69B4',
        count: 15,
        size: { min: 2, max: 4 },
        speed: 0.3,
        float: true
      }
    }
  },
  adventure: {
    name: 'Adventure',
    icon: Compass,
    gradient: 'bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400',
    accentColor: 'text-emerald-300',
    glassStyle: 'bg-white/20 hover:bg-white/30 backdrop-blur-md',
    buttonStyle: 'bg-emerald-500/30 hover:bg-emerald-500/40',
    animation: {
      particles: {
        shape: 'leaf',
        color: '#90EE90',
        count: 20,
        size: { min: 2, max: 4 },
        speed: 0.4,
        swing: true
      }
    }
  },
  mystery: {
    name: 'Mystery',
    icon: Ghost,
    gradient: 'bg-gradient-to-br from-violet-500 via-purple-400 to-indigo-400',
    accentColor: 'text-violet-300',
    glassStyle: 'bg-white/20 hover:bg-white/30 backdrop-blur-md',
    buttonStyle: 'bg-violet-500/30 hover:bg-violet-500/40',
    animation: {
      particles: {
        shape: 'smoke',
        color: '#9370DB',
        count: 15,
        size: { min: 3, max: 5 },
        speed: 0.2,
        fade: true
      }
    }
  },
  woodland: {
    name: 'Woodland',
    icon: TreePine,
    gradient: 'bg-gradient-to-br from-lime-400 via-green-300 to-emerald-400',
    accentColor: 'text-lime-300',
    glassStyle: 'bg-white/20 hover:bg-white/30 backdrop-blur-md',
    buttonStyle: 'bg-lime-500/30 hover:bg-lime-500/40',
    animation: {
      particles: {
        shape: 'butterfly',
        color: '#98FB98',
        count: 12,
        size: { min: 2, max: 4 },
        speed: 0.3,
        flutter: true
      }
    }
  }
};

// Helper function to get theme tip (same as previous implementation)
const getThemeTip = (theme) => {
  const tips = {
    fantasy: "Include magical creatures and enchanted objects in your story!",
    scifi: "Think about future technology and amazing space adventures!",
    fairytale: "Start with 'Once upon a time...' and add some royal characters!",
    adventure: "Make your hero face exciting challenges and discover treasures!",
    mystery: "Create suspense by adding clues for your readers to solve!",
    woodland: "Write about talking animals and the secrets of the forest!"
  };
  return tips[theme] || tips.fantasy;
};

// Helper function to get theme story starters (same as previous implementation)
const getThemeStarters = (theme) => {
  const starters = {
    fantasy: [
      "The ancient spell book glowed with a mysterious light...",
      "The dragon's egg began to crack just as the moon rose...",
      "The magical map appeared on my bedroom wall..."
    ],
    scifi: [
      "The robot's eyes flickered to life for the first time...",
      "Our spaceship's alarm suddenly started beeping...",
      "The time machine whirred and sparkled..."
    ],
    fairytale: [
      "Once upon a time, in a castle made of clouds...",
      "The princess wasn't like any other princess...",
      "The magical mirror showed a different world..."
    ],
    adventure: [
      "The treasure map fell out of the old book...",
      "The secret cave entrance slowly opened...",
      "The compass pointed to a direction that didn't exist..."
    ],
    mystery: [
      "The old house held more secrets than anyone knew...",
      "The strange footprints led to nowhere...",
      "The mysterious letter arrived on a rainy Tuesday..."
    ],
    woodland: [
      "The wise old owl called a forest meeting...",
      "Deep in the enchanted forest, there was a tiny door...",
      "The talking squirrel had an important message..."
    ]
  };
  return starters[theme] || starters.fantasy;
};


const CosmicHome = () => {
  const navigate = useNavigate();

  // State management
  const [currentTheme, setCurrentTheme] = useState('fantasy');
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Derive theme from current selection
  const theme = THEMES[currentTheme];

  // Story generation function with navigation
  const generateStory = async () => {
    // Validate user prompt
    if (!userPrompt.trim()) {
      alert('Please provide a story prompt!');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate story generation API call
      // In a real application, replace this with your actual API endpoint
      const response = await axios.post('/api/generate-story', {
        theme: currentTheme,
        userPrompt: userPrompt
      });
      
      // Navigate to story display page with generated story data
      navigate('/story', { 
        state: { 
          story: {
            title: response.data.title || 'Untitled Story', // Fallback title
            content: response.data.content || 'No content generated.', // Fallback content
            theme: currentTheme
          } 
        } 
      });
    } catch (error) {
      console.error("Story generation failed", error);
      // Optionally show an error message to the user
      alert('Failed to generate story. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Story list navigation handler
  const handleCreateStory = () => {
    navigate('/stories');
  };

  return (
    <div className={`min-h-screen ${theme.gradient}`}>
      <AnimatedBackground theme={theme} />
      
      <div className="relative z-10">
        {/* Header - Remains the same as previous implementation */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Sparkles className="animate-spin-slow text-yellow-300" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
                  Story Magic
                </span>
              </h1>
              <nav className="flex gap-3">
                <button 
                  onClick={handleCreateStory}
                  className={`rounded-full px-6 py-2 ${theme.glassStyle} font-medium flex items-center gap-2`}
                >
                  <BookOpen className="w-4 h-4" />
                  My Stories
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content - Remains largely the same */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Story Creation Card */}
            <Card className={`md:col-span-2 ${theme.glassStyle} border-white/20`}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  {React.createElement(theme.icon, { className: theme.accentColor })}
                  Create Your Story
                </CardTitle>
                <CardDescription className="text-white/80">
                  Pick your favorite story world and let your imagination fly!
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Theme Selection - Remains the same */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {Object.entries(THEMES).map(([key, themeData]) => {
                    const IconComponent = themeData.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => setCurrentTheme(key)}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          currentTheme === key
                            ? `${themeData.buttonStyle} border-white/50 scale-105`
                            : 'bg-white/10 border-white/20 hover:scale-105'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <IconComponent className={`w-8 h-8 ${themeData.accentColor}`}/>
                          <span className="text-white font-medium">{themeData.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Prompt Input */}
                <textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/30 h-40 resize-none text-lg"
                  placeholder={`Provide specific details for your ${currentTheme} story. For example: "A brave robot who helps lost animals" or "A mysterious treasure hidden in an ancient forest"`}
                />

                {/* Story Generation Button */}
                <button 
                  onClick={generateStory}
                  disabled={isLoading || !userPrompt.trim()}
                  className={`mt-4 w-full px-6 py-3 rounded-xl ${theme.buttonStyle} text-white font-medium text-lg transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 ${
                    (isLoading || !userPrompt.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <span>Generating Magic...</span>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Create Magic!
                    </>
                  )}
                </button>
              </CardContent>
            </Card>

            {/* Story Showcase Card - Remains the same */}
            <Card className={`${theme.glassStyle} border-white/20`}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Crown className={theme.accentColor}/>
                  Today's Special Story
                </CardTitle>
                <CardDescription className="text-white/80">
                  A magical story picked just for you!
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Content remains the same as previous implementation */}
                <div className="space-y-4">
                  <div className={`relative overflow-hidden rounded-lg h-40 ${theme.glassStyle} p-4 group cursor-pointer`}>
                    <div className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-50"
                         style={{
                           backgroundImage: `url('/api/placeholder/400/320')`,
                           backgroundSize: 'cover',
                           backgroundPosition: 'center'
                         }} />
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2">
                        The Hidden Dragon's Garden
                      </h3>
                      <p className="text-white/80 line-clamp-3">
                        Join Emily as she discovers a magical garden where baby dragons learn to fly...
                      </p>
                    </div>
                  </div>

                  {/* Read Now button */}
                  <button 
                  onClick={handleCreateStory}
                  className={`w-full px-6 py-3 rounded-xl ${theme.buttonStyle} text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}>
                    <BookOpen className="w-5 h-5" />
                    Read Now
                  </button>
                </div>

                {/* Story Writing Tips */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-white font-medium">Story Helper</h4>
                  <div className={`rounded-lg ${theme.glassStyle} p-4`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${theme.buttonStyle}`}>
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white/90 text-sm">
                          Tip: {getThemeTip(currentTheme)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Story Starters Section */}
          <div className="mt-8">
            <Card className={`${theme.glassStyle} border-white/20`}>
              <CardHeader>
                <CardTitle className="text-white">Story Starters</CardTitle>
                <CardDescription className="text-white/80">
                  Need help? Try these magical beginnings!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getThemeStarters(currentTheme).map((starter, index) => (
                    <button
                      key={index}
                      onClick={() => setUserPrompt(starter)}
                      className={`p-4 rounded-xl ${theme.buttonStyle} text-white text-left hover:scale-105 transition-all duration-300`}
                    >
                      "{starter.substring(0, 60)}..."
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer - Remains the same */}
        <footer className="mt-8 bg-white/10 backdrop-blur-md border-t border-white/20 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <p className="text-white/80 text-sm">
                Created with 💫 for young storytellers
              </p>
              <button className={`rounded-full px-4 py-2 ${theme.glassStyle} text-sm font-medium`}>
                Need Help?
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CosmicHome;