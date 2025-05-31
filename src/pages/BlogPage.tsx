
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HealthTips from '@/components/HealthTips';

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Tips & Blog</h1>
            <p className="text-gray-600">
              Helpful articles and resources for your health and wellbeing.
            </p>
          </div>
          
          <HealthTips />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
