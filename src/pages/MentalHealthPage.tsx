
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MentalHealthTracker from '@/components/trackers/MentalHealthTracker';

const MentalHealthPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <h2 className="section-heading text-center">Mental Health Check-In</h2>
          <p className="section-subheading text-center">
            Track your daily mood, manage stress, and get AI-powered suggestions for emotional well-being
          </p>
          <MentalHealthTracker />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MentalHealthPage;
