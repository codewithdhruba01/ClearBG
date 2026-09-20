import { Image as ImageIcon } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">Clear<span className="text-primary">BG</span></span>
          </div>
          
          <div className="text-foreground/50 text-sm">
            &copy; {new Date().getFullYear()} ClearBG. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
