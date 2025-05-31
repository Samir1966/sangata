
import React from 'react';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface BotHeaderProps {
  isExpanded: boolean;
  toggleExpanded: () => void;
  toggleBot: () => void;
}

const BotHeader = ({ isExpanded, toggleExpanded, toggleBot }: BotHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-sangata-pink to-sangata-blue/70 p-3 flex flex-row items-center space-x-2 text-white">
      <Avatar className="h-10 w-10 border-2 border-white">
        <AvatarImage src="/lovable-uploads/ee40c451-039e-46ff-8e9d-aae5b1c043ff.png" alt="Sangata Didi" />
        <AvatarFallback className="bg-white text-sangata-pink">संगात</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-bold">संगात दीदी</h3>
        <p className="text-xs opacity-80">आपकी हेल्थ साथी</p>
      </div>
      <div className="flex space-x-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={toggleExpanded}>
          {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={toggleBot}>
          <X size={18} />
        </Button>
      </div>
    </div>
  );
};

export default BotHeader;
