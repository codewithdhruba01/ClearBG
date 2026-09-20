import { Download, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultActionsProps {
  processedImage: string;
  onReset: () => void;
}

export const ResultActions = ({ processedImage, onReset }: ResultActionsProps) => {
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'clearbg-transparent.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4 w-full"
    >
      <button 
        onClick={handleDownload}
        className="w-full sm:w-auto flex items-center justify-center gap-2 btn-theme-inverse hover:opacity-80 transition-opacity cursor-pointer px-6 py-2 text-sm rounded-full font-medium shadow-2xl"
      >
        <Download className="w-4 h-4" />
        Download PNG
      </button>
      
      <button 
        onClick={onReset}
        className="w-full sm:w-auto flex items-center justify-center gap-2 btn-theme-inverse hover:opacity-80 transition-opacity cursor-pointer px-6 py-2 text-sm rounded-full font-medium"
      >
        <RefreshCw className="w-4 h-4" />
        Another Image
      </button>
    </motion.div>
  );
};
