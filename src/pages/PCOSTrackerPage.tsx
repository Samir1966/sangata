
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PCOSTracker from '@/components/trackers/PCOSTracker';

const PCOSTrackerPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <h2 className="section-heading text-center">PCOS/PCOD Symptoms Tracker</h2>
          <p className="section-subheading text-center">
            Monitor your PCOS symptoms over time and receive personalized lifestyle suggestions
          </p>
          <PCOSTracker />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PCOSTrackerPage;
