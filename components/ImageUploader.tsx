import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onImageSelected(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  return (
    <div className="relative group w-full h-80 border-4 border-dashed border-pastel-mint hover:border-pastel-mintDark transition-colors rounded-3xl bg-white flex flex-col items-center justify-center cursor-pointer overflow-hidden">
        <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="bg-pastel-mint p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-pastel-mintDark" />
        </div>
        <h3 className="text-lg font-bold text-gray-700 mb-2">Upload Source Image</h3>
        <p className="text-sm text-gray-400 px-8 text-center">
            Click or drag & drop an image here to start your creative workflow.
        </p>
        
        <div className="absolute bottom-0 right-0 p-8 opacity-10 pointer-events-none">
            <ImageIcon className="w-32 h-32 text-pastel-mintDark" />
        </div>
    </div>
  );
};

export default ImageUploader;