import React, { useState } from 'react';
import type { ReactNode } from 'react';
import type { Invoice, Batch, AppSettings } from '../types';
import { AppContext } from './AppContext';

const initialBatches: Batch[] = [
  { id: '1', batchNumber: '3024', vendor: 'TechCorp', timeAgo: '2 mins ago', status: 'Processing', progress: 83, invoiceCount: 12, totalAmount: 12500, users: ['JD', 'MK'] },
  { id: '2', batchNumber: '3023', vendor: 'OfficeSupply Co', timeAgo: '2 hrs ago', status: 'Completed', invoiceCount: 5, totalAmount: 8400 },
  { id: '3', batchNumber: '3022', vendor: 'Unknown', timeAgo: 'Yesterday', status: 'Error', invoiceCount: 1, totalAmount: 0 },
  { id: '4', batchNumber: '2023-10-24', vendor: 'Various', timeAgo: 'Oct 24', status: 'Completed', invoiceCount: 21, totalAmount: 24842, users: ['JD', 'MK'] },
];

const initialInvoices: Invoice[] = [
  { id: 'inv1', vendorName: 'Amazon Web Services', vendorLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIJDAkNIvtRxFRyHMAX_A6uw8cw7jsu_E76XhxiFa8YZacIpyaXCEJJ4SlOTly8o_GxaitFTBNSUPnsiySpymhOJiwakruyyuiPBeKOXregy4vPOkDG9J0To4F_2gWacoHctnSODgz8maiDL7Ceq9tDF6t90VBlurJh8sDs1zujW3Rtv0u0wMki2BQeLLoWJy1J_66XEiHb3JZHzdfuKiCEztl7Ez0Ult7kSOMaMSDoPW2Ql2TLU1THMd4hWCJyVJXiXhgPyzWz3oV', invoiceNumber: 'INV-2023-001', amount: 1240.50, status: 'Auto-filled', time: '10:42 AM', date: '2023-10-24', confidence: 98, glCode: '6002 - Software Subs...' },
  { id: 'inv2', vendorName: 'WeWork Inc.', vendorLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNbHyBV9L8B6HQwhmpaztPRZEgZ35ALx7vjgmFB7vrXJkfPuhcC0vzHsohr7K6fx_BwMps_NbXkRMDnDAWXhz9imB-roNqEHXWnOuIuPPEpkuIlh5nO1zK04YElbA4gMw8q21qOL_NAyczYlIc5JOfDIaeLmwd4zirI5TWikEP1zgT2VkpEGkBcwFJ5FinHiAO1trPC3osXShMGOMBG_duQ4_wqO9GaRwAP8wCGEOJjy7jIJ8zUFniCWbmViMgA134mUlTiGFTjG_Y', invoiceNumber: 'WW-8821-NY', amount: 4500.00, status: 'Ready for Review', time: '10:38 AM', date: '2023-10-24' },
  { id: 'inv3', vendorName: 'Unknown Vendor', vendorLogo: '', invoiceNumber: 'scan_2023_10_24.pdf', amount: 0, status: 'Missing Data', time: '09:15 AM', date: '2023-10-24' },
  { id: 'inv4', vendorName: 'Slack Technologies', vendorLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGEzB-jM0jC3dVkDSAv5YB79CMcmx14gQLezvZeRDsg79wWJbBeL3vYONf-R3wngrKYA6d4aNJBtEh4SI3a0z1Cqa3U7xDZ5TsNRfBYnAO2lTp2pTLo7vzHePOTSyzPtp7PckDi7uwtjcRTlgAivWtb_0-mLktW1hBMBsMfgp4SR0tsF9jhoIDKwbAtvZAY7cM41cJb__muSq_nfiOazGyYarDvVNZGuv7YyvfGy02pKGjkq9eZRFSCWt_Vjk86z0PGuRsQPsk0jzn', invoiceNumber: 'INV-SL-992', amount: 12.00, status: 'Auto-filled', time: 'Yesterday', date: '2023-10-23' },
  { id: 'inv5', vendorName: 'DigitalOcean', vendorLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFSXIYf2bMdbKAeBsLWyMT0hF6OfN8KuyTRs7HS8ZIbDPcVrC87EoDQ1-3syzzB0t6aF4VD_SyDCmPZTAOfdubwZk9bEembu-KPGTc-LrT3wlJ2PsYpqSmrJo3qcyy_YPtm2PO5DxjUMMhVL7bV5mUbpn7-c347jKpAh6mZgHohPXt97pZCrSxiofi4Alcnom8Az9j9yR7u2Z52RaOs5COjHUVoyyEGYwiFGEo297K9ruugCd5MlLubem4aH_96qgZfBNfpVC4A3mu', invoiceNumber: 'DO-INV-8821', amount: 45.99, status: 'Auto-filled', time: 'Yesterday', date: '2023-10-23' },
  { id: 'inv6', vendorName: 'Uber Trip', vendorLogo: '', invoiceNumber: 'Date Mismatch', amount: 0, status: 'Review Needed', time: 'Yesterday', date: '2023-10-23' },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [batches] = useState<Batch[]>(initialBatches);
  const [invoices] = useState<Invoice[]>(initialInvoices);
  const [settings, setSettings] = useState<AppSettings>({
    extractionConfidence: 85,
    stampSize: 'Medium',
    adaptiveStampPlacement: true,
    autoNaming: true,
  });

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const getInvoicesByBatch = () => {
    // For mock, return all invoices
    return invoices;
  };

  return (
    <AppContext.Provider value={{ batches, invoices, settings, updateSettings, getInvoicesByBatch }}>
      {children}
    </AppContext.Provider>
  );
};
