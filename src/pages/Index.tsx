
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Chat from '@/components/Chat';
import CalculatorsSection from '@/components/CalculatorsSection';
import PrescriptionScanner from '@/components/PrescriptionScanner';
import HealthTips from '@/components/HealthTips';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Droplets, MessageCircle, Calculator, FileText, Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="pb-16">
          <Hero />
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="sangata-container">
            <h2 className="section-heading text-center">How Sangata Helps You</h2>
            <p className="section-subheading text-center">
              Your caring health companion providing accessible guidance
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <div className="bg-white p-6 rounded-2xl shadow-md border border-sangata-pink/20 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-sangata-pink/20 flex items-center justify-center mb-4">
                  <MessageCircle size={24} className="text-sangata-pink" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Friendly Chat</h3>
                <p className="text-gray-600">
                  Talk to Sangata in simple language about any health concerns you may have.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md border border-sangata-blue/20 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-sangata-blue/20 flex items-center justify-center mb-4">
                  <Calculator size={24} className="text-sangata-blue" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Health Tools</h3>
                <p className="text-gray-600">
                  Easy-to-use calculators for BMI, pregnancy, periods, and water intake.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md border border-sangata-green/20 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-sangata-green/20 flex items-center justify-center mb-4">
                  <FileText size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Prescription Help</h3>
                <p className="text-gray-600">
                  Upload your prescription to understand your medicines better.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md border border-sangata-peach/20 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-sangata-peach/20 flex items-center justify-center mb-4">
                  <Heart size={24} className="text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Health Tips</h3>
                <p className="text-gray-600">
                  Helpful articles and guidance for women's health and wellbeing.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Chat Section */}
        <section id="chat" className="py-20">
          <div className="sangata-container">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="section-heading">Chat with Sangata</h2>
                <p className="text-gray-600 mb-6">
                  Have health questions? Talk to Sangata like you would talk to a friend. Ask about health, hygiene, pregnancy, or any other health concerns in simple language.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-sangata-pink/20 flex items-center justify-center mr-3 mt-0.5">
                      <Droplets size={14} className="text-sangata-pink" />
                    </div>
                    <p className="text-gray-700">Ask about women's health topics</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-sangata-pink/20 flex items-center justify-center mr-3 mt-0.5">
                      <Droplets size={14} className="text-sangata-pink" />
                    </div>
                    <p className="text-gray-700">Get guidance on pregnancy care</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-sangata-pink/20 flex items-center justify-center mr-3 mt-0.5">
                      <Droplets size={14} className="text-sangata-pink" />
                    </div>
                    <p className="text-gray-700">Learn about nutrition and hygiene</p>
                  </li>
                </ul>
              </div>
              
              <div className="md:w-1/2">
                <Chat />
              </div>
            </div>
          </div>
        </section>
        
        {/* Calculators Section */}
        <section id="calculators" className="py-20 bg-gray-50">
          <div className="sangata-container">
            <CalculatorsSection />
          </div>
        </section>
        
        {/* Prescription Scanner Section */}
        <section id="prescription" className="py-20">
          <div className="sangata-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-heading">Prescription Scanner</h2>
              <p className="section-subheading">
                Upload a photo of your prescription and get an easy-to-understand breakdown of your medicines
              </p>
            </div>
            
            <PrescriptionScanner />
          </div>
        </section>
        
        {/* Health Tips Section */}
        <section id="health-tips" className="py-20 bg-gray-50">
          <div className="sangata-container">
            <HealthTips />
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-20">
          <div className="sangata-container">
            <About />
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50">
          <div className="sangata-container">
            <Contact />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
