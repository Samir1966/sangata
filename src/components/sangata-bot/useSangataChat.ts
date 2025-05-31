
import { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getGeminiResponse } from '@/utils/geminiApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const useSangataChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "नमस्कार बहन! मैं संगात दीदी हूँ, आपकी स्वास्थ्य साथी। मैं आपके स्वास्थ्य संबंधी किसी भी सवाल या चिंता में मदद कर सकती हूँ। आप कैसी हैं आज?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'hi' | 'en'>('hi');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const toggleBot = () => {
    setIsOpen(!isOpen);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Process language switching request
    if (
      input.toLowerCase().includes('english') || 
      input.toLowerCase().includes('switch to english') ||
      input.toLowerCase().includes('speak english')
    ) {
      handleLanguageSwitch('en');
      return;
    }

    if (
      input.toLowerCase().includes('हिंदी') || 
      input.toLowerCase().includes('switch to hindi') ||
      input.toLowerCase().includes('speak hindi')
    ) {
      handleLanguageSwitch('hi');
      return;
    }

    try {
      // Get response from Gemini API
      const geminiResponse = await getGeminiResponse(input, currentLanguage);
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: geminiResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, responseMessage]);
      setIsProcessing(false);

      // Auto-speak the response
      speakResponse(geminiResponse);
    } catch (error) {
      console.error("Error getting Gemini response:", error);
      
      // Fallback response
      const fallbackResponse = currentLanguage === 'hi' 
        ? "माफ़ करें बहन, मुझे जवाब देने में समस्या हो रही है। कृपया थोड़ी देर बाद फिर से पूछें।" 
        : "Sorry sister, I'm having trouble responding. Please try again shortly.";
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      setIsProcessing(false);
    }
  };

  const handleLanguageSwitch = (lang: 'en' | 'hi') => {
    setCurrentLanguage(lang);
    setIsProcessing(false);

    const switchMessage = lang === 'en' 
      ? "I've switched to English. How can I help you with your health questions today, sister?" 
      : "मैंने हिंदी में बदल लिया है। बहना, मैं आज आपके स्वास्थ्य प्रश्नों में कैसे मदद कर सकती हूँ?";

    const responseMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: switchMessage,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, responseMessage]);

    // Auto-speak the response
    speakResponse(switchMessage);
  };

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
        processAudio();
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "मैं सुन रही हूँ, बहन। स्पष्ट रूप से बोलें।",
      });
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone access error",
        description: "Please allow microphone access to use voice chat.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const processAudio = () => {
    // Simulate processing the audio to text
    setIsProcessing(true);
    
    // In a real app, send the audio to a speech-to-text service
    setTimeout(async () => {
      // Simulate more variety of health-related queries
      const sampleTexts = currentLanguage === 'en' 
        ? [
            "I've been having heavy periods and feeling very tired",
            "What should I do about this pain in my chest?",
            "How can I prevent diabetes in my village?",
            "I think I might be pregnant, what are the early signs?",
            "My mother is going through menopause and having hot flashes",
            "I found a lump in my breast, what should I do?",
            "How can I take care of my mental health in a rural area?"
          ]
        : [
            "मुझे भारी पीरियड्स हो रहे हैं और मैं बहुत थकान महसूस कर रही हूं",
            "मेरे सीने में इस दर्द के बारे में मुझे क्या करना चाहिए?",
            "मैं अपने गांव में मधुमेह को कैसे रोक सकती हूं?",
            "मुझे लगता है कि मैं गर्भवती हो सकती हूं, शुरुआती लक्षण क्या हैं?",
            "मेरी मां रजोनिवृत्ति से गुजर रही हैं और उन्हें गर्मी के झटके लग रहे हैं",
            "मुझे अपने स्तन में एक गांठ मिली है, मुझे क्या करना चाहिए?",
            "मैं ग्रामीण क्षेत्र में अपने मानसिक स्वास्थ्य की देखभाल कैसे कर सकती हूं?"
          ];
      
      const recognizedText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      
      // Add the recognized text as a user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: recognizedText,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      
      try {
        // Get response from Gemini API
        const geminiResponse = await getGeminiResponse(recognizedText, currentLanguage);
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: geminiResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, responseMessage]);
        setIsProcessing(false);
        
        // Auto-speak the response
        speakResponse(geminiResponse);
      } catch (error) {
        console.error("Error getting Gemini response:", error);
        setIsProcessing(false);
      }
      
    }, 1500);
  };
  
  const speakResponse = (text: string) => {
    // Simulate text-to-speech
    setIsPlaying(true);
    
    toast({
      title: "Sangata is speaking",
      description: currentLanguage === 'en' ? "Listen to my response" : "मेरा जवाब सुनिए",
    });
    
    // Simulate speech duration based on text length
    setTimeout(() => {
      setIsPlaying(false);
    }, text.length * 50);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return {
    isOpen,
    isExpanded,
    messages,
    input,
    isRecording,
    isProcessing,
    isPlaying,
    currentLanguage,
    toggleBot,
    toggleExpanded,
    handleSend,
    setInput,
    handleKeyPress,
    startRecording,
    stopRecording,
    setIsPlaying
  };
};
