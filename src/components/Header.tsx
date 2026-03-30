import { Page } from '../types';
import { Bell, Settings as SettingsIcon, Search, User } from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItems: { id: Page; label: string }[] = [
    { id: 'dashboard', label: 'Analysis' },
    { id: 'patient', label: 'Archive' },
    { id: 'export', label: 'Analytics' },
    { id: 'settings', label: 'Resources' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 bg-[#14181F] h-14 border-b border-outline/15">
      <div className="flex items-center gap-8">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('dashboard')}
        >
          <span className="text-xl font-bold text-[#e2e2e6] tracking-tight font-display">MedGemma</span>
          <span className="bg-secondary-container/20 text-secondary px-1.5 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-sm border border-secondary/20">AI</span>
        </div>
        
        <div className="relative w-80 hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant w-4 h-4" />
          <input 
            className="w-full bg-surface-low border-none focus:ring-1 focus:ring-primary/40 rounded-sm py-1.5 pl-10 pr-4 text-sm font-label text-on-surface-variant placeholder:text-outline-variant transition-all"
            placeholder="Search 82,000 patients..."
            type="text"
          />
        </div>
      </div>

      <nav className="flex items-center gap-6 h-full">
        <div className="flex items-center gap-4 h-full border-r border-outline-variant/20 pr-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`h-full px-3 flex items-center font-display text-sm font-medium tracking-tight transition-all relative ${
                currentPage === item.id 
                  ? 'text-primary' 
                  : 'text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-high/30'
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-1.5 rounded hover:bg-surface-high transition-colors">
            <Bell className="w-5 h-5 text-on-surface-variant" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#14181F]" />
          </button>
          
          <div 
            className="flex items-center gap-3 pl-2 group cursor-pointer"
            onClick={() => onNavigate('settings')}
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-on-surface leading-none">Dr. Sarah Chen</p>
              <p className="text-[10px] text-outline-variant leading-tight">Radiologist</p>
            </div>
            <div className="w-8 h-8 rounded-full border border-outline-variant/30 group-hover:border-primary/50 transition-all overflow-hidden bg-surface-high">
               <img 
                src="https://picsum.photos/seed/doctor/100/100" 
                alt="Dr. Sarah Chen"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
