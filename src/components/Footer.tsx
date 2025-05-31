import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone, MapPin } from 'lucide-react';
import SangataAIBot from './SangataAIBot';
import SisterAIBot from './SisterAIBot';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 relative">
      <div className="sangata-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Sangata</h3>
            <p className="text-gray-600 mb-4">
              Your caring health companion that provides friendly and accessible health guidance for rural women.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-sangata-pink transition-colors">
                <Facebook size={20} />
              </a>
              <a href="mailto:contact@sangata.com" className="text-gray-600 hover:text-sangata-pink transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-sangata-pink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-600 hover:text-sangata-pink transition-colors">
                  Chat with Sangata
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="text-gray-600 hover:text-sangata-pink transition-colors">
                  Health Calculators
                </Link>
              </li>
              <li>
                <Link to="/prescription" className="text-gray-600 hover:text-sangata-pink transition-colors">
                  Scan Prescription
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-gray-600 hover:text-sangata-pink transition-colors">
                  Sangata Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-sangata-pink transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-sangata-pink transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-sangata-pink transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-600 hover:text-sangata-pink transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-sangata-pink mt-0.5 mr-2" />
                <span className="text-gray-600">Odisha, India</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="text-sangata-pink mt-0.5 mr-2" />
                <span className="text-gray-600">+91 XXX XXX XXXX</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="text-sangata-pink mt-0.5 mr-2" />
                <span className="text-gray-600">contact@sangata.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Sangata. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* AI Bots - Positioned higher on the page */}
      <div className="fixed bottom-32 right-5 flex flex-col gap-4 z-50">
        <SangataAIBot />
        <SisterAIBot />
      </div>
    </footer>
  );
};

export default Footer;
