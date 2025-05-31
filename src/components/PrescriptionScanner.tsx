
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, X, RefreshCw, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface Medicine {
  name: string;
  dosage: string;
  instruction: string;
}

const PrescriptionScanner = () => {
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [prescriptionText, setPrescriptionText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImage(event.target.result);
          processImage(event.target.result);
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
          processImage(event.target.result);
        }
      };
      reader.readAsDataURL(e.dataTransfer.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const processImage = (imageData: string) => {
    setScanning(true);
    setPrescriptionText('');
    setMedicines([]);
    
    // Simulate OCR processing - in a real app this would be done via API
    setTimeout(() => {
      // This is simulated OCR text that might be extracted from a prescription
      const extractedText = `Dr. Sharma Clinic
Patient: Female, 34 years
Date: 10/04/2023

Rx:
1. Paracetamol 500mg - 1 tablet three times a day after meals for 5 days
2. Folic Acid 5mg - 1 tablet daily with breakfast for 30 days
3. Iron Supplement 60mg - 1 tablet daily with orange juice for 30 days
4. Calcium 500mg - 1 tablet at bedtime for 30 days

Follow up after 2 weeks.
Dr. Sharma, MD`;

      setPrescriptionText(extractedText);
      
      // Extract medicine information from the text
      // In a real app, this would use NLP techniques or a structured format from the API
      const medicineList: Medicine[] = [
        {
          name: "Paracetamol",
          dosage: "500mg",
          instruction: "Take 1 tablet three times a day after meals for 5 days."
        },
        {
          name: "Folic Acid",
          dosage: "5mg",
          instruction: "Take 1 tablet daily with breakfast for 30 days."
        },
        {
          name: "Iron Supplement",
          dosage: "60mg",
          instruction: "Take 1 tablet daily with orange juice for better absorption for 30 days."
        },
        {
          name: "Calcium",
          dosage: "500mg",
          instruction: "Take 1 tablet at bedtime for 30 days."
        }
      ];
      
      setMedicines(medicineList);
      setScanning(false);
      
      toast({
        title: "Prescription scanned successfully",
        description: "We've extracted the medicine information from your prescription.",
        variant: "default"
      });
    }, 2500);
  };

  const clearImage = () => {
    setImage(null);
    setMedicines([]);
    setPrescriptionText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="sangata-card overflow-hidden">
        <CardHeader className="bg-sangata-peach/20">
          <CardTitle className="text-xl font-bold text-center">Prescription Scanner</CardTitle>
          <CardDescription className="text-center">Upload or take a photo of your prescription to get information about your medicines</CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
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
                <div className="w-16 h-16 rounded-full bg-sangata-peach/20 flex items-center justify-center mb-4">
                  <Upload size={24} className="text-sangata-peach" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Upload Prescription</h3>
                <p className="text-gray-500 mb-4">Drag and drop or click to browse</p>
                <div className="flex space-x-3">
                  <Button onClick={handleUploadClick} className="sangata-button-primary">
                    <Upload size={18} className="mr-2" />
                    Browse Files
                  </Button>
                  <Button 
                    onClick={() => fileInputRef.current?.click()} 
                    variant="outline" 
                    className="sangata-button border-sangata-pink text-gray-600 hover:bg-sangata-pink/10"
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
                  alt="Prescription" 
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
                  <RefreshCw size={24} className="mx-auto mb-2 animate-spin text-sangata-peach" />
                  <p className="text-gray-600">Scanning prescription...</p>
                </div>
              ) : medicines.length > 0 ? (
                <div className="bg-gray-50 rounded-lg p-4 animate-fade-in">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <FileText size={20} className="mr-2 text-sangata-peach" />
                    Prescription Details
                  </h3>
                  
                  {prescriptionText && (
                    <div className="mb-6 bg-white p-4 rounded border border-gray-200 text-sm text-gray-700 font-mono">
                      <p className="whitespace-pre-line">{prescriptionText}</p>
                    </div>
                  )}
                  
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <CheckCircle size={16} className="mr-2 text-green-600" /> 
                    Extracted Medicines
                  </h4>
                  
                  <div className="space-y-4">
                    {medicines.map((medicine, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-800">{medicine.name}</h4>
                        <p className="text-sangata-pink font-medium">{medicine.dosage}</p>
                        <p className="text-gray-600 text-sm mt-1">{medicine.instruction}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 italic">
                      Note: This information is for reference only. Always follow your doctor's instructions and consult 
                      a healthcare professional if you have any questions.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="bg-gray-50 px-6 py-4 text-xs text-gray-500">
          Your prescription data is processed securely and is not stored on our servers. 
          For medical advice, please consult with a healthcare professional.
        </CardFooter>
      </Card>
    </div>
  );
};

export default PrescriptionScanner;
