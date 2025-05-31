
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface OtherUploadsTabProps {
  selectedFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: (type: string) => void;
}

const OtherUploadsTab: React.FC<OtherUploadsTabProps> = ({ 
  selectedFile, 
  handleFileChange, 
  handleFileUpload 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Other Medical Documents</CardTitle>
        <CardDescription>
          Upload additional health documents and files
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="patient-id-other">Patient ID</Label>
              <Input id="patient-id-other" placeholder="Enter patient ID" />
            </div>
            <div>
              <Label htmlFor="document-date">Document Date</Label>
              <Input id="document-date" type="date" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="document-type">Document Type</Label>
            <Input id="document-type" placeholder="e.g., Vaccination Record, Insurance" />
          </div>
          
          <div className="border rounded-md p-4">
            <Label htmlFor="other-file" className="block mb-2">Upload Document</Label>
            <div className="flex items-center gap-4">
              <Input 
                id="other-file" 
                type="file" 
                onChange={handleFileChange}
              />
              <Button onClick={() => handleFileUpload('Document')} disabled={!selectedFile}>
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Button>
            </div>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-500">Selected: {selectedFile.name}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="other-notes">Notes</Label>
            <Textarea id="other-notes" placeholder="Enter any additional information about this document" rows={4} />
          </div>
          
          <Button className="w-full">Save Document</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherUploadsTab;
