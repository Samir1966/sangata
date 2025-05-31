
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-sangata-pink/20 rounded-full flex items-center justify-center text-sangata-pink text-4xl mx-auto mb-6">
            404
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Page Not Found</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <Link to="/">
            <Button className="sangata-button-primary flex items-center justify-center">
              <Home size={18} className="mr-2" />
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
