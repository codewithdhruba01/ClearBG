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
        className={`relative flex flex-col items-center justify-center p-8 sm:p-16 w-full min-h-[200px] sm:min-h-[300px] rounded-3xl sm:rounded-[2rem] border-2 border-dashed transition-all duration-300 cursor-pointer group ${
          isDragging 
            ? 'border-foreground/60 bg-foreground/5' 
            : 'border-foreground/10 hover:border-foreground/40 hover:bg-foreground/2'
        }`}
      >
        <input 
          type="file" 
          accept="image/png, image/jpeg, image/webp" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleFileInput}
          title="Upload image"
        />
        
        <div className="mb-4 text-foreground opacity-80 group-hover:opacity-100 transition-opacity">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </div>
        
        <h3 className="text-base font-bold text-foreground mb-1 text-center">
          Drop an image here
        </h3>
        
        <span className="text-foreground/50 text-sm text-center">
          or click to choose one, or paste it
        </span>
      </div>
      
      {error && (
        <div className="mt-4 text-red-500 text-center font-medium p-4 bg-red-50 dark:bg-red-900/20 rounded-xl animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}
    </div>
  );
};
