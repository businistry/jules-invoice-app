import { createContext } from 'react';
import type { Invoice, Batch, AppSettings } from '../types';

interface AppContextType {
  batches: Batch[];
  invoices: Invoice[];
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  getInvoicesByBatch: (batchId?: string) => Invoice[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
