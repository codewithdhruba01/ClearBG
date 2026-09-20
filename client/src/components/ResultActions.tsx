import { Download, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

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
      <Button 
        onClick={handleDownload}
        className="w-full sm:w-auto gap-2 shadow-2xl"
      >
        <Download className="w-4 h-4" />
        Download PNG
      </Button>
      
      <Button 
        onClick={onReset}
        className="w-full sm:w-auto gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Another Image
      </Button>
    </motion.div>
  );
};
