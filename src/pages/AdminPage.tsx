
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';

import AdminAuth from '@/components/admin/AdminAuth';
import AccessDenied from '@/components/admin/AccessDenied';
import MedicalRecordsTab from '@/components/admin/MedicalRecordsTab';
import BloodTestsTab from '@/components/admin/BloodTestsTab';
import ImagingTab from '@/components/admin/ImagingTab';
import OtherUploadsTab from '@/components/admin/OtherUploadsTab';

const AdminPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("medical-records");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if admin is already authenticated on component mount
  useEffect(() => {
    const adminAuth = sessionStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = (type: string) => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    // Simulate file upload
    toast({
      title: "Upload successful",
      description: `${type} uploaded: ${selectedFile.name}`,
    });
    setSelectedFile(null);
  };

  // Handle admin authentication
  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  // If user is not logged in, show AccessDenied
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <AccessDenied />
        <Footer />
      </div>
    );
  }

  // If user is logged in but not authenticated as admin
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <AdminAuth onAuthenticated={handleAuthenticated} />
        <Footer />
      </div>
    );
  }

  // Admin is authenticated, show admin panel
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 sangata-container py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>
        <p className="mb-8 text-gray-600">
          Manage medical records, test results, images, and patient data.
        </p>

        <Tabs defaultValue="medical-records" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
            <TabsTrigger value="blood-tests">Blood Tests</TabsTrigger>
            <TabsTrigger value="imaging">X-Ray & CT Scans</TabsTrigger>
            <TabsTrigger value="other-uploads">Other Uploads</TabsTrigger>
          </TabsList>

          <TabsContent value="medical-records">
            <MedicalRecordsTab 
              selectedFile={selectedFile}
              handleFileChange={handleFileChange}
              handleFileUpload={handleFileUpload}
            />
          </TabsContent>

          <TabsContent value="blood-tests">
            <BloodTestsTab 
              selectedFile={selectedFile}
              handleFileChange={handleFileChange}
              handleFileUpload={handleFileUpload}
            />
          </TabsContent>

          <TabsContent value="imaging">
            <ImagingTab 
              selectedFile={selectedFile}
              handleFileChange={handleFileChange}
              handleFileUpload={handleFileUpload}
            />
          </TabsContent>

          <TabsContent value="other-uploads">
            <OtherUploadsTab 
              selectedFile={selectedFile}
              handleFileChange={handleFileChange}
              handleFileUpload={handleFileUpload}
            />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
