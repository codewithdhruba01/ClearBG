import { useState, useCallback } from 'react';
import { removeBackground } from '@imgly/background-removal';

export type ProcessStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export const useBackgroundRemoval = () => {
  const [status, setStatus] = useState<ProcessStatus>('idle');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const processImage = useCallback(async (file: File) => {
    try {
      setStatus('processing');
      setErrorMessage('');

      // Create local preview immediately
      const objectUrl = URL.createObjectURL(file);
      setOriginalImage(objectUrl);

      // Run background removal locally using WebAssembly!
      const blob = await removeBackground(file);

      const processedObjectUrl = URL.createObjectURL(blob);
      setProcessedImage(processedObjectUrl);
      setStatus('success');
    } catch (error: unknown) {
      setStatus('error');
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
  }, [originalImage, processedImage]);

  return {
    status,
    originalImage,
    processedImage,
    errorMessage,
    processImage,
    reset,
  };
};
