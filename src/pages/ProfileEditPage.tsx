
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Upload, CheckCircle2, Loader2, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Profile edit form schema
const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().optional(),
  age: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "Please enter a valid age"
  }),
  height: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "Please enter a valid height in cm"
  }),
  weight: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "Please enter a valid weight in kg"
  }),
  bloodGroup: z.string().optional(),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  medicalConditions: z.array(z.string()).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const medicalConditionsList = [
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "Hypertension (High BP)" },
  { id: "thyroid", label: "Thyroid Disorder" },
  { id: "pcos", label: "PCOS/PCOD" },
  { id: "anemia", label: "Anemia" },
  { id: "heart", label: "Heart Condition" },
  { id: "asthma", label: "Asthma" },
  { id: "arthritis", label: "Arthritis" }
];

const ProfileEditPage = () => {
  const { user, updateProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Profile form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      age: user.age?.toString() || '',
      height: user.height?.toString() || '',
      weight: user.weight?.toString() || '',
      bloodGroup: user.bloodGroup || '',
      address: user.address || '',
      medicalConditions: user.medicalConditions || [],
    },
  });

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const onSubmit = async (values: ProfileFormValues) => {
    try {
      // Simulate photo upload
      if (photoFile) {
        setIsUploading(true);
        // In a real app, this would be an actual upload to a server or cloud storage
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate upload delay
        setIsUploading(false);
      }

      // Update profile
      updateProfile({
        name: values.name,
        email: values.email,
        phone: values.phone,
        age: parseInt(values.age),
        height: parseInt(values.height),
        weight: parseInt(values.weight),
        bloodGroup: values.bloodGroup,
        address: values.address,
        medicalConditions: values.medicalConditions,
        photoUrl: photoUrl || user.photoUrl
      });

      toast({
        title: "Profile updated successfully",
        description: "Your profile information has been updated.",
      });

      // Navigate to profile page
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "There was a problem updating your profile.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-2xl mx-auto">
            <Card className="sangata-card overflow-hidden">
              <CardHeader className="bg-sangata-pink/20">
                <CardTitle className="text-2xl font-bold">Edit Your Profile</CardTitle>
                <CardDescription>
                  Update your profile information to help us provide personalized health recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-sangata-pink/30 mb-4">
                        {photoUrl ? (
                          <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : user.photoUrl ? (
                          <img src={user.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Upload className="w-10 h-10 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <label htmlFor="photo-upload" className="cursor-pointer text-sm px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
                        Change Profile Photo
                      </label>
                      <input 
                        id="photo-upload" 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoChange}
                        className="sr-only"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Input type="tel" placeholder="+91 12345 67890" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age (years)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Height (cm)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="bloodGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Group</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your blood group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Your home address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <FormLabel>Medical Conditions</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        {medicalConditionsList.map((condition) => (
                          <FormField
                            key={condition.id}
                            control={form.control}
                            name="medicalConditions"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={condition.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(condition.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value || [], condition.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== condition.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {condition.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button type="submit" disabled={loading || isUploading} className="flex-1">
                        {loading || isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                            {isUploading ? 'Uploading photo...' : 'Saving profile...'}
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Update Profile
                          </>
                        )}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => navigate('/profile')} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfileEditPage;
