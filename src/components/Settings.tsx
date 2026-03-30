import { motion } from 'motion/react';
import { 
  Bell, 
  User, 
  Brain, 
  Monitor, 
  Shield, 
  Search, 
  RefreshCw,
  ChevronUp,
  ChevronsUpDown,
  Moon,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [confidence, setConfidence] = useState(78);
  const [theme, setTheme] = useState('dark');
  const [selectedModel, setSelectedModel] = useState('MedGemma Pro 2.1 Latest');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  const models = [
    'MedGemma Pro 2.1 Latest',
    'MedGemma Pro 2.0 Stable',
    'MedGemma Lite 1.5',
    'Experimental Neuro v3.0-beta'
  ];

  return (
    <div className="flex h-full overflow-hidden">
      {/* SideNavBar */}
      <aside className="w-52 bg-[#0c0e11] border-r border-outline/15 flex flex-col py-8 z-40">
        <div className="px-6 mb-10">
          <h1 className="text-lg font-bold text-primary tracking-tight">MedGemma</h1>
          <p className="text-[10px] font-label uppercase tracking-[0.2em] text-outline-variant mt-1">System Configuration</p>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-1">
            <NavItem icon={<User className="w-4 h-4" />} label="Profile" />
            <NavItem icon={<Bell className="w-4 h-4" />} label="Notifications" active />
            <NavItem icon={<Brain className="w-4 h-4" />} label="AI Preferences" />
            <NavItem icon={<Monitor className="w-4 h-4" />} label="Display" />
            <NavItem icon={<Shield className="w-4 h-4" />} label="Security" />
          </ul>
        </nav>

        <div className="px-4 mt-auto">
          <div className="p-3 rounded-xl bg-surface-low flex items-center gap-3 border border-outline-variant/10">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-high">
              <img 
                src="https://picsum.photos/seed/doctor2/100/100" 
                alt="Dr. Aris Thorne" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-bold text-on-surface truncate">Dr. Aris Thorne</p>
              <p className="text-[9px] text-outline-variant font-label uppercase">Lead Radiologist</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 bg-background overflow-y-auto custom-scrollbar">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md flex justify-between items-center w-full px-10 py-6">
          <h1 className="font-display text-3xl font-light tracking-tight text-primary">Settings</h1>
          <div className="flex items-center gap-6">
            <Search className="w-5 h-5 text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
            <div className="relative">
              <Bell className="w-5 h-5 text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full" />
            </div>
            <button className="bg-primary text-background px-5 py-2 rounded-full font-label text-[10px] uppercase tracking-widest font-bold hover:scale-95 transition-all shadow-lg shadow-primary/20">
              Sync Device
            </button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-10 py-8 space-y-12 pb-24">
          {/* Section 1: Notifications */}
          <section className="space-y-8">
            <div>
              <h2 className="font-display text-3xl font-semibold text-on-surface tracking-tight">Notifications</h2>
              <p className="text-on-surface-variant text-sm mt-1">Manage clinical alerts and system update preferences.</p>
            </div>
            
            <div className="bg-surface-low rounded-2xl overflow-hidden border border-outline-variant/10">
              <SettingRow label="New Scan Alerts" active />
              <SettingRow label="Critical Findings" active />
              <SettingRow label="Report Completions" active />
              <SettingRow label="Team Mentions" disabled />
              <SettingRow label="Weekly Summary Email" disabled last />
            </div>
          </section>

          {/* Section 2: AI Preferences */}
          <section>
            <div className="bg-surface-container rounded-2xl p-8 border border-outline-variant/10 relative overflow-hidden group shadow-xl">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/10 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Brain className="text-secondary w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-on-surface">AI Preferences</h2>
                    <p className="text-on-surface-variant text-[10px] font-label uppercase tracking-widest">MedGemma Cognitive Engine v2.1</p>
                  </div>
                </div>
                <ChevronUp className="text-outline-variant cursor-pointer" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-label uppercase tracking-widest text-outline-variant">Confidence Threshold</label>
                    <span className="font-label text-primary text-xl font-bold">{confidence}%</span>
                  </div>
                  <div className="relative h-1.5 w-full bg-surface-highest rounded-full">
                    <div 
                      className="absolute left-0 top-0 h-full bg-primary rounded-full" 
                      style={{ width: `${confidence}%` }} 
                    />
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={confidence}
                      onChange={(e) => setConfidence(parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-primary border-4 border-background rounded-full shadow-xl pointer-events-none"
                      style={{ left: `calc(${confidence}% - 10px)` }}
                    />
                  </div>
                  <p className="text-[10px] text-outline-variant leading-relaxed italic">
                    Minimum certainty level required for AI to suggest a diagnostic annotation.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto-display Annotations</span>
                    <Toggle active />
                  </div>
                  <div className="space-y-3 relative">
                    <label className="text-xs font-label uppercase tracking-widest text-outline-variant">Model Version</label>
                    <div 
                      onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                      className="bg-surface-low border border-outline-variant/30 rounded-full px-5 py-2.5 flex items-center justify-between cursor-pointer hover:border-primary transition-colors group"
                    >
                      <span className="text-sm">{selectedModel}</span>
                      <ChevronsUpDown className="w-4 h-4 text-outline-variant group-hover:text-primary" />
                    </div>
                    
                    {isModelDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-surface-container border border-outline-variant/20 rounded-xl overflow-hidden z-50 shadow-2xl"
                      >
                        {models.map((model) => (
                          <div 
                            key={model}
                            onClick={() => {
                              setSelectedModel(model);
                              setIsModelDropdownOpen(false);
                            }}
                            className={`px-5 py-3 text-sm cursor-pointer hover:bg-primary/10 transition-colors ${
                              selectedModel === model ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant'
                            }`}
                          >
                            {model}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Display */}
          <section className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-semibold text-on-surface tracking-tight">Display</h2>
              <p className="text-on-surface-variant text-sm mt-1">Interface aesthetics and workspace layout.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-surface-low rounded-2xl p-6 flex items-center justify-between border border-outline-variant/10 shadow-lg">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-surface-highest flex items-center justify-center">
                    <Moon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Interface Theme</p>
                    <p className="text-xs text-outline-variant">Dark mode is optimized for radiology labs.</p>
                  </div>
                </div>
                <div className="flex bg-surface-highest p-1.5 rounded-full border border-outline-variant/10">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`px-6 py-2 rounded-full text-xs font-label uppercase tracking-widest transition-all ${
                      theme === 'light' ? 'bg-white text-black font-bold shadow-sm' : 'text-outline-variant'
                    }`}
                  >
                    Light
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`px-6 py-2 rounded-full text-xs font-label uppercase tracking-widest transition-all ${
                      theme === 'dark' ? 'bg-primary text-background font-bold shadow-sm' : 'text-outline-variant'
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-low rounded-2xl p-8 border border-outline-variant/10 shadow-lg">
                  <p className="text-xs font-label uppercase tracking-widest text-outline-variant mb-6">Default Scan View</p>
                  <div className="flex gap-3">
                    {['Axial', 'Coronal', 'Sagittal'].map((view, i) => (
                      <button 
                        key={view}
                        className={`flex-1 py-3 rounded-full border text-xs font-label uppercase font-bold transition-all ${
                          i === 0 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-outline-variant/30 text-outline-variant hover:border-outline-variant'
                        }`}
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-surface-low rounded-2xl p-8 border border-outline-variant/10 shadow-lg">
                  <p className="text-xs font-label uppercase tracking-widest text-outline-variant mb-6">Typography Scale</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-outline-variant font-label">SMALL</span>
                    <span className="text-xs font-label text-primary font-bold">MEDIUM</span>
                    <span className="text-sm text-outline-variant font-label">LARGE</span>
                  </div>
                  <div className="relative h-1.5 w-full bg-surface-highest rounded-full">
                    <div className="absolute left-0 top-0 h-full w-1/2 bg-primary rounded-full" />
                    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-5 h-5 bg-primary border-4 border-background rounded-full shadow-xl cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Preview */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-[#0c0e11] rounded-2xl p-8 border border-outline-variant/10 relative overflow-hidden h-48 group shadow-2xl">
              <img 
                src="https://picsum.photos/seed/preview/800/400" 
                alt="Preview" 
                className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:opacity-20 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="bg-primary/10 text-primary text-[10px] font-label px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">Interface Preview</span>
                  <h3 className="font-display text-2xl mt-3 font-light tracking-tight">Surgical Minimalist Engine</h3>
                </div>
                <p className="text-outline-variant text-xs max-w-sm leading-relaxed">
                  Optimized for high-contrast diagnostic environments with IBM Plex Sans for maximum legibility.
                </p>
              </div>
            </div>
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 flex flex-col justify-center items-center text-center shadow-xl">
              <Sparkles className="text-primary w-10 h-10 mb-4" />
              <p className="font-label text-[10px] uppercase tracking-tighter text-primary font-bold leading-tight">
                AI Diagnostic Assist Active
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active }: any) {
  return (
    <li>
      <a 
        href="#" 
        className={`px-6 py-4 flex items-center gap-4 transition-all duration-200 border-l-4 ${
          active 
            ? 'text-primary bg-surface-low border-primary' 
            : 'text-outline-variant border-transparent hover:bg-surface-low/50 hover:text-on-surface'
        }`}
      >
        <span className={active ? 'text-primary' : 'text-outline-variant'}>{icon}</span>
        <span className="font-label text-[10px] uppercase tracking-[0.2em] font-bold">{label}</span>
      </a>
    </li>
  );
}

function SettingRow({ label, active, disabled, last }: any) {
  return (
    <div className={`flex items-center justify-between h-16 px-8 ${!last ? 'border-b border-outline-variant/10' : ''}`}>
      <span className={`text-sm font-medium ${disabled ? 'text-outline-variant' : 'text-on-surface'}`}>{label}</span>
      <Toggle active={active} disabled={disabled} />
    </div>
  );
}

function Toggle({ active, disabled }: any) {
  return (
    <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
      active ? 'bg-primary' : 'bg-surface-highest'
    } ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}>
      <motion.div 
        animate={{ x: active ? 20 : 0 }}
        className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" 
      />
    </div>
  );
}
