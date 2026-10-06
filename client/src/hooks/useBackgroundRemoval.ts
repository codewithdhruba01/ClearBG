import { useState, useCallback, useEffect } from 'react';
import { removeBackground, preload, type Config } from '@imgly/background-removal';

export type ProcessStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

// Use the smaller, faster model for better performance
const bgConfig: Config = {
  model: 'isnet_quint8',
  // @ts-ignore - The types might not expose progress perfectly, but it works
  progress: (key: string, current: number, total: number) => {
    // We'll update this via a callback if needed
  },
};

export const useBackgroundRemoval = () => {
  const [status, setStatus] = useState<ProcessStatus>('idle');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [progressMessage, setProgressMessage] = useState<string>('');

  // Preload the AI model as soon as the hook is used (when app loads)
  // so it's instantly ready when the user uploads an image.
  useEffect(() => {
    preload(bgConfig)
      .then(() => {
        console.log('Background removal AI model preloaded successfully!');
      })
      .catch((err) => {
        console.warn('Failed to preload AI model:', err);
      });
  }, []);

  const processImage = useCallback(async (file: File) => {
    try {
      setStatus('processing');
      setErrorMessage('');
      setProgressMessage('Initializing AI...');

      // Create local preview immediately
      const objectUrl = URL.createObjectURL(file);
      setOriginalImage(objectUrl);

      // Run background removal locally using WebAssembly!
      const configWithProgress: Config = {
        ...bgConfig,
        progress: (key: string, current: number, total: number) => {
          if (key.includes('fetch')) {
            const percent = Math.round((current / total) * 100) || 0;
            setProgressMessage(`Downloading AI Model... ${percent}%`);
          } else {
            setProgressMessage('Processing image...');
          }
        },
      };

      const blob = await removeBackground(file, configWithProgress);

      const processedObjectUrl = URL.createObjectURL(blob);
      setProcessedImage(processedObjectUrl);
      setStatus('success');
      setProgressMessage('');
    } catch (error: unknown) {
      setStatus('error');
      setProgressMessage('');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to remove background locally.',
      );
      console.error('Local background removal error:', error);
    }
  }, []);

  const reset = useCallback(() => {
    if (originalImage) {
      URL.revokeObjectURL(originalImage);
    }
    if (processedImage && processedImage.startsWith('blob:')) {
      URL.revokeObjectURL(processedImage);
    }
    setStatus('idle');
    setOriginalImage(null);
    setProcessedImage(null);
    setErrorMessage('');
    setProgressMessage('');
  }, [originalImage, processedImage]);

  return {
    status,
    originalImage,
    processedImage,
    errorMessage,
    progressMessage,
    processImage,
    reset,
  };
};
