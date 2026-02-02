
import React, { useState, useEffect } from 'react';
import { 
  Users, Baby, AlertTriangle, ArrowUpRight, Clock, TrendingUp,
  MapPin, FileText, Activity, ShieldCheck, CheckCircle2,
  Stethoscope, ClipboardList, AlertCircle, Share2, Plus, Sparkles, BrainCircuit, X, Download
} from 'lucide-react';
import { 
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis
} from 'recharts';
import { Role, JobRole, Patient } from '../types';
import { db } from '../services/dbMock';
import { GoogleGenAI } from '@google/genai';

const chartData = [
  { name: 'Jan', val: 140 }, { name: 'Fév', val: 165 }, { name: 'Mar', val: 155 },
  { name: 'Avr', val: 190 }, { name: 'Mai', val: 210 }, { name: 'Juin', val: 180 },
];

const Dashboard: React.FC<{ role: Role; jobRole?: JobRole | null }> = ({ role, jobRole }) => {
  const isAuthority = role === Role.COMFORT_ASBL || role === Role.DPS;
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddModal, setShowAddModal] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [patientsCount, setPatientsCount] = useState(0);

  useEffect(() => {
    db.patients.getAll().then(all => setPatientsCount(all.length));
  }, []);

  const generateAIInsight = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `En tant qu'expert en santé publique en RDC pour Comfort ASBL, analyse ces données actuelles du système : 
        - Consultations: 24,500 (Tendance +14%)
        - Patient enregistrés localement: ${patientsCount}
        - Alertes Critiques: 124
        - Mortalité: 0.01%
        Produis un rapport court de 3 points stratégiques pour la DPS Nord-Kivu, focalisé sur la réduction de la mortalité néonatale.`,
      });
      setAiReport(response.text);
    } catch (e) {
      setAiReport("Erreur d'analyse IA. Veuillez vérifier votre connexion.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Rapport DHIS2 exporté avec succès pour la période en cours.");
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-[#2d6a4f] uppercase tracking-widest">Opérationnel • Goma Hub</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 uppercase leading-tight tracking-tighter italic">
            {isAuthority ? 'Supervision Stratégique' : 'Espace Clinique'}
          </h2>
        </div>
        <div className="flex gap-3 relative z-10">
          {isAuthority && (
            <button 
              onClick={generateAIInsight}
              disabled={isGenerating}
              className="px-8 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 transition-all"
            >
              {isGenerating ? <BrainCircuit className="animate-spin" size={18} /> : <Sparkles size={18} />}
              Analyse IA
            </button>
          )}
          <button 
            onClick={handleExport}
            className={`px-8 py-5 bg-gray-900 text-white rounded-3xl text-xs font-black uppercase tracking-widest flex items-center gap-3 transition-all ${isExporting ? 'opacity-50' : 'hover:bg-black'}`}
          >
            {isExporting ? <Clock className="animate-spin" size={18}/> : <Download size={18} />}
            {isExporting ? 'Exportation...' : 'Rapport DHIS2'}
          </button>
        </div>
      </div>

      {aiReport && (
        <div className="bg-indigo-50 p-8 rounded-[32px] border border-indigo-100 animate-in zoom-in-95 duration-500 relative">
          <button onClick={() => setAiReport(null)} className="absolute top-4 right-4 text-indigo-400 hover:text-indigo-600"><X size={20}/></button>
          <h3 className="flex items-center gap-2 text-indigo-700 font-black uppercase text-xs mb-4">
            <Sparkles size={16} /> Recommandations AfyaBot AI
          </h3>
          <div className="text-sm text-indigo-900 font-medium whitespace-pre-wrap leading-relaxed italic">
            {aiReport}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Consultations" value="24.5k" color="bg-blue-600" trend={14} />
        <StatCard title="Nais. Vivantes" value="8,102" color="bg-purple-600" trend={3} />
        <StatCard title="Patientes App" value={patientsCount.toString()} color="bg-rose-600" trend={patientsCount > 0 ? 100 : 0} />
        <StatCard title="Mortalité" value="0.01%" color="bg-emerald-600" trend={-2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-gray-50 shadow-sm h-96">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Évolution de la fréquentation CPN</h3>
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">+20% vs 2023</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: '900'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: '900'}} />
              <Tooltip />
              <Area type="monotone" dataKey="val" stroke="#2d6a4f" fill="#2d6a4f10" strokeWidth={5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-10 rounded-[48px] border border-gray-50 shadow-sm overflow-y-auto max-h-96 no-scrollbar">
           <h3 className="font-black text-gray-900 uppercase mb-8">Alertes Critiques</h3>
           <div className="space-y-4">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex gap-4 p-4 bg-red-50/50 rounded-2xl hover:bg-white border border-red-100 transition-all cursor-pointer">
                 <div className="w-1 h-10 bg-red-500 rounded-full shrink-0" />
                 <div>
                   <p className="text-xs font-black uppercase">Sarah B. (HGR Goma)</p>
                   <p className="text-[10px] text-red-600 font-bold uppercase">Alerte BCF: 105bpm - Détresse suspectée</p>
                 </div>
               </div>
             ))}
             <div className="p-4 border border-dashed border-gray-200 rounded-2xl text-center text-gray-400 text-[10px] font-black uppercase">
                Fin des alertes critiques
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, trend }: any) => (
  <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
    <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{title}</h3>
    <p className="text-4xl font-black text-gray-900 group-hover:text-[#2d6a4f] transition-colors tracking-tighter">{value}</p>
    {trend !== undefined && (
      <span className={`text-[10px] font-black ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs mois préc.
      </span>
    )}
    <div className={`absolute right-0 bottom-0 w-16 h-16 ${color} opacity-5 rounded-tl-full group-hover:scale-150 transition-transform duration-700`} />
  </div>
);

export default Dashboard;
