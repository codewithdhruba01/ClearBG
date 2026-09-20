import { motion } from 'framer-motion';
import { UploadZone } from '../components/UploadZone';
import { ProcessingState } from '../components/ProcessingState';
import { ResultActions } from '../components/ResultActions';
import { ComparisonSlider } from '../components/ComparisonSlider';
import { useBackgroundRemoval } from '../hooks/useBackgroundRemoval';

export const RemoveBg = () => {
  const { 
    status, 
    originalImage, 
    processedImage, 
    errorMessage, 
    processImage, 
    reset 
  } = useBackgroundRemoval();

  return (
    <div className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden flex flex-col bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight"
          >
            Remove background
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/50 text-base"
          >
            Drop an image. We will automatically remove the background.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          {status === 'idle' || status === 'error' ? (
            <div className="space-y-4">
              <UploadZone onUpload={processImage} />
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
              <ResultActions processedImage={processedImage} onReset={reset} />
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
};
