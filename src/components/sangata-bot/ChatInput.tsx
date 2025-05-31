
import React from 'react';
import { Mic, RefreshCw, Send, Volume2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isRecording: boolean;
  isPlaying: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  currentLanguage: 'hi' | 'en';
}

const ChatInput = ({
  input,
  setInput,
  handleSend,
  handleKeyPress,
  isRecording,
  isPlaying,
  startRecording,
  stopRecording,
  setIsPlaying,
  currentLanguage
}: ChatInputProps) => {
  return (
    <div className="border-t border-gray-200 p-3 bg-white">
      <div className="flex items-center">
        {isPlaying ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-sangata-pink animate-pulse"
            onClick={() => setIsPlaying(false)}
          >
            <Volume2 size={20} />
          </Button>
        ) : isRecording ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-red-500 animate-pulse"
            onClick={stopRecording}
          >
            <RefreshCw size={20} />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-sangata-pink"
            onClick={startRecording}
          >
            <Mic size={20} />
          </Button>
        )}
        
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={currentLanguage === 'en' ? "Ask me anything, sister..." : "कुछ भी पूछें, बहन..."}
          className="flex-1 mx-2 border-gray-300 focus:border-sangata-pink"
          disabled={isRecording}
        />
        
        <Button 
          onClick={handleSend} 
          disabled={input.trim() === '' || isRecording}
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-sangata-pink"
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
