import { useState } from 'react';
import { DownloadIcon } from './svg/Download';
import { RefreshIcon } from './svg/Refresh';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

interface ResultActionsProps {
  processedImage: string;
  onReset: () => void;
}

export const ResultActions = ({ processedImage, onReset }: ResultActionsProps) => {
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high');

  const handleDownload = async () => {
    let downloadUrl = processedImage;

    if (quality !== 'high') {
      const scale = quality === 'medium' ? 0.5 : 0.25;

      try {
        const img = new Image();
        img.src = processedImage;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          downloadUrl = canvas.toDataURL('image/png');
        }
      } catch (err) {
        console.error('Error resizing image:', err);
      }
    }

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `clearbg-transparent-${quality}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col gap-6 justify-center items-center mt-6 w-full max-w-lg mx-auto"
    >
      <div className="flex flex-col items-center gap-2 w-full">
        <span className="text-sm font-medium text-foreground/70">Download Quality</span>
        <div className="flex p-1 bg-foreground/5 rounded-md border border-border w-auto relative">
          {(['low', 'medium', 'high'] as const).map((q) => (
            <button
              key={q}
              onClick={() => setQuality(q)}
              className={`relative flex-1 w-20 sm:w-24 py-1.5 text-sm font-medium rounded-sm capitalize transition-colors duration-200 ${
                quality === q ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {quality === q && (
                <motion.div
                  layoutId="active-quality"
                  className="absolute inset-0 bg-background shadow-sm rounded-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{q}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-4 justify-center items-center w-full">
        <Button onClick={handleDownload} className="w-auto gap-2 shadow-2xl">
          <DownloadIcon className="w-4 h-4" size={16} />
          Download PNG
        </Button>

        <Button onClick={onReset} className="w-auto gap-2">
          <RefreshIcon className="w-4 h-4" size={16} />
          Another Image
        </Button>
      </div>
    </motion.div>
  );
};
