import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/useAppContext';
import { Button } from '../components/ui/Button';

export const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { invoices } = useAppContext();
  const invoice = invoices.find((inv) => inv.id === id) || invoices[0];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-200 dark:bg-[#0b1019]">
      {/* Mobile Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#151b2b] border-b border-slate-200 dark:border-slate-800 shrink-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400">
          <span className="material-icons">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-sm font-bold tracking-wide">{invoice.invoiceNumber}</h1>
          <span className="text-xs text-slate-500 dark:text-slate-400">{invoice.vendorName}</span>
        </div>
        <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400">
          <span className="material-icons">more_vert</span>
        </button>
      </header>

      {/* Main Content: Invoice Viewer */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center">
        {/* Zoom/Pan Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button className="w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-full shadow-lg text-slate-600 dark:text-slate-300">
            <span className="material-icons text-xl">add</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-full shadow-lg text-slate-600 dark:text-slate-300">
            <span className="material-icons text-xl">remove</span>
          </button>
        </div>

        {/* Invoice Image Container */}
        <div className="relative w-full h-full p-4 overflow-auto no-scrollbar flex items-center justify-center">
          <div className="relative shadow-2xl max-w-none w-[90%] md:w-[600px] transition-transform duration-200">
            <img
              alt="Scanned invoice document"
              className="w-full h-auto rounded-sm opacity-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr69EeGWW_KXFU3KuT_4T5QY6jbZGnRb3pG_9ctZbjk23aoXNlsnB789U4ipP6W-J6LBxWG5OdwtDJk9WyeHBtxNaFL25dM9z28wWZ8_eqzvcM7QpDHCOwq3UyOV8uyqY34ijyp743goChSA5bWnXOWX4zlZA_iSmE5sYmgayCi0kiwdIZi_rd1qiTAY75jQgi9TlyIO1Hvn9u2j8fvke6SM92VHq-w22sUHdmBLZVNc4JgogwqUTQDAXOO2dsaiE7CLS64jQ7ij6B"
            />
            {/* Virtual Stamp */}
            <div className="absolute top-24 right-8 border-4 border-primary/60 p-2 rounded-lg stamp-animation pointer-events-none select-none">
              <div className="border-2 border-primary/60 px-3 py-1 rounded">
                <span className="block text-primary/80 font-black text-xs tracking-[0.2em] uppercase text-center">GL CODING</span>
                <span className="block text-primary font-black text-xl tracking-widest uppercase text-center">READY</span>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-[0.6rem] text-primary/80 font-bold uppercase">{invoice.date.toUpperCase()}</span>
                </div>
              </div>
            </div>
            {/* Highlight Box for Amount */}
            <div className="absolute bottom-32 right-12 w-24 h-8 border-2 border-green-500/50 bg-green-500/10 rounded mix-blend-multiply dark:mix-blend-screen"></div>
          </div>
        </div>
      </main>

      {/* Bottom Sheet / GL Coding Form */}
      <section className="bg-white dark:bg-[#151b2b] rounded-t-2xl shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.3)] z-20 shrink-0 max-h-[50vh] flex flex-col">
        {/* Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
        </div>
        <div className="px-5 pb-6 pt-2 overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Coding Details</h2>
            <span className="text-xs font-medium px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg flex items-center gap-1">
              <span className="material-icons text-[14px]">auto_awesome</span>
              Auto-Extracted
            </span>
          </div>
          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Initials</label>
              <div className="relative">
                <input
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  type="text"
                  defaultValue="JD"
                />
                <span className="absolute right-3 top-2.5 text-green-500 material-icons text-sm">check_circle</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Date</label>
              <div className="relative">
                <input
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  type="date"
                  defaultValue={invoice.date}
                />
              </div>
            </div>
          </div>
          {/* GL Code Dropdown */}
          <div className="space-y-1.5 mb-4">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">GL Account Code</label>
            <button className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-sm text-left focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all group-hover:border-primary/50">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-icons text-lg">category</span>
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-bold text-slate-900 dark:text-white">{invoice.glCode || 'Select GL Code'}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate">Marketing Dept • SaaS</span>
                </div>
              </div>
              <span className="material-icons text-slate-400">expand_more</span>
            </button>
          </div>
          {/* Invoice Amount */}
          <div className="space-y-1.5 mb-6">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Invoice Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium">$</span>
              <input
                className="w-full pl-7 bg-slate-50 dark:bg-slate-900 border border-green-500/30 dark:border-green-500/30 rounded-lg px-3 py-3 text-lg font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all shadow-[0_0_0_1px_rgba(34,197,94,0.1)]"
                type="text"
                defaultValue={invoice.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded text-[10px] font-bold text-green-700 dark:text-green-400">
                CONFIDENCE {invoice.confidence || 98}%
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button className="w-full py-3.5">
              <span>Confirm & Next</span>
              <span className="material-icons text-sm">arrow_forward</span>
            </Button>
            <Button variant="ghost" className="w-full py-2.5">
              <span className="material-icons text-sm">edit</span>
              <span>Manual Override</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
