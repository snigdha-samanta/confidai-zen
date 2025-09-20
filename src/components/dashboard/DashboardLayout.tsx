import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  TrendingUp, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Heart,
  Brain,
  Target,
  Calendar
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isShieldMode?: boolean;
}

const sidebarItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
      { title: "Mood Trends", url: "/dashboard/mood", icon: TrendingUp, wellnessOnly: true },
      { title: "Analytics", url: "/dashboard/analytics", icon: Brain, wellnessOnly: true },
    ]
  },
  {
    title: "Content",
    items: [
      { title: "Journals", url: "/dashboard/journals", icon: BookOpen },
      { title: "Goals", url: "/dashboard/goals", icon: Target },
      { title: "Schedule", url: "/dashboard/schedule", icon: Calendar },
    ]
  },
  {
    title: "Settings",
    items: [
      { title: "Wellness Analytics", url: "/dashboard/wellness", icon: Heart, wellnessOnly: true },
      { title: "Personalization", url: "/dashboard/personalization", icon: Settings },
    ]
  }
];

function DashboardSidebar({ isShieldMode }: { isShieldMode?: boolean }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const getItemTitle = (title: string, wellnessOnly?: boolean) => {
    if (isShieldMode && wellnessOnly) return null;
    if (isShieldMode) {
      const shieldTitles: { [key: string]: string } = {
        'Mood Trends': 'Performance',
        'Journals': 'Notes',
        'Wellness Analytics': 'Settings',
        'Analytics': 'Reports'
      };
      return shieldTitles[title] || title;
    }
    return title;
  };

  return (
    <Sidebar className="w-60">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        {sidebarItems.map((group) => {
          const visibleItems = group.items.filter(item => 
            !isShieldMode || !item.wellnessOnly
          );
          
          if (visibleItems.length === 0) return null;

          return (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>
                {getItemTitle(group.title)}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleItems.map((item) => {
                    const itemTitle = getItemTitle(item.title, item.wellnessOnly);
                    if (!itemTitle) return null;

                    const Icon = item.icon;
                    const active = isActive(item.url);

                    return (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton asChild>
                          <Link 
                            to={item.url}
                            className={`
                              transition-smooth
                              ${active 
                                ? 'bg-primary text-primary-foreground shadow-glow' 
                                : 'hover:bg-accent/50'
                              }
                            `}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{itemTitle}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}

export const DashboardLayout = ({ children, isShieldMode }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar isShieldMode={isShieldMode} />
        <main className="flex-1 p-6 bg-gradient-to-br from-background to-muted/20">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};