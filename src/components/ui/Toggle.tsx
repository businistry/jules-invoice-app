import React from 'react';

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ id, checked, onChange }) => {
  return (
    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-slate-200 dark:border-[#1E2532] appearance-none cursor-pointer transition-all duration-300 ease-in-out right-6 checked:right-0"
      />
      <label
        htmlFor={id}
        className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer transition-colors duration-300"
      ></label>
    </div>
  );
};
