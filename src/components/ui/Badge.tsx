import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'primary' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className }) => {
  const variants = {
    success: 'bg-green-500/10 text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/20',
    warning: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-1 ring-inset ring-orange-500/20',
    error: 'bg-red-500/10 text-red-500 ring-1 ring-inset ring-red-500/20',
    primary: 'bg-primary/10 text-primary ring-1 ring-inset ring-primary/20',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  };

  return (
    <span className={cn('inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider', variants[variant], className)}>
      {children}
    </span>
  );
};
