
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, BarChart, Calendar, Save, PlusCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const symptoms = [
  { id: 'irregular_periods', label: 'Irregular Periods' },
  { id: 'acne', label: 'Acne' },
  { id: 'hair_growth', label: 'Excess Hair Growth' },
  { id: 'hair_loss', label: 'Hair Loss/Thinning' },
  { id: 'weight_gain', label: 'Weight Gain' },
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'mood_swings', label: 'Mood Swings' },
  { id: 'headaches', label: 'Headaches' },
  { id: 'pelvic_pain', label: 'Pelvic Pain' },
  { id: 'sleep_issues', label: 'Sleep Issues' },
];

interface SymptomLog {
  date: string;
  symptoms: string[];
  painLevel: number;
  notes: string;
}

const PCOSTracker = () => {
  const { toast } = useToast();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [painLevel, setPainLevel] = useState<number>(0);
  const [notes, setNotes] = useState('');
  const [logs, setLogs] = useState<SymptomLog[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load saved logs on component mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('pcos_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleSymptomChange = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
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
      painLevel,
      notes,
    };

    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem('pcos_logs', JSON.stringify(updatedLogs));

    toast({
      title: "Symptoms logged successfully",
      description: `Your PCOS symptoms have been recorded for ${today}.`,
    });

    // Reset form
    setSelectedSymptoms([]);
    setPainLevel(0);
    setNotes('');
    setShowSuggestions(true);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getSymptomLabel = (symptomId: string) => {
    const symptom = symptoms.find(s => s.id === symptomId);
    return symptom ? symptom.label : symptomId;
  };

  return (
    <Card className="sangata-card w-full max-w-2xl mx-auto">
      <CardHeader className="bg-sangata-green/20">
        <CardTitle className="text-xl font-bold flex items-center">
          <FileText className="mr-2" /> PCOS/PCOD Symptom Tracker
        </CardTitle>
        <CardDescription>Track your symptoms to better understand your patterns and get personalized suggestions</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        <div>
          <h3 className="font-medium mb-4">Select symptoms you're experiencing today</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {symptoms.map((symptom) => (
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
          <h3 className="font-medium mb-4">Pain/Discomfort Level</h3>
          <div className="space-y-2">
            <Slider 
              value={[painLevel]} 
              min={0} 
              max={10} 
              step={1}
              onValueChange={([value]) => setPainLevel(value)}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>None (0)</span>
              <span>Mild (3-4)</span>
              <span>Moderate (6-7)</span>
              <span>Severe (10)</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Notes</h3>
          <Textarea 
            placeholder="Add any additional details about your symptoms or how you're feeling..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <Dialog open={showSuggestions} onOpenChange={setShowSuggestions}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Personalized Lifestyle Suggestions</DialogTitle>
              <DialogDescription>
                Based on your symptoms, here are some helpful suggestions
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-700">Dietary Recommendations</h4>
                <ul className="mt-2 space-y-2 text-green-800">
                  <li className="flex items-start">
                    <PlusCircle className="h-4 w-4 mr-2 mt-1 shrink-0" />
                    <span>Increase fiber intake with whole grains, vegetables, and fruits</span>
                  </li>
                  <li className="flex items-start">
                    <PlusCircle className="h-4 w-4 mr-2 mt-1 shrink-0" />
                    <span>Include anti-inflammatory foods like turmeric, ginger, and fatty fish</span>
                  </li>
                  <li className="flex items-start">
                    <PlusCircle className="h-4 w-4 mr-2 mt-1 shrink-0" />
                    <span>Reduce refined carbohydrates and sugary foods</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-700">Exercise Suggestions</h4>
                <ul className="mt-2 space-y-2 text-blue-800">
                  <li className="flex items-start">
                    <PlusCircle className="h-4 w-4 mr-2 mt-1 shrink-0" />
                    <span>Try 30 minutes of moderate exercise like walking or dancing 5 days a week</span>
                  </li>
                  <li className="flex items-start">
                    <PlusCircle className="h-4 w-4 mr-2 mt-1 shrink-0" />
                    <span>Consider yoga for stress reduction and hormonal balance</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-700">Stress Management</h4>
                <ul className="mt-2 space-y-2 text-purple-800">
                  <li className="flex items-start">
                    <PlusCircle className="h-4 w-4 mr-2 mt-1 shrink-0" />
                    <span>Practice breathing exercises or meditation for 10 minutes daily</span>
                  </li>
                  <li className="flex items-start">
                    <PlusCircle className="h-4 w-4 mr-2 mt-1 shrink-0" />
                    <span>Ensure 7-8 hours of quality sleep each night</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setShowSuggestions(false)}>Thank you</Button>
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
            <h3 className="font-medium mb-3 text-sm">Recent Logs</h3>
            <div className="max-h-60 overflow-y-auto border rounded-md">
              {logs.slice().reverse().map((log, index) => (
                <div 
                  key={index} 
                  className={`p-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-sm">{formatDate(log.date)}</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      Pain: {log.painLevel}/10
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {log.symptoms.map(symptom => (
                      <span 
                        key={symptom}
                        className="bg-sangata-green/10 text-xs px-2 py-0.5 rounded"
                      >
                        {getSymptomLabel(symptom)}
                      </span>
                    ))}
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

export default PCOSTracker;
