
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const BabyGrowthPage = () => {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const showDemoToast = () => {
    toast({
      title: "Baby Growth Checker",
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Baby Growth Checker</h1>
              <p className="text-gray-600">
                Track your baby's growth and get personalized advice for healthy development.
              </p>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="bg-blue-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <span className="text-2xl mr-2">📈</span> Track My Baby's Growth
                </CardTitle>
                <CardDescription>
                  Enter your baby's birth date, weight, and height to check growth progress.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-4">Baby's Birth Date</h3>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Label htmlFor="weight" className="font-medium">Current Weight (kg)</Label>
                      <Input 
                        id="weight" 
                        type="number" 
                        placeholder="e.g., 4.5" 
                        className="mt-2"
                        step="0.1"
                        min="0" 
                      />
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Label htmlFor="height" className="font-medium">Current Height (cm)</Label>
                      <Input 
                        id="height" 
                        type="number" 
                        placeholder="e.g., 55" 
                        className="mt-2" 
                        step="0.1"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label htmlFor="gender" className="font-medium">Baby's Gender</Label>
                    <select 
                      id="gender"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sangata-pink/50"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  
                  <Button onClick={showDemoToast} className="w-full">
                    Check Growth Status
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 mt-8">
              <p className="font-medium mb-2">About This Tool:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>This tool compares your baby's measurements with WHO growth standards.</li>
                <li>It provides general guidance about your baby's growth progress.</li>
                <li>Regular tracking helps monitor your baby's development over time.</li>
                <li>This is not a medical diagnostic tool.</li>
                <li>For concerns about your baby's growth, please consult a healthcare professional.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BabyGrowthPage;
