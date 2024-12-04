import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Textarea from './components/ui/Textarea';
import { Wand2, Rocket, Crown, Compass, TreePine, Ghost } from 'lucide-react';

// Theme icons mapping
const THEME_ICONS = {
  fantasy: Wand2,
  scifi: Rocket,
  fairytale: Crown,
  adventure: Compass,
  mystery: Ghost,
  woodland: TreePine,
};

const StoryGenerationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State management
  const [theme, setTheme] = useState('fantasy');
  const [userPrompt, setUserPrompt] = useState('');
  const [storyText, setStoryText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize theme from navigation state
  useEffect(() => {
    const initialTheme = location.state && location.state.initialTheme ? location.state.initialTheme : 'fantasy';
    setTheme(initialTheme);
  }, [location.state]);

  // Story generation function
  const generateStory = async () => {
    // Reset previous state
    setStoryText('');
    setError(null);

    // Validate inputs
    if (!theme.trim()) {
      setError('Please select a story theme');
      return;
    }
    if (!userPrompt.trim()) {
      setError('Please provide a story prompt');
      return;
    }

    // Set loading state
    setIsLoading(true);

    try {
      // Make API call to backend
      const response = await axios.post('/api/generate-story', {
        theme: theme,
        userPrompt: userPrompt,
      });

      // Update story text
      setStoryText(response.data.content);
    } catch (err) {
      // Handle potential errors
      console.error('Story generation failed', err);
      setError('Failed to generate story. Please try again.');
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  // Get the icon for the current theme
  const ThemeIcon = THEME_ICONS[theme] || THEME_ICONS.fantasy;

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-br from-purple-400 to-indigo-500">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center space-x-4">
          <ThemeIcon className="w-10 h-10 text-purple-600" />
          <div>
            <CardTitle>Story Generator</CardTitle>
            <p className="text-muted-foreground">Create a magical story in the {theme} theme</p>
          </div>
        </CardHeader>
        <CardContent>
          {/* Theme Selection */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Choose Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(THEME_ICONS).map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => setTheme(themeOption)}
                  className={`p-2 rounded-lg flex flex-col items-center ${
                    theme === themeOption
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {React.createElement(THEME_ICONS[themeOption], {
                    className: `w-6 h-6 ${theme === themeOption ? 'text-white' : 'text-purple-500'}`,
                  })}
                  <span className="text-xs mt-1">{themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="mb-4">
            <label htmlFor="story-prompt" className="block mb-2 text-sm font-medium">
              Story Prompt
            </label>
            <Input
              id="story-prompt"
              placeholder="Describe the characters, setting, or initial scenario..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Error Handling */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          {/* Generate Story Button */}
          <Button onClick={generateStory} disabled={isLoading} className="w-full mb-4">
            {isLoading ? 'Generating Story...' : 'Create Story Magic!'}
          </Button>

          {/* Story Display */}
          {storyText && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Your Magical Story</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea value={storyText} readOnly className="w-full min-h-[300px]" />
                <div className="flex justify-end mt-4 space-x-2">
                  <Button variant="outline" onClick={() => navigate('/stories')}>
                    Save to Library
                  </Button>
                  <Button onClick={() => generateStory()}>Regenerate</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryGenerationPage;
