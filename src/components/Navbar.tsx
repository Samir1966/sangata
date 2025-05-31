
import React, { useState } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="sangata-container">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/ee40c451-039e-46ff-8e9d-aae5b1c043ff.png" 
                alt="Sangata Logo" 
                className="h-10 w-10 mr-2" 
              />
              <span className="text-2xl font-bold text-gray-800">
                Sangata<span className="text-sangata-pink">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            <Link to="/" className="text-gray-700 hover:text-sangata-pink transition-colors">
              Home
            </Link>
            <Link to="/chat" className="text-gray-700 hover:text-sangata-pink transition-colors">
              Chat with Sangata
            </Link>
            <Link to="/calculators" className="text-gray-700 hover:text-sangata-pink transition-colors">
              Health Calculators
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-sangata-pink transition-colors">
                    Sangata Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                      <ListItem href="/solutions/emotional-health" title="Emotional Health Scanner" icon="🎤">
                        Detect emotional state from your voice and get personalized advice
                      </ListItem>
                      <ListItem href="/solutions/nutrition" title="Nutrition Deficiency Detector" icon="🍏">
                        Check your diet for possible nutritional gaps
                      </ListItem>
                      <ListItem href="/solutions/period-tracker" title="Period Health Tracker" icon="📅">
                        Track your cycle and get personalized insights
                      </ListItem>
                      <ListItem href="/solutions/pregnancy-checker" title="Pregnancy Early Checker" icon="🤰">
                        Check early signs of pregnancy
                      </ListItem>
                      <ListItem href="/solutions/baby-growth" title="Baby Growth Checker" icon="📈">
                        Track your baby's growth and development
                      </ListItem>
                      <ListItem href="/solutions/plate-scanner" title="Scan Your Plate" icon="📷">
                        Analyze your meal for nutritional balance
                      </ListItem>
                      <ListItem href="/solutions/symptom-visualizer" title="Symptom Visualizer" icon="🧍">
                        Visualize and understand your symptoms
                      </ListItem>
                      <ListItem href="/solutions/herbal-remedies" title="Herbal Remedy Bot" icon="🌿">
                        Get safe herbal remedies for common ailments
                      </ListItem>
                      <ListItem href="/solutions/doctor-notes" title="Voice-to-Doctor Note Maker" icon="✍️">
                        Create organized notes for your doctor visits
                      </ListItem>
                      <ListItem href="/solutions/medicine-reminder" title="Medicine Reminder Setup" icon="⏰">
                        Set up reminders for your medications
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/prescription" className="text-gray-700 hover:text-sangata-pink transition-colors">
              Scan Prescription
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-sangata-pink transition-colors">
              Admin Panel
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-sangata-pink transition-colors">
              Contact
            </Link>
            
            {user ? (
              <Link to="/profile" className="flex items-center text-gray-700 hover:text-sangata-pink transition-colors">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user.photoUrl} alt={user.name} />
                  <AvatarFallback className="bg-sangata-pink/20 text-sangata-pink">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:block">Profile</span>
              </Link>
            ) : (
              <Link 
                to="/auth" 
                className="flex items-center bg-sangata-pink/10 hover:bg-sangata-pink/20 text-sangata-pink px-4 py-2 rounded-full transition-colors"
              >
                <LogIn className="h-4 w-4 mr-1" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-3">
            {user && (
              <Link to="/profile" className="text-gray-700 hover:text-sangata-pink">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoUrl} alt={user.name} />
                  <AvatarFallback className="bg-sangata-pink/20 text-sangata-pink">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-sangata-pink focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="py-2 space-y-1">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 hover:bg-sangata-pink/10 hover:text-sangata-pink rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/chat"
                className="block px-4 py-2 text-gray-700 hover:bg-sangata-pink/10 hover:text-sangata-pink rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Chat with Sangata
              </Link>
              <Link
                to="/calculators"
                className="block px-4 py-2 text-gray-700 hover:bg-sangata-pink/10 hover:text-sangata-pink rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Health Calculators
              </Link>
              
              <div className="block px-4 py-2 text-gray-700 font-semibold">
                Sangata Solutions
              </div>
              <div className="pl-4">
                <Link
                  to="/solutions/emotional-health"
                  className="block px-4 py-2 text-gray-700 hover:bg-sangata-pink/10 hover:text-sangata-pink rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🎤 Emotional Health Scanner
                </Link>
                <Link
                  to="/solutions/nutrition"
                  className="block px-4 py-2 text-gray-700 hover:bg-sangata-pink/10 hover:text-sangata-pink rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🍏 Nutrition Deficiency Detector
                </Link>
                <Link
                  to="/solutions/period-tracker"
                  className="block px-4 py-2 text-gray-700 hover:bg-sangata-pink/10 hover:text-sangata-pink rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📅 Period Health Tracker
                </Link>
                <Link
                  to="/solutions/pregnancy-checker"
                  className="block px-4 py-2 text-gray-700 hover:bg-sangata-pink/10 hover:text-sangata-pink rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🤰 Pregnancy Early Checker
                </Link>
                <Link
                  to="/solutions/more"
                  className="block px-4 py-2 text-gray-700 hover:bg-sangata-pink/10 hover:text-sangata-pink rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📋 More Solutions...
                </Link>
              </div>
              
              <Link
                to="/prescription"
                className="block px-4 py-2 text-gray-700 hover:bg-sangata-pink/10 hover:text-sangata-pink rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Scan Prescription
              </Link>
              <Link
                to="/admin"
                className="block px-4 py-2 text-gray-700 hover:bg-sangata-pink/10 hover:text-sangata-pink rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-700 hover:bg-sangata-pink/10 hover:text-sangata-pink rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {!user ? (
                <Link
                  to="/auth"
                  className="flex items-center px-4 py-2 text-sangata-pink hover:bg-sangata-pink/10 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4 mr-2" /> Login / Sign Up
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sangata-pink hover:bg-sangata-pink/10 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" /> My Profile
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: string; title: string }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sangata-pink/10 hover:text-sangata-pink focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">
            <span className="mr-2">{icon}</span> {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
