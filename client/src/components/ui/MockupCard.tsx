import { motion } from 'framer-motion';
import { MagicWandIcon } from '../svg/MagicWand';
import { useState, useRef, useEffect } from 'react';
import { Button } from './Button';

const ChromaKeyImage = ({ src, className }: { src: string; className: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Remove blue background pixels
        if (b > r * 1.1 + 20 && b > g * 1.1 + 20 && b > 80) {
          data[i + 3] = 0; // Set alpha to 0
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }, [src]);

  return <canvas ref={canvasRef} className={className} />;
};

export const MockupCard = () => {
  const [isBgRemoved, setIsBgRemoved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="w-full max-w-2xl relative mt-4"
    >
      <div className="relative rounded-2xl overflow-hidden aspect-16/10 flex items-center justify-center group bg-black/20">
        {/* Transparent Checkerboard Background (shows when bg is removed) */}
        <div className="absolute inset-0 bg-checkerboard opacity-20"></div>

        {/* Background Cover Image (Always visible) */}
        <img
          src="/Assets/cover.jpg"
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Inner Avatar/UI Image */}
        <div className="relative z-10 w-[90%] h-[90%] flex items-center justify-center pointer-events-none">
          {/* Canvas with background removed via chroma key */}
          <ChromaKeyImage
            src="/Assets/avater.png"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-auto object-contain rounded-2xl"
          />

          {/* Original Image that fades out smoothly */}
          <motion.img
            src="/Assets/avater.png"
            alt="App UI"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl"
            animate={{ opacity: isBgRemoved ? 0 : 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center pointer-events-none">
          <Button
            onClick={() => setIsBgRemoved(!isBgRemoved)}
            size="sm"
            className="shadow-2xl gap-2 pointer-events-auto"
          >
            <MagicWandIcon className="w-4 h-4" size={16} />
            {isBgRemoved ? 'Restore BG' : 'Remove BG'}
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 text-foreground/50 text-sm px-2">
        <span>This is the whole image. Try it.</span>
        <Button onClick={() => setIsBgRemoved(!isBgRemoved)} size="sm" className="gap-2">
          <MagicWandIcon className="w-4 h-4" size={16} /> {isBgRemoved ? 'Restore BG' : 'Remove BG'}
        </Button>
      </div>
    </motion.div>
  );
};
