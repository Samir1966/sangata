
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SisterAIBot = () => {
  const handleClick = () => {
    window.open("https://elevenlabs.io/app/talk-to?agent_id=zHgNbJBr0PpBKMmGfOQo", "_blank");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className="w-16 h-16 rounded-full bg-orange-500 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            onClick={handleClick}
          >
            <img 
              src="/lovable-uploads/0f88092b-977e-431f-84f6-0c3e6b07f59f.png"
              alt="Sister AI"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-white px-3 py-1.5 rounded-lg shadow-md flex items-center">
          <span className="text-sm font-medium">Talk to Sister.AI</span>
          <ExternalLink className="ml-1 h-3.5 w-3.5 text-gray-500" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SisterAIBot;
