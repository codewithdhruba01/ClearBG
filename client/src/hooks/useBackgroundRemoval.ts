import { useState, useCallback } from 'react';
import { removeBackground, type Config } from '@imgly/background-removal';

export type ProcessStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

// Helper to resize image before AI processing.
// This significantly reduces memory usage (RAM) on mobile devices and speeds up the model.
const resizeImage = (file: File | Blob, maxDimension: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height / width) * maxDimension);
          width = maxDimension;
        } else {
          width = Math.round((width / height) * maxDimension);
          height = maxDimension;
        }
      } else {
        // No resizing needed, return original
        resolve(file as Blob);
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas to Blob failed'));
        },
        'image/jpeg', // Standardize on jpeg for input to AI to save memory
        0.9,
      );
    };

    img.onerror = (error) => {
      URL.revokeObjectURL(objectUrl);
      reject(error);
    };

    img.src = objectUrl;
  });
};

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

      // Resize the image before feeding to the AI model!
      // This is the BIGGEST optimization for mobile devices.
      // It prevents 4K images from crashing the browser's WebGL/WASM memory limit.
      const resizedBlob = await resizeImage(file, 1080);

      // Run background removal locally using WebAssembly!
      let blob: Blob;
      try {
        // Try the 'isnet_fp16' model first (good balance of quality and performance)
        const config: Config = {
          model: 'isnet_fp16',
          output: {
            format: 'image/png', // Need PNG for transparency
          }
        };
        blob = await removeBackground(resizedBlob, config);
      } catch (firstError) {
        console.warn(
          'Initial processing failed, falling back to small model and CPU...',
          firstError,
        );
        // Fallback for mobile devices that don't support WebGL or have strict memory limitations. 
        // We use the 'isnet_quint8' model which takes significantly less RAM.
        const fallbackConfig: Config = {
          model: 'isnet_quint8',
          device: 'cpu',
          output: {
            format: 'image/png',
          }
        };
        blob = await removeBackground(resizedBlob, fallbackConfig);
      }

      const processedObjectUrl = URL.createObjectURL(blob);
      setProcessedImage(processedObjectUrl);
      setStatus('success');
    } catch (error: unknown) {
      setStatus('error');
      // Show more detailed error message to help with debugging on mobile
      const errorMsg = error instanceof Error ? error.message : String(error);
      setErrorMessage(`Failed to remove background: ${errorMsg}`);
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
