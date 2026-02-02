
import React, { useState } from 'react';
import PartographForm from './PartographForm';
import { FilePlus, Search } from 'lucide-react';

const PartogramView: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => setIsEditing(false)} className="text-[#2d6a4f] font-bold flex items-center gap-2 hover:underline">
             &larr; Retour à la gestion
          </button>
          <p className="text-xs text-gray-500 uppercase font-black">Mode Édition: Dossier #4509 - Maman Sarah</p>
        </div>
        <PartographForm />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Parthogrammes Actifs</h2>
          <p className="text-gray-500 font-medium italic tracking-tight">Surveillance en temps réel de la salle de travail</p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="bg-[#2d6a4f] text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-teal-900/20 hover:bg-[#1b4332] transition-all flex items-center gap-3"
        >
          <FilePlus size={20} /> Ouvrir un Partogramme
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Sarah B.", id: "4509", phase: "Active", dil: 6, time: "2h 30m", risk: "LOW" },
          { name: "Esperance M.", id: "4512", phase: "Latence", dil: 2, time: "0h 45m", risk: "MEDIUM" },
          { name: "Rachel K.", id: "4498", phase: "Active", dil: 9, time: "4h 10m", risk: "HIGH" },
        ].map((patient) => (
          <div key={patient.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
            <div className={`p-1 h-2 ${patient.risk === 'HIGH' ? 'bg-red-500' : patient.risk === 'MEDIUM' ? 'bg-orange-500' : 'bg-emerald-500'}`} />
            <div className="p-6 space-y-4">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-gray-900">{patient.name}</h3>
                    <p className="text-[10px] font-bold text-gray-400">ID: {patient.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase text-teal-600 bg-teal-50 px-3 py-1 rounded-full">Phase {patient.phase}</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
                  <div>
                    <p className="text-[8px] font-bold text-gray-400 uppercase">Dilatation</p>
                    <p className="text-2xl font-black text-[#2d6a4f]">{patient.dil} cm</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-gray-400 uppercase">Durée Travail</p>
                    <p className="text-2xl font-black text-gray-800">{patient.time}</p>
                  </div>
               </div>

               <button 
                onClick={() => setIsEditing(true)}
                className="w-full py-3 bg-gray-50 text-gray-600 rounded-xl font-bold text-sm group-hover:bg-[#2d6a4f] group-hover:text-white transition-all"
               >
                 Ouvrir le Dossier
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartogramView;
