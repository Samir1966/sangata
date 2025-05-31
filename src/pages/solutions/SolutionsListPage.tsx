
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const SolutionsListPage = () => {
  const solutions = [
    {
      id: 'emotional-health',
      title: 'Emotional Health Scanner',
      icon: '🎤',
      description: 'Detect emotional state from your voice and get personalized advice in Hindi',
      path: '/solutions/emotional-health'
    },
    {
      id: 'nutrition',
      title: 'Nutrition Deficiency Detector',
      icon: '🍏',
      description: 'Check your diet for possible nutritional gaps and get simple food suggestions',
      path: '/solutions/nutrition'
    },
    {
      id: 'period-tracker',
      title: 'Period Health Tracker',
      icon: '📅',
      description: 'Track your cycle and get personalized insights about your menstrual health',
      path: '/solutions/period-tracker'
    },
    {
      id: 'pregnancy-checker',
      title: 'Pregnancy Early Checker',
      icon: '🤰',
      description: 'Check early signs and symptoms of pregnancy with a simple questionnaire',
      path: '/solutions/pregnancy-checker'
    },
    {
      id: 'baby-growth',
      title: 'Baby Growth Checker',
      icon: '📈',
      description: 'Track your baby\'s growth and development against standard growth charts',
      path: '/solutions/baby-growth'
    },
    {
      id: 'plate-scanner',
      title: 'Scan Your Plate',
      icon: '📷',
      description: 'Upload a photo of your meal to analyze its nutritional balance',
      path: '/solutions/plate-scanner'
    },
    {
      id: 'symptom-visualizer',
      title: 'Symptom Visualizer',
      icon: '🧍',
      description: 'Visualize and understand your symptoms with a simple body map',
      path: '/solutions/symptom-visualizer'
    },
    {
      id: 'herbal-remedies',
      title: 'Herbal Remedy Bot',
      icon: '🌿',
      description: 'Get safe herbal remedies for common ailments from our knowledgeable Didi',
      path: '/solutions/herbal-remedies'
    },
    {
      id: 'doctor-notes',
      title: 'Voice-to-Doctor Note Maker',
      icon: '✍️',
      description: 'Record your symptoms and convert them into clear notes you can share with your doctor',
      path: '/solutions/doctor-notes'
    },
    {
      id: 'medicine-reminder',
      title: 'Medicine Reminder Setup',
      icon: '⏰',
      description: 'Set up friendly reminders for your medication schedule',
      path: '/solutions/medicine-reminder'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sangata Solutions</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our specially designed health tools to support your wellbeing. Simple, helpful, and created with love for your unique needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => (
              <Card key={solution.id} className="overflow-hidden border border-gray-200 hover:border-sangata-pink/50 hover:shadow-md transition-all">
                <CardHeader className="bg-gray-50 border-b border-gray-100">
                  <CardTitle className="flex items-center text-lg">
                    <span className="text-2xl mr-2">{solution.icon}</span> {solution.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardDescription className="text-gray-600 mb-4">
                    {solution.description}
                  </CardDescription>
                  <Link to={solution.path}>
                    <Button className="w-full">
                      Try This Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SolutionsListPage;
