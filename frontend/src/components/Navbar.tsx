import { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight, LayoutTemplate } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <nav className="fixed top-0 w-full z-50 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="shrink-0 flex items-center gap-3 cursor-pointer">
            <LayoutTemplate className="w-5 h-5 text-foreground" />
            <span className="font-semibold text-lg tracking-tight text-foreground">ClearBG</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border hover:bg-accent text-foreground/80 hover:text-foreground transition-colors focus:outline-none flex items-center justify-center"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <Link to="/remove" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors text-sm font-medium">
              Remove background <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
