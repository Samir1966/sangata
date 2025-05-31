
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';

const AccessDenied: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-sangata-pink">
            <Shield className="h-8 w-8 mx-auto mb-2" />
            Access Denied
          </CardTitle>
          <CardDescription className="text-center">
            You need to log in first to access the admin authentication page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <Button asChild variant="outline">
            <a href="/auth">Login to Continue</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessDenied;
