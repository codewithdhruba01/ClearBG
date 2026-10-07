import { useState } from 'react';
import { DownloadIcon } from './svg/Download';
import { RefreshIcon } from './svg/Refresh';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

interface ResultActionsProps {
  processedImage: string;
  onReset: () => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const BG_COLORS = ['transparent', '#000000', '#ffffff', '#3b82f6', '#FFEB3B'];

export const ResultActions = ({
  processedImage,
  onReset,
  backgroundColor,
  setBackgroundColor,
}: ResultActionsProps) => {
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high');

  const handleDownload = async () => {
    let downloadUrl = processedImage;

    if (quality !== 'high' || backgroundColor !== 'transparent') {
      const scale = quality === 'medium' ? 0.5 : quality === 'low' ? 0.25 : 1;

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
          if (backgroundColor !== 'transparent') {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          downloadUrl = canvas.toDataURL('image/png');
        }
      } catch (err) {
        console.error('Error processing image:', err);
      }
    }

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `clearbg-${backgroundColor === 'transparent' ? 'transparent' : 'colored'}-${quality}.png`;
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
        <span className="text-sm font-medium text-foreground/70">Background Color</span>
        <div className="flex gap-3">
          {BG_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setBackgroundColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                backgroundColor === color
                  ? 'border-primary scale-110 shadow-md'
                  : 'border-border/40 hover:scale-105'
              } ${color === 'transparent' ? 'bg-checkerboard' : ''}`}
              style={color !== 'transparent' ? { backgroundColor: color } : {}}
              title={color === 'transparent' ? 'Transparent' : color}
              aria-label={`Select background color ${color === 'transparent' ? 'Transparent' : color}`}
            />
          ))}
        </div>
      </div>

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
