import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MockupCard } from './ui/MockupCard';

export const Hero = () => {
  return (
    <div className="relative pt-32 pb-10 sm:pt-40 sm:pb-12 overflow-hidden flex flex-col items-center bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl leading-tight font-medium text-foreground tracking-tight mb-6"
          >
            Clear the background.<br/>
            Create your masterpiece.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base text-foreground/60 leading-relaxed mb-8 max-w-md mx-auto"
          >
            Everyone is looking for high-quality transparent images. ClearBG cuts out your background perfectly in just a second.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/remove" className="inline-flex items-center justify-center text-center btn-theme-inverse hover:opacity-90 px-4 py-1.5 rounded-full font-medium text-sm transition-opacity">
              Make it transparent
            </Link>
          </motion.div>
        </div>

        <MockupCard />
      </div>
    </div>
  );
};
