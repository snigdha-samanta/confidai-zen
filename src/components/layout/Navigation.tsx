import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Home, 
  Heart, 
  BookOpen, 
  Mic, 
  Bell, 
  Globe, 
  User, 
  Settings, 
  LogOut,
  BarChart3,
  Menu,
  Moon,
  Sun,
  Shield
} from 'lucide-react';

interface NavigationProps {
  user?: any;
  onAuthClick: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  isShieldMode: boolean;
  onShieldToggle: () => void;
}

export const Navigation = ({ 
  user, 
  onAuthClick, 
  onLogout, 
  isDarkMode, 
  onThemeToggle,
  isShieldMode,
  onShieldToggle 
}: NavigationProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: isShieldMode ? 'Tools' : 'Wellness Tools', path: '/wellness', icon: Heart },
    { label: isShieldMode ? 'Notes' : 'Journal', path: '/journal', icon: BookOpen },
    { label: isShieldMode ? 'Audio' : 'Empathy Voice', path: '/voice', icon: Mic },
    { label: 'Notifications', path: '/notifications', icon: Bell },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'mai', name: 'मैथिली' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'mr', name: 'मराठी' },
    { code: 'kn', name: 'ಕನ್ನಡ' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    
    return (
      <Link to={item.path}>
        <Button
          variant={active ? 'default' : 'ghost'}
          className={`
            transition-smooth
            ${active 
              ? 'primary-gradient shadow-glow text-primary-foreground' 
              : 'hover:bg-accent/50'
            }
          `}
        >
          <Icon className="w-4 h-4 mr-2" />
          {item.label}
        </Button>
      </Link>
    );
  };

  const MobileNavLink = ({ item }: { item: typeof navItems[0] }) => {
    const Icon = item.icon;
    return (
      <Link 
        to={item.path} 
        onClick={() => setIsMobileMenuOpen(false)}
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-smooth"
      >
        <Icon className="w-5 h-5" />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <nav className={`
      border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 transition-colors
      ${isShieldMode ? 'shield-mode' : ''}
    `}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold primary-gradient bg-clip-text text-transparent">
              {isShieldMode ? 'ProductivAI' : 'ConfidAI'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onThemeToggle}
              className="hidden sm:flex transition-smooth hover:shadow-medium"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Shield Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onShieldToggle}
              className={`hidden sm:flex transition-smooth ${isShieldMode ? 'bg-accent' : ''}`}
              title={isShieldMode ? 'Exit Privacy Mode' : 'Enter Privacy Mode'}
            >
              <Shield className="w-4 h-4" />
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass shadow-strong">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} className="cursor-pointer">
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu or Auth */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass shadow-strong w-56">
                  <div className="px-3 py-2">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={onLogout}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={onAuthClick}
                className="primary-gradient hover:shadow-glow transition-smooth"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 glass">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-semibold">
                      {isShieldMode ? 'ProductivAI' : 'ConfidAI'}
                    </span>
                  </div>

                  <div className="flex-1 space-y-2">
                    {navItems.map((item) => (
                      <MobileNavLink key={item.path} item={item} />
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dark Mode</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onThemeToggle}
                      >
                        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Privacy Mode</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onShieldToggle}
                        className={isShieldMode ? 'bg-accent' : ''}
                      >
                        <Shield className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};