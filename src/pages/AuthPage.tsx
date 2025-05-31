
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Signup form schema
const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthPage = () => {
  const { user, login, signup, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('login');
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // If user is already logged in, redirect to home
  if (user) {
    return <Navigate to="/" />;
  }

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Handle login submit
  const onLoginSubmit = async (values: LoginFormValues) => {
    setSubmitError(null);
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (error: any) {
      setSubmitError(error.message);
    }
  };

  // Handle signup submit
  const onSignupSubmit = async (values: SignupFormValues) => {
    setSubmitError(null);
    try {
      await signup(values.name, values.email, values.password);
      navigate('/profile');
    } catch (error: any) {
      setSubmitError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="sangata-container">
          <div className="max-w-md mx-auto">
            <Card className="sangata-card overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="p-6">
                  <CardHeader className="p-0 pb-6">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>
                      Sign in to your account to access your health dashboard
                    </CardDescription>
                  </CardHeader>
                  
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {submitError && (
                        <p className="text-red-500 text-sm">{submitError}</p>
                      )}
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                          </>
                        ) : (
                          'Sign In'
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="signup" className="p-6">
                  <CardHeader className="p-0 pb-6">
                    <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                    <CardDescription>
                      Join Sangata for personalized health tracking and support
                    </CardDescription>
                  </CardHeader>
                  
                  <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                      <FormField
                        control={signupForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={signupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={signupForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {submitError && (
                        <p className="text-red-500 text-sm">{submitError}</p>
                      )}
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account
                          </>
                        ) : (
                          'Sign Up'
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
