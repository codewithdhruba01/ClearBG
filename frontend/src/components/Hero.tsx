import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Image as ImageIcon } from 'lucide-react';
import { UploadZone } from './UploadZone';
import { ProcessingState } from './ProcessingState';
import { ResultActions } from './ResultActions';
import { ComparisonSlider } from './ComparisonSlider';

interface HeroProps {
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  originalImage: string | null;
  processedImage: string | null;
  onUpload: (file: File) => void;
  onReset: () => void;
  errorMessage?: string;
}

export const Hero = ({ 
  status, 
  originalImage, 
  processedImage, 
  onUpload, 
  onReset,
  errorMessage 
}: HeroProps) => {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight mb-4"
          >
            Remove <span className="text-primary">Backgrounds</span> in Seconds
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-foreground/70"
          >
            Upload an image and let AI automatically remove the background.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto w-full"
        >
          {status === 'idle' || status === 'error' ? (
            <div className="space-y-4">
              <UploadZone onUpload={onUpload} />
              {status === 'error' && errorMessage && (
                <div className="text-red-500 text-center font-medium p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  {errorMessage}
                </div>
              )}
            </div>
          ) : null}

          {status === 'processing' && originalImage ? (
            <ProcessingState originalImage={originalImage} />
          ) : null}

          {status === 'success' && originalImage && processedImage ? (
            <div className="flex flex-col gap-6">
              <ComparisonSlider originalImage={originalImage} processedImage={processedImage} />
              <ResultActions processedImage={processedImage} onReset={onReset} />
            </div>
          ) : null}
        </motion.div>

        {status === 'idle' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mt-12 text-sm font-medium text-foreground/60"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Fast Processing
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" />
              Transparent PNG
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Privacy Focused
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
