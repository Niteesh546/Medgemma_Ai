import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Hand, 
  ZoomIn, 
  Ruler, 
  Edit2, 
  Sparkles, 
  ChevronDown, 
  Maximize2,
  AlertTriangle,
  Info,
  FileText
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar: Patient List */}
      <aside className="w-72 bg-surface flex flex-col border-r border-outline/15 z-40">
        <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest font-bold text-outline-variant">Patient Registry</span>
          <span className="font-label text-xs text-primary/80">82,000 total</span>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <PatientItem 
            id="PAT-00042817" 
            name="Marcus Thorne" 
            time="24m ago" 
            type="Brain SPECT" 
            date="12.04.2024" 
            active 
            severity="severe"
          />
          <PatientItem 
            id="PAT-00042818" 
            name="Elena Rodriguez" 
            time="1h ago" 
            type="Cardio SPECT" 
            date="12.04.2024" 
          />
          <PatientItem 
            id="PAT-00042819" 
            name="Arthur Penhaligon" 
            time="3h ago" 
            type="Renal Scan" 
            date="11.04.2024" 
            severity="warning"
          />
          <PatientItem 
            id="PAT-00042820" 
            name="Sarah Jenkins" 
            time="5h ago" 
            type="Bone Density" 
            date="11.04.2024" 
            severity="stable"
          />
          
          {/* Skeleton placeholders */}
          <div className="p-4 flex flex-col gap-4 opacity-20">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 bg-surface-low rounded animate-pulse" />
            ))}
          </div>
        </div>

        <div className="p-4 bg-surface-low/30">
          <button className="w-full bg-[#1a1c1f] text-primary border border-primary/20 hover:bg-primary/10 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-all rounded-sm">
            <Plus className="w-4 h-4" />
            Initialize New Scan
          </button>
        </div>
      </aside>

      {/* Central Scan Viewport */}
      <main className="flex-1 bg-[#050709] relative flex flex-col overflow-hidden">
        {/* Crosshair Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-10">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-primary" />
        </div>

        {/* Main Scan Display */}
        <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
          <div className="relative max-w-2xl w-full group">
            {/* AI Annotation Overlay */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-1/4 left-1/4 z-20 pointer-events-none"
            >
              <div className="relative">
                <div className="w-32 h-32 border-2 border-dashed border-secondary rounded-full bg-secondary/5 backdrop-blur-[2px]" />
                <div className="absolute -top-12 -left-4 whitespace-nowrap">
                  <div className="bg-surface-highest/90 backdrop-blur-md border-l-2 border-secondary px-3 py-2 rounded-r-sm shadow-2xl">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono text-secondary">94.2% CONFIDENCE</span>
                    </div>
                    <p className="text-xs font-bold text-on-surface tracking-tight">Hypoperfusion, Left Temporal</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SPECT IMAGE */}
            <div className="absolute inset-0 bg-secondary/10 blur-3xl opacity-20 rounded-full" />
            <img 
              src="https://picsum.photos/seed/brain-scan/800/800" 
              alt="SPECT Scan"
              className="w-full h-auto mix-blend-screen opacity-90 rounded-lg shadow-2xl grayscale contrast-125 brightness-110"
              referrerPolicy="no-referrer"
              style={{ filter: 'hue-rotate(220deg) saturate(200%)' }}
            />

            {/* Secondary Annotation */}
            <div className="absolute bottom-1/3 right-1/4 z-20 pointer-events-none">
              <div className="w-16 h-16 border-2 border-dotted border-primary/40 rounded-full bg-primary/5" />
              <div className="absolute -bottom-10 left-8 bg-surface-highest/80 backdrop-blur-md border border-outline-variant/20 px-2.5 py-1 rounded-sm">
                <span className="text-[10px] font-mono text-primary">14.5 keV Peak</span>
              </div>
            </div>
          </div>

          {/* Telemetry HUD */}
          <div className="absolute top-6 left-6 flex flex-col gap-4 font-mono text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em]">
            <div>
              <p>Scan_ID: <span className="text-on-surface">BT-8829-X</span></p>
              <p>Slice: <span className="text-on-surface">42/128</span></p>
            </div>
            <div>
              <p>Dose: <span className="text-on-surface">550 MBq</span></p>
              <p>Isotope: <span className="text-on-surface">TC-99M</span></p>
            </div>
          </div>

          <div className="absolute top-6 right-6 text-right">
            <div className="bg-surface-container/60 backdrop-blur-sm p-4 border border-outline-variant/10 rounded-sm">
              <p className="text-[10px] text-outline-variant font-label mb-2 uppercase tracking-widest">Global Activity</p>
              <div className="h-1.5 w-40 bg-surface-highest overflow-hidden rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  className="h-full bg-primary" 
                />
              </div>
              <p className="text-[10px] font-mono mt-2 text-on-surface">0.84 SUV_avg</p>
            </div>
          </div>
        </div>

        {/* Bottom Scrubber Toolbar */}
        <div className="h-16 bg-surface border-t border-outline-variant/15 flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-1">
            <ToolbarButton icon={<Hand className="w-4 h-4" />} />
            <ToolbarButton icon={<ZoomIn className="w-4 h-4" />} />
            <ToolbarButton icon={<Ruler className="w-4 h-4" />} />
            <div className="w-[1px] h-6 bg-outline-variant/20 mx-2" />
            <ToolbarButton icon={<Edit2 className="w-4 h-4" />} />
            <ToolbarButton icon={<Sparkles className="w-4 h-4" />} active />
          </div>

          <div className="flex-1 max-w-md px-12">
            <div className="relative h-1 bg-surface-highest rounded-full cursor-pointer group">
              <div className="absolute left-0 top-0 h-full bg-primary w-[42%]" />
              <div className="absolute left-[42%] top-1/2 -translate-y-1/2 w-3 h-3 bg-on-surface rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-surface-low px-3 py-1.5 rounded-sm border border-outline-variant/10 cursor-pointer hover:bg-surface-high transition-colors">
              <span className="text-[10px] font-mono text-outline-variant">VIEW:</span>
              <span className="text-[10px] font-bold text-on-surface">AXIAL</span>
              <ChevronDown className="w-3 h-3 text-on-surface-variant" />
            </div>
            <ToolbarButton icon={<Maximize2 className="w-4 h-4" />} />
          </div>
        </div>
      </main>

      {/* Right AI Panel */}
      <aside className="w-80 bg-surface flex flex-col border-l border-outline/15 z-40">
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
          {/* Diagnostic Confidence */}
          <section>
            <header className="flex justify-between items-end mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-outline-variant">AI Intelligence</h3>
              <span className="text-[10px] font-mono text-secondary">MODEL v4.2.1</span>
            </header>
            
            <div className="bg-surface-low p-6 flex flex-col items-center justify-center border border-outline-variant/10 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 blur-2xl rounded-full" />
              <div className="relative mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle className="text-surface-highest" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="2" />
                  <motion.circle 
                    initial={{ strokeDashoffset: 364 }}
                    animate={{ strokeDashoffset: 40 }}
                    className="text-secondary" 
                    cx="64" 
                    cy="64" 
                    fill="transparent" 
                    r="58" 
                    stroke="currentColor" 
                    strokeDasharray="364" 
                    strokeWidth="4" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-display font-extrabold text-on-surface">94<span className="text-xl">%</span></span>
                  <span className="text-[10px] font-label text-secondary uppercase tracking-tighter">Confidence</span>
                </div>
              </div>
              <p className="text-xs text-center text-on-surface-variant font-medium">High clinical correlation with Alzheimer's pattern detection</p>
            </div>
          </section>

          {/* Ranked Findings */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-outline-variant mb-4">Core Findings</h3>
            <div className="space-y-3">
              <FindingItem 
                icon={<AlertTriangle className="w-4 h-4 text-red-400" />}
                title="Hypoperfusion"
                tag="SEVERE"
                tagColor="text-red-400 bg-red-400/10"
                description="Significant metabolic reduction in the posterior cingulate cortex."
              />
              <FindingItem 
                icon={<Info className="w-4 h-4 text-primary" />}
                title="Cortical Thinning"
                tag="OBSERVE"
                tagColor="text-primary bg-primary/10"
                description="Early signs of volume loss in bilateral parietal regions."
              />
            </div>
          </section>

          {/* Differential Diagnoses */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-outline-variant mb-4">Differential Analysis</h3>
            <div className="space-y-5">
              <DifferentialItem label="Alzheimer's Disease" value={0.88} color="bg-secondary" />
              <DifferentialItem label="Frontotemporal Dementia" value={0.12} color="bg-outline-variant" />
              <DifferentialItem label="Vascular Impairment" value={0.04} color="bg-outline-variant" />
            </div>
          </section>

          {/* Recommended Actions */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-outline-variant mb-3">Recommended Actions</h3>
            <div className="flex flex-wrap gap-2">
              {['Volumetric MRI', 'Amyloid-PET', 'Neuro-Psych Eval'].map(action => (
                <span key={action} className="px-2.5 py-1 bg-surface-high text-[10px] font-medium text-on-surface-variant border border-outline-variant/10 cursor-pointer hover:border-primary/40 transition-colors rounded-sm">
                  {action}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="p-6 bg-surface-low/50 border-t border-outline-variant/10 flex flex-col gap-3">
          <button className="w-full bg-primary text-background py-3 text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 rounded-sm">
            <FileText className="w-4 h-4" />
            Export Report
          </button>
          <button className="w-full border border-outline-variant/20 text-on-surface-variant py-2.5 text-xs font-medium hover:bg-surface-high transition-colors rounded-sm">
            Share Case with Neuro
          </button>
        </div>
      </aside>
    </div>
  );
}

function PatientItem({ id, name, time, type, date, active, severity }: any) {
  const severityColor = {
    severe: 'border-red-500',
    warning: 'border-orange-500',
    stable: 'border-emerald-500',
  }[severity as string] || 'border-transparent';

  return (
    <div className={`p-4 cursor-pointer border-l-4 transition-all border-b border-outline-variant/5 ${
      active ? 'bg-surface-low border-red-500' : `hover:bg-surface-low/50 ${severityColor}`
    }`}>
      <div className="flex justify-between items-start mb-1">
        <span className={`font-mono text-[11px] tracking-tighter ${active ? 'text-red-400' : 'text-on-surface-variant/60'}`}>{id}</span>
        <span className="text-[10px] text-outline-variant">{time}</span>
      </div>
      <h4 className={`text-sm font-semibold mb-2 ${active ? 'text-on-surface' : 'text-on-surface-variant'}`}>{name}</h4>
      <div className="flex items-center gap-2">
        <span className="px-1.5 py-0.5 bg-surface-high text-[10px] text-on-surface-variant rounded-sm border border-outline-variant/10">{type}</span>
        <span className="text-[10px] text-outline-variant font-label">{date}</span>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, active }: { icon: ReactNode; active?: boolean }) {
  return (
    <button className={`p-2 rounded transition-colors ${
      active ? 'bg-primary/10 text-primary' : 'hover:bg-surface-high text-on-surface-variant'
    }`}>
      {icon}
    </button>
  );
}

function FindingItem({ icon, title, tag, tagColor, description }: any) {
  return (
    <div className="flex items-start gap-3 p-3 bg-surface-low/50 hover:bg-surface-low transition-colors group cursor-default rounded-sm">
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs font-bold text-on-surface">{title}</p>
          <span className={`text-[9px] px-1.5 py-0.5 font-bold rounded-sm ${tagColor}`}>{tag}</span>
        </div>
        <p className="text-[11px] text-outline-variant leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function DifferentialItem({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-on-surface">{label}</span>
        <span className="font-mono text-xs text-on-surface">{value.toFixed(2)}</span>
      </div>
      <div className="h-1.5 bg-surface-highest rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          className={`h-full ${color}`} 
        />
      </div>
    </div>
  );
}
