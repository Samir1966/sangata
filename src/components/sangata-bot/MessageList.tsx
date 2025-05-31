
import React, { useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isProcessing: boolean;
}

const MessageList = ({ messages, isProcessing }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {message.sender === 'bot' && (
            <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
              <AvatarImage src="/lovable-uploads/ee40c451-039e-46ff-8e9d-aae5b1c043ff.png" alt="Sangata Didi" />
              <AvatarFallback className="bg-sangata-pink/20 text-sangata-pink">संगात</AvatarFallback>
            </Avatar>
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
      
      {isProcessing && (
        <div className="flex justify-start">
          <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
            <AvatarImage src="/lovable-uploads/ee40c451-039e-46ff-8e9d-aae5b1c043ff.png" alt="Sangata Didi" />
            <AvatarFallback className="bg-sangata-pink/20 text-sangata-pink">संगात</AvatarFallback>
          </Avatar>
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
  );
};

export default MessageList;
