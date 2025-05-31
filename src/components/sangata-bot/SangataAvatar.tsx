
import React from 'react';

interface SangataAvatarProps {
  onClick: () => void;
}

const SangataAvatar = ({ onClick }: SangataAvatarProps) => {
  return (
    <div 
      className="w-16 h-16 rounded-full bg-sangata-pink shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform group"
      onClick={onClick}
    >
      <img 
        src="/lovable-uploads/ee40c451-039e-46ff-8e9d-aae5b1c043ff.png"
        alt="Sangata AI"
        className="w-12 h-12 rounded-full object-cover"
      />
      
      {/* Hover tooltip */}
      <div className="absolute right-full mr-3 bg-white px-3 py-1.5 rounded-lg shadow-md invisible group-hover:visible whitespace-nowrap">
        <span className="text-sm font-medium">Sangata Didi</span>
      </div>
    </div>
  );
};

export default SangataAvatar;
