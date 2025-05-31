
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { addDays } from 'date-fns';

const PeriodTracker = () => {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  const [nextPeriod, setNextPeriod] = useState<string | null>(null);
  const [fertileDays, setFertileDays] = useState<string[]>([]);
  const [daysUntilNextPeriod, setDaysUntilNextPeriod] = useState<number | null>(null);

  const calculateNext = () => {
    if (!lastPeriod || !cycleLength) return;

    const lastPeriodDate = new Date(lastPeriod);
    const cycleLengthNum = parseInt(cycleLength);
    const periodLengthNum = parseInt(periodLength || '5');
    
    // Calculate next period
    const nextPeriodDate = addDays(lastPeriodDate, cycleLengthNum);
    setNextPeriod(nextPeriodDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
    
    // Calculate fertile window (typically 5 days before ovulation, day of ovulation, and 1 day after)
    const ovulationDay = addDays(lastPeriodDate, cycleLengthNum - 14);
    const fertileStart = addDays(ovulationDay, -5);
    const fertileEnd = addDays(ovulationDay, 1);
    
    const fertileDaysArray = [];
    let currentDate = new Date(fertileStart);
    
    while (currentDate <= fertileEnd) {
      fertileDaysArray.push(
        currentDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })
      );
      currentDate = addDays(currentDate, 1);
    }
    
    setFertileDays(fertileDaysArray);
    
    // Calculate days until next period
    const today = new Date();
    const diffTime = nextPeriodDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilNextPeriod(diffDays);
  };

  useEffect(() => {
    // Load saved data from localStorage if available
    const savedLastPeriod = localStorage.getItem('lastPeriod');
    const savedCycleLength = localStorage.getItem('cycleLength');
    const savedPeriodLength = localStorage.getItem('periodLength');
    
    if (savedLastPeriod) setLastPeriod(savedLastPeriod);
    if (savedCycleLength) setCycleLength(savedCycleLength);
    if (savedPeriodLength) setPeriodLength(savedPeriodLength);
    
    if (savedLastPeriod && savedCycleLength) {
      calculateNext();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    localStorage.setItem('lastPeriod', lastPeriod);
    localStorage.setItem('cycleLength', cycleLength);
    localStorage.setItem('periodLength', periodLength);
    
    calculateNext();
  };

  const reset = () => {
    localStorage.removeItem('lastPeriod');
    localStorage.removeItem('cycleLength');
    localStorage.removeItem('periodLength');
    
    setLastPeriod('');
    setCycleLength('28');
    setPeriodLength('5');
    setNextPeriod(null);
    setFertileDays([]);
    setDaysUntilNextPeriod(null);
  };

  return (
    <Card className="sangata-card w-full max-w-md mx-auto">
      <CardHeader className="bg-sangata-purple/20">
        <CardTitle className="text-xl font-bold text-center">Period Tracker</CardTitle>
        <CardDescription className="text-center">Track your menstrual cycle and fertility window</CardDescription>
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
            </div>
            
            <div>
              <label htmlFor="cycleLength" className="block text-sm font-medium text-gray-700 mb-1">
                Cycle length (days)
              </label>
              <Input
                id="cycleLength"
                type="number"
                placeholder="28"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                className="sangata-input"
                min="21"
                max="35"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Average cycle is 28 days, but can range from 21-35 days
              </p>
            </div>
            
            <div>
              <label htmlFor="periodLength" className="block text-sm font-medium text-gray-700 mb-1">
                Period length (days)
              </label>
              <Input
                id="periodLength"
                type="number"
                placeholder="5"
                value={periodLength}
                onChange={(e) => setPeriodLength(e.target.value)}
                className="sangata-input"
                min="2"
                max="10"
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <Button type="submit" className="w-2/3" style={{ backgroundColor: '#E5DEFF', color: '#333' }}>
                Calculate
              </Button>
              <Button 
                type="button" 
                onClick={reset} 
                variant="outline" 
                className="w-1/3 border-sangata-purple text-gray-600 hover:bg-sangata-purple/10"
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
        
        {nextPeriod && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-fade-in">
            <h3 className="text-center font-semibold text-gray-800 mb-2">Your Cycle Information</h3>
            
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">Next period expected on:</p>
              <p className="text-lg font-bold text-sangata-purple">{nextPeriod}</p>
              {daysUntilNextPeriod !== null && (
                <p className="text-sm text-gray-600">
                  {daysUntilNextPeriod > 0 
                    ? `${daysUntilNextPeriod} days until next period` 
                    : daysUntilNextPeriod === 0 
                      ? 'Your period is expected today' 
                      : 'Your period is overdue'}
                </p>
              )}
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Fertile window:</p>
              <p className="text-lg font-bold text-sangata-pink">{fertileDays.join(' - ')}</p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-4 text-xs text-gray-500">
        This tracker provides estimates based on average cycle patterns. Your actual cycle may vary. For medical advice, please consult with a healthcare professional.
      </CardFooter>
    </Card>
  );
};

export default PeriodTracker;
