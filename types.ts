export interface EditState {
  originalImage: string | null; // Base64 string
  generatedImage: string | null; // Base64 string
  prompt: string;
  isLoading: boolean;
  error: string | null;
}

export interface PresetPrompt {
  label: string;
  text: string;
  icon: string;
  color: string;
}