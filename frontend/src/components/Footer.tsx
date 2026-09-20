import { Image as ImageIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Footer = () => {
  const location = useLocation();
  const isRemovePage = location.pathname === '/remove';

  return (
    <footer className="py-8 bg-background">
      <div className={`${isRemovePage ? 'max-w-2xl' : 'max-w-5xl'} mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary opacity-80" />
            <span className="font-bold text-foreground text-sm tracking-tight">Clear<span className="text-primary">BG</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-foreground/50 text-sm">
              Made by <a href="https://codewithdhruba.in/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors font-medium">@codewithdhruba</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
