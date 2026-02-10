export interface Invoice {
  id: string;
  vendorName: string;
  vendorLogo: string;
  invoiceNumber: string;
  amount: number;
  status: 'Auto-filled' | 'Ready for Review' | 'Missing Data' | 'Review Needed' | 'Processing' | 'Error';
  time: string;
  date: string;
  glCode?: string;
  confidence?: number;
}

export interface Batch {
  id: string;
  batchNumber: string;
  vendor: string;
  timeAgo: string;
  status: 'Processing' | 'Completed' | 'Error';
  progress?: number;
  invoiceCount: number;
  totalAmount: number;
  users?: string[];
}

export interface AppSettings {
  extractionConfidence: number;
  stampSize: 'Small' | 'Medium' | 'Large';
  adaptiveStampPlacement: boolean;
  autoNaming: boolean;
}
