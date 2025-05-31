
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";

interface MedicalRecordsTabProps {
  selectedFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: (type: string) => void;
}

const MedicalRecordsTab: React.FC<MedicalRecordsTabProps> = ({ 
  selectedFile, 
  handleFileChange, 
  handleFileUpload 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Records Management</CardTitle>
        <CardDescription>
          Upload and manage patient medical records and history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="patient-id">Patient ID</Label>
              <Input id="patient-id" placeholder="Enter patient ID" />
            </div>
            <div>
              <Label htmlFor="record-date">Record Date</Label>
              <Input id="record-date" type="date" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="record-type">Record Type</Label>
            <Input id="record-type" placeholder="e.g., Consultation, Prescription" />
          </div>
          
          <div>
            <Label htmlFor="record-description">Description</Label>
            <Textarea id="record-description" placeholder="Enter medical record details" rows={4} />
          </div>
          
          <div className="border rounded-md p-4">
            <Label htmlFor="record-file" className="block mb-2">Upload Document</Label>
            <div className="flex items-center gap-4">
              <Input 
                id="record-file" 
                type="file" 
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
              <Button onClick={() => handleFileUpload('Medical record')} disabled={!selectedFile}>
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Button>
            </div>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-500">Selected: {selectedFile.name}</p>
            )}
          </div>
          
          <Button className="w-full">Save Medical Record</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordsTab;
