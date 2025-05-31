
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Clock, Bell } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Reminder {
  id: string;
  medicineName: string;
  morning: boolean;
  afternoon: boolean;
  night: boolean;
}

const MedicineReminderPage = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      medicineName: '',
      morning: false,
      afternoon: false,
      night: false
    }
  ]);
  const { toast } = useToast();
  
  const addReminder = () => {
    setReminders([
      ...reminders,
      {
        id: Date.now().toString(),
        medicineName: '',
        morning: false,
        afternoon: false,
        night: false
      }
    ]);
  };
  
  const removeReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };
  
  const updateReminder = (id: string, field: keyof Reminder, value: string | boolean) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, [field]: value } : reminder
    ));
  };
  
  const saveReminders = () => {
    // Validate that at least one reminder has a name and time
    const validReminders = reminders.filter(reminder => 
      reminder.medicineName.trim() !== '' && (reminder.morning || reminder.afternoon || reminder.night)
    );
    
    if (validReminders.length === 0) {
      toast({
        title: "Unable to save reminders",
        description: "Please enter a medicine name and select at least one time of day.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Reminders set successfully",
      description: `You will receive notifications for your ${validReminders.length} medicine(s).`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Medicine Reminder Setup</h1>
              <p className="text-gray-600">
                Set up friendly reminders for your medication schedule.
              </p>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="bg-blue-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <span className="text-2xl mr-2">⏰</span> Set Medicine Reminder
                </CardTitle>
                <CardDescription>
                  Enter your medicines and when you need to take them.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {reminders.map((reminder, index) => (
                    <div key={reminder.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-800">Medicine #{index + 1}</h3>
                        {reminders.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeReminder(reminder.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`medicine-${reminder.id}`}>Medicine Name</Label>
                          <Input 
                            id={`medicine-${reminder.id}`}
                            value={reminder.medicineName}
                            onChange={(e) => updateReminder(reminder.id, 'medicineName', e.target.value)}
                            placeholder="e.g., Paracetamol, Vitamin D, etc."
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label>Reminder Times</Label>
                          <div className="flex flex-col sm:flex-row mt-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id={`morning-${reminder.id}`}
                                checked={reminder.morning}
                                onCheckedChange={(checked) => 
                                  updateReminder(reminder.id, 'morning', checked === true)
                                }
                              />
                              <Label htmlFor={`morning-${reminder.id}`} className="cursor-pointer">
                                Morning (8:00 AM)
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id={`afternoon-${reminder.id}`}
                                checked={reminder.afternoon}
                                onCheckedChange={(checked) => 
                                  updateReminder(reminder.id, 'afternoon', checked === true)
                                }
                              />
                              <Label htmlFor={`afternoon-${reminder.id}`} className="cursor-pointer">
                                Afternoon (2:00 PM)
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id={`night-${reminder.id}`}
                                checked={reminder.night}
                                onCheckedChange={(checked) => 
                                  updateReminder(reminder.id, 'night', checked === true)
                                }
                              />
                              <Label htmlFor={`night-${reminder.id}`} className="cursor-pointer">
                                Night (9:00 PM)
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    onClick={addReminder}
                    className="w-full flex items-center justify-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Another Medicine
                  </Button>
                  
                  <Button onClick={saveReminders} className="w-full">
                    <Bell size={16} className="mr-2" />
                    Set Reminders
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 mt-8">
              <p className="font-medium mb-2">About This Tool:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Set up friendly reminders in Hindi or English for your medication.</li>
                <li>Notifications will say "बहना, दवा का समय हो गया है" (Sister, it's time for your medicine).</li>
                <li>Reminders can be edited or canceled at any time from your profile.</li>
                <li>For best results, keep your device notifications turned on.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MedicineReminderPage;
