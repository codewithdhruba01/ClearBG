import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ProcessingStateProps {
  originalImage: string;
}

export const ProcessingState = ({ originalImage }: ProcessingStateProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 md:p-12 h-100 rounded-3xl glass relative overflow-hidden">
      {/* Background blurred image for cool effect */}
      <div 
        className="absolute inset-0 opacity-20 blur-xl scale-110 object-cover pointer-events-none"
        style={{
          backgroundImage: `url(${originalImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="mb-6"
        >
          <div className="w-20 h-20 rounded-full border-4 border-primary/30 border-t-primary flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        </motion.div>
        
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Removing Background...
        </h3>
        <p className="text-foreground/70">
          AI is processing your image
        </p>
        
        {/* Progress bar animation */}
        <div className="w-64 h-2 bg-foreground/10 rounded-full mt-8 overflow-hidden">
          <motion.div 
            className="h-full bg-linear-to-r from-primary to-cyan-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};
