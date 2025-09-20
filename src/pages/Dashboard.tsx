import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  TrendingUp, 
  Heart, 
  Brain, 
  Calendar, 
  Target,
  Clock,
  BookOpen,
  Zap,
  Shield,
  AlertCircle
} from 'lucide-react';

interface DashboardProps {
  user?: any;
  isShieldMode?: boolean;
}

export const Dashboard = ({ user, isShieldMode }: DashboardProps) => {
  const moodData = [
    { date: 'Mon', mood: 4, energy: 3 },
    { date: 'Tue', mood: 5, energy: 4 },
    { date: 'Wed', mood: 3, energy: 3 },
    { date: 'Thu', mood: 4, energy: 5 },
    { date: 'Fri', mood: 5, energy: 4 },
    { date: 'Sat', mood: 4, energy: 3 },
    { date: 'Sun', mood: 5, energy: 5 },
  ];

  const wellnessMetrics = {
    overallScore: 78,
    moodAverage: 4.2,
    stressLevel: 3.1,
    sleepQuality: 4.0,
    journalStreak: 12,
    exerciseDays: 5
  };

  const recentActivities = [
    {
      type: 'journal',
      title: isShieldMode ? 'Daily Reflection' : 'Morning Journal Entry',
      time: '2 hours ago',
      mood: 4,
      icon: BookOpen
    },
    {
      type: 'breathing',
      title: isShieldMode ? 'Focus Session' : 'Box Breathing Exercise',
      time: '4 hours ago',
      duration: '5 min',
      icon: Zap
    },
    {
      type: 'chat',
      title: isShieldMode ? 'AI Consultation' : 'Wellness Check-in',
      time: '1 day ago',
      status: 'helpful',
      icon: Brain
    }
  ];

  const upcomingReminders = [
    {
      title: isShieldMode ? 'Team Meeting' : 'Mindfulness Session',
      time: '3:00 PM',
      type: 'wellness'
    },
    {
      title: isShieldMode ? 'Progress Review' : 'Journal Reflection',
      time: '8:00 PM',
      type: 'journal'
    },
    {
      title: isShieldMode ? 'Break Time' : 'Breathing Exercise',
      time: 'Tomorrow 10:00 AM',
      type: 'breathing'
    }
  ];

  return (
    <DashboardLayout isShieldMode={isShieldMode}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">
              {isShieldMode ? 'Productivity Dashboard' : 'Wellness Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {user?.name ? `Welcome back, ${user.name}!` : 'Welcome to your personal dashboard'}
            </p>
          </div>
          {isShieldMode && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Privacy Mode</span>
            </Badge>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isShieldMode ? 'Performance Score' : 'Wellness Score'}
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wellnessMetrics.overallScore}%</div>
              <Progress value={wellnessMetrics.overallScore} className="mt-2" />
            </CardContent>
          </Card>

          {!isShieldMode && (
            <>
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{wellnessMetrics.moodAverage}/5</div>
                  <p className="text-xs text-muted-foreground">+0.3 from last week</p>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{wellnessMetrics.stressLevel}/5</div>
                  <p className="text-xs text-muted-foreground">-0.5 from last week</p>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isShieldMode ? 'Daily Streak' : 'Journal Streak'}
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wellnessMetrics.journalStreak} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Activities
              </CardTitle>
              <CardDescription>
                Your latest wellness interactions and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-smooth">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      {activity.mood && (
                        <Badge variant="outline">
                          Mood: {activity.mood}/5
                        </Badge>
                      )}
                      {activity.duration && (
                        <Badge variant="outline">
                          {activity.duration}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Reminders */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {isShieldMode ? 'Schedule' : 'Wellness Schedule'}
              </CardTitle>
              <CardDescription>
                Upcoming activities and reminders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingReminders.map((reminder, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{reminder.title}</p>
                      <p className="text-sm text-muted-foreground">{reminder.time}</p>
                    </div>
                    <Badge 
                      variant={reminder.type === 'wellness' ? 'default' : 'secondary'}
                    >
                      {reminder.type}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Full Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {!isShieldMode && (
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Weekly Mood Trends
              </CardTitle>
              <CardDescription>
                Track your emotional patterns and wellness progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {moodData.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs font-medium mb-2">{day.date}</div>
                    <div 
                      className="w-8 h-16 mx-auto rounded bg-primary/20 relative overflow-hidden"
                    >
                      <div 
                        className="absolute bottom-0 w-full bg-primary rounded"
                        style={{ height: `${(day.mood / 5) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{day.mood}/5</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks and wellness tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <BookOpen className="w-6 h-6" />
                <span>{isShieldMode ? 'Add Note' : 'Journal Entry'}</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Zap className="w-6 h-6" />
                <span>{isShieldMode ? 'Focus Time' : 'Breathing Exercise'}</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Brain className="w-6 h-6" />
                <span>{isShieldMode ? 'AI Chat' : 'Wellness Chat'}</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <TrendingUp className="w-6 h-6" />
                <span>View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};