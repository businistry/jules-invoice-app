import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-md bg-background-light dark:bg-background-dark min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
      {/* iOS Status Bar Area */}
      <div className="h-12 w-full flex items-center justify-between px-6 pt-2 shrink-0">
        <span className="text-xs font-semibold">9:41</span>
        <div className="flex gap-1.5 items-center">
          <span className="material-icons-round text-sm">signal_cellular_alt</span>
          <span className="material-icons-round text-sm">wifi</span>
          <span className="material-icons-round text-lg">battery_full</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {children}
      </div>

      {/* iOS Home Indicator */}
      <div className="h-6 w-full flex justify-center items-center pb-2 shrink-0">
        <div className="w-32 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
      </div>
    </div>
  );
};
