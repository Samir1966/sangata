
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BreastHealthReminder from '@/components/trackers/BreastHealthReminder';

const BreastHealthPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <h2 className="section-heading text-center">Breast Health Reminder</h2>
          <p className="section-subheading text-center">
            Set up monthly self-examination reminders and learn the proper techniques
          </p>
          <BreastHealthReminder />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BreastHealthPage;
