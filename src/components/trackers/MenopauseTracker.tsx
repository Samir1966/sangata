
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Thermometer, Save, Calendar, Info, CheckCircle2, X, List, Activity } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const symptoms = [
  { id: 'hot_flashes', label: 'Hot Flashes', category: 'physical' },
  { id: 'night_sweats', label: 'Night Sweats', category: 'physical' },
  { id: 'sleep_issues', label: 'Sleep Issues', category: 'physical' },
  { id: 'fatigue', label: 'Fatigue', category: 'physical' },
  { id: 'joint_pain', label: 'Joint or Muscle Pain', category: 'physical' },
  { id: 'headaches', label: 'Headaches', category: 'physical' },
  { id: 'vaginal_dryness', label: 'Vaginal Dryness', category: 'physical' },
  { id: 'dizziness', label: 'Dizziness', category: 'physical' },
  { id: 'heart_racing', label: 'Heart Racing/Palpitations', category: 'physical' },
  { id: 'mood_swings', label: 'Mood Swings', category: 'emotional' },
  { id: 'irritability', label: 'Irritability', category: 'emotional' },
  { id: 'anxiety', label: 'Anxiety', category: 'emotional' },
  { id: 'depression', label: 'Depression', category: 'emotional' },
  { id: 'concentration', label: 'Concentration Issues', category: 'emotional' },
  { id: 'memory_issues', label: 'Memory Issues', category: 'emotional' },
];

interface SymptomLog {
  date: string;
  symptoms: string[];
  intensity: number;
  period: boolean;
  notes: string;
}

const MenopauseTracker = () => {
  const { toast } = useToast();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(0);
  const [hasPeriod, setHasPeriod] = useState<'yes' | 'no'>('no');
  const [notes, setNotes] = useState('');
  const [logs, setLogs] = useState<SymptomLog[]>([]);
  const [showTips, setShowTips] = useState(false);
  
  // Filter states
  const [showPhysical, setShowPhysical] = useState(true);
  const [showEmotional, setShowEmotional] = useState(true);
  
  // Load saved logs on component mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('menopause_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleSymptomChange = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSave = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to log.",
        variant: "destructive"
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    
    const newLog: SymptomLog = {
      date: today,
      symptoms: selectedSymptoms,
      intensity,
      period: hasPeriod === 'yes',
      notes
    };

    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem('menopause_logs', JSON.stringify(updatedLogs));

    toast({
      title: "Symptoms logged successfully",
      description: `Your menopause symptoms have been recorded for ${today}.`,
    });

    setSelectedSymptoms([]);
    setIntensity(0);
    setHasPeriod('no');
    setNotes('');
    setShowTips(true);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getSymptomLabel = (symptomId: string) => {
    const symptom = symptoms.find(s => s.id === symptomId);
    return symptom ? symptom.label : symptomId;
  };
  
  const filteredSymptoms = symptoms.filter(symptom => 
    (showPhysical && symptom.category === 'physical') || 
    (showEmotional && symptom.category === 'emotional')
  );

  return (
    <Card className="sangata-card w-full max-w-2xl mx-auto">
      <CardHeader className="bg-sangata-peach/20">
        <CardTitle className="text-xl font-bold flex items-center">
          <Thermometer className="mr-2" /> Menopause Health Tracker
        </CardTitle>
        <CardDescription>Track your menopause symptoms and get personalized lifestyle suggestions</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        <div className="flex flex-wrap gap-3 mb-2">
          <Button
            variant={showPhysical ? "default" : "outline"}
            onClick={() => setShowPhysical(!showPhysical)}
            size="sm"
            className={showPhysical ? "bg-sangata-peach/20 hover:bg-sangata-peach/30 text-gray-800" : ""}
          >
            Physical Symptoms
          </Button>
          <Button
            variant={showEmotional ? "default" : "outline"}
            onClick={() => setShowEmotional(!showEmotional)}
            size="sm"
            className={showEmotional ? "bg-sangata-blue/20 hover:bg-sangata-blue/30 text-gray-800" : ""}
          >
            Emotional Symptoms
          </Button>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Select symptoms you're experiencing today</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSymptoms.map((symptom) => (
              <div 
                key={symptom.id} 
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  selectedSymptoms.includes(symptom.id) 
                    ? symptom.category === 'physical' 
                      ? 'bg-sangata-peach/10'
                      : 'bg-sangata-blue/10'
                    : ''
                }`}
              >
                <Checkbox 
                  id={symptom.id} 
                  checked={selectedSymptoms.includes(symptom.id)}
                  onCheckedChange={() => handleSymptomChange(symptom.id)}
                />
                <Label htmlFor={symptom.id} className="cursor-pointer w-full">{symptom.label}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Overall Symptom Intensity</h3>
          <div className="space-y-2">
            <Slider 
              value={[intensity]} 
              min={0} 
              max={10} 
              step={1}
              onValueChange={([value]) => setIntensity(value)}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Mild (0-3)</span>
              <span>Moderate (4-7)</span>
              <span>Severe (8-10)</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Did you have your period today?</h3>
          <Select value={hasPeriod} onValueChange={(value: 'yes' | 'no') => setHasPeriod(value)}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Notes</h3>
          <Textarea 
            placeholder="Add any additional details about your symptoms or how you're feeling today..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <Dialog open={showTips} onOpenChange={setShowTips}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Menopause Lifestyle Adjustments</DialogTitle>
              <DialogDescription>
                Based on your symptoms, here are some helpful suggestions
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {(selectedSymptoms.includes('hot_flashes') || selectedSymptoms.includes('night_sweats')) && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-700">For Hot Flashes & Night Sweats</h4>
                  <ul className="mt-2 space-y-2 text-blue-800">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-1 shrink-0" />
                      <span>Wear loose, layered, cotton clothing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-1 shrink-0" />
                      <span>Keep a cool environment, especially at night</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-4 w-4 mr-2 mt-1 shrink-0 text-red-500" />
                      <span>Avoid triggers like spicy food, alcohol, and caffeine</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {(selectedSymptoms.includes('anxiety') || selectedSymptoms.includes('mood_swings') || selectedSymptoms.includes('irritability')) && (
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-700">For Mood Changes</h4>
                  <ul className="mt-2 space-y-2 text-purple-800">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-1 shrink-0" />
                      <span>Practice 10 minutes of mindfulness meditation daily</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-1 shrink-0" />
                      <span>Consider joining a menopause support group</span>
                    </li>
                    <li className="flex items-start">
                      <Activity className="h-4 w-4 mr-2 mt-1 shrink-0" />
                      <span>Regular physical activity helps stabilize mood</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {(selectedSymptoms.includes('sleep_issues') || selectedSymptoms.includes('fatigue')) && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-700">For Sleep Issues & Fatigue</h4>
                  <ul className="mt-2 space-y-2 text-green-800">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-1 shrink-0" />
                      <span>Maintain a consistent sleep schedule, even on weekends</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-1 shrink-0" />
                      <span>Create a cool, dark sleeping environment</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-4 w-4 mr-2 mt-1 shrink-0 text-red-500" />
                      <span>Avoid screens 1-2 hours before bedtime</span>
                    </li>
                  </ul>
                </div>
              )}
              
              <div className="p-3 bg-amber-50 rounded-lg">
                <h4 className="font-medium text-amber-700">General Wellness Tips</h4>
                <ul className="mt-2 space-y-2 text-amber-800">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 mr-2 mt-1 shrink-0" />
                    <span>Incorporate calcium and vitamin D rich foods in your diet</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 mr-2 mt-1 shrink-0" />
                    <span>Aim for 30 minutes of moderate exercise most days</span>
                  </li>
                  <li className="flex items-start">
                    <Info className="h-4 w-4 mr-2 mt-1 shrink-0" />
                    <span>Consider discussing hormone therapy options with your healthcare provider</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setShowTips(false)}>Thank you</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
      
      <CardFooter className="flex-col">
        <Button onClick={handleSave} className="w-full mb-4">
          <Save className="mr-2 h-4 w-4" /> Log Today's Symptoms
        </Button>
        
        {logs.length > 0 && (
          <div className="w-full">
            <h3 className="font-medium mb-3 text-sm flex items-center">
              <List className="h-4 w-4 mr-1" /> Recent Logs
            </h3>
            <div className="max-h-60 overflow-y-auto border rounded-md">
              {logs.slice().reverse().map((log, index) => (
                <div 
                  key={index} 
                  className={`p-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-sm flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> {formatDate(log.date)}
                      {log.period && (
                        <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                          Period
                        </span>
                      )}
                    </span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      Intensity: {log.intensity}/10
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {log.symptoms.map(symptom => {
                      const symptomObj = symptoms.find(s => s.id === symptom);
                      const category = symptomObj?.category || 'physical';
                      return (
                        <span 
                          key={symptom}
                          className={`text-xs px-2 py-0.5 rounded ${
                            category === 'physical' ? 'bg-sangata-peach/10' : 'bg-sangata-blue/10'
                          }`}
                        >
                          {getSymptomLabel(symptom)}
                        </span>
                      );
                    })}
                  </div>
                  {log.notes && (
                    <p className="text-xs text-gray-600 mt-1">{log.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default MenopauseTracker;
