
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BMICalculator from './calculators/BMICalculator';
import DueDateCalculator from './calculators/DueDateCalculator';
import PeriodTracker from './calculators/PeriodTracker';
import WaterIntakeCalculator from './calculators/WaterIntakeCalculator';
import { HeartPulse, Calendar, Droplets, Scale } from 'lucide-react';

const CalculatorsSection = () => {
  const [activeTab, setActiveTab] = useState('bmi');

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="section-heading">Health Calculators</h2>
        <p className="section-subheading">
          Use our simple tools to track and understand your health better
        </p>
      </div>
      
      <Tabs defaultValue="bmi" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-3xl mx-auto gap-2">
            <TabsTrigger 
              value="bmi"
              className="flex items-center justify-center data-[state=active]:bg-sangata-pink/20 data-[state=active]:text-gray-800"
            >
              <Scale size={16} className="mr-2" />
              BMI Calculator
            </TabsTrigger>
            
            <TabsTrigger 
              value="due-date"
              className="flex items-center justify-center data-[state=active]:bg-sangata-blue/20 data-[state=active]:text-gray-800"
            >
              <Calendar size={16} className="mr-2" />
              Due Date
            </TabsTrigger>
            
            <TabsTrigger 
              value="period"
              className="flex items-center justify-center data-[state=active]:bg-sangata-purple/20 data-[state=active]:text-gray-800"
            >
              <HeartPulse size={16} className="mr-2" />
              Period Tracker
            </TabsTrigger>
            
            <TabsTrigger 
              value="water"
              className="flex items-center justify-center data-[state=active]:bg-sangata-blue/20 data-[state=active]:text-gray-800"
            >
              <Droplets size={16} className="mr-2" />
              Water Intake
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="bmi" className="animate-fade-in">
          <BMICalculator />
        </TabsContent>
        
        <TabsContent value="due-date" className="animate-fade-in">
          <DueDateCalculator />
        </TabsContent>
        
        <TabsContent value="period" className="animate-fade-in">
          <PeriodTracker />
        </TabsContent>
        
        <TabsContent value="water" className="animate-fade-in">
          <WaterIntakeCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalculatorsSection;
