import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import LoadingOverlay from './components/LoadingOverlay';
import { generateEditedImage } from './services/gemini';
import { EditState, PresetPrompt } from './types';
import { Wand2, Download, Trash2, ArrowRight, RefreshCw, Zap } from 'lucide-react';

const PRESETS: PresetPrompt[] = [
  { label: 'Retro Style', text: 'Apply a retro 80s aesthetic filter with grain', icon: '📺', color: 'bg-orange-100 text-orange-600' },
  { label: 'Sketch', text: 'Convert this image into a pencil sketch style', icon: '✏️', color: 'bg-gray-100 text-gray-600' },
  { label: 'Pastel Workflow', text: 'Redraw this diagram in a cute pastel style with rounded shapes and mint/pink colors, like a modern workflow slide.', icon: '🍡', color: 'bg-green-100 text-green-600' },
  { label: 'Cyberpunk', text: 'Make it look cyberpunk with neon lights', icon: '🤖', color: 'bg-purple-100 text-purple-600' },
];

const App: React.FC = () => {
  const [state, setState] = useState<EditState>({
    originalImage: null,
    generatedImage: null,
    prompt: '',
    isLoading: false,
    error: null,
  });

  const handleImageSelect = (base64: string) => {
    setState(prev => ({ ...prev, originalImage: base64, generatedImage: null, error: null }));
  };

  const handleGenerate = async () => {
    if (!state.originalImage || !state.prompt) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await generateEditedImage(state.originalImage, state.prompt);
      setState(prev => ({ ...prev, generatedImage: result, isLoading: false }));
    } catch (err: any) {
      setState(prev => ({ ...prev, error: err.message, isLoading: false }));
    }
  };

  const handleReset = () => {
    setState({
      originalImage: null,
      generatedImage: null,
      prompt: '',
      isLoading: false,
      error: null,
    });
  };

  const handleDownload = () => {
    if (state.generatedImage) {
      const link = document.createElement('a');
      link.href = state.generatedImage;
      link.download = 'pastelflow-edit.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />

      <main className="max-w-5xl mx-auto px-6">
        
        {/* Step 1: Upload (Only show if no image selected) */}
        {!state.originalImage && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-pastel-mint text-pastel-mintDark font-bold px-3 py-1 rounded-full">Step 1</span>
              <h2 className="text-2xl font-bold text-pastel-text">Upload your image</h2>
            </div>
            <ImageUploader onImageSelected={handleImageSelect} />
          </div>
        )}

        {/* Step 2: Editor Interface (Show if image selected) */}
        {state.originalImage && (
          <div className="mt-8 animate-in fade-in zoom-in-95 duration-500">
            
            {/* Top Toolbar / Navigation */}
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-3">
                  <span className="bg-pastel-pink text-pastel-pinkDark font-bold px-3 py-1 rounded-full">Step 2</span>
                  <h2 className="text-2xl font-bold text-pastel-text">Design & Generate</h2>
               </div>
               <button 
                onClick={handleReset}
                className="text-gray-400 hover:text-red-400 flex items-center gap-2 text-sm font-bold transition-colors"
               >
                 <Trash2 className="w-4 h-4" /> Start Over
               </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Input & Controls */}
              <div className="space-y-6">
                
                {/* Original Image Preview */}
                <div className="relative bg-white p-2 rounded-3xl shadow-sm border border-gray-100">
                   <div className="absolute top-4 left-4 bg-gray-800/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-md">Original</div>
                   <img 
                    src={state.originalImage} 
                    alt="Original" 
                    className="w-full h-64 object-cover rounded-2xl" 
                   />
                </div>

                {/* Prompt Section */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                   {/* Decorative background element */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-pastel-yellow rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                   
                   <label className="block text-sm font-bold text-gray-600 mb-3 relative z-10">
                     How should we change this image?
                   </label>
                   
                   <textarea
                    value={state.prompt}
                    onChange={(e) => setState(prev => ({ ...prev, prompt: e.target.value }))}
                    placeholder="E.g., Make it look like a watercolor painting, add a futuristic glow..."
                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-pastel-mint focus:ring-0 focus:bg-white transition-all resize-none text-gray-700 min-h-[120px] relative z-10"
                   />
                   
                   {/* Presets */}
                   <div className="mt-4 relative z-10">
                     <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Quick Presets</p>
                     <div className="flex flex-wrap gap-2">
                       {PRESETS.map((preset) => (
                         <button
                          key={preset.label}
                          onClick={() => setState(prev => ({ ...prev, prompt: preset.text }))}
                          className={`text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-2 transition-transform hover:scale-105 ${preset.color}`}
                         >
                           <span>{preset.icon}</span> {preset.label}
                         </button>
                       ))}
                     </div>
                   </div>

                   {/* Generate Button */}
                   <button
                    onClick={handleGenerate}
                    disabled={state.isLoading || !state.prompt}
                    className="mt-6 w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative z-10"
                   >
                     {state.isLoading ? (
                       'Generating...'
                     ) : (
                       <>
                         <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                         Generate Magic
                       </>
                     )}
                   </button>
                   
                   {state.error && (
                     <div className="mt-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg relative z-10">
                       Error: {state.error}
                     </div>
                   )}
                </div>
              </div>

              {/* Right Column: Result */}
              <div className="relative h-full min-h-[400px]">
                 {/* Connection Arrow (Desktop only) */}
                 <div className="hidden lg:block absolute top-1/2 -left-6 transform -translate-y-1/2 z-10">
                    <div className="bg-white p-2 rounded-full shadow-sm border border-gray-100">
                        <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>
                 </div>

                 <div className={`h-full bg-white rounded-3xl shadow-lg border-4 border-white overflow-hidden relative transition-all duration-500 ${state.generatedImage ? 'ring-4 ring-pastel-mint ring-offset-4' : 'border-dashed border-gray-200'}`}>
                    
                    {state.isLoading && <LoadingOverlay />}
                    
                    {!state.generatedImage && !state.isLoading && (
                      <div className="h-full flex flex-col items-center justify-center text-gray-300 p-8 text-center">
                        <Zap className="w-16 h-16 mb-4 opacity-20" />
                        <p className="font-bold">Your masterpiece will appear here</p>
                        <p className="text-sm">Enter a prompt and hit generate!</p>
                      </div>
                    )}

                    {state.generatedImage && (
                      <div className="relative h-full flex flex-col">
                        <div className="absolute top-4 left-4 z-10 bg-pastel-mint text-pastel-mintDark text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          AI Generated
                        </div>
                        
                        <div className="flex-1 bg-gray-50 flex items-center justify-center p-2 overflow-hidden">
                           <img 
                            src={state.generatedImage} 
                            alt="Generated" 
                            className="max-h-full max-w-full object-contain rounded-xl shadow-sm"
                           />
                        </div>

                        <div className="p-4 bg-white border-t border-gray-100 flex gap-3">
                           <button 
                            onClick={handleDownload}
                            className="flex-1 bg-pastel-mint hover:bg-pastel-mintDark/20 text-pastel-mintDark font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                           >
                             <Download className="w-4 h-4" /> Download
                           </button>
                           <button 
                            onClick={() => setState(prev => ({...prev, generatedImage: null}))}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-xl transition-colors"
                            title="Discard and try again"
                           >
                             <RefreshCw className="w-5 h-5" />
                           </button>
                        </div>
                      </div>
                    )}
                 </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;