import React, { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'sm' | 'lg';
};

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: never; href?: never };
type ButtonAsLink = BaseProps & LinkProps & { href?: never };
type ButtonAsAnchor = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { to?: never };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ children, className = '', size = 'default', ...props }, ref) => {
    
    // Default base classes for all buttons (btn-theme-inverse provides the colors)
    let baseClasses = "inline-flex items-center justify-center text-center btn-theme-inverse hover:opacity-90 rounded-full font-medium transition-opacity cursor-pointer";
    
    // Add size classes based on what was used in the app
    if (size === 'sm') {
      baseClasses += " px-4 py-1.5 text-sm";
    } else if (size === 'lg') {
      baseClasses += " px-6 py-3 text-base";
    } else {
      // default size used in most places
      baseClasses += " px-6 py-2 text-sm";
    }

    const finalClassName = `${baseClasses} ${className}`.trim();

    if ('to' in props && props.to) {
      return (
        <Link to={props.to} className={finalClassName} {...(props as LinkProps)} ref={ref as any}>
          {children}
        </Link>
      );
    }

    if ('href' in props && props.href) {
      return (
        <a href={props.href} className={finalClassName} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} ref={ref as any}>
          {children}
        </a>
      );
    }

    return (
      <button className={finalClassName} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} ref={ref as any}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
