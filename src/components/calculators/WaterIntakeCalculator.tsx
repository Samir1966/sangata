
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('sedentary');
  const [climate, setClimate] = useState('moderate');
  const [waterIntake, setWaterIntake] = useState<number | null>(null);

  const calculateWaterIntake = () => {
    if (!weight) return;

    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) return;

    // Base calculation: 30ml per kg of body weight
    let baseIntake = weightInKg * 30;
    
    // Adjust for activity level
    if (activity === 'light') {
      baseIntake *= 1.1;
    } else if (activity === 'moderate') {
      baseIntake *= 1.2;
    } else if (activity === 'active') {
      baseIntake *= 1.3;
    }
    
    // Adjust for climate
    if (climate === 'hot') {
      baseIntake *= 1.1;
    } else if (climate === 'very-hot') {
      baseIntake *= 1.2;
    }
    
    // Convert to liters and round to 1 decimal place
    const liters = baseIntake / 1000;
    setWaterIntake(parseFloat(liters.toFixed(1)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateWaterIntake();
  };

  const reset = () => {
    setWeight('');
    setActivity('sedentary');
    setClimate('moderate');
    setWaterIntake(null);
  };

  return (
    <Card className="sangata-card w-full max-w-md mx-auto">
      <CardHeader className="bg-sangata-blue/20">
        <CardTitle className="text-xl font-bold text-center">Water Intake Calculator</CardTitle>
        <CardDescription className="text-center">Calculate how much water you should drink daily</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter your weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="sangata-input"
                step="0.1"
                min="0"
                required
              />
            </div>
            
            <div>
              <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-1">
                Activity Level
              </label>
              <select
                id="activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="sangata-input"
                required
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (light exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                <option value="active">Active (hard exercise 6-7 days/week)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="climate" className="block text-sm font-medium text-gray-700 mb-1">
                Climate
              </label>
              <select
                id="climate"
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
                className="sangata-input"
                required
              >
                <option value="moderate">Moderate</option>
                <option value="hot">Hot</option>
                <option value="very-hot">Very Hot</option>
              </select>
            </div>
            
            <div className="flex space-x-3">
              <Button type="submit" className="w-2/3 sangata-button-secondary">
                Calculate Water Intake
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
        
        {waterIntake !== null && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-fade-in">
            <h3 className="text-center font-semibold text-gray-800 mb-2">Recommended Daily Water Intake</h3>
            <p className="text-center text-2xl font-bold text-sangata-blue mb-1">{waterIntake} liters</p>
            <p className="text-center text-gray-600">That's about {Math.round(waterIntake * 4)} glasses of water</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-4 text-xs text-gray-500">
        This calculation provides an estimate based on weight, activity level, and climate. Individual water needs may vary. If pregnant or breastfeeding, you may need additional water.
      </CardFooter>
    </Card>
  );
};

export default WaterIntakeCalculator;
