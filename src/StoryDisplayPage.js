import React, { useState, useEffect } from 'react';
import {
    BookOpen,
    Save,
    Clock,
    Edit,
    Trash2,
    Share2,
    Heart,
    Tag, Wand2, Rocket, Crown, Compass, Ghost, TreePine
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/Card';

// Reuse the themes from the home page
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

const StoryDisplayPage = () => {
    const [currentTheme, setCurrentTheme] = useState('fantasy');
    const [stories, setStories] = useState([
        {
            id: 1,
            title: 'The Hidden Dragon\'s Garden',
            content: `Join Emily as she discovers a magical garden where baby dragons learn to fly. 
      
In the misty mountains of Eldoria, young Emily stumbled upon a secret valley unlike any she had ever seen. Nestled between ancient stone formations, a garden sparkled with emerald leaves and crystal-like flowers. But what made this place truly magical were the baby dragons—tiny, iridescent creatures learning to spread their delicate wings.

The eldest dragon, a sapphire-scaled guardian named Zara, watched Emily with intelligent eyes. "Few humans find this place," she whispered, her voice like wind chimes. "Fewer still are welcomed."

Emily stood perfectly still, her heart racing with wonder and excitement...`,
            theme: 'fantasy',
            createdAt: new Date('2024-02-15'),
            tags: ['Dragons', 'Adventure', 'Young Readers']
        },
        // Add more sample stories
    ]);
    const [selectedStory, setSelectedStory] = useState(null);

    const theme = THEMES[currentTheme];

    const handleSaveStory = (story) => {
        // Implement save functionality
        console.log('Saving story:', story);
    };

    const handleReadLater = (story) => {
        // Implement read later functionality
        console.log('Saving for later:', story);
    };

    return (
        <div className={`min-h-screen ${theme.gradient}`}>
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <header className="mb-8 bg-white/10 backdrop-blur-md rounded-xl p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <BookOpen className="text-yellow-300" />
                            My Stories
                        </h1>
                        <div className="flex gap-3">
                            <button
                                className={`rounded-full px-4 py-2 ${theme.glassStyle} text-white flex items-center gap-2`}
                            >
                                <Edit className="w-4 h-4" /> New Story
                            </button>
                        </div>
                    </div>
                </header>

                {/* Stories Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Story List */}
                    <div className="md:col-span-2 space-y-4">
                        {stories.map(story => (
                            <Card
                                key={story.id}
                                className={`${theme.glassStyle} border-white/20 hover:scale-[1.02] transition-transform`}
                                onClick={() => setSelectedStory(story)}
                            >
                                <CardHeader>
                                    <CardTitle className="text-white flex justify-between items-center">
                                        {story.title}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSaveStory(story);
                                                }}
                                                className="text-white hover:text-yellow-300"
                                            >
                                                <Save className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleReadLater(story);
                                                }}
                                                className="text-white hover:text-blue-300"
                                            >
                                                <Clock className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </CardTitle>
                                    <CardDescription className="text-white/80 flex items-center gap-2">
                                        <Tag className="w-4 h-4" />
                                        {story.tags.join(', ')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white line-clamp-3">
                                        {story.content}
                                    </p>
                                    <div className="mt-4 text-white/70 text-sm flex justify-between">
                                        <span>Created: {story.createdAt.toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-300" />
                      Favorite
                    </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Story Details Panel */}
                    <Card
                        className={`${theme.glassStyle} border-white/20 ${selectedStory ? 'block' : 'hidden md:block'}`}
                    >
                        <CardHeader>
                            <CardTitle className="text-white">
                                {selectedStory ? selectedStory.title : 'Select a Story'}
                            </CardTitle>
                            {selectedStory && (
                                <CardDescription className="text-white/80 flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    {selectedStory.tags.join(', ')}
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent>
                            {selectedStory ? (
                                <>
                                    <div className="prose prose-invert max-h-[60vh] overflow-y-auto">
                                        {selectedStory.content}
                                    </div>
                                    <div className="mt-6 flex justify-between">
                                        <button
                                            className={`${theme.buttonStyle} text-white px-4 py-2 rounded-xl flex items-center gap-2`}
                                        >
                                            <Edit className="w-5 h-5" /> Edit
                                        </button>
                                        <div className="flex gap-3">
                                            <button
                                                className="text-white hover:text-red-300"
                                                onClick={() => {/* Delete story logic */}}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="text-white hover:text-blue-300"
                                                onClick={() => {/* Share story logic */}}
                                            >
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="text-white/60 text-center">
                                    Select a story to view its full content
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Theme Switcher */}
                <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-4">
                    <h3 className="text-white text-xl mb-4">Change Story View Theme</h3>
                    <div className="flex gap-3">
                        {Object.entries(THEMES).map(([key, themeData]) => (
                            <button
                                key={key}
                                onClick={() => setCurrentTheme(key)}
                                className={`p-3 rounded-xl transition-all duration-300 ${
                                    currentTheme === key
                                        ? `${themeData.buttonStyle} scale-105`
                                        : 'bg-white/10 hover:scale-105'
                                }`}
                            >
                                <span className="text-white">{themeData.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryDisplayPage;