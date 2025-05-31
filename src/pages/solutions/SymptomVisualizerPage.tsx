
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SymptomVisualizerPage = () => {
  const { toast } = useToast();
  
  const showDemoToast = () => {
    toast({
      title: "Symptom Visualizer",
      description: "This feature will be fully implemented in the next update",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Symptom Visualizer</h1>
              <p className="text-gray-600">
                Describe your symptoms and see them visualized on a body map.
              </p>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="bg-blue-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <span className="text-2xl mr-2">🧍</span> See My Health Map
                </CardTitle>
                <CardDescription>
                  Describe your symptoms and get a visual representation.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <p className="text-gray-700">
                    Please describe any health symptoms you are experiencing, including location, type of pain or discomfort, and when it started.
                  </p>
                  
                  <textarea 
                    className="w-full p-4 border border-gray-300 rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-sangata-pink/50"
                    placeholder="Example: I have a headache on the right side of my head for 2 days. I also have some back pain in my lower back when I stand up."
                  ></textarea>
                  
                  <Button onClick={showDemoToast} className="w-full">
                    Visualize My Symptoms
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-red-400 mt-8 text-center font-medium">
              <p>IMPORTANT: This tool is for reference only.</p>
              <p>If you have severe symptoms, please seek medical help immediately.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SymptomVisualizerPage;
