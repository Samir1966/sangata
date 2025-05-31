
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Heart, Calendar, Droplets, Baby, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const healthTipCategories = [
  {
    title: "Women's Health",
    description: "Essential tips for women's well-being",
    icon: Heart,
    color: "#FFDEE2",
    textColor: "#be123c",
  },
  {
    title: "Pregnancy Care",
    description: "Guidance for a healthy pregnancy",
    icon: Baby,
    color: "#D3E4FD",
    textColor: "#1e40af",
  },
  {
    title: "Nutrition & Hydration",
    description: "Eating and drinking for health",
    icon: Droplets,
    color: "#F2FCE2",
    textColor: "#166534",
  },
  {
    title: "Mental Wellness",
    description: "Caring for your mental health",
    icon: Brain,
    color: "#FDE1D3",
    textColor: "#9a3412",
  },
];

const healthTips = [
  {
    title: "Understanding Your Menstrual Cycle",
    category: "Women's Health",
    excerpt: "Learn about the four phases of your menstrual cycle and how they affect your body and mood.",
    imageUrl: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbGVuZGFyfGVufDB8fDB8fHww",
  },
  {
    title: "First Trimester Nutrition Guide",
    category: "Pregnancy Care",
    excerpt: "Important nutrients and foods to focus on during the first three months of pregnancy.",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhlYWx0aHklMjBmb29kfGVufDB8fDB8fHww",
  },
  {
    title: "Simple Hydration Habits",
    category: "Nutrition & Hydration",
    excerpt: "Easy ways to ensure you're drinking enough water throughout the day, even when busy.",
    imageUrl: "https://images.unsplash.com/photo-1544717684-1243da23b545?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2F0ZXIlMjBkcmlua3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

const HealthTips = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="section-heading text-center">Health Topics</h2>
        <p className="section-subheading text-center">
          Explore our resources for various health topics
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {healthTipCategories.map((category, index) => (
            <Card key={index} className="sangata-card hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: category.color }}
                >
                  <category.icon size={24} style={{ color: category.textColor }} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 text-center mb-2">{category.title}</h3>
                <p className="text-gray-600 text-center text-sm">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="section-heading text-center">Latest Health Tips</h2>
        <p className="section-subheading text-center">
          Read our latest articles and tips for better health
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {healthTips.map((tip, index) => (
            <Card key={index} className="sangata-card overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={tip.imageUrl}
                  alt={tip.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="text-xs font-medium text-sangata-pink mb-2">{tip.category}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tip.excerpt}</p>
                <Link 
                  to="/blog" 
                  className="text-sm font-medium text-sangata-pink hover:underline inline-flex items-center"
                >
                  Read More
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthTips;
