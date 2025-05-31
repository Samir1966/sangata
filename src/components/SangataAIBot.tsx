
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SangataAvatar from './sangata-bot/SangataAvatar';
import BotHeader from './sangata-bot/BotHeader';
import MessageList from './sangata-bot/MessageList';
import ChatInput from './sangata-bot/ChatInput';
import { useSangataChat } from './sangata-bot/useSangataChat';

const SangataAIBot = () => {
  const {
    isOpen,
    isExpanded,
    messages,
    input,
    isRecording,
    isProcessing,
    isPlaying,
    currentLanguage,
    toggleBot,
    toggleExpanded,
    handleSend,
    setInput,
    handleKeyPress,
    startRecording,
    stopRecording,
    setIsPlaying
  } = useSangataChat();

  return (
    <>
      {!isOpen ? (
        <SangataAvatar onClick={toggleBot} />
      ) : (
        <Card className={`fixed bottom-20 right-5 shadow-xl transition-all duration-300 z-50
          ${isExpanded ? 'w-[400px] h-[500px]' : 'w-[350px] h-[450px]'}`}
        >
          <BotHeader 
            isExpanded={isExpanded}
            toggleExpanded={toggleExpanded}
            toggleBot={toggleBot}
          />
          
          <CardContent className="p-0 flex flex-col h-full">
            <MessageList 
              messages={messages}
              isProcessing={isProcessing}
            />
            
            <ChatInput
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              handleKeyPress={handleKeyPress}
              isRecording={isRecording}
              isPlaying={isPlaying}
              startRecording={startRecording}
              stopRecording={stopRecording}
              setIsPlaying={setIsPlaying}
              currentLanguage={currentLanguage}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SangataAIBot;
