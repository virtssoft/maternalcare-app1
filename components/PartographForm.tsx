
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Activity, 
  Heart, 
  Stethoscope, 
  LineChart, 
  Baby, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  ClipboardList
} from 'lucide-react';
import { 
  LineChart as ReLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

// Fixed SectionTitle by moving outside and making children optional to resolve TS prop errors
const SectionTitle = ({ children }: { children?: React.ReactNode }) => (
  <h3 className="text-xs font-black text-[#2d6a4f] uppercase tracking-widest mb-6 border-b pb-2">
    {children}
  </h3>
);

const PartographForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, label: 'Admission', icon: ClipboardList },
    { id: 2, label: 'Examen Clinique', icon: Stethoscope },
    { id: 3, label: 'Latence', icon: Clock },
    { id: 4, label: 'Phase Active', icon: Activity },
    { id: 5, label: 'Accouchement', icon: Baby },
    { id: 6, label: 'Post-partum', icon: Heart },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Horizontal Stepper */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between min-w-[600px]">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;
            return (
              <React.Fragment key={step.id}>
                <button 
                  onClick={() => setActiveStep(step.id)}
                  className={`flex flex-col items-center gap-2 group transition-all ${isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? 'bg-[#2d6a4f] text-white shadow-lg' : 
                    isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-tight ${isActive ? 'text-[#2d6a4f]' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${activeStep > i + 1 ? 'bg-emerald-200' : 'bg-gray-100'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[600px] relative overflow-hidden">
        {activeStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-8">
              <SectionTitle>Identité (Fiche Page 1)</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Provenance</label>
                  <div className="flex gap-4 mt-2">
                    {['AS', 'HAS', 'HZ'].map(p => (
                      <label key={p} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg cursor-pointer hover:bg-teal-50 transition-colors">
                        <input type="radio" name="provenance" className="accent-[#2d6a4f]" />
                        <span className="text-xs font-bold text-gray-600">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Motif de Consultation</label>
                  <textarea className="w-full mt-1 border-b py-2 text-sm font-medium outline-none focus:border-[#2d6a4f]" placeholder="Décrivez le motif..."></textarea>
                </div>
              </div>

              <SectionTitle>Anamnèse</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 flex gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">G. Sanguin</label>
                    <input type="text" className="w-full border-b py-1 text-sm font-bold" placeholder="A, B, AB, O" />
                  </div>
                  <div className="w-20">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">RH</label>
                    <input type="text" className="w-full border-b py-1 text-sm font-bold" placeholder="+ / -" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <SectionTitle>Antécédents Gynéco-Obstétricaux</SectionTitle>
              <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Enfants Vivants</label>
                  <input type="number" className="w-full bg-transparent border-b border-gray-300 font-black text-xl text-[#2d6a4f]" defaultValue="0" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Morts-nés</label>
                  <input type="number" className="w-full bg-transparent border-b border-gray-300 font-black text-xl text-red-500" defaultValue="0" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Dernier Accouchement</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-300 font-bold" placeholder="Mois / Année" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase block">Historique Césarienne</label>
                {[1, 2].map(n => (
                  <div key={n} className="flex gap-4 items-end bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-16">
                      <label className="text-[8px] font-bold text-gray-400 uppercase">Année</label>
                      <input type="text" className="w-full border-b text-xs font-bold outline-none" placeholder="2022" />
                    </div>
                    <div className="flex-1">
                      <label className="text-[8px] font-bold text-gray-400 uppercase">Indication</label>
                      <input type="text" className="w-full border-b text-xs font-medium outline-none" placeholder="Motif césarienne..." />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <SectionTitle>Examen Physique (Fiche Page 2)</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="p-4 bg-gray-50 rounded-2xl text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Poids (kg)</p>
                  <input type="number" className="bg-transparent text-2xl font-black text-gray-800 w-full text-center outline-none" placeholder="00" />
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase">T° (°C)</p>
                  <input type="number" className="bg-transparent text-2xl font-black text-gray-800 w-full text-center outline-none" placeholder="37.0" />
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Pouls (BPM)</p>
                  <input type="number" className="bg-transparent text-2xl font-black text-gray-800 w-full text-center outline-none" placeholder="80" />
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl text-center border-2 border-[#2d6a4f]/20">
                  <p className="text-[10px] font-black text-[#2d6a4f] uppercase">TA (mmHg)</p>
                  <input type="text" className="bg-transparent text-2xl font-black text-[#2d6a4f] w-full text-center outline-none" placeholder="12/8" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <SectionTitle>Examen Gynéco-Obstétrical</SectionTitle>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm font-bold text-gray-600">Hauteur Utérine (HU)</span>
                    <div className="flex items-center gap-2">
                      <input type="number" className="w-12 text-right font-black text-teal-600 outline-none" placeholder="32" />
                      <span className="text-xs font-bold text-gray-400">cm</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm font-bold text-gray-600">Bruits Cœur Foetal (BCF)</span>
                    <div className="flex items-center gap-2">
                      <input type="number" className="w-12 text-right font-black text-blue-600 outline-none" placeholder="140" />
                      <span className="text-xs font-bold text-gray-400">/min</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm font-bold text-gray-600">Liquide Amniotique (L.A.)</span>
                    <select className="text-sm font-bold text-gray-800 bg-transparent outline-none">
                      <option>Clair</option>
                      <option>Verdâtre</option>
                      <option>Sanguinolent</option>
                      <option>Purulent</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <SectionTitle>Toucher Vaginal (T.V.)</SectionTitle>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-2xl bg-white shadow-sm">
                    <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Effacement Col</p>
                    <div className="flex items-baseline gap-1">
                      <input type="number" className="text-xl font-black text-gray-800 w-12 outline-none" placeholder="50" />
                      <span className="text-[10px] font-bold text-gray-400">%</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-2xl bg-white shadow-sm border-teal-200">
                    <p className="text-[8px] font-black text-[#2d6a4f] uppercase mb-1">Dilatation Col</p>
                    <div className="flex items-baseline gap-1">
                      <input type="number" className="text-xl font-black text-[#2d6a4f] w-12 outline-none" placeholder="4" />
                      <span className="text-[10px] font-bold text-gray-400">cm</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
                  <AlertTriangle className="text-orange-600 shrink-0" size={18} />
                  <div>
                    <p className="text-xs font-bold text-orange-900">Appréciation du Bassin</p>
                    <div className="flex gap-3 mt-2">
                      {['Bon', 'Limite', 'Rétréci'].map(b => (
                        <label key={b} className="flex items-center gap-2 text-[10px] font-bold text-orange-700">
                          <input type="radio" name="bassin" className="accent-orange-600" /> {b}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-6 animate-in zoom-in duration-500">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-gray-900 uppercase">Phase Active (≥ 4 cm)</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">Progression Normale</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-tighter">Heure Réelle: 14:30</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                 {/* Re-using the chart logic but mapping it to the DRC layout */}
                 <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <ReLineChart data={[
                          { hour: 0, dil: 4 },
                          { hour: 1, dil: 5 },
                          { hour: 2, dil: 6.5 },
                          { hour: 3, dil: 8 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="hour" label={{ value: 'Temps (h)', position: 'insideBottom', offset: -5, fontSize: 10 }} />
                          <YAxis domain={[4, 10]} ticks={[4, 5, 6, 7, 8, 9, 10]} label={{ value: 'Dilatation (cm)', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                          <Tooltip />
                          {/* Alert Line starts at 4cm */}
                          <ReferenceLine segment={[{ x: 0, y: 4 }, { x: 6, y: 10 }]} stroke="red" strokeDasharray="5 5" strokeWidth={2} label={{ value: 'ALERTE', position: 'top', fill: 'red', fontSize: 10, fontWeight: 'bold' }} />
                          {/* Action Line 4h after Alert */}
                          <ReferenceLine segment={[{ x: 4, y: 4 }, { x: 10, y: 10 }]} stroke="#2d6a4f" strokeDasharray="3 3" strokeWidth={1} label={{ value: 'ACTION', position: 'top', fill: '#2d6a4f', fontSize: 10 }} />
                          <Line type="monotone" dataKey="dil" stroke="#2d6a4f" strokeWidth={5} dot={{ r: 8, fill: '#2d6a4f' }} />
                        </ReLineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-8 mt-4">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full" /> <span className="text-[10px] font-bold text-gray-500">Ligne d'Alerte</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#2d6a4f] rounded-full" /> <span className="text-[10px] font-bold text-gray-500">Ligne d'Action</span></div>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="bg-teal-900 text-white p-6 rounded-3xl shadow-lg">
                    <p className="text-[10px] font-black uppercase opacity-60 mb-4 tracking-widest">Surveillance BCF</p>
                    <div className="flex items-end gap-2">
                       <span className="text-5xl font-black">142</span>
                       <span className="text-sm font-bold opacity-80 mb-2">BPM</span>
                    </div>
                    <div className="mt-6 flex items-center gap-3 bg-white/10 p-3 rounded-2xl">
                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                       <span className="text-xs font-medium">Rythme Stable</span>
                    </div>
                 </div>

                 <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-4 tracking-widest">Contractions (10 min)</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map(n => (
                        <div key={n} className="flex-1 aspect-square bg-[#2d6a4f] rounded-lg shadow-sm flex items-center justify-center text-white font-black">
                          {n <= 3 ? '///' : ''}
                        </div>
                      ))}
                      <div className="flex-1 aspect-square border-2 border-dashed border-gray-300 rounded-lg" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 mt-3 text-center">3 contractions / 10 min • Durée: 35s</p>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Steps navigation footer in content area */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between">
           <button 
             disabled={activeStep === 1}
             onClick={() => setActiveStep(prev => prev - 1)}
             className="px-6 py-3 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-all flex items-center gap-2 disabled:opacity-0"
           >
             <ArrowLeft size={20} /> Précédent
           </button>
           <button 
             onClick={() => setActiveStep(prev => prev + 1)}
             className="px-10 py-3 bg-[#2d6a4f] text-white rounded-2xl font-black shadow-xl shadow-teal-900/20 hover:bg-[#1b4332] transition-all flex items-center gap-2"
           >
             {activeStep === 6 ? 'Terminer & Fermer Dossier' : 'Étape Suivante'} <ArrowRight size={20} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default PartographForm;
