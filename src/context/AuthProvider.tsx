
import React, { useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { User, AuthContextType } from '@/types/user';
import { generateHealthCardPDF } from '@/utils/pdfUtils';

// Create context
export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user data in localStorage
    const savedUser = localStorage.getItem('sangata_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function (simulated)
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here we're mocking authentication - in a real app, this would verify credentials with a backend
      // For demo, we just check if user exists in localStorage
      const savedUsers = localStorage.getItem('sangata_users');
      const users = savedUsers ? JSON.parse(savedUsers) : [];
      
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        // Remove the password before storing in state/localStorage
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('sangata_user', JSON.stringify(userWithoutPassword));
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Signup function (simulated)
  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here we're mocking registration - in a real app, this would verify and create a user with a backend
      const savedUsers = localStorage.getItem('sangata_users');
      const users = savedUsers ? JSON.parse(savedUsers) : [];
      
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password, // Note: In a real app, this should be hashed on the backend
        photoUrl: '',
        createdAt: new Date().toISOString()
      };
      
      // Save to simulated db
      users.push(newUser);
      localStorage.setItem('sangata_users', JSON.stringify(users));
      
      // Remove password before storing in state/localStorage
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('sangata_user', JSON.stringify(userWithoutPassword));
      
      // Simulate sending a welcome email
      console.log(`Welcome email sent to ${email} with subject: "Welcome to संगात - Your Health Partner"`);
      
      toast({
        title: "Sign up successful",
        description: `Welcome to संगात, ${name}! Check your email for more information.`,
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sangata_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Update profile function
  const updateProfile = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('sangata_user', JSON.stringify(updatedUser));
    
    // Also update in the users array
    const savedUsers = localStorage.getItem('sangata_users');
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, ...userData } : u
      );
      localStorage.setItem('sangata_users', JSON.stringify(updatedUsers));
    }
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  // Download health card function
  const downloadHealthCard = () => {
    if (!user) return;
    
    generateHealthCardPDF(user);
    
    toast({
      title: "Health Card Downloaded",
      description: "Your health card has been downloaded successfully.",
    });
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    downloadHealthCard
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
