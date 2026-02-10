import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/useAppContext';
import { Toggle } from '../components/ui/Toggle';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useAppContext();

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background-light/80 dark:bg-background-dark/80 border-b border-slate-200 dark:border-slate-800 pt-12 pb-4 px-6 flex justify-between items-center shrink-0">
        <button onClick={() => navigate(-1)} className="text-primary flex items-center gap-1 font-medium">
          <span className="material-icons text-xl">chevron_left</span>
          Settings
        </button>
        <h1 className="text-lg font-bold text-center absolute left-1/2 transform -translate-x-1/2">Automation</h1>
        <button className="text-primary font-bold">Save</button>
      </header>

      {/* Content Scroll Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 no-scrollbar">
        {/* Section: Engine Configuration */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Engine Sensitivity</h2>
          <div className="bg-white dark:bg-[#1E2532] rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-800/50">
            <div className="flex justify-between items-center mb-4">
              <label className="font-medium text-sm" htmlFor="confidence-slider">Extraction Confidence</label>
              <span className="text-primary font-bold text-lg">{settings.extractionConfidence}%</span>
            </div>
            <div className="range-wrapper py-2 relative">
              <div
                className="range-fill absolute top-1/2 left-0 h-1 bg-primary rounded-lg pointer-events-none transform -translate-y-1/2"
                style={{ width: `${settings.extractionConfidence}%` }}
              ></div>
              <input
                className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0 relative z-10"
                id="confidence-slider"
                max="100"
                min="0"
                type="range"
                value={settings.extractionConfidence}
                onChange={(e) => updateSettings({ extractionConfidence: parseInt(e.target.value) })}
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              Invoices below this threshold will be flagged for manual review. Higher values increase accuracy but may require more manual approvals.
            </p>
          </div>
        </section>

        {/* Section: Document Output */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Document Output</h2>
          <div className="bg-white dark:bg-[#1E2532] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800/50 divide-y divide-slate-100 dark:divide-slate-700/50">
            {/* Stamp Size Segmented Control */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-sm">Stamp Size</span>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg relative">
                {(['Small', 'Medium', 'Large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => updateSettings({ stampSize: size })}
                    className={`flex-1 py-1.5 text-xs transition-all rounded-md ${
                      settings.stampSize === size
                        ? 'font-bold text-white bg-primary shadow-sm'
                        : 'font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {/* Adaptive Stamp Toggle */}
            <div className="p-5 flex items-center justify-between">
              <div className="pr-4">
                <h3 className="font-medium text-sm">Adaptive Stamp Placement</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automatically avoid covering text</p>
              </div>
              <Toggle
                id="adaptive-toggle"
                checked={settings.adaptiveStampPlacement}
                onChange={(checked) => updateSettings({ adaptiveStampPlacement: checked })}
              />
            </div>
            {/* Auto-naming Toggle */}
            <div className="p-5 flex items-center justify-between">
              <div className="pr-4">
                <h3 className="font-medium text-sm">Auto-naming</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">STLMO_Vendor_Inv</span>
                </div>
              </div>
              <Toggle
                id="naming-toggle"
                checked={settings.autoNaming}
                onChange={(checked) => updateSettings({ autoNaming: checked })}
              />
            </div>
          </div>
        </section>

        {/* Section: Financial Data */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Financial Data</h2>
          <div className="bg-white dark:bg-[#1E2532] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800/50">
            <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-icons text-xl">account_balance_wallet</span>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">Chart of Accounts</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage GL codes & categories</p>
                </div>
              </div>
              <span className="material-icons text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
            </button>
            <div className="h-px bg-slate-100 dark:bg-slate-700/50 mx-5"></div>
            <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-icons text-xl">rule</span>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">Approval Rules</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Configure spending limits</p>
                </div>
              </div>
              <span className="material-icons text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
            </button>
          </div>
        </section>

        {/* Info / Version */}
        <div className="text-center pt-4 pb-8">
          <p className="text-[10px] text-slate-400 dark:text-slate-600">Engine Version 2.4.1 (Build 8902)</p>
        </div>
      </main>
    </div>
  );
};
