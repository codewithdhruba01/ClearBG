import { motion } from 'framer-motion';


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
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="mb-6 w-20 h-20 rounded-full border-4 border-primary/30 border-t-primary"
        />
        
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Removing Background...
        </h3>
        <p className="text-foreground/70">
          AI is processing your image
        </p>
        
        {/* Progress bar animation */}
        <div className="w-64 h-2 bg-foreground/10 rounded-full mt-8 overflow-hidden">
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};
