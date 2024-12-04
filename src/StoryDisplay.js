import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Wand2, 
  Rocket, 
  Crown, 
  Compass, 
  TreePine,
  Ghost,
  Sparkles,
  BookOpen,
  Download,
  Share2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/Card';
import AnimatedBackground from './AnimatedBackground';  // Assuming you extract AnimatedBackground from the previous code

// Reuse the THEMES object from the previous component
const THEMES = {
  fantasy: {
    name: 'Fantasy',
    icon: Wand2,
    gradient: 'bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500',
    accentColor: 'text-purple-300',
    glassStyle: 'bg-white/20 hover:bg-white/30 backdrop-blur-md',
    buttonStyle: 'bg-purple-500/30 hover:bg-purple-500/40',
  },
  // ... other theme definitions from previous component
};

const StoryDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract story data from location state or use a fallback
  const [storyData, setStoryData] = useState(
    location.state?.story || {
      title: "The Magical Journey",
      content: "No story found. Please generate a story first.",
      theme: "fantasy"
    }
  );

  // Derive theme from story's theme
  const theme = THEMES[storyData.theme] || THEMES.fantasy;

  // Story actions
  const handleDownloadStory = () => {
    const blob = new Blob([`Title: ${storyData.title}\n\n${storyData.content}`], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${storyData.title.replace(/\s+/g, '_')}.txt`;
    link.click();
  };

  const handleShareStory = () => {
    if (navigator.share) {
      navigator.share({
        title: storyData.title,
        text: storyData.content
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(storyData.content).then(() => {
        alert('Story copied to clipboard!');
      });
    }
  };

  return (
    <div className={`min-h-screen ${theme.gradient}`}>
      <AnimatedBackground theme={theme} />
      
      <div className="relative z-10">
        {/* Header - similar to home page */}
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
                  onClick={() => navigate('/')}
                  className={`rounded-full px-6 py-2 ${theme.glassStyle} font-medium flex items-center gap-2`}
                >
                  <BookOpen className="w-4 h-4" />
                  Create New Story
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Story Display Card */}
            <Card className={`md:col-span-2 ${theme.glassStyle} border-white/20`}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  {React.createElement(theme.icon, { className: theme.accentColor })}
                  {storyData.title}
                </CardTitle>
                <CardDescription className="text-white/80">
                  A magical story in the {storyData.theme} theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  {storyData.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-white/90 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Story Actions */}
                <div className="mt-6 flex gap-4">
                  <button 
                    onClick={handleDownloadStory}
                    className={`px-6 py-3 rounded-xl ${theme.buttonStyle} text-white font-medium flex items-center gap-2 hover:scale-105 transition-all`}
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button 
                    onClick={handleShareStory}
                    className={`px-6 py-3 rounded-xl ${theme.buttonStyle} text-white font-medium flex items-center gap-2 hover:scale-105 transition-all`}
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Story Details Sidebar */}
            <Card className={`${theme.glassStyle} border-white/20`}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Crown className={theme.accentColor}/>
                  Story Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Theme</h4>
                    <div className="flex items-center gap-2">
                      {React.createElement(theme.icon, { className: `${theme.accentColor} w-6 h-6` })}
                      <span className="text-white">{storyData.theme.charAt(0).toUpperCase() + storyData.theme.slice(1)}</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Word Count</h4>
                    <p className="text-white">{storyData.content.split(' ').length} words</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Created</h4>
                    <p className="text-white">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer - similar to home page */}
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

export default StoryDisplay;