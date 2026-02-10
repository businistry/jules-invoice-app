import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/useAppContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const BatchOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { batches, getInvoicesByBatch } = useAppContext();
  const [filter, setFilter] = useState<'All' | 'Ready' | 'Issues'>('All');

  const batch = batches.find((b) => b.id === id) || batches[3]; // Default to the 21 invoices batch if not found
  const invoices = getInvoicesByBatch(batch.id);

  const filteredInvoices = invoices.filter((inv) => {
    if (filter === 'All') return true;
    if (filter === 'Ready') return inv.status === 'Auto-filled' || inv.status === 'Ready for Review';
    if (filter === 'Issues') return inv.status === 'Missing Data' || inv.status === 'Review Needed';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="pt-14 px-5 pb-4 flex justify-between items-end bg-background-light dark:bg-background-dark z-10 sticky top-0 shrink-0">
        <div>
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Batch #{batch.batchNumber}</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices</h1>
        </div>
        <Link to="/settings" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
          <span className="material-icons text-gray-600 dark:text-gray-300">settings</span>
        </Link>
      </div>

      {/* Summary Statistics */}
      <div className="px-5 pb-6 shrink-0">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <div className="min-w-[140px] p-4 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-start">
            <div className="p-2 rounded-lg bg-primary/20 mb-3">
              <span className="material-icons text-primary text-xl">auto_fix_high</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">18</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Ready for Export</span>
          </div>
          <div className="min-w-[140px] p-4 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex flex-col items-start">
            <div className="p-2 rounded-lg bg-orange-500/10 mb-3">
              <span className="material-icons text-orange-500 text-xl">warning</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">3</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Needs Review</span>
          </div>
          <div className="min-w-[140px] p-4 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex flex-col items-start">
            <div className="p-2 rounded-lg bg-green-500/10 mb-3">
              <span className="material-icons text-green-500 text-xl">attach_money</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">${(batch.totalAmount / 1000).toFixed(0)}k</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Total Amount</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-5 mb-4 shrink-0">
        <div className="flex space-x-1 p-1 bg-gray-200 dark:bg-gray-800 rounded-lg">
          {(['All', 'Ready', 'Issues'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
                filter === t
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t} {t === 'All' && `(${invoices.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Invoice List */}
      <div className="flex-1 overflow-y-auto px-5 pb-40 no-scrollbar space-y-3">
        {filteredInvoices.map((inv) => (
          <Link
            key={inv.id}
            to={`/invoices/${inv.id}`}
            className="group relative bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            {inv.status === 'Missing Data' && <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-500 rounded-l-xl"></div>}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-primary dark:text-blue-400 shrink-0 overflow-hidden">
                {inv.vendorLogo ? (
                  <img alt="Vendor Logo" className="w-full h-full object-cover rounded-lg opacity-80" src={inv.vendorLogo} />
                ) : (
                  <span className="material-icons text-lg">{inv.status === 'Missing Data' ? 'error_outline' : 'receipt_long'}</span>
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{inv.vendorName}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {inv.invoiceNumber} • ${inv.amount.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant={inv.status === 'Auto-filled' ? 'success' : inv.status === 'Ready for Review' ? 'primary' : 'error'}>
                {inv.status}
              </Badge>
              <span className="text-[10px] text-gray-400">{inv.time}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="absolute bottom-20 left-0 w-full p-5 glass-dark border-t border-gray-800 z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Batch Total</span>
            <span className="text-xl font-bold text-white">${batch.totalAmount.toLocaleString()}.00</span>
          </div>
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-gray-700 flex items-center justify-center text-xs text-white">JD</div>
            <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-gray-600 flex items-center justify-center text-xs text-white">MK</div>
            <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-gray-500 flex items-center justify-center text-xs text-white">+2</div>
          </div>
        </div>
        <Button className="w-full py-4 text-lg">
          <span>Process {batch.invoiceCount} Invoices</span>
          <span className="material-icons text-sm">arrow_forward</span>
        </Button>
      </div>
    </div>
  );
};
