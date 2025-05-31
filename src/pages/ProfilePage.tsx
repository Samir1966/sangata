
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Calendar, 
  FileText, 
  Settings, 
  User, 
  BarChart, 
  Heart, 
  Download, 
  Edit, 
  Thermometer, 
  Droplet, 
  BrainCircuit, 
  Medal,
  Phone
} from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const ProfilePage = () => {
  const { user, logout, downloadHealthCard } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Load tracker data
  const loadTrackerData = () => {
    let trackerData = {
      period: null,
      mental: null,
      pcos: null,
      menopause: null,
      anemia: null,
      breast: null
    };
    
    if (user) {
      // Load period tracker data
      const periodData = localStorage.getItem(`period_tracker_${user.id}`);
      if (periodData) {
        trackerData.period = JSON.parse(periodData);
      }
      
      // Load mental health data
      const mentalData = localStorage.getItem(`mental_health_logs_${user.id}`);
      if (mentalData) {
        trackerData.mental = JSON.parse(mentalData);
      }
      
      // Load PCOS tracker data
      const pcosData = localStorage.getItem(`pcos_tracker_${user.id}`);
      if (pcosData) {
        trackerData.pcos = JSON.parse(pcosData);
      }
      
      // Load menopause tracker data
      const menopauseData = localStorage.getItem(`menopause_tracker_${user.id}`);
      if (menopauseData) {
        trackerData.menopause = JSON.parse(menopauseData);
      }
      
      // Load anemia risk data
      const anemiaData = localStorage.getItem(`anemia_risk_logs`);
      if (anemiaData) {
        trackerData.anemia = JSON.parse(anemiaData);
      }
      
      // Load breast health data
      const breastData = localStorage.getItem(`breast_health_history_${user.id}`);
      if (breastData) {
        trackerData.breast = JSON.parse(breastData);
      }
    }
    
    return trackerData;
  };
  
  const trackerData = loadTrackerData();

  // Example data for charts
  const moodData = [
    { name: 'Mon', value: 7 },
    { name: 'Tue', value: 6 },
    { name: 'Wed', value: 8 },
    { name: 'Thu', value: 5 },
    { name: 'Fri', value: 6 },
    { name: 'Sat', value: 9 },
    { name: 'Sun', value: 8 },
  ];

  const healthScoreData = [
    { name: 'Physical', value: 75 },
    { name: 'Mental', value: 85 },
    { name: 'Nutrition', value: 65 },
    { name: 'Sleep', value: 70 },
  ];

  const pieData = [
    { name: 'Great Days', value: 15, color: '#4ade80' },
    { name: 'Good Days', value: 8, color: '#facc15' },
    { name: 'Challenging Days', value: 7, color: '#f87171' },
  ];

  const COLORS = ['#4ade80', '#facc15', '#f87171'];

  // Function to get initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sangata-card sticky top-24">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-sangata-pink/30 mb-4">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={user.photoUrl} alt={user.name} />
                        <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
                    <p className="text-gray-500 mb-1">{user.email}</p>
                    {user.phone && <p className="text-gray-500 mb-4 flex items-center"><Phone className="h-3 w-3 mr-1" /> {user.phone}</p>}
                    
                    <div className="w-full flex flex-col space-y-2 mt-2">
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link to="/profile/edit">
                          <Edit className="mr-2 h-4 w-4" /> Edit Profile
                        </Link>
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <Medal className="mr-2 h-4 w-4" /> संगात Health Card
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>संगात Health Card</DialogTitle>
                            <DialogDescription>
                              Your personal health card with essential medical information
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="bg-gradient-to-r from-sangata-pink/20 via-sangata-blue/20 to-sangata-green/20 p-6 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-bold text-xl text-gray-800">संगात Health Card</h3>
                                <p className="text-gray-600 text-sm">ID: {user.id}</p>
                              </div>
                              <img src="/lovable-uploads/ee40c451-039e-46ff-8e9d-aae5b1c043ff.png" alt="संगात Logo" className="h-10 w-10" />
                            </div>
                            
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="w-16 h-16 rounded-full overflow-hidden">
                                <Avatar className="w-full h-full">
                                  <AvatarImage src={user.photoUrl} alt={user.name} />
                                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-800">{user.name}</h4>
                                <p className="text-gray-600 text-sm">{user.address}</p>
                                {user.phone && <p className="text-gray-600 text-sm">{user.phone}</p>}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-gray-500 text-xs">Age</p>
                                <p className="font-medium">{user.age} years</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Blood Group</p>
                                <p className="font-medium">{user.bloodGroup || 'Not set'}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Height</p>
                                <p className="font-medium">{user.height} cm</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Weight</p>
                                <p className="font-medium">{user.weight} kg</p>
                              </div>
                            </div>
                            
                            {user.medicalConditions && user.medicalConditions.length > 0 && (
                              <div className="mt-4">
                                <p className="text-gray-500 text-xs">Medical Conditions</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {user.medicalConditions.map((condition) => (
                                    <span key={condition} className="bg-sangata-pink/10 text-gray-700 text-xs px-2 py-1 rounded">
                                      {condition}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <DialogFooter>
                            <Button onClick={downloadHealthCard}>
                              <Download className="mr-2 h-4 w-4" /> Download Health Card
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="outline" className="w-full justify-start" onClick={logout}>
                        <User className="mr-2 h-4 w-4" /> Logout
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="overview">Health Overview</TabsTrigger>
                  <TabsTrigger value="trackers">Health Trackers</TabsTrigger>
                  <TabsTrigger value="reports">Health Reports</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Heart className="mr-2 text-sangata-pink h-5 w-5" /> Health Score
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">86/100</div>
                        <p className="text-sm text-gray-500">Very Good</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Calendar className="mr-2 text-sangata-blue h-5 w-5" /> Next Period
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold">May 15</div>
                        <p className="text-sm text-gray-500">In 5 days</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <BrainCircuit className="mr-2 text-sangata-peach h-5 w-5" /> Mental Wellness
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold">Good</div>
                        <p className="text-sm text-gray-500">Based on check-ins</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart className="mr-2 h-5 w-5" /> Weekly Mood Tracker
                        </CardTitle>
                        <CardDescription>Your mood over the past 7 days</CardDescription>
                      </CardHeader>
                      <CardContent className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart data={moodData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 10]} />
                            <RechartsTooltip />
                            <Bar dataKey="value" fill="#f9a8d4" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Heart className="mr-2 h-5 w-5" /> Monthly Overview
                        </CardTitle>
                        <CardDescription>Past 30 days analysis</CardDescription>
                      </CardHeader>
                      <CardContent className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Legend />
                            <RechartsTooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Personalized Recommendations</CardTitle>
                      <CardDescription>Based on your health data and trackers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                          <div className="bg-sangata-pink/20 p-2 rounded-full">
                            <Heart className="h-5 w-5 text-sangata-pink" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Consider iron-rich foods</h4>
                            <p className="text-gray-600 text-sm">Based on your symptoms, try including more spinach, beans, and lean meats in your diet.</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-4">
                          <div className="bg-sangata-blue/20 p-2 rounded-full">
                            <Droplet className="h-5 w-5 text-sangata-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Increase water intake</h4>
                            <p className="text-gray-600 text-sm">You've been below your daily water goal. Try to drink at least 2 liters today.</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-4">
                          <div className="bg-sangata-green/20 p-2 rounded-full">
                            <BrainCircuit className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Mental wellness activity</h4>
                            <p className="text-gray-600 text-sm">Try 5 minutes of deep breathing today to help reduce your stress levels.</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Trackers Tab */}
                <TabsContent value="trackers" className="animate-fade-in space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/calculators" className="block">
                      <Card className="h-full hover:shadow-md transition-shadow duration-200">
                        <CardHeader className="bg-sangata-pink/10">
                          <CardTitle className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5" /> Period & Ovulation Tracker
                          </CardTitle>
                          <CardDescription>Track your cycle and get predictions</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Next period expected</p>
                              <p className="font-semibold">May 15, 2023</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Fertile window</p>
                              <p className="font-semibold">May 1 - May 5</p>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">Open Tracker</Button>
                        </CardContent>
                      </Card>
                    </Link>
                    
                    <Link to="/mental-health" className="block">
                      <Card className="h-full hover:shadow-md transition-shadow duration-200">
                        <CardHeader className="bg-sangata-blue/10">
                          <CardTitle className="flex items-center">
                            <BrainCircuit className="mr-2 h-5 w-5" /> Mental Health Checker
                          </CardTitle>
                          <CardDescription>Track your mood and stress levels</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Today's mood</p>
                              <p className="font-semibold">Good</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Stress level</p>
                              <p className="font-semibold">Low</p>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">Check In Now</Button>
                        </CardContent>
                      </Card>
                    </Link>
                    
                    <Link to="/pcos-tracker" className="block">
                      <Card className="h-full hover:shadow-md transition-shadow duration-200">
                        <CardHeader className="bg-sangata-green/10">
                          <CardTitle className="flex items-center">
                            <FileText className="mr-2 h-5 w-5" /> PCOS/PCOD Tracker
                          </CardTitle>
                          <CardDescription>Monitor symptoms and get insights</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Symptoms tracked</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-sangata-pink/10 text-xs px-2 py-1 rounded">Irregular periods</span>
                              <span className="bg-sangata-pink/10 text-xs px-2 py-1 rounded">Acne</span>
                              <span className="bg-sangata-pink/10 text-xs px-2 py-1 rounded">Fatigue</span>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">Update Symptoms</Button>
                        </CardContent>
                      </Card>
                    </Link>
                    
                    <Link to="/menopause-tracker" className="block">
                      <Card className="h-full hover:shadow-md transition-shadow duration-200">
                        <CardHeader className="bg-sangata-peach/10">
                          <CardTitle className="flex items-center">
                            <Thermometer className="mr-2 h-5 w-5" /> Menopause Health Tracker
                          </CardTitle>
                          <CardDescription>Track symptoms and get guidance</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Recent symptoms</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-sangata-peach/10 text-xs px-2 py-1 rounded">Hot flashes</span>
                              <span className="bg-sangata-peach/10 text-xs px-2 py-1 rounded">Sleep changes</span>
                              <span className="bg-sangata-peach/10 text-xs px-2 py-1 rounded">Mood changes</span>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">Update Tracker</Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Wellness Tools</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-auto py-4 flex flex-col" asChild>
                          <Link to="/anemia-risk">
                            <FileText className="h-6 w-6 mb-2" />
                            <span>Nutrition & Anemia Risk Calculator</span>
                          </Link>
                        </Button>
                        
                        <Button variant="outline" className="h-auto py-4 flex flex-col" asChild>
                          <Link to="/breast-health">
                            <Heart className="h-6 w-6 mb-2" />
                            <span>Breast Health Reminder</span>
                          </Link>
                        </Button>
                        
                        <Button variant="outline" className="h-auto py-4 flex flex-col">
                          <Calendar className="h-6 w-6 mb-2" />
                          <span>Medication Reminder</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Reports Tab */}
                <TabsContent value="reports" className="animate-fade-in space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Health Reports</CardTitle>
                      <CardDescription>Your health information and generated reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-sangata-pink" />
                            <div>
                              <h4 className="font-medium">Monthly Health Summary</h4>
                              <p className="text-sm text-gray-500">Generated May 1, 2023</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center" onClick={downloadHealthCard}>
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-sangata-blue" />
                            <div>
                              <h4 className="font-medium">Cycle Analysis Report</h4>
                              <p className="text-sm text-gray-500">Generated April 15, 2023</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center" onClick={downloadHealthCard}>
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-sangata-green" />
                            <div>
                              <h4 className="font-medium">Nutrition Assessment</h4>
                              <p className="text-sm text-gray-500">Generated April 3, 2023</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center" onClick={downloadHealthCard}>
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Health Progress Visualization</CardTitle>
                      <CardDescription>How your key health metrics have changed over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={healthScoreData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <RechartsTooltip />
                          <Legend />
                          <Bar dataKey="value" name="Health Score" fill="#f472b6" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Health Insights</CardTitle>
                      <CardDescription>AI-generated insights based on your health data</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-sangata-pink/10 rounded-lg">
                          <h4 className="font-medium mb-2">Cycle Regularity</h4>
                          <p className="text-gray-600">
                            Your cycle has been regular in the past 3 months, with an average length of 28 days. 
                            Continue tracking for more accurate predictions.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-sangata-blue/10 rounded-lg">
                          <h4 className="font-medium mb-2">Mental Wellness Trend</h4>
                          <p className="text-gray-600">
                            Your mood shows positive improvement compared to last month. 
                            The regular exercise you've logged may be contributing to this positive trend.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-sangata-green/10 rounded-lg">
                          <h4 className="font-medium mb-2">Nutrition Balance</h4>
                          <p className="text-gray-600">
                            Based on your food logs, consider increasing your iron and calcium intake. 
                            Adding more leafy greens and dairy could help balance your nutrition.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={downloadHealthCard}>Generate Comprehensive Report</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
