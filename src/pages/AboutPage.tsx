
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import About from '@/components/About';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <About />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
