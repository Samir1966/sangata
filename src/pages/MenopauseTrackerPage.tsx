
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MenopauseTracker from '@/components/trackers/MenopauseTracker';

const MenopauseTrackerPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <h2 className="section-heading text-center">Menopause Health Tracker</h2>
          <p className="section-subheading text-center">
            Track menopause symptoms and get customized suggestions for managing this transition
          </p>
          <MenopauseTracker />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MenopauseTrackerPage;
