import { useState, useEffect } from 'react';
import { Moon, Sun, Image as ImageIcon } from 'lucide-react';

export const Navbar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">Clear<span className="text-primary">BG</span></span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">How It Works</a>
            <a href="#features" className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">Features</a>
            <a href="#faq" className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">FAQ</a>
          </div>

          <div className="flex items-center">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent text-foreground/80 hover:text-foreground transition-colors focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
