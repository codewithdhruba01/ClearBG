import { useState, useCallback } from 'react';

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
      
      const formData = new FormData();
      formData.append('image', file);
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${apiUrl}/remove-background`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to process image');
      }
      
      setProcessedImage(data.image);
      setStatus('success');
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  }, []);

  const reset = useCallback(() => {
    if (originalImage) {
      URL.revokeObjectURL(originalImage);
    }
    setStatus('idle');
    setOriginalImage(null);
    setProcessedImage(null);
    setErrorMessage('');
  }, [originalImage]);

  return {
    status,
    originalImage,
    processedImage,
    errorMessage,
    processImage,
    reset
  };
};
