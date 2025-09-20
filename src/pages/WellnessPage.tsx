import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Wind, 
  Headphones, 
  BookOpen, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  Timer,
  Brain,
  Palette
} from 'lucide-react';

interface WellnessPageProps {
  isShieldMode?: boolean;
  user?: any;
}

export const WellnessPage = ({ isShieldMode, user }: WellnessPageProps) => {
  const [activeBreathingExercise, setActiveBreathingExercise] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const breathingExercises = [
    {
      id: 'box-breathing',
      title: isShieldMode ? 'Focus Breathing' : 'Box Breathing',
      description: '4-4-4-4 pattern for calm focus',
      duration: '5 min',
      difficulty: 'Beginner',
      benefits: ['Reduces stress', 'Improves focus', 'Calms anxiety']
    },
    {
      id: 'deep-breathing',
      title: isShieldMode ? 'Energy Breathing' : 'Deep Belly Breathing',
      description: 'Slow, deep breaths for relaxation',
      duration: '8 min',
      difficulty: 'Beginner',
      benefits: ['Deep relaxation', 'Better sleep', 'Stress relief']
    },
    {
      id: 'wim-hof',
      title: isShieldMode ? 'Power Breathing' : 'Energizing Breath',
      description: 'Controlled breathing for energy',
      duration: '10 min',
      difficulty: 'Advanced',
      benefits: ['Increases energy', 'Boosts immunity', 'Mental clarity']
    }
  ];

  const audioLibrary = [
    {
      id: 'rain-sounds',
      title: 'Gentle Rain',
      category: 'Nature',
      duration: '30:00',
      description: 'Soft rainfall for deep relaxation'
    },
    {
      id: 'meditation',
      title: isShieldMode ? 'Focus Session' : 'Guided Meditation',
      category: 'Meditation',
      duration: '15:00',
      description: 'Mindfulness practice for inner peace'
    },
    {
      id: 'binaural',
      title: 'Alpha Waves',
      category: 'Binaural',
      duration: '45:00',
      description: 'Brain wave synchronization for focus'
    },
    {
      id: 'piano',
      title: 'Peaceful Piano',
      category: 'Music',
      duration: '25:00',
      description: 'Calming piano melodies'
    }
  ];

  const journalPrompts = [
    "What am I feeling grateful for today?",
    "What challenge did I overcome recently?",
    "How did I show kindness to myself or others today?",
    "What is one thing that made me smile?",
    "What would I tell my younger self?",
    "What am I looking forward to?",
    "How have I grown this week?",
    "What boundaries do I need to set?"
  ];

  const miniGames = [
    {
      title: isShieldMode ? 'Color Match' : 'Mood Colors',
      description: 'Match colors to express your current emotional state',
      icon: Palette,
      category: 'Emotional'
    },
    {
      title: isShieldMode ? 'Memory Flow' : 'Gratitude Flow',
      description: 'Connect moments of gratitude in a flowing pattern',
      icon: Heart,
      category: 'Gratitude'
    },
    {
      title: isShieldMode ? 'Focus Timer' : 'Mindful Moments',
      description: 'Quick mindfulness exercises throughout your day',
      icon: Timer,
      category: 'Mindfulness'
    }
  ];

  const handleBreathingExercise = (exerciseId: string) => {
    setActiveBreathingExercise(activeBreathingExercise === exerciseId ? null : exerciseId);
  };

  const handleAudioPlay = (audioId: string) => {
    setPlayingAudio(playingAudio === audioId ? null : audioId);
  };

  const getRandomPrompt = () => {
    return journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
  };

  return (
    <div className={`min-h-screen py-8 ${isShieldMode ? 'shield-mode' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {isShieldMode ? 'Productivity & Focus Tools' : 'Relax & Wellness Tools'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isShieldMode
                ? 'Enhance your productivity with science-backed techniques for focus and mental clarity.'
                : 'Discover personalized tools to support your mental wellness journey and find inner peace.'
              }
            </p>
          </div>

          <Tabs defaultValue="breathing" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 glass">
              <TabsTrigger value="breathing">
                <Wind className="w-4 h-4 mr-2" />
                {isShieldMode ? 'Focus' : 'Breathing'}
              </TabsTrigger>
              <TabsTrigger value="audio">
                <Headphones className="w-4 h-4 mr-2" />
                Audio
              </TabsTrigger>
              <TabsTrigger value="journal">
                <BookOpen className="w-4 h-4 mr-2" />
                {isShieldMode ? 'Notes' : 'Journal'}
              </TabsTrigger>
              <TabsTrigger value="games">
                <Brain className="w-4 h-4 mr-2" />
                {isShieldMode ? 'Games' : 'Mindful Games'}
              </TabsTrigger>
            </TabsList>

            {/* Breathing Exercises */}
            <TabsContent value="breathing" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {breathingExercises.map((exercise) => (
                  <Card key={exercise.id} className="wellness-card shadow-soft">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{exercise.title}</CardTitle>
                        <Badge variant={exercise.difficulty === 'Beginner' ? 'secondary' : 'default'}>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Timer className="w-4 h-4 mr-1" />
                          {exercise.duration}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Benefits:</p>
                        <div className="flex flex-wrap gap-1">
                          {exercise.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => handleBreathingExercise(exercise.id)}
                        className={`w-full transition-smooth ${
                          activeBreathingExercise === exercise.id
                            ? 'wellness-gradient'
                            : 'primary-gradient hover:shadow-glow'
                        }`}
                      >
                        {activeBreathingExercise === exercise.id ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Stop Exercise
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Exercise
                          </>
                        )}
                      </Button>

                      {activeBreathingExercise === exercise.id && (
                        <div className="p-4 rounded-lg bg-primary/5 border text-center">
                          <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4 breathe-animation">
                            <Wind className="w-8 h-8 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Follow the breathing pattern...
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Audio Library */}
            <TabsContent value="audio" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {audioLibrary.map((audio) => (
                  <Card key={audio.id} className="wellness-card shadow-soft">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{audio.title}</CardTitle>
                        <Badge variant="outline">{audio.category}</Badge>
                      </div>
                      <CardDescription>{audio.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{audio.duration}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleAudioPlay(audio.id)}
                          className="flex-1 transition-smooth primary-gradient hover:shadow-glow"
                        >
                          {playingAudio === audio.id ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Play
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="icon">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>

                      {playingAudio === audio.id && (
                        <div className="p-3 rounded-lg bg-primary/5 border">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm">Now playing...</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Journaling */}
            <TabsContent value="journal" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      {isShieldMode ? 'AI-Generated Reflection Prompts' : 'AI-Generated Journal Prompts'}
                    </CardTitle>
                    <CardDescription>
                      {isShieldMode
                        ? 'Thoughtful prompts to help you reflect on your productivity and goals.'
                        : 'Personalized prompts to guide your wellness journey and self-reflection.'
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border">
                      <blockquote className="text-lg italic font-medium">
                        "{getRandomPrompt()}"
                      </blockquote>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        className="transition-smooth"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        New Prompt
                      </Button>
                      <Button className="primary-gradient transition-smooth">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Writing
                      </Button>
                    </div>

                    {!user && (
                      <div className="p-4 rounded-lg bg-muted/50 border text-center">
                        <p className="text-sm text-muted-foreground">
                          Sign in to save your journal entries and track your progress over time.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Mini Games */}
            <TabsContent value="games" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {miniGames.map((game, index) => {
                  const Icon = game.icon;
                  return (
                    <Card key={index} className="wellness-card shadow-soft hover:shadow-strong">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{game.title}</CardTitle>
                        <CardDescription>{game.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="secondary">{game.category}</Badge>
                        </div>
                        <Button className="w-full primary-gradient hover:shadow-glow transition-smooth">
                          <Play className="w-4 h-4 mr-2" />
                          Play Game
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};