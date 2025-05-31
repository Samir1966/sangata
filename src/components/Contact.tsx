
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll get back to you shortly.",
        duration: 5000,
      });
      
      // Reset form
      setName('');
      setPhone('');
      setMessage('');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="section-heading">Contact Us</h2>
        <p className="section-subheading">
          Have questions or need assistance? Reach out to us and we'll be happy to help.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="sangata-card h-full">
            <CardHeader className="bg-sangata-pink/20">
              <CardTitle className="text-xl font-bold">Get in Touch</CardTitle>
              <CardDescription>Contact us through any of these channels</CardDescription>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-sangata-pink/20 flex items-center justify-center mr-4">
                  <Phone size={18} className="text-sangata-pink" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Phone</h3>
                  <p className="text-gray-600">+91 XXX XXX XXXX</p>
                  <p className="text-sm text-gray-500 mt-1">Monday to Friday, 9am to 6pm</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-sangata-blue/20 flex items-center justify-center mr-4">
                  <Mail size={18} className="text-sangata-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Email</h3>
                  <p className="text-gray-600">contact@sangata.com</p>
                  <p className="text-sm text-gray-500 mt-1">We'll respond as soon as possible</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-sangata-green/20 flex items-center justify-center mr-4">
                  <MapPin size={18} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Location</h3>
                  <p className="text-gray-600">Odisha, India</p>
                  <p className="text-sm text-gray-500 mt-1">Serving rural communities</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-sangata-peach/20 flex items-center justify-center mr-4">
                  <MessageSquare size={18} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">WhatsApp</h3>
                  <p className="text-gray-600">+91 XXX XXX XXXX</p>
                  <p className="text-sm text-gray-500 mt-1">Chat with us for quick assistance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Card className="sangata-card">
            <CardHeader className="bg-gradient-to-r from-sangata-pink/30 to-sangata-blue/30">
              <CardTitle className="text-xl font-bold">Send a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you</CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="sangata-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="sangata-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    className="sangata-input min-h-[120px]"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full sangata-button-primary"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="bg-gray-50 p-4 text-xs text-gray-500">
              Your information will be handled according to our privacy policy. We will only use it to respond to your inquiry.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
