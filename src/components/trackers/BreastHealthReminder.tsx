
import React, { useState, useEffect } from 'react';
import { format, addMonths, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Bell, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

const BreastHealthReminder = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [preferredDay, setPreferredDay] = useState<string>("1"); // Day of month
  const [reminderMethod, setReminderMethod] = useState<string>("app");
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(true);
  const [reminderHistory, setReminderHistory] = useState<any[]>([]);
  const [showTutorial, setShowTutorial] = useState<string>("step1");

  // Load saved settings
  useEffect(() => {
    if (user) {
      const savedSettings = localStorage.getItem(`breast_health_settings_${user.id}`);
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setPreferredDay(settings.preferredDay || "1");
        setReminderMethod(settings.reminderMethod || "app");
        setRemindersEnabled(settings.remindersEnabled !== false);
      }

      const savedHistory = localStorage.getItem(`breast_health_history_${user.id}`);
      if (savedHistory) {
        setReminderHistory(JSON.parse(savedHistory));
      }
    }
  }, [user]);

  // Save settings
  const saveSettings = () => {
    if (user) {
      const settings = {
        preferredDay,
        reminderMethod,
        remindersEnabled
      };
      localStorage.setItem(`breast_health_settings_${user.id}`, JSON.stringify(settings));
      
      toast({
        title: "Settings saved",
        description: "Your breast health reminder settings have been updated.",
      });
    }
  };

  // Mark date as checked
  const markAsChecked = (currentDate?: Date) => {
    if (!currentDate) return;
    
    const newHistory = [...reminderHistory];
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    
    if (!newHistory.find(item => item.date === dateStr)) {
      newHistory.push({
        date: dateStr,
        checked: true
      });
      
      setReminderHistory(newHistory);
      
      if (user) {
        localStorage.setItem(`breast_health_history_${user.id}`, JSON.stringify(newHistory));
      }
      
      toast({
        title: "Self-check recorded",
        description: "Your breast self-examination has been recorded.",
      });
    }
  };

  // Calculate next reminder date
  const getNextReminderDate = () => {
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();
    
    let reminderDate = new Date(thisYear, thisMonth, parseInt(preferredDay));
    
    // If today is past the preferred day this month, schedule for next month
    if (today.getDate() > parseInt(preferredDay)) {
      reminderDate = addMonths(reminderDate, 1);
    }
    
    return reminderDate;
  };

  // Check if a date has been marked as checked
  const isDateChecked = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return reminderHistory.some(item => item.date === dateStr && item.checked);
  };

  // Day options for the select
  const dayOptions = Array.from({ length: 28 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString()
  }));

  const modifiers = {
    checked: reminderHistory.map(item => new Date(item.date)),
    upcoming: getNextReminderDate()
  };

  // Function to generate custom day class names
  const dayClassName = (date: Date) => {
    const classes = [];
    
    if (isDateChecked(date)) {
      classes.push('bg-green-100 text-green-800');
    }
    
    if (isSameDay(date, getNextReminderDate())) {
      classes.push('bg-blue-100 text-blue-800 font-bold');
    }
    
    return classes.join(' ');
  };

  return (
    <div className="mb-8">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-3 mb-4">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="guide">Self-Exam Guide</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-sangata-pink" />
                Breast Self-Examination Calendar
              </CardTitle>
              <CardDescription>
                Track your monthly self-exams and set reminders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md p-3"
                    modifiers={modifiers}
                    modifiersStyles={{
                      checked: { backgroundColor: '#dcfce7', color: '#166534', fontWeight: 'bold' },
                      upcoming: { backgroundColor: '#dbeafe', color: '#1e40af', fontWeight: 'bold' }
                    }}
                    components={{
                      DayContent: ({ date }) => {
                        return (
                          <div className="relative flex items-center justify-center">
                            {date.getDate()}
                            {isDateChecked(date) && (
                              <CheckCircle className="absolute top-0 right-0 h-3 w-3 text-green-600" />
                            )}
                          </div>
                        )
                      }
                    }}
                  />
                </div>
                <div className="md:w-1/2 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Next scheduled examination:</h3>
                    <p className="text-2xl font-bold">{format(getNextReminderDate(), 'MMMM d, yyyy')}</p>
                    <p className="text-muted-foreground">
                      {remindersEnabled 
                        ? `You'll receive a reminder via ${reminderMethod === 'app' ? 'app notification' : 'email'}`
                        : 'Reminders are currently disabled'}
                    </p>
                  </div>
                  
                  {date && (
                    <div className="border rounded-md p-4 bg-gray-50">
                      <h4 className="font-medium mb-2">
                        {format(date, 'MMMM d, yyyy')}
                      </h4>
                      
                      {isDateChecked(date) ? (
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="h-5 w-5" />
                          <span>Self-examination completed</span>
                        </div>
                      ) : (
                        <Button onClick={() => markAsChecked(date)}>
                          Mark as completed
                        </Button>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 mt-4">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Completed examination</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Upcoming scheduled examination</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guide" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2 text-sangata-pink" />
                How to Perform a Breast Self-Examination
              </CardTitle>
              <CardDescription>
                Follow this step-by-step guide for a thorough self-examination
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={showTutorial} onValueChange={setShowTutorial} className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="step1">Step 1</TabsTrigger>
                  <TabsTrigger value="step2">Step 2</TabsTrigger>
                  <TabsTrigger value="step3">Step 3</TabsTrigger>
                  <TabsTrigger value="step4">Step 4</TabsTrigger>
                </TabsList>
                
                <TabsContent value="step1" className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">Visual Inspection</h3>
                    <div className="prose max-w-none">
                      <p>Stand in front of a mirror with your shoulders straight and arms on your hips.</p>
                      <ul className="mt-2 space-y-2">
                        <li>Check for any changes in the size, shape, or color of your breasts</li>
                        <li>Look for any visible distortion or swelling</li>
                        <li>Note any changes in skin texture, such as puckering or dimpling</li>
                        <li>Check if your nipples have changed position or become inverted</li>
                        <li>Look for any redness, soreness, rash, or swelling</li>
                      </ul>
                    </div>
                    <Button className="mt-4" onClick={() => setShowTutorial("step2")}>
                      Next Step
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="step2" className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">Raise Your Arms</h3>
                    <div className="prose max-w-none">
                      <p>Raise your arms above your head and look for the same changes.</p>
                      <ul className="mt-2 space-y-2">
                        <li>Check for any changes that weren't visible in the previous position</li>
                        <li>Look for any fluid coming out of one or both nipples</li>
                        <li>The fluid could be watery, milky, yellow, or bloody</li>
                      </ul>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button variant="outline" onClick={() => setShowTutorial("step1")}>
                        Previous Step
                      </Button>
                      <Button onClick={() => setShowTutorial("step3")}>
                        Next Step
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="step3" className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">Lying Down Position</h3>
                    <div className="prose max-w-none">
                      <p>Lie down and place a pillow under your right shoulder. Place your right arm behind your head.</p>
                      <ul className="mt-2 space-y-2">
                        <li>Use your left hand to feel your right breast</li>
                        <li>Use a firm, smooth touch with the first few finger pads, keeping fingers flat and together</li>
                        <li>Use a circular motion, about the size of a quarter</li>
                        <li>Cover the entire breast from collarbone to the top of your abdomen, and from armpit to cleavage</li>
                        <li>Follow a pattern to be sure you cover the whole breast</li>
                        <li>Repeat for the left breast using your right hand</li>
                      </ul>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button variant="outline" onClick={() => setShowTutorial("step2")}>
                        Previous Step
                      </Button>
                      <Button onClick={() => setShowTutorial("step4")}>
                        Next Step
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="step4" className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">Standing or Sitting Position</h3>
                    <div className="prose max-w-none">
                      <p>Feel your breasts while standing or sitting, with your arm just slightly raised.</p>
                      <p>This is often easier in the shower when your skin is wet and slippery.</p>
                      <p className="font-medium mt-4">What to look for:</p>
                      <ul className="mt-2 space-y-2">
                        <li>Any lump, hardened knot, or thickening inside the breast or underarm area</li>
                        <li>Any changes in the size or shape of your breast</li>
                        <li>Dimpling or puckering of the skin</li>
                        <li>Itchy, scaly sore or rash on the nipple</li>
                        <li>Pulling in of your nipple or other parts of the breast</li>
                        <li>Nipple discharge that starts suddenly</li>
                        <li>New pain in one spot that doesn't go away</li>
                      </ul>
                      <p className="font-bold text-sangata-pink mt-4">
                        If you notice any changes, see your healthcare provider right away.
                      </p>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button variant="outline" onClick={() => setShowTutorial("step3")}>
                        Previous Step
                      </Button>
                      <Button onClick={() => setShowTutorial("step1")}>
                        Back to Start
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-sangata-pink" />
                Reminder Settings
              </CardTitle>
              <CardDescription>
                Customize your breast health check reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="reminders-toggle" className="font-medium">Enable Reminders</Label>
                <Switch
                  id="reminders-toggle"
                  checked={remindersEnabled}
                  onCheckedChange={setRemindersEnabled}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="preferred-day" className="font-medium">Preferred Day of Month</Label>
                  <Select value={preferredDay} onValueChange={setPreferredDay}>
                    <SelectTrigger id="preferred-day" className="mt-1 w-full">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {dayOptions.map(day => (
                        <SelectItem key={day.value} value={day.value}>{day.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    You'll receive a reminder on this day each month
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="reminder-method" className="font-medium">Reminder Method</Label>
                  <Select value={reminderMethod} onValueChange={setReminderMethod}>
                    <SelectTrigger id="reminder-method" className="mt-1 w-full">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="app">App Notification</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreastHealthReminder;
