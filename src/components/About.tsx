
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Check, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="section-heading">About Sangata</h2>
        <p className="section-subheading">
          Sangata is your caring health companion, designed to provide friendly and accessible health guidance for rural women in India.
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-sangata-pink via-white to-sangata-blue p-8 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              "संगत सहित एबे हेउ सुस्थ।"
              <br />
              <span className="text-lg font-normal">(Be healthier with Sangata.)</span>
            </h3>
            
            <p className="text-gray-600 mb-6">
              Sangata was created with one mission: to make health information accessible, understandable, and supportive for rural women who may have limited access to healthcare resources.
            </p>
            
            <p className="text-gray-600 mb-6">
              Like a caring sister who listens and guides with love, Sangata aims to bridge the healthcare knowledge gap in rural communities by providing simple, trustworthy guidance on women's health, hygiene, pregnancy care, and general wellbeing.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-sangata-pink/20 flex items-center justify-center mr-3 mt-0.5">
                  <Check size={14} className="text-sangata-pink" />
                </div>
                <p className="text-gray-700">Friendly health guidance in simple language</p>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-sangata-pink/20 flex items-center justify-center mr-3 mt-0.5">
                  <Check size={14} className="text-sangata-pink" />
                </div>
                <p className="text-gray-700">Supportive, non-judgmental approach to health</p>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-sangata-pink/20 flex items-center justify-center mr-3 mt-0.5">
                  <Check size={14} className="text-sangata-pink" />
                </div>
                <p className="text-gray-700">Tools designed specifically for rural women's needs</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full bg-sangata-pink/20 animate-pulse-slow"></div>
            </div>
            
            <div className="relative z-10 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-6xl mb-3">💗</div>
                  <h4 className="text-xl font-bold text-gray-800">तुम स्वास्थ्य साथी</h4>
                  <p className="text-gray-600">(Your health companion)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-center text-gray-800 mb-8">Our Values</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="sangata-card">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-sangata-pink/20 flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-sangata-pink" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Empathy & Care</h4>
              <p className="text-gray-600">
                We provide information with the warmth and understanding of a caring family member.
              </p>
            </CardContent>
          </Card>
          
          <Card className="sangata-card">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-sangata-blue/20 flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-sangata-blue" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Accessibility</h4>
              <p className="text-gray-600">
                Health information should be available to everyone, regardless of location or background.
              </p>
            </CardContent>
          </Card>
          
          <Card className="sangata-card">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-sangata-green/20 flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Timely Support</h4>
              <p className="text-gray-600">
                Providing guidance when it's needed most, with tools designed for quick access.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
