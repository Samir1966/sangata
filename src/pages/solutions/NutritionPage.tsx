
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const NutritionPage = () => {
  const { toast } = useToast();
  
  const showDemoToast = () => {
    toast({
      title: "Nutrition Detector",
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Nutrition Deficiency Detector</h1>
              <p className="text-gray-600">
                Describe your daily diet and get personalized nutrition advice.
              </p>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="bg-green-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <span className="text-2xl mr-2">🍏</span> Check My Nutrition
                </CardTitle>
                <CardDescription>
                  Tell us about your typical meals and we'll help identify possible nutritional gaps.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <p className="text-gray-700">
                    Please describe your typical daily meals in detail. Include what you usually eat for:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">Breakfast</h3>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sangata-pink/50"
                        rows={2}
                        placeholder="E.g., tea and roti, bread and eggs, etc."
                      ></textarea>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">Lunch</h3>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sangata-pink/50"
                        rows={2}
                        placeholder="E.g., rice, dal, vegetable, etc."
                      ></textarea>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">Dinner</h3>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sangata-pink/50"
                        rows={2}
                        placeholder="E.g., roti, vegetable, curd, etc."
                      ></textarea>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">Snacks & Others</h3>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sangata-pink/50"
                        rows={2}
                        placeholder="E.g., fruits, nuts, tea/coffee, sweets, etc."
                      ></textarea>
                    </div>
                  </div>
                  
                  <Button onClick={showDemoToast} className="w-full">
                    Check My Nutrition
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 mt-8">
              <p className="font-medium mb-2">About This Tool:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>This tool analyzes your typical diet to identify potential nutritional gaps.</li>
                <li>Provides personalized suggestions for improving your diet.</li>
                <li>This is not a medical diagnostic tool and should not replace professional advice.</li>
                <li>For serious health concerns, please consult a healthcare professional.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NutritionPage;
