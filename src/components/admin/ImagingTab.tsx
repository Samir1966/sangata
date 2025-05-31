
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface ImagingTabProps {
  selectedFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: (type: string) => void;
}

const ImagingTab: React.FC<ImagingTabProps> = ({ 
  selectedFile, 
  handleFileChange, 
  handleFileUpload 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>X-Ray & CT Scan Management</CardTitle>
        <CardDescription>
          Upload and manage X-Ray and CT scan images
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="patient-id-imaging">Patient ID</Label>
              <Input id="patient-id-imaging" placeholder="Enter patient ID" />
            </div>
            <div>
              <Label htmlFor="imaging-date">Scan Date</Label>
              <Input id="imaging-date" type="date" />
            </div>
            <div>
              <Label htmlFor="imaging-type">Scan Type</Label>
              <Input id="imaging-type" placeholder="e.g., X-Ray, CT Scan, MRI" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="body-part">Body Part</Label>
            <Input id="body-part" placeholder="e.g., Chest, Abdomen, Spine" />
          </div>
          
          <div className="border rounded-md p-4">
            <Label htmlFor="imaging-file" className="block mb-2">Upload Scan Image</Label>
            <div className="flex items-center gap-4">
              <Input 
                id="imaging-file" 
                type="file" 
                accept=".jpg,.jpeg,.png,.dicom"
                onChange={handleFileChange}
              />
              <Button onClick={() => handleFileUpload('Imaging scan')} disabled={!selectedFile}>
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Button>
            </div>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-500">Selected: {selectedFile.name}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="imaging-notes">Radiologist Notes</Label>
            <Textarea id="imaging-notes" placeholder="Enter radiologist's findings and notes" rows={4} />
          </div>
          
          <Button className="w-full">Save Imaging Record</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagingTab;
