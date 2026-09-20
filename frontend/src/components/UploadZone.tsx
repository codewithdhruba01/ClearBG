import { useCallback, useState } from 'react';
import { UploadCloud, FileImage } from 'lucide-react';

interface UploadZoneProps {
  onUpload: (file: File) => void;
}

export const UploadZone = ({ onUpload }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndUpload = useCallback((file: File) => {
    setError(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PNG, JPG, or WEBP image.');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be smaller than 10MB.');
      return;
    }

    onUpload(file);
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  }, [validateAndUpload]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndUpload(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center p-12 w-full h-100 rounded-3xl border-2 border-dashed transition-all duration-300 glass glass-hover cursor-pointer group ${
          isDragging 
            ? 'border-primary bg-primary/5 dark:bg-primary/10' 
            : 'border-border'
        }`}
      >
        <input 
          type="file" 
          accept="image/png, image/jpeg, image/webp" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleFileInput}
          title="Upload image"
        />
        
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <UploadCloud className="w-10 h-10 text-primary" />
        </div>
        
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Drop your image here
        </h3>
        
        <div className="flex items-center gap-4 my-4 w-full max-w-xs">
          <div className="h-px bg-border flex-1"></div>
          <span className="text-foreground/50 text-sm font-medium">or</span>
          <div className="h-px bg-border flex-1"></div>
        </div>
        
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium transition-colors z-20 pointer-events-none mb-6 shadow-lg shadow-primary/25">
          Upload Image
        </button>
        
        <div className="flex items-center gap-2 text-foreground/50 text-sm">
          <FileImage className="w-4 h-4" />
          <span>PNG • JPG • WEBP</span>
          <span className="mx-2">•</span>
          <span>Max file size: 10MB</span>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 text-red-500 text-center font-medium p-4 bg-red-50 dark:bg-red-900/20 rounded-xl animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}
    </div>
  );
};
