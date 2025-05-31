
import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, StopCircle, Play, Volume2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const EmotionalHealthPage = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<null | {
    emotion: string;
    advice: string;
    encouragement: string;
  }>(null);
  const [playing, setPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

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
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        
        // Close the media stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setRecording(true);
      
      // Automatically stop recording after 15 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          stopRecording();
        }
      }, 15000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone access error",
        description: "Please allow microphone access to use the emotional health scanner.",
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
  
  const analyzeEmotion = () => {
    if (!audioBlob) return;
    
    setProcessing(true);
    
    // Simulate processing with emotional analysis
    // In a real app, you would send the audio to a backend for analysis
    setTimeout(() => {
      const emotions = ['Happy', 'Sad', 'Anxious', 'Calm', 'Confident'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      
      const adviceMap: Record<string, string> = {
        'Happy': 'अपनी खुशी को दूसरों के साथ बांटें, इससे आपकी ख़ुशी और बढ़ेगी।',
        'Sad': 'अपने किसी अच्छे दोस्त से बात करें और अपनी भावनाओं को साझा करें।',
        'Anxious': 'गहरी सांस लेने का अभ्यास करें और वर्तमान क्षण पर ध्यान केंद्रित करें।',
        'Calm': 'इस शांत मन का उपयोग कुछ रचनात्मक काम करने के लिए करें।',
        'Confident': 'अपने आत्मविश्वास का उपयोग किसी नई चुनौती को स्वीकार करने के लिए करें।'
      };
      
      const encouragementMap: Record<string, string> = {
        'Happy': 'आपकी सकारात्मक ऊर्जा आपके आसपास के लोगों को भी प्रेरित करती है!',
        'Sad': 'याद रखें, हर मुश्किल समय गुज़र जाता है। आप मजबूत हैं और इससे उबर जाएंगे।',
        'Anxious': 'चिंता एक क्षणिक अनुभव है, आप इससे बड़े हैं और इसे नियंत्रित कर सकते हैं।',
        'Calm': 'आपकी शांति आपकी ताकत है। इसे बनाए रखें और इसका आनंद लें।',
        'Confident': 'आपके अंदर अद्भुत क्षमता है। आगे बढ़ते रहें, आप बहुत कुछ हासिल कर सकते हैं!'
      };
      
      setResult({
        emotion: randomEmotion,
        advice: adviceMap[randomEmotion],
        encouragement: encouragementMap[randomEmotion]
      });
      
      setProcessing(false);
    }, 2000);
  };
  
  const playAudio = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
    }
  };
  
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    }
  };
  
  const resetScan = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setResult(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Emotional Health Scanner</h1>
              <p className="text-gray-600">
                Record your voice for 15 seconds and our AI will analyze your emotional state and provide personalized advice.
              </p>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="bg-sangata-pink/5 border-b">
                <CardTitle className="flex items-center text-xl">
                  <span className="text-2xl mr-2">🎤</span> Voice Emotion Scanner
                </CardTitle>
                <CardDescription>
                  Speak naturally for 15 seconds about how your day is going or how you're feeling.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  {!audioBlob ? (
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-sangata-pink/10 flex items-center justify-center mb-4 mx-auto">
                        {recording ? (
                          <div className="animate-pulse">
                            <StopCircle className="h-12 w-12 text-sangata-pink" />
                          </div>
                        ) : (
                          <Mic className="h-12 w-12 text-sangata-pink" />
                        )}
                      </div>
                      
                      {recording ? (
                        <div className="space-y-4">
                          <p className="text-gray-600 animate-pulse">Recording... {recording && "Please speak naturally"}</p>
                          <Button onClick={stopRecording} variant="destructive">
                            Stop Recording
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={startRecording} size="lg" className="bg-sangata-pink text-white hover:bg-sangata-pink/90">
                          Start Emotional Scan
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-center space-x-4">
                        <audio ref={audioRef} src={audioUrl || ''} onEnded={() => setPlaying(false)} className="hidden" />
                        {playing ? (
                          <Button onClick={stopAudio} variant="outline" size="sm" className="flex items-center">
                            <StopCircle className="h-4 w-4 mr-2" /> Stop
                          </Button>
                        ) : (
                          <Button onClick={playAudio} variant="outline" size="sm" className="flex items-center">
                            <Play className="h-4 w-4 mr-2" /> Play Recording
                          </Button>
                        )}
                        <Button onClick={resetScan} variant="outline" size="sm">
                          Record Again
                        </Button>
                      </div>
                      
                      {!result && (
                        <Button 
                          onClick={analyzeEmotion} 
                          className="w-full" 
                          disabled={processing}
                        >
                          {processing ? 'Analyzing your emotions...' : 'Analyze My Emotions'}
                        </Button>
                      )}
                      
                      {result && (
                        <div className="mt-6 space-y-4 animate-fade-in">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium text-lg mb-2">Emotion Detected: <span className="text-sangata-pink">{result.emotion}</span></h3>
                            <p className="text-gray-600 mb-4">{result.advice}</p>
                            <p className="italic text-gray-700 border-t border-dashed border-gray-200 pt-3 mt-3">
                              {result.encouragement}
                            </p>
                          </div>
                          
                          <div className="flex justify-center">
                            <Button 
                              onClick={() => {
                                // Simulate text-to-speech
                                toast({
                                  title: "Voice Synthesis",
                                  description: "Speaking advice in Hindi...",
                                });
                              }} 
                              variant="outline"
                              className="flex items-center"
                            >
                              <Volume2 className="h-4 w-4 mr-2" /> Listen to Advice
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 mt-8">
              <p className="font-medium mb-2">About This Tool:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>This tool analyzes your voice to detect emotional patterns.</li>
                <li>Your voice recordings are processed privately and not stored.</li>
                <li>This is not a medical diagnostic tool.</li>
                <li>If you're experiencing serious emotional distress, please consult a healthcare professional.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmotionalHealthPage;
