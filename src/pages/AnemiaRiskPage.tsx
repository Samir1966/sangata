
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnemiaRiskCalculator from '@/components/trackers/AnemiaRiskCalculator';

const AnemiaRiskPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <h2 className="section-heading text-center">Nutrition & Anemia Risk Calculator</h2>
          <p className="section-subheading text-center">
            Check your anemia risk based on symptoms and get personalized nutrition advice
          </p>
          <AnemiaRiskCalculator />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AnemiaRiskPage;
