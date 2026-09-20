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
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-primary/25"
      >
        <Download className="w-5 h-5" />
        Download PNG
      </button>
      
      <button 
        onClick={onReset}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-card border border-border text-foreground hover:bg-accent px-8 py-3 rounded-xl font-medium transition-colors"
      >
        <RefreshCw className="w-5 h-5" />
        Process Another Image
      </button>
    </motion.div>
  );
};
