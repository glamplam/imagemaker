import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-3xl">
      <div className="relative">
        <div className="absolute inset-0 bg-pastel-pink rounded-full blur-xl opacity-50 animate-pulse"></div>
        <Loader2 className="w-12 h-12 text-pastel-pinkDark animate-spin relative z-10" />
      </div>
      <p className="mt-4 text-pastel-text font-bold text-lg">Thinking...</p>
      <p className="text-gray-400 text-sm">Applying AI magic ✨</p>
    </div>
  );
};

export default LoadingOverlay;