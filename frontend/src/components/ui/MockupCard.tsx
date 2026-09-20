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
      {/* Subtle glow effect behind the mockup */}
      <div className="absolute -inset-1 bg-linear-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50"></div>
      
      <div className="relative rounded-2xl border border-white/10 bg-black/40 overflow-hidden aspect-16/10 flex items-center justify-center p-8 backdrop-blur-xl">
        {/* Mockup Inner Content */}
        <div className="w-full h-full rounded-lg bg-[#111] border border-white/5 flex flex-col shadow-2xl overflow-hidden relative">
          {/* Fake UI Header */}
          <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-[#1a1a1a]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
          </div>
          
          {/* Fake UI Body */}
          <div className="flex-1 p-8 flex items-center justify-center relative bg-[#0a0a0a]">
            <div className="absolute inset-0 bg-checkerboard opacity-20"></div>
            <div className="relative z-10 p-8">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" alt="Demo Image" className="h-64 object-contain filter drop-shadow-2xl" />
            </div>
            
            {/* Floating "Remove it" Button inside the mockup */}
            <div className="absolute bottom-8 flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full font-medium text-sm cursor-pointer hover:scale-105 transition-transform shadow-xl">
              <Scissors className="w-4 h-4" /> Remove it
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-6 text-foreground/50 text-sm">
        <span>This is the whole image. Try it.</span>
        <Link to="/remove" className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer border border-white/10 px-3 py-1.5 rounded-full">
          <Scissors className="w-3 h-3" /> Remove it
        </Link>
      </div>
    </motion.div>
  );
};
