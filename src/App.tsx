import { Routes, Route } from 'react-router-dom';
import { MobileContainer } from './components/layout/MobileContainer';
import { BottomNav } from './components/layout/BottomNav';
import { Dashboard } from './pages/Dashboard';
import { BatchOverview } from './pages/BatchOverview';
import { InvoiceDetail } from './pages/InvoiceDetail';
import { Settings } from './pages/Settings';

// Placeholders for other pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex-1 flex items-center justify-center">
    <h2 className="text-xl font-bold text-slate-500">{title}</h2>
  </div>
);

function App() {
  return (
    <MobileContainer>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/batches" element={<BatchOverview />} />
        <Route path="/batches/:id" element={<BatchOverview />} />
        <Route path="/invoices/:id" element={<InvoiceDetail />} />
        <Route path="/reports" element={<Placeholder title="Reports" />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav />
    </MobileContainer>
  );
}

export default App;
