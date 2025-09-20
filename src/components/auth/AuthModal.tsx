import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Lock, User, Eye, EyeOff } from 'lucide-react';
import { GoogleIcon, FacebookIcon, InstagramIcon } from '@/components/icons/SocialIcons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (credentials: any) => void;
}

export const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const socialLogins = [
    { icon: GoogleIcon, name: 'Google', color: 'text-red-500' },
    { icon: FacebookIcon, name: 'Facebook', color: 'text-blue-600' },
    { icon: InstagramIcon, name: 'Instagram', color: 'text-pink-500' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full mx-4 p-6 glass border-none shadow-strong">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold text-center primary-gradient bg-clip-text text-transparent">
            {isSignIn ? 'Welcome Back' : 'Join ConfidAI'}
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            {isSignIn ? 'Continue your wellness journey' : 'Start your mental wellness journey today'}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Social Login Options */}
          <div className="space-y-3">
            <p className="text-sm text-center text-muted-foreground">Continue with</p>
            <div className="flex gap-3 justify-center">
              {socialLogins.map(({ icon: Icon, name, color }) => (
                <Button
                  key={name}
                  variant="outline"
                  size="sm"
                  className="flex-1 transition-smooth hover:shadow-medium"
                  onClick={() => onLogin({ provider: name.toLowerCase() })}
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                </Button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              or
            </span>
          </div>

          {/* Login Method Toggle */}
          <div className="flex rounded-lg bg-muted p-1">
            <Button
              variant={authMethod === 'email' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1 transition-smooth"
              onClick={() => setAuthMethod('email')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button
              variant={authMethod === 'phone' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1 transition-smooth"
              onClick={() => setAuthMethod('phone')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Phone
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSignIn && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 transition-smooth focus:shadow-glow"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
              </div>
            )}

            {authMethod === 'email' ? (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 transition-smooth focus:shadow-glow"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="pl-10 transition-smooth focus:shadow-glow"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>
            )}

            {authMethod === 'phone' && !isSignIn && (
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="transition-smooth focus:shadow-glow"
                  value={formData.otp}
                  onChange={(e) => handleInputChange('otp', e.target.value)}
                />
                <Button variant="link" size="sm" className="p-0 h-auto">
                  Resend code
                </Button>
              </div>
            )}

            {authMethod === 'email' && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={isSignIn ? 'Enter your password' : 'Create a password'}
                    className="pl-10 pr-10 transition-smooth focus:shadow-glow"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {isSignIn && (
                  <Button variant="link" size="sm" className="p-0 h-auto">
                    Forgot password?
                  </Button>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full primary-gradient hover:shadow-glow transition-smooth"
              size="lg"
            >
              {isSignIn ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-sm"
            >
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <span className="text-primary font-medium">
                {isSignIn ? 'Sign up' : 'Sign in'}
              </span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};