
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Lock } from 'lucide-react';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const { toast } = useToast();
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check against hardcoded credentials
    if (adminId === 'SANGATA' && password === 'Bandi@1971') {
      // Set admin authentication in session storage
      sessionStorage.setItem('adminAuthenticated', 'true');
      onAuthenticated();
      toast({
        title: "Authentication successful",
        description: "Welcome to the admin panel.",
      });
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid admin ID or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Authentication</CardTitle>
          <CardDescription className="text-center">
            Please enter your administrator credentials to access the admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-id">Admin ID</Label>
              <Input 
                id="admin-id" 
                type="text" 
                placeholder="Enter admin ID" 
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input 
                id="admin-password" 
                type="password" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <Lock className="mr-2 h-4 w-4" /> Login to Admin Panel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
