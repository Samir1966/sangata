
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CalculatorsSection from '@/components/CalculatorsSection';

const CalculatorsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <CalculatorsSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CalculatorsPage;
