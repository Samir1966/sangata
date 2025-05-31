
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chat from '@/components/Chat';

const ChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Chat with Sangata</h1>
            <p className="text-center text-gray-600 mb-8">
              Your friendly health companion is here to help. Ask any health-related questions.
            </p>
            
            <Chat />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
