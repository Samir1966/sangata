
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Plus, Image, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getGeminiResponse } from '@/utils/geminiApi';

interface Message {
  text: string;
  sender: 'user' | 'sangata';
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "नमस्कार बहन! मैं संगात दीदी हूँ, आपकी स्वास्थ्य साथी। मैं आपके स्वास्थ्य संबंधी किसी भी सवाल या चिंता में मदद कर सकती हूँ। आप कैसी हैं आज?",
      sender: 'sangata',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('hi');

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Language switching detection
    if (
      input.toLowerCase().includes('english') || 
      input.toLowerCase().includes('switch to english') ||
      input.toLowerCase().includes('speak english')
    ) {
      handleLanguageSwitch('en');
      return;
    }

    if (
      input.toLowerCase().includes('हिंदी') || 
      input.toLowerCase().includes('switch to hindi') ||
      input.toLowerCase().includes('speak hindi')
    ) {
      handleLanguageSwitch('hi');
      return;
    }
    
    try {
      // Get response from Gemini API
      const geminiResponse = await getGeminiResponse(input, language);
      
      const response: Message = {
        text: geminiResponse,
        sender: 'sangata',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error("Error getting Gemini response:", error);
      
      // Fallback response
      const fallbackResponse = language === 'hi' 
        ? "माफ़ करें बहन, मुझे जवाब देने में समस्या हो रही है। कृपया थोड़ी देर बाद फिर से पूछें।" 
        : "Sorry sister, I'm having trouble responding. Please try again shortly.";
      
      const errorMessage: Message = {
        text: fallbackResponse,
        sender: 'sangata',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageSwitch = (newLanguage: 'en' | 'hi') => {
    setLanguage(newLanguage);
    setLoading(false);
    
    // Add a system message about language change
    const switchMessage = newLanguage === 'en' 
      ? "I've switched to English. How can I help you with your health questions today, sister?" 
      : "मैंने हिंदी में बदल लिया है। बहना, मैं आज आपके स्वास्थ्य प्रश्नों में कैसे मदद कर सकती हूँ?";
    
    const systemMessage: Message = {
      text: switchMessage,
      sender: 'sangata',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[600px] border border-sangata-pink/20">
      <div className="bg-gradient-to-r from-sangata-pink to-sangata-blue/70 p-3 text-white">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
            <span className="text-xl">👩‍⚕️</span>
          </div>
          <div>
            <h3 className="font-bold">संगात दीदी - Health Assistant</h3>
            <p className="text-xs opacity-80">आपकी स्वास्थ्य साथी</p>
          </div>
          <div className="ml-auto">
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => handleLanguageSwitch(language === 'en' ? 'hi' : 'en')}
              className="text-white hover:bg-white/20"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'sangata' && (
                <div className="w-8 h-8 rounded-full bg-sangata-pink/20 flex items-center justify-center mr-2 mt-1">
                  <span className="text-sm">👩‍⚕️</span>
                </div>
              )}
              
              <div 
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-sangata-blue text-gray-800 rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                <p className="text-xs mt-1 opacity-60">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-sangata-pink/20 flex items-center justify-center mr-2 mt-1">
                <span className="text-sm">👩‍⚕️</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 rounded-tl-none max-w-[75%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center">
          <div className="flex items-center space-x-2 pr-3">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-sangata-pink">
              <Plus size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-sangata-pink">
              <Image size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-sangata-pink">
              <Mic size={20} />
            </Button>
          </div>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={language === 'en' ? "Ask me about your health, sister..." : "अपने स्वास्थ्य के बारे में पूछें, बहन..."}
            className="border-gray-300 focus:border-sangata-pink"
          />
          
          <Button 
            onClick={handleSend} 
            className="ml-2 bg-sangata-pink hover:bg-sangata-pink/90 text-white"
            disabled={loading || input.trim() === ''}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
