import { motion } from 'motion/react';
import { 
  Plus, 
  ChevronRight, 
  Flag, 
  Download, 
  ExternalLink,
  Sparkles,
  Clock,
  User as UserIcon,
  Calendar
} from 'lucide-react';

export default function PatientRecord() {
  const timelineEvents = [
    {
      id: 1,
      title: 'Brain SPECT Analysis - Hypoperfusion, Left Temporal',
      date: '12.04.2024',
      color: 'bg-purple-400',
      type: 'analysis'
    },
    {
      id: 2,
      title: 'Consultation - Dr. Sarah Chen (Radiology)',
      date: '10.04.2024',
      color: 'bg-primary',
      type: 'consult'
    },
    {
      id: 3,
      title: 'Flagged Finding: Cortical Thinning Observed',
      date: '08.04.2024',
      color: 'bg-red-500',
      type: 'alert',
      highlight: true
    },
    {
      id: 4,
      title: 'Clinical note added by Dr. Mitchell Hayes',
      date: '05.04.2024',
      color: 'bg-outline-variant',
      type: 'note'
    }
  ];

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-[#0D0F12]">
      <div className="max-w-5xl mx-auto py-12 px-6 space-y-10">
        {/* TOP HERO CARD */}
        <section className="bg-surface h-32 rounded-sm p-6 flex items-center justify-between border-l-4 border-primary shadow-xl">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-surface-high border border-outline-variant/20 flex items-center justify-center text-primary font-bold text-2xl font-display">
              MT
            </div>
            <div className="space-y-1.5">
              <h1 className="text-3xl font-semibold font-display leading-none text-on-surface">Marcus Thorne</h1>
              <div className="flex items-center gap-4 text-sm text-on-surface-variant/70 font-label">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> DOB: 12.04.1950 (74y)</span>
                <span className="w-1 h-1 bg-outline-variant/40 rounded-full" />
                <span>Male</span>
                <span className="w-1 h-1 bg-outline-variant/40 rounded-full" />
                <span className="text-primary/80 font-mono">MRN-00829-X</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right space-y-1 hidden md:block">
              <div className="flex items-center justify-end gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">STABLE</span>
                <span className="text-xs text-on-surface-variant">Primary: Dr. Mitchell Hayes</span>
              </div>
              <p className="text-[10px] font-label text-outline-variant uppercase tracking-wider">Last Scan: 11.04.2024</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-primary text-background px-4 py-2 text-xs font-bold rounded-sm flex items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all">
                <Plus className="w-4 h-4" />
                New Scan
              </button>
              <button className="bg-surface-high text-on-surface px-4 py-2 text-xs font-bold rounded-sm hover:bg-surface-highest transition-colors border border-outline-variant/20">
                Export
              </button>
              <button className="bg-red-500/10 text-red-500 border border-red-500/30 px-3 py-2 text-xs font-bold rounded-sm hover:bg-red-500/20 transition-colors">
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* TABS ROW */}
        <nav className="flex gap-8 border-b border-outline-variant/10">
          {['Overview', 'Scan History', 'Clinical Notes', 'Lab Results'].map((tab, i) => (
            <button 
              key={tab}
              className={`pb-3 text-sm font-semibold transition-all relative ${
                i === 0 ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab}
              {i === 0 && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
            </button>
          ))}
        </nav>

        {/* CONTENT AREA: OVERVIEW (Timeline) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section className="space-y-6">
              <h2 className="text-xs font-label uppercase tracking-[0.2em] text-outline-variant">Clinical Timeline</h2>
              <div className="relative space-y-8 pl-8 before:content-[''] before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-outline-variant/30">
                {timelineEvents.map((event) => (
                  <div key={event.id} className="relative">
                    <div className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full ${event.color} ring-4 ring-[#0D0F12]`} />
                    <div className={`flex justify-between items-start bg-surface-low p-4 rounded-sm hover:bg-surface-high transition-colors group ${
                      event.highlight ? 'border-l-2 border-red-500/40' : ''
                    }`}>
                      <div className="space-y-1.5">
                        <h3 className={`text-sm font-semibold ${event.highlight ? 'text-red-400' : 'text-on-surface'}`}>
                          {event.title}
                        </h3>
                        <button className="text-[11px] font-bold text-primary flex items-center gap-1 hover:underline">
                          VIEW DETAILS <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs font-label text-outline-variant">{event.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SCAN HISTORY SECTION */}
            <section className="space-y-6 pt-4">
              <div className="flex justify-between items-end">
                <h2 className="text-xs font-label uppercase tracking-[0.2em] text-outline-variant">Recent Imaging History</h2>
                <button className="text-xs font-semibold text-primary hover:underline transition-all">View full archive</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ScanCard 
                  title="Axial Perfusion" 
                  date="12.04.2024" 
                  findings={2} 
                  confidence={94} 
                  seed="brain1" 
                />
                <ScanCard 
                  title="Sagittal Cross" 
                  date="28.02.2024" 
                  findings={1} 
                  confidence={88} 
                  seed="brain2" 
                />
                <ScanCard 
                  title="Baseline Survey" 
                  date="15.01.2024" 
                  findings={0} 
                  confidence={91} 
                  seed="brain3" 
                />
              </div>
            </section>
          </div>

          {/* SIDEBAR INSIGHTS */}
          <div className="space-y-6">
            <section className="bg-surface-high/40 rounded-sm border-l-4 border-secondary p-6 space-y-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-secondary" />
                <h3 className="font-display font-semibold text-secondary">AI Diagnostic Insight</h3>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Analysis of the current scan suggests a <span className="text-primary font-semibold">12% decrease</span> in regional cerebral blood flow compared to baseline scan (15.01.2024). This pattern remains consistent with early-stage neurodegenerative markers. Continuous monitoring of cortical volume is recommended for the next clinical cycle.
              </p>
              <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/10">
                <div className="text-[10px] font-label text-outline-variant uppercase tracking-wider">
                  ENGINE: GEMMA-SPECT-V4
                </div>
                <div className="text-[10px] font-label text-outline-variant uppercase tracking-wider">
                  TIMESTAMP: 2024-04-12T14:22:01Z
                </div>
              </div>
            </section>

            <section className="bg-surface-low p-6 rounded-sm border border-outline-variant/10 space-y-4">
              <h3 className="text-xs font-label uppercase tracking-widest text-outline-variant">Patient Vitals</h3>
              <div className="grid grid-cols-2 gap-4">
                <VitalItem label="Heart Rate" value="72" unit="bpm" />
                <VitalItem label="BP" value="128/84" unit="mmHg" />
                <VitalItem label="Weight" value="184" unit="lbs" />
                <VitalItem label="BMI" value="24.2" unit="" />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 bg-primary w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-background">
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
}

function ScanCard({ title, date, findings, confidence, seed }: any) {
  return (
    <div className="bg-[#050709] rounded-sm overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all group">
      <div className="aspect-square bg-surface-high relative overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${seed}/400/400`} 
          alt={title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity grayscale contrast-125"
          referrerPolicy="no-referrer"
          style={{ filter: 'hue-rotate(200deg) saturate(150%)' }}
        />
        <div className="absolute top-2 left-2">
          <span className="bg-surface/80 backdrop-blur px-1.5 py-0.5 rounded-sm text-[9px] font-label text-primary uppercase tracking-wider">SPECT</span>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded-sm text-[9px] font-label font-bold">
            {confidence}% AI CONFIDENCE
          </span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-label text-outline-variant">{date}</p>
            <p className="text-sm font-semibold text-on-surface">{title}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-label text-outline-variant uppercase">Findings</p>
            <p className="text-sm font-label text-primary font-bold">{findings.toString().padStart(2, '0')}</p>
          </div>
        </div>
        <button className="w-full bg-surface-high py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-surface-highest transition-colors border border-outline-variant/20 text-on-surface">
          Open in Viewer
        </button>
      </div>
    </div>
  );
}

function VitalItem({ label, value, unit }: any) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-label text-outline-variant uppercase">{label}</p>
      <p className="text-sm font-bold text-on-surface">
        {value} <span className="text-[10px] font-normal text-outline-variant">{unit}</span>
      </p>
    </div>
  );
}
