import React from 'react';
import { useAppContext } from '../context/useAppContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { batches } = useAppContext();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between z-10 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Welcome back, Alex</p>
        </div>
        <button className="relative group">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-surface-highlight relative z-10 shadow-sm"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLEJyRODkw8JG7NL95ahkEQv0Rz-FPLa5C16PoUw74Fgbe6ZWxe1QF4hUnQz5mFCD8mPrPQfSsU2t8h6RODDoVmu737mO8Tn0C10RJ3JTLTuyYX_p_fL_pwqpRL1lS4rlQ8k-beciG0zxsw_yZY8KntXCaL7sKl2BgzdqeU0x8nWmG582UXfJY5So2KDDTcD4WqIqjMPC_BweqeyTLAqKC46M3r08vRoKmW42vrNcwtyUKWFFLrxYXuyuueiYDiYIAUdlihUDZbLE2"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background-dark rounded-full z-20"></span>
        </button>
      </header>

      {/* Main Content Scroll Area */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar">
        {/* Upload Zone */}
        <section className="mt-4 mb-8">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-400 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
            <div className="relative w-full h-64 bg-white dark:bg-surface-dark border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary dark:hover:border-primary rounded-2xl flex flex-col items-center justify-center text-center p-6 transition-colors duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <span className="material-icons-round text-3xl">cloud_upload</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Upload Invoices</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 px-4">Tap to browse or drag PDF files here directly from your files.</p>
              <span className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-700/50 rounded-full text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600">Supports PDF, PNG, JPG</span>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Pending Approval</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">12</div>
            <div className="text-xs text-orange-400 mt-1 flex items-center">
              <span className="material-icons-round text-xs mr-1">warning</span> Action needed
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Processed Today</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">48</div>
            <div className="text-xs text-green-400 mt-1 flex items-center">
              <span className="material-icons-round text-xs mr-1">trending_up</span> +15% vs yest.
            </div>
          </div>
        </section>

        {/* Recent Batches */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Batches</h2>
          <button className="text-primary text-sm font-semibold hover:text-blue-400">View All</button>
        </div>

        <div className="space-y-4">
          {batches.map((batch) => (
            <Link key={batch.id} to={`/batches/${batch.id}`} className="block group">
              <div className="bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50 relative overflow-hidden transition-all group-active:scale-[0.98]">
                {batch.status === 'Processing' && <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">Batch #{batch.batchNumber}</h3>
                      <Badge variant={batch.status === 'Processing' ? 'info' : batch.status === 'Completed' ? 'success' : 'error'}>
                        {batch.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Vendor: {batch.vendor} • {batch.timeAgo}</p>
                  </div>
                  <button className="text-slate-400 hover:text-white">
                    <span className="material-icons-round">{batch.status === 'Error' ? 'refresh' : 'more_vert'}</span>
                  </button>
                </div>

                {batch.status === 'Processing' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">AI Extracting...</span>
                      <span className="font-medium text-primary">10/{batch.invoiceCount}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${batch.progress}%` }}></div>
                    </div>
                  </div>
                ) : batch.status === 'Completed' ? (
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                    <div className="flex -space-x-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-600 border-2 border-white dark:border-surface-dark flex items-center justify-center text-[10px] overflow-hidden">
                          <img alt="doc" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCyOhTJKgwhucHzFsd9sBJMn6TmUWXLmjnNihGaZnzfXJTn8xQea9hCR5CFlRZ-vpzh2QKnCuyfhFVXVcjrFVVoRlhn_i6_6wpEv0fsb3v9gUIYvFn1mz1idIXUTz2EyMTYupgEfJwr8Vd5_hStXtjk0jOKjpU6AFXdPyQqoZhd5xO6s6t6xYpDAiBCX_4zL7-SrLmyrXNOtTCCDrRZcwHfQr_CSu0WOQzSyvSGuMjJnyYOH_tVn7TKVsOlrsOKhr157KvcZPVi_vp" />
                        </div>
                      ))}
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-white dark:border-surface-dark flex items-center justify-center text-[10px] text-slate-500 font-bold">
                        +{batch.invoiceCount - 2}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-300 group-hover:text-primary flex items-center transition-colors">
                      Review Details <span className="material-icons-round text-sm ml-1">arrow_forward</span>
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-red-400 mt-2 flex items-center">
                    <span className="material-icons-round text-xs mr-1">error_outline</span>
                    File corrupted or format not supported.
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="h-12"></div>
      </main>

      {/* FAB */}
      <div className="absolute bottom-24 right-6 z-20">
        <Button className="rounded-2xl p-4 shadow-primary/40 group">
          <span className="material-icons-round text-2xl group-hover:rotate-90 transition-transform duration-300">add</span>
          <span className="font-semibold pr-1">New Batch</span>
        </Button>
      </div>
    </div>
  );
};
