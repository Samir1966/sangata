
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (!height || !weight) return;

    const heightInM = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (heightInM <= 0 || weightInKg <= 0) {
      return;
    }

    const calculatedBMI = weightInKg / (heightInM * heightInM);
    setBmi(parseFloat(calculatedBMI.toFixed(1)));
    
    if (calculatedBMI < 18.5) {
      setCategory('Underweight');
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
      setCategory('Normal weight');
    } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateBMI();
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <Card className="sangata-card w-full max-w-md mx-auto">
      <CardHeader className="bg-sangata-pink/20">
        <CardTitle className="text-xl font-bold text-center">BMI Calculator</CardTitle>
        <CardDescription className="text-center">Calculate your Body Mass Index</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <Input
                id="height"
                type="number"
                placeholder="Enter your height in cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="sangata-input"
                step="0.1"
                min="0"
                required
              />
            </div>
            
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
            
            <div className="flex space-x-3">
              <Button type="submit" className="w-2/3 sangata-button-primary">
                Calculate BMI
              </Button>
              <Button 
                type="button" 
                onClick={reset} 
                variant="outline" 
                className="w-1/3 border-sangata-pink text-gray-600 hover:bg-sangata-pink/10"
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
        
        {bmi !== null && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-fade-in">
            <h3 className="text-center font-semibold text-gray-800 mb-2">Your BMI Result</h3>
            <p className="text-center text-2xl font-bold text-sangata-pink mb-1">{bmi}</p>
            <p className="text-center text-gray-600">{category}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-4 text-xs text-gray-500">
        BMI is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared.
      </CardFooter>
    </Card>
  );
};

export default BMICalculator;
