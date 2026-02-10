import React from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

export const BottomNav: React.FC = () => {
  const items = [
    { icon: 'dashboard', label: 'Home', path: '/' },
    { icon: 'description', label: 'Invoices', path: '/batches' },
    { icon: 'analytics', label: 'Reports', path: '/reports' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="absolute bottom-0 w-full h-20 bg-white/90 dark:bg-surface-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-700/50 flex justify-around items-center pb-4 z-30">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            clsx(
              'flex flex-col items-center gap-1 p-2 transition-colors',
              isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-200'
            )
          }
        >
          <span className="material-icons-round text-2xl">{item.icon}</span>
          <span className="text-[10px] font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
