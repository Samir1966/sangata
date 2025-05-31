
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Hero = () => {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-br from-sangata-pink via-white to-sangata-blue">
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-sangata-peach animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-24 h-24 rounded-full bg-sangata-green animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-sangata-blue animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 rounded-full bg-sangata-pink animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="sangata-container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 mb-4">
              नमस्कार! मैं संगात - आपका स्वास्थ्य साथी
            </h1>
            <p className="text-gray-600 text-xl mb-8 max-w-lg mx-auto md:mx-0">
              Your caring health companion providing friendly and accessible health guidance for rural women.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link to="/chat" className="sangata-button-primary">
                Chat with Sangata
              </Link>
              {user ? (
                <Link to="/profile" className="sangata-button-secondary">
                  My Health Profile
                </Link>
              ) : (
                <Link to="/auth" className="sangata-button-secondary">
                  Join Sangata
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 animate-float">
              <div className="absolute inset-0 rounded-full bg-white shadow-lg"></div>
              <div className="absolute inset-4 rounded-full overflow-hidden">
                <img 
                  src="/lovable-uploads/06f49d17-5e2f-41f1-b162-9f0c12bcbe7c.png" 
                  alt="Sangata Hero" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
