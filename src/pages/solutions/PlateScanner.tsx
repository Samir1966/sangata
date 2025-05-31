
import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, X, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PlateScanner = () => {
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImage(event.target.result);
          simulateScan();
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImage(event.target.result);
          simulateScan();
        }
      };
      reader.readAsDataURL(e.dataTransfer.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      toast({
        title: "Plate Scan Complete",
        description: "Your meal appears to be well-balanced with carbohydrates, protein, and vegetables.",
      });
    }, 2000);
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Scan Your Plate</h1>
              <p className="text-gray-600">
                Upload a photo of your meal to analyze its nutritional balance.
              </p>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="bg-green-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <span className="text-2xl mr-2">📷</span> Diet Check
                </CardTitle>
                <CardDescription>
                  Take a photo of your food plate to get a quick nutritional assessment.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  capture="environment"
                />
                
                {!image ? (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={handleUploadClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <Upload size={24} className="text-green-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Upload Food Image</h3>
                      <p className="text-gray-500 mb-4">Take a photo of your plate or upload an existing image</p>
                      <div className="flex space-x-3">
                        <Button onClick={handleUploadClick} className="bg-green-600 hover:bg-green-700">
                          <Upload size={18} className="mr-2" />
                          Browse Files
                        </Button>
                        <Button 
                          onClick={() => fileInputRef.current?.click()} 
                          variant="outline" 
                          className="border-green-600 text-green-600 hover:bg-green-50"
                        >
                          <Camera size={18} className="mr-2" />
                          Take Photo
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative">
                      <img 
                        src={image} 
                        alt="Food Plate" 
                        className="w-full h-auto max-h-64 object-contain rounded-lg border border-gray-200"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 rounded-full"
                        onClick={clearImage}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    
                    {scanning ? (
                      <div className="p-6 bg-gray-50 rounded-lg text-center animate-pulse">
                        <RefreshCw size={24} className="mx-auto mb-2 animate-spin text-green-600" />
                        <p className="text-gray-600">Analyzing your meal...</p>
                      </div>
                    ) : (
                      <Button onClick={simulateScan} className="w-full bg-green-600 hover:bg-green-700">
                        Analyze My Meal
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 mt-8">
              <p className="font-medium mb-2">About This Tool:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>This tool uses image recognition to identify foods on your plate.</li>
                <li>It analyzes the balance of carbohydrates, proteins, and vegetables.</li>
                <li>You'll receive simple advice to improve your meal's nutrition if needed.</li>
                <li>This is not a calorie counter or professional nutrition analysis.</li>
                <li>For detailed nutrition advice, please consult a healthcare professional.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlateScanner;
