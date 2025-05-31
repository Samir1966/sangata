
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const HerbalRemediesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const handleSearch = () => {
    toast({
      title: "Herbal Remedy Bot",
      description: "This feature will be fully implemented in the next update",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Herbal Remedy Bot</h1>
              <p className="text-gray-600">
                Ask Didi about safe herbal remedies for common health issues.
              </p>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="bg-green-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <span className="text-2xl mr-2">🌿</span> Ask Didi
                </CardTitle>
                <CardDescription>
                  Get simple advice for common ailments using traditional herbal remedies.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <p className="text-gray-700">
                    Search for a health condition or describe what you're feeling:
                  </p>
                  
                  <div className="flex gap-2">
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="e.g., cough, cold, headache, acidity"
                      className="flex-1"
                    />
                    <Button onClick={handleSearch}>
                      <Search size={18} className="mr-2" /> Search
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium flex items-center text-gray-800 mb-4">
                      <Leaf size={18} className="mr-2 text-green-600" />
                      Popular Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Cough", "Cold", "Headache", "Acidity", "Fever", "Constipation", "Sore Throat", "Nausea"].map((keyword) => (
                        <Button 
                          key={keyword} 
                          variant="outline" 
                          className="border-green-600/50 hover:bg-green-50"
                          onClick={() => {
                            setSearchTerm(keyword);
                            handleSearch();
                          }}
                        >
                          {keyword}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 mt-8">
              <p className="font-medium mb-2">About This Tool:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>This tool suggests common herbal remedies based on traditional knowledge.</li>
                <li>All suggestions are for mild health issues only.</li>
                <li>If symptoms are severe or persist, please consult a healthcare professional.</li>
                <li>Herbal remedies may interact with medications - check with your doctor if you take regular medicine.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HerbalRemediesPage;
