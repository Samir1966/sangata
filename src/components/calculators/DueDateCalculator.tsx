
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { addDays } from 'date-fns';

const DueDateCalculator = () => {
  const [lastPeriod, setLastPeriod] = useState('');
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [calculatedWeeks, setCalculatedWeeks] = useState<number | null>(null);

  const calculateDueDate = () => {
    if (!lastPeriod) return;

    // Parse the last period date
    const lastPeriodDate = new Date(lastPeriod);
    
    // Add 280 days (40 weeks) to get the due date
    const calculatedDueDate = addDays(lastPeriodDate, 280);
    
    // Calculate current weeks of pregnancy
    const today = new Date();
    const pregnancyStart = lastPeriodDate;
    const diffTime = Math.abs(today.getTime() - pregnancyStart.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    
    setDueDate(calculatedDueDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
    
    setCalculatedWeeks(weeks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateDueDate();
  };

  const reset = () => {
    setLastPeriod('');
    setDueDate(null);
    setCalculatedWeeks(null);
  };

  return (
    <Card className="sangata-card w-full max-w-md mx-auto">
      <CardHeader className="bg-sangata-blue/20">
        <CardTitle className="text-xl font-bold text-center">Pregnancy Due Date Calculator</CardTitle>
        <CardDescription className="text-center">Calculate your baby's due date based on your last period</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="lastPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                First day of your last period
              </label>
              <input
                id="lastPeriod"
                type="date"
                value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)}
                className="sangata-input"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Select the date when your last menstrual period started
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button type="submit" className="w-2/3 sangata-button-secondary">
                Calculate Due Date
              </Button>
              <Button 
                type="button" 
                onClick={reset} 
                variant="outline" 
                className="w-1/3 border-sangata-blue text-gray-600 hover:bg-sangata-blue/10"
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
        
        {dueDate && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-fade-in">
            <h3 className="text-center font-semibold text-gray-800 mb-2">Your Due Date</h3>
            <p className="text-center text-2xl font-bold text-sangata-blue mb-2">{dueDate}</p>
            {calculatedWeeks !== null && calculatedWeeks >= 0 && calculatedWeeks <= 42 && (
              <p className="text-center text-gray-600">
                You are approximately {calculatedWeeks} weeks pregnant
              </p>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-4 text-xs text-gray-500">
        This calculator provides an estimated due date based on the first day of your last menstrual period. A typical pregnancy lasts approximately 40 weeks from the start of the last period.
      </CardFooter>
    </Card>
  );
};

export default DueDateCalculator;
