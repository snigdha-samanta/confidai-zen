import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Brain, 
  BookOpen, 
  Headphones, 
  BarChart3, 
  Shield,
  ArrowRight,
  Sparkles,
  Users,
  Clock
} from 'lucide-react';

interface HomePageProps {
  user?: any;
  isShieldMode?: boolean;
  onAuthClick: () => void;
}

export const HomePage = ({ user, isShieldMode, onAuthClick }: HomePageProps) => {
  const features = [
    {
      icon: Heart,
      title: isShieldMode ? 'Health Tracking' : 'Mental Wellness',
      description: isShieldMode 
        ? 'Track your daily health metrics and productivity patterns'
        : 'Personalized support for your mental health journey with AI-powered insights',
      href: '/wellness',
      color: 'wellness'
    },
    {
      icon: Brain,
      title: isShieldMode ? 'AI Assistant' : 'AI Companion',
      description: isShieldMode
        ? 'Smart productivity assistant for better work-life balance'
        : 'Intelligent chatbot trained in mental health support and crisis intervention',
      href: '/chat',
      color: 'primary'
    },
    {
      icon: BookOpen,
      title: isShieldMode ? 'Digital Notes' : 'Wellness Journal',
      description: isShieldMode
        ? 'Organize your thoughts and track daily progress'
        : 'Guided journaling with mood tracking and emotional pattern analysis',
      href: '/journal',
      color: 'secondary'
    },
    {
      icon: Headphones,
      title: isShieldMode ? 'Audio Content' : 'Empathy Voice',
      description: isShieldMode
        ? 'Curated audio content for focus and relaxation'
        : 'Multilingual voice AI with emotional intelligence and cultural sensitivity',
      href: '/voice',
      color: 'tertiary'
    }
  ];

  const stats = [
    { label: isShieldMode ? 'Users Helped' : 'Lives Improved', value: '50K+', icon: Users },
    { label: isShieldMode ? 'Success Rate' : 'Wellness Score Improvement', value: '94%', icon: BarChart3 },
    { label: isShieldMode ? 'Available' : 'Crisis Support Available', value: '24/7', icon: Clock },
  ];

  return (
    <div className={`min-h-screen ${isShieldMode ? 'shield-mode' : ''}`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 calm-gradient opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              {isShieldMode ? 'Productivity Reimagined' : 'AI-Powered Mental Wellness'}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {isShieldMode ? (
                <>
                  Boost Your <span className="primary-gradient bg-clip-text text-transparent">Productivity</span>
                  <br />
                  With AI Assistance
                </>
              ) : (
                <>
                  Your Mental Health <span className="primary-gradient bg-clip-text text-transparent">Companion</span>
                  <br />
                  Powered by AI
                </>
              )}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isShieldMode 
                ? 'Intelligent tools to optimize your workflow, manage tasks, and maintain work-life balance with personalized insights.'
                : 'Personalized support, guided wellness tools, and 24/7 crisis intervention in a safe, judgment-free environment.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Button asChild size="lg" className="primary-gradient hover:shadow-glow transition-smooth">
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              ) : (
                <Button 
                  onClick={onAuthClick}
                  size="lg" 
                  className="primary-gradient hover:shadow-glow transition-smooth"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              
              <Button variant="outline" size="lg" className="transition-smooth hover:shadow-medium">
                <Link to="/wellness" className="flex items-center">
                  {isShieldMode ? 'Explore Tools' : 'Explore Wellness Tools'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <Icon className="w-8 h-8 mx-auto text-primary" />
                  <div className="text-3xl font-bold primary-gradient bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isShieldMode ? 'Productivity Features' : 'Comprehensive Wellness Suite'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isShieldMode
                ? 'Everything you need to optimize your productivity and maintain focus'
                : 'Integrated tools designed to support every aspect of your mental wellness journey'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="wellness-card group shadow-soft hover:shadow-strong">
                  <CardHeader className="space-y-4">
                    <div className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                      <Icon className={`w-6 h-6 text-${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <Button 
                      asChild 
                      variant="ghost" 
                      className="mt-4 p-0 h-auto text-primary hover:text-primary-hover"
                    >
                      <Link to={feature.href} className="inline-flex items-center">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Privacy Section for Shield Mode */}
      {isShieldMode && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <Shield className="w-16 h-16 mx-auto text-primary" />
              <h3 className="text-2xl font-bold">Privacy Mode Active</h3>
              <p className="text-muted-foreground">
                Your activity is private and secure. This productivity interface helps maintain confidentiality while you access wellness resources.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 primary-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8 text-white">
            <h3 className="text-3xl md:text-4xl font-bold">
              {isShieldMode 
                ? 'Ready to Optimize Your Productivity?' 
                : 'Ready to Start Your Wellness Journey?'
              }
            </h3>
            <p className="text-lg opacity-90">
              {isShieldMode
                ? 'Join thousands who have transformed their work-life balance with AI assistance.'
                : 'Join thousands who have found support, healing, and growth with our AI companion.'
              }
            </p>
            {!user && (
              <Button 
                onClick={onAuthClick}
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 transition-smooth"
              >
                Sign Up Now - It's Free
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};