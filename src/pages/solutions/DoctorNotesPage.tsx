
import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, StopCircle, Download, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DoctorNotesPage = () => {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        // Close the media stream
        stream.getTracks().forEach(track => track.stop());
        
        // Process the audio
        processRecording();
      };
      
      mediaRecorder.start();
      setRecording(true);
      
      // Automatically stop recording after 30 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          stopRecording();
        }
      }, 30000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone access error",
        description: "Please allow microphone access to use this feature.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };
  
  const processRecording = () => {
    setProcessing(true);
    
    // Simulate processing the audio to text
    setTimeout(() => {
      const demoNote = `
पेशेंट विवरण:
- महिला, उम्र 32 वर्ष
- पेशा: शिक्षिका

मुख्य शिकायत:
- पिछले 3 दिनों से बुखार और सिरदर्द
- गले में खराश और सूखी खांसी
- कमजोरी और भूख न लगना

अन्य लक्षण:
- रात को पसीना आना
- जोड़ों में दर्द
- थोड़ी सांस की तकलीफ

वर्तमान दवाइयां:
- पैरासिटामोल 500mg दिन में दो बार ले रही हैं
- गर्म पानी से गरारे कर रही हैं

पिछला मेडिकल इतिहास:
- कोई पुरानी बीमारी नहीं
- एलर्जी: कोई नहीं
      `;
      
      setNoteText(demoNote);
      setProcessing(false);
      
      toast({
        title: "Doctor Note Ready",
        description: "Your voice has been converted to notes successfully.",
      });
    }, 2000);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(noteText);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste this note anywhere.",
    });
  };
  
  const downloadNote = () => {
    const element = document.createElement("a");
    const file = new Blob([noteText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Doctor_Note_" + new Date().toLocaleDateString().replace(/\//g, '-') + ".txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Note downloaded",
      description: "Your doctor note has been saved to your device.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Voice-to-Doctor Note Maker</h1>
              <p className="text-gray-600">
                Record your symptoms and convert them into clear notes you can share with your doctor.
              </p>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="bg-sangata-pink/10 border-b">
                <CardTitle className="flex items-center text-xl">
                  <span className="text-2xl mr-2">✍️</span> Create Doctor Notes
                </CardTitle>
                <CardDescription>
                  Speak about your health issues for up to 30 seconds and get an organized note.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {!noteText ? (
                    <>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="mb-4 text-gray-700">
                          Describe your symptoms in detail. Include:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4">
                          <li>What problems you're experiencing</li>
                          <li>When they started</li>
                          <li>How severe they are</li>
                          <li>What makes them better or worse</li>
                          <li>Any medications you're taking</li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-center">
                        {recording ? (
                          <Button 
                            onClick={stopRecording} 
                            variant="destructive"
                            className="flex items-center"
                          >
                            <StopCircle className="mr-2 h-5 w-5" />
                            Stop Recording ({recording && "Recording in progress..."})
                          </Button>
                        ) : processing ? (
                          <Button disabled className="animate-pulse">
                            Processing your recording...
                          </Button>
                        ) : (
                          <Button 
                            onClick={startRecording}
                            className="flex items-center"
                          >
                            <Mic className="mr-2 h-5 w-5" />
                            Start Recording (max 30 seconds)
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <h3 className="font-medium text-gray-800 mb-4">Doctor Note:</h3>
                        <div className="bg-gray-50 p-4 rounded border border-gray-300 whitespace-pre-line font-mono text-gray-700">
                          {noteText}
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          onClick={copyToClipboard}
                          variant="outline"
                          className="flex items-center"
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy to Clipboard
                        </Button>
                        
                        <Button 
                          onClick={downloadNote}
                          className="flex items-center"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Note
                        </Button>
                      </div>
                      
                      <Button 
                        onClick={() => {
                          setNoteText('');
                          setRecording(false);
                          setProcessing(false);
                        }}
                        variant="outline"
                        className="w-full"
                      >
                        Record New Note
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 mt-8">
              <p className="font-medium mb-2">About This Tool:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>This tool converts your spoken description into an organized note.</li>
                <li>Your note will be formatted in a way that doctors can quickly understand.</li>
                <li>You can download or copy the note to show to your doctor during your visit.</li>
                <li>Your recordings are processed privately and not stored.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DoctorNotesPage;
