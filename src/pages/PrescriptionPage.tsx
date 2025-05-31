
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrescriptionScanner from '@/components/PrescriptionScanner';

const PrescriptionPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Prescription Scanner</h1>
            <p className="text-gray-600">
              Upload a photo of your prescription to get a simplified explanation of your medicines.
            </p>
          </div>
          
          <PrescriptionScanner />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrescriptionPage;
