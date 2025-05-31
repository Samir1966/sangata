import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Droplet, CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const commonSymptoms = [
  { id: 'fatigue', label: 'Extreme fatigue and weakness', severity: 2 },
  { id: 'pale_skin', label: 'Pale or yellowish skin', severity: 3 },
  { id: 'irregular_heartbeat', label: 'Irregular heartbeat', severity: 3 },
  { id: 'shortness_breath', label: 'Shortness of breath', severity: 2 },
  { id: 'dizziness', label: 'Dizziness or lightheadedness', severity: 2 },
  { id: 'chest_pain', label: 'Chest pain', severity: 4 },
  { id: 'headache', label: 'Frequent headaches', severity: 1 },
  { id: 'cold_hands', label: 'Cold hands and feet', severity: 1 },
  { id: 'brittle_nails', label: 'Brittle nails', severity: 1 },
  { id: 'poor_appetite', label: 'Poor appetite', severity: 1 },
];

const ironRichFoods = [
  { name: 'Spinach', description: 'Rich in iron and folate', category: 'vegetable' },
  { name: 'Lentils', description: 'High in iron and protein', category: 'legume' },
  { name: 'Tofu', description: 'Good source of iron and protein', category: 'soy' },
  { name: 'Chickpeas', description: 'Contains iron and other minerals', category: 'legume' },
  { name: 'Beans', description: 'High in iron and fiber', category: 'legume' },
  { name: 'Liver', description: 'Extremely high in iron', category: 'meat' },
  { name: 'Red meat', description: 'Contains heme iron that\'s easily absorbed', category: 'meat' },
  { name: 'Pumpkin seeds', description: 'Rich in iron and other minerals', category: 'seed' },
  { name: 'Quinoa', description: 'Contains iron and complete protein', category: 'grain' },
  { name: 'Fortified cereals', description: 'Many cereals are fortified with iron', category: 'grain' },
  { name: 'Dark chocolate', description: 'Contains iron and antioxidants', category: 'other' },
  { name: 'Dried apricots', description: 'Good source of iron and fiber', category: 'fruit' },
];

const AnemiaRiskCalculator = () => {
  const { toast } = useToast();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [menstruation, setMenstruation] = useState<string>('normal');
  const [pregnant, setPregnant] = useState<boolean>(false);
  const [dietary, setDietary] = useState<string>('balanced');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [riskLevel, setRiskLevel] = useState<string>('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [foodSuggestions, setFoodSuggestions] = useState<typeof ironRichFoods>([]);
  const [showFoodDialog, setShowFoodDialog] = useState<boolean>(false);
  
  const handleSymptomChange = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };
  
  const calculateRisk = () => {
    let riskScore = 0;
    
    selectedSymptoms.forEach(symptomId => {
      const symptom = commonSymptoms.find(s => s.id === symptomId);
      if (symptom) {
        riskScore += symptom.severity;
      }
    });
    
    if (menstruation === 'heavy') riskScore += 3;
    if (menstruation === 'very_heavy') riskScore += 5;
    
    if (pregnant) riskScore += 2;
    
    if (dietary === 'vegetarian') riskScore += 1;
    if (dietary === 'vegan') riskScore += 2;
    
    let risk = '';
    let recommendations: string[] = [];
    if (riskScore < 3) {
      risk = 'Low';
      recommendations = [
        'Continue eating an iron-rich diet',
        'Consider regular health check-ups',
        'Stay hydrated and maintain a balanced diet'
      ];
    } else if (riskScore < 7) {
      risk = 'Moderate';
      recommendations = [
        'Increase iron-rich foods in your diet',
        'Consider taking vitamin C with meals to improve iron absorption',
        'Get a blood test to check your iron levels',
        'Maintain a food diary to track iron intake'
      ];
    } else {
      risk = 'High';
      recommendations = [
        'Please consult a healthcare provider soon',
        'Increase iron-rich foods in your diet immediately',
        'Consider iron supplements after consulting a doctor',
        'Avoid tea, coffee, and calcium supplements with meals as they can reduce iron absorption'
      ];
    }
    
    let foods = [...ironRichFoods];
    
    if (dietary === 'vegetarian' || dietary === 'vegan') {
      foods = foods.filter(food => food.category !== 'meat');
    }
    
    if (dietary === 'vegan') {
      foods = foods.filter(food => 
        !['meat', 'dairy', 'egg'].includes(food.category)
      );
    }
    
    foods = foods.sort(() => 0.5 - Math.random()).slice(0, 6);
    
    setRiskLevel(risk);
    setRecommendations(recommendations);
    setFoodSuggestions(foods);
    setShowResult(true);
    
    const results = {
      date: new Date().toISOString(),
      symptoms: selectedSymptoms,
      menstruation,
      pregnant,
      dietary,
      riskLevel: risk,
      score: riskScore
    };
    
    const savedLogs = localStorage.getItem('anemia_risk_logs') || '[]';
    const logs = JSON.parse(savedLogs);
    logs.push(results);
    localStorage.setItem('anemia_risk_logs', JSON.stringify(logs));
  };
  
  const resetCalculator = () => {
    setSelectedSymptoms([]);
    setMenstruation('normal');
    setPregnant(false);
    setDietary('balanced');
    setShowResult(false);
  };

  return (
    <Card className="sangata-card w-full max-w-2xl mx-auto">
      <CardHeader className="bg-red-50">
        <CardTitle className="text-xl font-bold flex items-center">
          <Droplet className="mr-2 text-red-500" /> Nutrition & Anemia Risk Calculator
        </CardTitle>
        <CardDescription>Check your risk of anemia based on symptoms and get personalized nutrition suggestions</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {!showResult ? (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-4">Select any symptoms you're experiencing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {commonSymptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={symptom.id} 
                      checked={selectedSymptoms.includes(symptom.id)}
                      onCheckedChange={() => handleSymptomChange(symptom.id)}
                    />
                    <Label htmlFor={symptom.id} className="cursor-pointer">{symptom.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Menstrual flow (if applicable)</h3>
              <RadioGroup value={menstruation} onValueChange={setMenstruation} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">Not applicable / No periods</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light flow</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">Normal flow</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="heavy" id="heavy" />
                  <Label htmlFor="heavy">Heavy flow</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very_heavy" id="very_heavy" />
                  <Label htmlFor="very_heavy">Very heavy flow</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pregnant" 
                checked={pregnant}
                onCheckedChange={(checked) => setPregnant(checked === true)}
              />
              <Label htmlFor="pregnant">I am pregnant or breastfeeding</Label>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Dietary preference</h3>
              <RadioGroup value={dietary} onValueChange={setDietary} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="balanced" id="balanced" />
                  <Label htmlFor="balanced">Balanced diet (includes meat)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegetarian" id="vegetarian" />
                  <Label htmlFor="vegetarian">Vegetarian (no meat)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegan" id="vegan" />
                  <Label htmlFor="vegan">Vegan (no animal products)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button onClick={calculateRisk} className="w-full">
              Calculate Risk & Get Recommendations
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`p-5 rounded-lg ${
              riskLevel === 'Low' 
                ? 'bg-green-50 border border-green-200'
                : riskLevel === 'Moderate'
                ? 'bg-yellow-50 border border-yellow-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <h3 className="font-medium mb-2 flex items-center">
                {riskLevel === 'Low' ? (
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                ) : riskLevel === 'Moderate' ? (
                  <Info className="mr-2 h-5 w-5 text-yellow-500" />
                ) : (
                  <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                )}
                {riskLevel} Risk of Anemia
              </h3>
              
              <p className={`text-sm ${
                riskLevel === 'Low' 
                  ? 'text-green-700'
                  : riskLevel === 'Moderate'
                  ? 'text-yellow-700'
                  : 'text-red-700'
              }`}>
                {riskLevel === 'Low' 
                  ? 'Your symptoms suggest a low risk of anemia. However, continue monitoring for any new symptoms.'
                  : riskLevel === 'Moderate'
                  ? 'Your symptoms suggest a moderate risk of anemia. Consider discussing with a healthcare provider.'
                  : 'Your symptoms suggest a higher risk of anemia. Please consult with a healthcare provider soon.'}
              </p>
              
              {riskLevel !== 'Low' && (
                <div className="mt-3 text-sm text-gray-500">
                  <strong>Note:</strong> This is not a medical diagnosis. Always consult with a healthcare provider for proper evaluation.
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Iron-Rich Food Suggestions</h3>
                <Button variant="outline" size="sm" onClick={() => setShowFoodDialog(true)}>
                  View All Foods
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {foodSuggestions.map((food, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-red-50 border border-red-100 rounded-lg text-center hover:bg-red-100 transition-colors"
                  >
                    <p className="font-medium text-red-700">{food.name}</p>
                    <p className="text-xs text-red-500 mt-1">{food.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Dialog open={showFoodDialog} onOpenChange={setShowFoodDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Iron-Rich Foods List</DialogTitle>
                  <DialogDescription>
                    Include these foods in your diet to help increase iron levels
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ironRichFoods
                      .filter(food => {
                        if (dietary === 'vegetarian') return food.category !== 'meat';
                        if (dietary === 'vegan') return !['meat', 'dairy', 'egg'].includes(food.category);
                        return true;
                      })
                      .map((food, index) => (
                        <div key={index} className="flex items-start p-3 bg-red-50 rounded-lg">
                          <Droplet className="h-5 w-5 text-red-400 mr-2 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-800">{food.name}</p>
                            <p className="text-sm text-gray-600">{food.description}</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-700 mb-1">Tips to Enhance Iron Absorption</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Consume vitamin C-rich foods alongside iron-rich foods</li>
                      <li>• Avoid drinking tea or coffee with meals</li>
                      <li>• Cook in cast iron cookware when possible</li>
                      <li>• Avoid calcium supplements when eating iron-rich foods</li>
                    </ul>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button onClick={() => setShowFoodDialog(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {showResult ? (
          <Button onClick={resetCalculator} className="w-full">
            Check Again
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default AnemiaRiskCalculator;
