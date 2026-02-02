
import React, { useState, useMemo } from 'react';
import { Syringe, CheckCircle2, Circle, AlertCircle, Clock } from 'lucide-react';

interface VaccinationCalendarProps {
  userId?: string;
}

const VaccinationCalendar: React.FC<VaccinationCalendarProps> = ({ userId }) => {
  const patientDataMap: Record<string, string> = {
    '0991234567': 'Maman Sarah Masika',
    '0812345678': 'Maman Zawadi Neema',
  };

  const patientName = useMemo(() => patientDataMap[userId || ''] || 'Patiente Inconnue', [userId]);

  const [vaccines, setVaccines] = useState([
    { name: 'VAT 1', period: 'Au premier contact', description: 'Protection initiale contre le tétanos', status: 'DONE', date: '12/03/2024' },
    { name: 'VAT 2', period: '4 semaines après VAT1', description: 'Renforcement immunitaire', status: 'PENDING', date: '15/05/2024' },
    { name: 'VAT 3', period: '6 mois après VAT2', description: 'Protection durable', status: 'SCHEDULED', date: '15/11/2024' },
    { name: 'VAT 4', period: '1 an après VAT3', description: 'Rappel long terme', status: 'SCHEDULED', date: '15/11/2025' },
  ]);

  const confirmDose = (index: number) => {
    const newVaccines = [...vaccines];
    newVaccines[index].status = 'DONE';
    newVaccines[index].date = new Date().toLocaleDateString();
    setVaccines(newVaccines);
    alert("Administration confirmée. Les rappels ont été mis à jour dans le carnet numérique.");
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tighter uppercase italic">Mon Calendrier Vaccinal</h2>
          <p className="text-gray-500 italic text-sm">Suivi de la vaccination antitétanique PEV (RDC)</p>
        </div>
        <div className="bg-white p-3 rounded-2xl border flex items-center gap-4 shadow-sm">
          <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Identité</p>
            <p className="text-sm font-black text-[#2d6a4f]">{patientName}</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#2d6a4f] font-black uppercase">
            {patientName.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 bg-[#2d6a4f] text-white flex justify-between items-center">
          <h3 className="font-black text-xl flex items-center gap-3 uppercase tracking-tighter italic">
            <Syringe size={24} /> Carnet : <span className="text-teal-200">À jour</span>
          </h3>
          <div className="flex gap-2">
            <span className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase">Fiche Numérique</span>
          </div>
        </div>
        
        <div className="p-10">
          <div className="relative border-l-4 border-dashed border-teal-50 ml-6 space-y-12 pb-4">
            {vaccines.map((v, i) => (
              <div key={i} className="relative pl-12 group">
                <div className={`absolute -left-[14px] top-0 w-6 h-6 rounded-xl border-4 border-white shadow-lg flex items-center justify-center transition-all ${
                  v.status === 'DONE' ? 'bg-emerald-500 scale-110' : 
                  v.status === 'PENDING' ? 'bg-orange-500 animate-pulse' : 'bg-gray-200'
                }`}>
                  {v.status === 'DONE' ? <CheckCircle2 size={14} className="text-white" /> : <Circle size={10} className="text-white"/>}
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-gray-50/50 rounded-3xl border border-transparent hover:border-teal-100 transition-all hover:bg-white group-hover:shadow-xl group-hover:shadow-teal-900/5">
                  <div className="flex-1">
                    <h4 className="font-black text-lg text-gray-900 flex items-center gap-3 italic">
                      {v.name} 
                      {v.status === 'PENDING' && <span className="text-[9px] bg-orange-100 text-orange-600 px-3 py-1 rounded-full uppercase tracking-widest font-black">À faire</span>}
                    </h4>
                    <p className="text-sm font-bold text-gray-500 mt-1">{v.description}</p>
                    <div className="flex items-center gap-2 mt-3 text-[10px] font-black text-teal-700 uppercase tracking-widest">
                       <Clock size={12}/> {v.period}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${v.status === 'DONE' ? 'text-emerald-600' : 'text-gray-800'}`}>
                      {v.status === 'DONE' ? `Administré le ${v.date}` : `Prévu le ${v.date}`}
                    </p>
                    {v.status === 'PENDING' && (
                      <button 
                        onClick={() => confirmDose(i)}
                        className="mt-4 text-[10px] bg-[#2d6a4f] text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-teal-900/20 hover:scale-105 transition-all"
                      >
                        Signaler Administration
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-[40px] border border-blue-100 flex items-start gap-6 shadow-sm">
        <div className="p-4 bg-white rounded-3xl text-blue-600 shadow-sm"><AlertCircle size={24} /></div>
        <div>
          <h4 className="font-black text-blue-900 uppercase italic">Information Patient</h4>
          <p className="text-sm text-blue-800/80 leading-relaxed mt-2 font-medium">
            Mme {patientName.split(' ')[1]}, vos rappels sont synchronisés avec votre téléphone. En cas de doute, AfyaBot est disponible pour répondre à vos questions sur les effets secondaires.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VaccinationCalendar;
