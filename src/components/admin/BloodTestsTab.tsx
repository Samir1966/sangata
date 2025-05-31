
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface BloodTestsTabProps {
  selectedFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: (type: string) => void;
}

const BloodTestsTab: React.FC<BloodTestsTabProps> = ({ 
  selectedFile, 
  handleFileChange, 
  handleFileUpload 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blood Test Reports</CardTitle>
        <CardDescription>
          Upload and manage blood test results and reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="patient-id-blood">Patient ID</Label>
              <Input id="patient-id-blood" placeholder="Enter patient ID" />
            </div>
            <div>
              <Label htmlFor="test-date">Test Date</Label>
              <Input id="test-date" type="date" />
            </div>
            <div>
              <Label htmlFor="test-type">Test Type</Label>
              <Input id="test-type" placeholder="e.g., CBC, Lipid Profile" />
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <Label htmlFor="blood-test-file" className="block mb-2">Upload Blood Test Report</Label>
            <div className="flex items-center gap-4">
              <Input 
                id="blood-test-file" 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <Button onClick={() => handleFileUpload('Blood test report')} disabled={!selectedFile}>
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Button>
            </div>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-500">Selected: {selectedFile.name}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="test-notes">Notes</Label>
            <Textarea id="test-notes" placeholder="Enter notes about the blood test results" rows={4} />
          </div>
          
          <Button className="w-full">Save Blood Test Record</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BloodTestsTab;
