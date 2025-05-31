
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, BrainCircuit, Smile, Frown, Meh, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const moodOptions = [
  { value: 'great', label: 'Great', icon: <Smile className="h-12 w-12 text-green-500" /> },
  { value: 'good', label: 'Good', icon: <Smile className="h-12 w-12 text-blue-400" /> },
  { value: 'okay', label: 'Okay', icon: <Meh className="h-12 w-12 text-yellow-500" /> },
  { value: 'low', label: 'Low', icon: <Frown className="h-12 w-12 text-orange-500" /> },
  { value: 'bad', label: 'Bad', icon: <Frown className="h-12 w-12 text-red-500" /> },
];

const stressOptions = [
  { value: 'none', label: 'None' },
  { value: 'mild', label: 'Mild' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'high', label: 'High' },
  { value: 'severe', label: 'Severe' },
];

const sleepOptions = [
  { value: 'less4', label: 'Less than 4 hours' },
  { value: '4to6', label: '4 to 6 hours' },
  { value: '6to8', label: '6 to 8 hours' },
  { value: 'more8', label: 'More than 8 hours' },
];

const MentalHealthTracker = () => {
  const { toast } = useToast();
  const [mood, setMood] = useState<string | null>(null);
  const [stress, setStress] = useState<string | null>(null);
  const [sleep, setSleep] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Load previous data if available
  useEffect(() => {
    const savedData = localStorage.getItem('mentalHealthData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setMood(parsedData.mood || null);
      setStress(parsedData.stress || null);
      setSleep(parsedData.sleep || null);
      setNotes(parsedData.notes || '');
    }
  }, []);

  const handleNext = () => {
    if ((step === 1 && !mood) || (step === 2 && !stress) || (step === 3 && !sleep)) {
      toast({
        title: "Please make a selection",
        description: "Choose an option to continue",
        variant: "destructive"
      });
      return;
    }
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const generateSuggestions = async () => {
    setLoading(true);
    // In a real app, this would be an API call to generate AI suggestions
    // For now, we'll simulate with a delay and predefined suggestions based on inputs
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate basic suggestions based on input
    const newSuggestions = [];
    
    // Mood-based suggestions
    if (mood === 'great' || mood === 'good') {
      newSuggestions.push("Continue your positive behaviors! Consider journaling what made today good.");
    } else if (mood === 'okay') {
      newSuggestions.push("Try a 10-minute walk outside to boost your mood naturally.");
    } else {
      newSuggestions.push("Practice 5 minutes of deep breathing or meditation to help center yourself.");
      newSuggestions.push("Consider talking with a trusted friend or family member about how you're feeling.");
    }
    
    // Stress-based suggestions
    if (stress === 'moderate' || stress === 'high' || stress === 'severe') {
      newSuggestions.push("Try the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7, exhale for 8.");
      newSuggestions.push("Schedule short breaks throughout your day to reset your mind.");
    }
    
    // Sleep-based suggestions
    if (sleep === 'less4' || sleep === '4to6') {
      newSuggestions.push("Consider creating a calming pre-sleep routine and avoiding screens 1 hour before bed.");
      newSuggestions.push("Try to maintain a consistent sleep schedule, even on weekends.");
    }
    
    setSuggestions(newSuggestions);
    
    // Save data to localStorage
    const dataToSave = {
      mood,
      stress,
      sleep,
      notes,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('mentalHealthData', JSON.stringify(dataToSave));
    
    setLoading(false);
  };
  
  const handleSaveMoodCheckIn = () => {
    generateSuggestions();
  };

  return (
    <Card className="sangata-card w-full max-w-md mx-auto">
      <CardHeader className="bg-sangata-blue/20">
        <CardTitle className="text-xl font-bold flex items-center">
          <BrainCircuit className="mr-2" /> Mental Health Check-In
        </CardTitle>
        <CardDescription>Track your mood, stress, and get personalized suggestions</CardDescription>
      </CardHeader>
      
      <CardContent className="py-6">
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="font-medium mb-4">How are you feeling today?</h3>
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map((option) => (
                <div 
                  key={option.value}
                  className={`flex flex-col items-center cursor-pointer p-3 rounded-lg transition-all ${
                    mood === option.value 
                      ? 'bg-sangata-blue/20 border border-sangata-blue' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setMood(option.value)}
                >
                  <div className="mb-2">{option.icon}</div>
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="font-medium mb-4">What's your stress level today?</h3>
            <RadioGroup value={stress || ''} onValueChange={setStress} className="flex flex-col space-y-3">
              {stressOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
        
        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="font-medium mb-4">How did you sleep last night?</h3>
            <RadioGroup value={sleep || ''} onValueChange={setSleep} className="flex flex-col space-y-3">
              {sleepOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
        
        {step === 4 && (
          <div className="animate-fade-in">
            <h3 className="font-medium mb-4">Additional notes (optional)</h3>
            <Textarea
              placeholder="How are you really feeling? What's on your mind today?"
              className="min-h-[120px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        )}
        
        {step === 5 && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Your Check-In Summary</h3>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="font-medium">Mood:</div>
                <div className="capitalize">{mood}</div>
                <div className="font-medium">Stress Level:</div>
                <div className="capitalize">{stress}</div>
                <div className="font-medium">Sleep:</div>
                <div className="capitalize">
                  {sleep === 'less4' ? 'Less than 4 hours' : 
                   sleep === '4to6' ? '4 to 6 hours' : 
                   sleep === '6to8' ? '6 to 8 hours' : 
                   sleep === 'more8' ? 'More than 8 hours' : ''}
                </div>
              </div>
              {notes && (
                <div className="mt-3 pt-3 border-t">
                  <div className="font-medium mb-1">Notes:</div>
                  <div className="text-sm">{notes}</div>
                </div>
              )}
            </div>
            
            {loading ? (
              <div className="text-center py-6">
                <div className="animate-pulse mb-2">Generating personalized suggestions...</div>
                <p className="text-sm text-gray-500">Our AI is analyzing your responses</p>
              </div>
            ) : suggestions.length > 0 ? (
              <div>
                <h3 className="font-medium mb-3">Personalized Suggestions</h3>
                <ul className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        {step > 1 && step < 6 && (
          <Button variant="outline" onClick={handlePrev}>
            Back
          </Button>
        )}
        
        {step < 5 && (
          <Button className="ml-auto" onClick={handleNext}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        
        {step === 5 && !suggestions.length && !loading && (
          <Button className="ml-auto" onClick={handleSaveMoodCheckIn}>
            Get Suggestions
          </Button>
        )}
        
        {step === 5 && suggestions.length > 0 && (
          <Button className="ml-auto" onClick={() => setStep(1)}>
            New Check-In
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MentalHealthTracker;
