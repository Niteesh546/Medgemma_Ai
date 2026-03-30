import { useState } from 'react';
import Dashboard from './components/Dashboard';
import PatientRecord from './components/PatientRecord';
import ReportExport from './components/ReportExport';
import Settings from './components/Settings';
import Header from './components/Header';

export type Page = 'dashboard' | 'patient' | 'export' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'patient':
        return <PatientRecord />;
      case 'export':
        return <ReportExport />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#E8EDF5] font-sans selection:bg-[#4A90D9]/30">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pt-14 h-[calc(100vh)] overflow-hidden">
        {renderPage()}
      </main>
    </div>
  );
}
