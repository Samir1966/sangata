
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';

const PeriodTrackerPage = () => {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const showDemoToast = () => {
    toast({
      title: "Period Health Tracker",
      description: "Your cycle information will be fully tracked in the next update",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Period Health Tracker</h1>
              <p className="text-gray-600">
                Track your menstrual cycle, predict your next period, and get personalized health insights.
              </p>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="bg-sangata-pink/10 border-b">
                <CardTitle className="flex items-center text-xl">
                  <span className="text-2xl mr-2">📅</span> Track My Cycle
                </CardTitle>
                <CardDescription>
                  Select the date of your last period to predict your cycle.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-4 text-center">When did your last period start?</h3>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Average cycle length</h3>
                    <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sangata-pink/50">
                      <option value="28">28 days (typical)</option>
                      <option value="21">21 days</option>
                      <option value="23">23 days</option>
                      <option value="24">24 days</option>
                      <option value="25">25 days</option>
                      <option value="26">26 days</option>
                      <option value="27">27 days</option>
                      <option value="29">29 days</option>
                      <option value="30">30 days</option>
                      <option value="31">31 days</option>
                      <option value="32">32 days</option>
                      <option value="33">33 days</option>
                      <option value="34">34 days</option>
                      <option value="35">35 days</option>
                    </select>
                  </div>
                  
                  <Button onClick={showDemoToast} className="w-full">
                    Calculate My Cycle
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 mt-8">
              <p className="font-medium mb-2">About This Tool:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>This tool helps you track your menstrual cycle and predict future periods.</li>
                <li>It calculates your fertile window and ovulation day based on your cycle length.</li>
                <li>Regular tracking helps you understand your body's patterns better.</li>
                <li>This tool provides general guidance and is not a contraceptive method.</li>
                <li>For medical concerns about your cycle, please consult a healthcare professional.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PeriodTrackerPage;
