import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

export const MockupCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="w-full max-w-4xl relative mt-4"
    >
      
      <div className="relative rounded-2xl border border-white/10 overflow-hidden aspect-16/10 flex items-center justify-center">
        {/* Background Cover Image */}
        <img src="/Assets/cover.jpg" alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
        
        {/* Inner Avatar/UI Image */}
        <div className="relative z-10 w-[90%] h-[90%] flex items-center justify-center">
          <img src="/Assets/avater.png" alt="App UI" className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-6 text-foreground/50 text-sm px-2">
        <span>This is the whole image. Try it.</span>
        <Link to="/remove" className="flex items-center gap-2 btn-theme-inverse hover:opacity-90 transition-opacity cursor-pointer px-4 py-2 rounded-full font-medium">
          <Scissors className="w-4 h-4" /> Remove BG
        </Link>
      </div>
    </motion.div>
  );
};
