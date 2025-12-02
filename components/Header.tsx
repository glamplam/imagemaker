import React from 'react';
import { Sparkles, Palette } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-5xl mx-auto p-6 flex items-center justify-between">
      <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border-2 border-pastel-mint">
        <div className="p-2 bg-pastel-pink rounded-full">
          <Palette className="w-6 h-6 text-pastel-pinkDark" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-pastel-text">PastelFlow Editor</h1>
          <p className="text-xs text-gray-400 font-medium tracking-wide">AI-POWERED WORKFLOW</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-500">
        <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-100">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          Gemini 2.5 Flash
        </span>
      </div>
    </header>
  );
};

export default Header;