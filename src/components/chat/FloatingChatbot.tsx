import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Minimize2, 
  Maximize2,
  Bot,
  User as UserIcon
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'analysis';
}

interface FloatingChatbotProps {
  user?: any;
  isShieldMode?: boolean;
}

export const FloatingChatbot = ({ user, isShieldMode }: FloatingChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: isShieldMode 
        ? 'Hello! I\'m your productivity assistant. How can I help you today?' 
        : 'Hi there! I\'m your wellness companion. How are you feeling today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate bot response (in real app, this would be an API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(message, isShieldMode),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (userMessage: string, shieldMode?: boolean) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (shieldMode) {
      if (lowerMessage.includes('task') || lowerMessage.includes('productivity')) {
        return 'I can help you organize your tasks and improve productivity. Would you like me to suggest some productivity techniques?';
      }
      if (lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
        return 'Time management is crucial for productivity. Let me help you create a better schedule.';
      }
      return 'I\'m here to help with your productivity needs. What would you like to work on?';
    }

    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious')) {
      return 'I understand you\'re feeling stressed. Let\'s try some breathing exercises together. Would you like me to guide you through a quick 3-minute session?';
    }
    if (lowerMessage.includes('sad') || lowerMessage.includes('down')) {
      return 'I hear that you\'re going through a difficult time. Your feelings are valid. Would you like to explore some mood-lifting activities or talk about what\'s on your mind?';
    }
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
      return 'Sleep is so important for mental wellness. I can suggest some relaxation techniques or create a personalized bedtime routine for you.';
    }
    return 'Thank you for sharing with me. I\'m here to support your wellness journey. Would you like to explore some coping strategies or track your mood today?';
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, this would integrate with speech recognition API
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setMessage('This would be voice input text...');
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full primary-gradient hover:shadow-glow float-animation transition-smooth shadow-strong z-50"
        size="lg"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className={`
      fixed bottom-6 right-6 w-96 transition-all duration-300 z-50 shadow-strong glass
      ${isMinimized ? 'h-16' : 'h-[500px]'}
    `}>
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <CardTitle className="text-lg flex items-center space-x-2">
          <div className="w-8 h-8 primary-gradient rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span>
            {isShieldMode ? 'Assistant' : 'Wellness Companion'}
          </span>
          {!user && <span className="text-xs text-muted-foreground">(Guest)</span>}
        </CardTitle>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="flex flex-col h-[440px] p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[80%] p-3 rounded-2xl transition-smooth
                      ${msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-4'
                        : 'bg-muted mr-4'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-2">
                      {msg.sender === 'bot' && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      {msg.sender === 'user' && (
                        <UserIcon className="w-4 h-4 mt-0.5 flex-shrink-0 order-2" />
                      )}
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="p-4 border-t bg-background/50">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <Input
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Type your message...`}
                  className="resize-none transition-smooth focus:shadow-glow"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                className={`
                  transition-smooth
                  ${isListening ? 'bg-destructive text-destructive-foreground animate-pulse' : ''}
                `}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="primary-gradient transition-smooth"
                disabled={!message.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {!user && (
              <p className="text-xs text-muted-foreground mt-2">
                Sign in for personalized responses and conversation history
              </p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};