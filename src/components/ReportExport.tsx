import { motion } from 'motion/react';
import { 
  FileText, 
  Settings as SettingsIcon, 
  User, 
  Layers, 
  Brain, 
  History, 
  HelpCircle, 
  Database,
  Download,
  Link as LinkIcon,
  Mail,
  Check,
  UploadCloud,
  Layout
} from 'lucide-react';
import { useState } from 'react';

export default function ReportExport() {
  const [reportType, setReportType] = useState('full');
  const [sections, setSections] = useState({
    images: true,
    findings: true,
    differential: true,
    recommendations: true,
    history: false,
    lab: false
  });

  return (
    <div className="flex h-full overflow-hidden">
      {/* LEFT CONFIG PANEL */}
      <aside className="w-[360px] bg-surface flex flex-col border-r border-outline/15 z-40">
        <div className="p-4 border-b border-outline-variant/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-sm overflow-hidden border border-outline-variant/20">
            <img 
              src="https://picsum.photos/seed/scan-thumb/100/100" 
              alt="Scan" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider font-display">Report Engine</h3>
            <p className="text-[10px] text-primary font-mono">ID: SPECT-9920</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          <h2 className="text-xl font-semibold font-display text-on-surface">Export Report</h2>

          {/* REPORT TYPE */}
          <section className="space-y-4">
            <label className="block text-[10px] font-bold text-outline-variant uppercase tracking-widest">Report Type</label>
            <div className="space-y-3">
              <ReportTypeCard 
                id="full"
                active={reportType === 'full'}
                onClick={() => setReportType('full')}
                icon={<FileText className="w-4 h-4" />}
                title="Full Diagnostic"
                description="Comprehensive data including raw scan matrices and AI metadata."
              />
              <ReportTypeCard 
                id="summary"
                active={reportType === 'summary'}
                onClick={() => setReportType('summary')}
                icon={<FileText className="w-4 h-4" />}
                title="Summary Only"
                description="High-level findings and final physician impression."
              />
              <ReportTypeCard 
                id="referring"
                active={reportType === 'referring'}
                onClick={() => setReportType('referring')}
                icon={<Mail className="w-4 h-4" />}
                title="Referring Physician Version"
                description="Tailored for external context with simplified annotations."
              />
            </div>
          </section>

          {/* INCLUDE SECTIONS */}
          <section className="space-y-4">
            <label className="block text-[10px] font-bold text-outline-variant uppercase tracking-widest">Include Sections</label>
            <div className="space-y-3">
              <ToggleRow label="Scan Images" active={sections.images} onToggle={() => setSections({...sections, images: !sections.images})} />
              <ToggleRow label="AI Findings" active={sections.findings} onToggle={() => setSections({...sections, findings: !sections.findings})} />
              <ToggleRow label="Differential Diagnoses" active={sections.differential} onToggle={() => setSections({...sections, differential: !sections.differential})} />
              <ToggleRow label="Recommendations" active={sections.recommendations} onToggle={() => setSections({...sections, recommendations: !sections.recommendations})} />
              <ToggleRow label="Patient History" active={sections.history} onToggle={() => setSections({...sections, history: !sections.history})} disabled />
              <ToggleRow label="Lab Context" active={sections.lab} onToggle={() => setSections({...sections, lab: !sections.lab})} disabled />
            </div>
          </section>

          {/* RECIPIENT */}
          <section className="space-y-4">
            <label className="block text-[10px] font-bold text-outline-variant uppercase tracking-widest">Recipient</label>
            <div className="space-y-3">
              <input 
                className="w-full bg-[#0D0F12] border border-outline-variant/30 rounded-sm px-3 py-2.5 text-xs text-on-surface placeholder-outline-variant/50 focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Physician Name"
                type="text"
              />
              <input 
                className="w-full bg-[#0D0F12] border border-outline-variant/30 rounded-sm px-3 py-2.5 text-xs text-on-surface placeholder-outline-variant/50 focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="doctor.email@medical-group.org"
                type="email"
              />
            </div>
          </section>

          {/* LETTERHEAD */}
          <section className="space-y-4">
            <label className="block text-[10px] font-bold text-outline-variant uppercase tracking-widest">Letterhead</label>
            <ToggleRow label="Include hospital logo" active={true} onToggle={() => {}} />
            <button className="w-full border border-dashed border-outline-variant/30 rounded-sm py-4 text-outline-variant hover:text-primary hover:border-primary transition-colors group flex flex-col items-center gap-1.5">
              <UploadCloud className="w-5 h-5" />
              <span className="text-[10px] font-medium">Upload Logo (PNG/SVG)</span>
            </button>
          </section>
        </div>

        <div className="p-6 bg-surface-low/50 border-t border-outline-variant/10">
          <button className="w-full bg-primary text-background py-3 rounded-sm font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all">
            Generate Report
          </button>
        </div>
      </aside>

      {/* RIGHT PREVIEW PANEL */}
      <main className="flex-1 flex flex-col items-center justify-start py-12 px-8 bg-[#0D0F12] overflow-y-auto custom-scrollbar">
        {/* Report Paper Container */}
        <div className="bg-[#FAFAFA] text-[#1A1C1F] w-full max-w-[800px] min-h-[1032px] p-12 mb-10 relative shadow-2xl rounded-sm">
          {/* Watermark Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden" style={{ backgroundImage: 'radial-gradient(#1A1C1F 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          
          {/* Header */}
          <div className="relative flex justify-between items-start border-b-2 border-[#1A1C1F] pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-[#1A1C1F] flex items-center justify-center rounded-sm">
                  <span className="text-[#FAFAFA] font-bold text-[10px]">MG</span>
                </div>
                <h1 className="text-lg font-bold font-display tracking-tight uppercase">MedGemma <span className="text-primary">AI</span></h1>
              </div>
              <p className="text-[11px] font-bold text-primary">CENTRAL IMAGING & DIAGNOSTICS</p>
              <p className="text-[10px] text-[#1A1C1F]/60">1200 Precision Way, Ste 400 | Clinical Dept.</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-[#F0F0F0] mb-2 ml-auto flex items-center justify-center border border-[#E0E0E0]">
                <Layout className="w-8 h-8 text-[#CCC]" />
              </div>
              <p className="text-[10px] font-bold">ST. JUDE RADIOLOGY</p>
            </div>
          </div>

          {/* Patient Info Block */}
          <div className="grid grid-cols-4 gap-6 mb-10 bg-[#F5F5F5] p-4 rounded-sm border border-[#E0E0E0]">
            <InfoField label="Patient Name" value="ELIAS VANCE" />
            <InfoField label="DOB / Age" value="12.04.1978 (45Y)" />
            <InfoField label="MRN / Accession" value="#MG-9920-X8" mono />
            <InfoField label="Ordering Physician" value="DR. SARAH CHEN" />
          </div>

          {/* Scan Thumbnail */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-widest">Diagnostic Viewport: Axial Scan</h3>
            </div>
            <div className="w-full h-64 bg-[#0D0F12] border border-[#1A1C1F] overflow-hidden rounded-sm relative">
              <img 
                src="https://picsum.photos/seed/report-scan/800/400" 
                alt="Scan" 
                className="w-full h-full object-cover opacity-90 grayscale contrast-125"
                referrerPolicy="no-referrer"
                style={{ filter: 'hue-rotate(220deg) saturate(200%)' }}
              />
              <div className="absolute top-4 left-4 font-mono text-[9px] text-primary bg-black/40 px-2 py-1">COORD: 45.9 / -12.4</div>
              <div className="absolute bottom-4 right-4 font-mono text-[9px] text-secondary bg-black/40 px-2 py-1">AI OVERLAY ACTIVE: 98.4%</div>
            </div>
          </div>

          {/* Findings Table */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-3.5 h-3.5 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-widest">AI Findings & Quantitative Analysis</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E0E0E0]">
                  <th className="py-2 text-[10px] font-bold text-[#888] uppercase">Observation</th>
                  <th className="py-2 text-[10px] font-bold text-[#888] uppercase">Metric (Z-Score)</th>
                  <th className="py-2 text-[10px] font-bold text-[#888] uppercase">Severity</th>
                  <th className="py-2 text-[10px] font-bold text-[#888] uppercase text-right">Confidence</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <TableRow obs="Frontal Lobe Perfusion" metric="-2.4 σ" severity="CRITICAL" sevColor="bg-red-100 text-red-700" conf="99.2%" />
                <TableRow obs="Hippocampal Symmetry" metric="+0.8 σ" severity="NORMAL" sevColor="bg-green-100 text-green-700" conf="87.5%" />
                <TableRow obs="Vascular Trace Integrity" metric="-1.1 σ" severity="MILD" sevColor="bg-yellow-100 text-yellow-700" conf="91.0%" />
              </tbody>
            </table>
          </div>

          {/* AI Confidence Visualization */}
          <div className="mb-12 bg-[#F5F5F5] p-6 border-l-4 border-secondary">
            <p className="text-[11px] font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              AI INFERENCE SUMMARY
            </p>
            <div className="mb-4">
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span>Overall Diagnostic Confidence</span>
                <span>96.8%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: '96.8%' }} />
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-[#1A1C1F]/80">
              Automated analysis indicates a high probability of regional tracer deficit in the bilateral frontal regions. Patterns are consistent with neurodegenerative markers. Manual physician correlation is required to confirm diagnostic impression.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-16 flex justify-between items-end">
            <div className="w-64">
              <div className="h-12 border-b border-[#1A1C1F] mb-2 flex items-end">
                <img 
                  src="https://picsum.photos/seed/sig/200/50" 
                  alt="Signature" 
                  className="h-10 opacity-70 mb-1 grayscale contrast-200"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[10px] font-bold uppercase">Attending Physician Signature</p>
              <p className="text-[9px] text-[#888]">DR. ELARA STERLING, MD, PHD</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-mono text-[#888]">REGEN_STAMP: 2024-05-22_T14:30:05_Z</p>
              <div className="mt-2 w-12 h-12 bg-white ml-auto border border-[#E0E0E0] p-1">
                <img 
                  src="https://picsum.photos/seed/qr/100/100" 
                  alt="QR" 
                  className="w-full h-full grayscale opacity-50"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 w-full max-w-[800px] mb-20">
          <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-background py-3 rounded-sm font-bold text-sm hover:brightness-110 transition-all">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-outline-variant/30 text-on-surface py-3 rounded-sm font-bold text-sm hover:bg-surface-low transition-all">
            <LinkIcon className="w-4 h-4" />
            Copy Link
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-outline-variant/30 text-on-surface py-3 rounded-sm font-bold text-sm hover:bg-surface-low transition-all">
            <Mail className="w-4 h-4" />
            Send via Email
          </button>
        </div>
      </main>
    </div>
  );
}

function ReportTypeCard({ active, onClick, icon, title, description }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-3 border rounded-sm cursor-pointer transition-all ${
        active 
          ? 'bg-surface-low border-primary ring-1 ring-primary/20' 
          : 'bg-transparent border-outline-variant/30 hover:bg-surface-low'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${active ? 'text-primary' : 'text-outline-variant'}`}>{icon}</div>
        <div>
          <p className={`text-sm font-semibold ${active ? 'text-on-surface' : 'text-on-surface-variant'}`}>{title}</p>
          <p className="text-[11px] text-outline-variant leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, active, onToggle, disabled }: any) {
  return (
    <label className={`flex items-center justify-between group cursor-pointer ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
      <span className={`text-xs ${active ? 'text-on-surface' : 'text-outline-variant'}`}>{label}</span>
      <div 
        onClick={!disabled ? onToggle : undefined}
        className={`w-8 h-4 rounded-full relative flex items-center px-0.5 transition-colors ${
          active ? 'bg-primary' : 'bg-outline-variant/30'
        }`}
      >
        <motion.div 
          animate={{ x: active ? 16 : 0 }}
          className="w-3 h-3 bg-white rounded-full shadow-sm" 
        />
      </div>
    </label>
  );
}

function InfoField({ label, value, mono }: any) {
  return (
    <div>
      <p className="text-[9px] font-bold text-[#888] uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-sm font-semibold ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  );
}

function TableRow({ obs, metric, severity, sevColor, conf }: any) {
  return (
    <tr className="border-b border-[#F0F0F0]">
      <td className="py-3 font-medium">{obs}</td>
      <td className="py-3 font-mono">{metric}</td>
      <td className="py-3">
        <span className={`px-2 py-0.5 font-bold rounded-full text-[9px] ${sevColor}`}>{severity}</span>
      </td>
      <td className="py-3 text-right font-mono text-secondary font-bold">{conf}</td>
    </tr>
  );
}
