
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from '@/components/ui/use-toast';

const PregnancyCheckerPage = () => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState({
    missedPeriod: false,
    nausea: false,
    fatigue: false,
    breastTenderness: false,
    frequentUrination: false,
    moodChanges: false,
    foodCravings: false,
    lightheadedness: false,
  });
  
  const showDemoToast = () => {
    toast({
      title: "Pregnancy Early Checker",
      description: "This tool is for guidance only. Please take a pregnancy test or consult a doctor for confirmation.",
    });
  };

  const handleSymptomChange = (symptom: keyof typeof symptoms) => {
    setSymptoms({
      ...symptoms,
      [symptom]: !symptoms[symptom]
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Pregnancy Early Checker</h1>
              <p className="text-gray-600">
                Check common early pregnancy symptoms and get a probability estimate.
              </p>
              <p className="text-xs text-sangata-pink mt-2">
                For guidance only. Not a medical diagnosis.
              </p>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="bg-pink-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <span className="text-2xl mr-2">🤰</span> Check Pregnancy Early
                </CardTitle>
                <CardDescription>
                  Select the symptoms you are experiencing to check pregnancy probability.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-4">Select your symptoms:</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="missedPeriod" 
                          checked={symptoms.missedPeriod}
                          onCheckedChange={() => handleSymptomChange('missedPeriod')}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="missedPeriod" className="font-medium">Missed Period</Label>
                          <p className="text-sm text-gray-500">Your period is late by more than 5 days</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="nausea" 
                          checked={symptoms.nausea}
                          onCheckedChange={() => handleSymptomChange('nausea')}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="nausea" className="font-medium">Morning Sickness / Nausea</Label>
                          <p className="text-sm text-gray-500">Feeling queasy or vomiting, especially in the morning</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="fatigue" 
                          checked={symptoms.fatigue}
                          onCheckedChange={() => handleSymptomChange('fatigue')}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="fatigue" className="font-medium">Unusual Fatigue</Label>
                          <p className="text-sm text-gray-500">Feeling extremely tired without explanation</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="breastTenderness" 
                          checked={symptoms.breastTenderness}
                          onCheckedChange={() => handleSymptomChange('breastTenderness')}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="breastTenderness" className="font-medium">Breast Tenderness</Label>
                          <p className="text-sm text-gray-500">Breasts feel sore, tender, or swollen</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="frequentUrination" 
                          checked={symptoms.frequentUrination}
                          onCheckedChange={() => handleSymptomChange('frequentUrination')}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="frequentUrination" className="font-medium">Frequent Urination</Label>
                          <p className="text-sm text-gray-500">Needing to urinate more often than usual</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="moodChanges" 
                          checked={symptoms.moodChanges}
                          onCheckedChange={() => handleSymptomChange('moodChanges')}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="moodChanges" className="font-medium">Mood Changes</Label>
                          <p className="text-sm text-gray-500">Unusual mood swings or emotions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="foodCravings" 
                          checked={symptoms.foodCravings}
                          onCheckedChange={() => handleSymptomChange('foodCravings')}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="foodCravings" className="font-medium">Food Cravings or Aversions</Label>
                          <p className="text-sm text-gray-500">Strong desire for certain foods or dislike of previously enjoyed foods</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="lightheadedness" 
                          checked={symptoms.lightheadedness}
                          onCheckedChange={() => handleSymptomChange('lightheadedness')}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="lightheadedness" className="font-medium">Lightheadedness</Label>
                          <p className="text-sm text-gray-500">Feeling dizzy or lightheaded</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={showDemoToast} className="w-full">
                    Check Pregnancy Probability
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-red-400 mt-8 text-center font-medium">
              <p>IMPORTANT: This tool provides a general probability guide only.</p>
              <p>For accurate results, please take a home pregnancy test or visit a healthcare provider.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PregnancyCheckerPage;
