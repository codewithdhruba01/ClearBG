import { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './ui/Logo';
import { XIcon } from './svg/X';

export const Navbar = () => {
  const location = useLocation();
  const isRemovePage = location.pathname === '/remove';

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
      <div className={`${isRemovePage ? 'max-w-2xl' : 'max-w-6xl'} mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300`}>
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="shrink-0 flex items-center gap-3 cursor-pointer">
            <Logo className="w-8 h-5 text-foreground" />
            <span className="font-semibold text-lg tracking-tight text-foreground">ClearBG</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="group relative text-foreground/80 hover:text-foreground transition-colors p-2 flex items-center justify-center rounded-full hover:bg-foreground/5 cursor-pointer" aria-label="Follow us on X">
                <XIcon size={15} />
                <span className="hidden sm:block absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground text-background px-3 py-1.5 text-xs font-semibold opacity-0 transition-all group-hover:opacity-100 pointer-events-none shadow-lg before:content-[''] before:absolute before:-top-1 before:left-1/2 before:-translate-x-1/2 before:w-2.5 before:h-2.5 before:bg-foreground before:rotate-45 before:-z-10 z-50">
                  Follow us on X
                </span>
              </a>
              <button 
                onClick={toggleTheme}
                className="group relative p-2 rounded-full text-foreground/80 focus:outline-none flex items-center justify-center cursor-pointer hover:bg-foreground/5"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className="hidden sm:block absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground text-background px-3 py-1.5 text-xs font-semibold opacity-0 transition-all group-hover:opacity-100 pointer-events-none shadow-lg before:content-[''] before:absolute before:-top-1 before:left-1/2 before:-translate-x-1/2 before:w-2.5 before:h-2.5 before:bg-foreground before:rotate-45 before:-z-10 z-50">
                  Switch to {theme === 'light' ? 'Dark' : 'Light'} mode
                </span>
              </button>
            </div>
            
            {!isRemovePage && (
              <Link to="/remove" className="hidden sm:flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors text-sm font-medium">
                Remove background <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
