
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, FileText, Loader2, UserPlus } from 'lucide-react';
import { Patient } from '../types';
import { db } from '../services/dbMock';
import CPNForm from './CPNForm';
import NewPatientForm from './NewPatientForm';

const CPNList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const loadPatients = async () => {
    setIsLoading(true);
    const data = await db.patients.getAll();
    setPatients(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const getRiskStyles = (level: string) => {
    switch (level) {
      case 'HIGH': return 'bg-red-100 text-red-700 border-red-200';
      case 'MEDIUM': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.phone.includes(searchTerm)
  );

  if (selectedPatient) {
    return <CPNForm patient={selectedPatient} onBack={() => { setSelectedPatient(null); loadPatients(); }} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {isAddingNew && (
        <NewPatientForm 
          onClose={() => setIsAddingNew(false)} 
          onSave={async (data) => {
            await db.patients.save(data);
            setIsAddingNew(false);
            loadPatients();
          }} 
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic uppercase">Dossiers CPN</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Programme National de Santé de la Reproduction (PNSR)</p>
        </div>
        <button 
          onClick={() => setIsAddingNew(true)}
          className="flex items-center justify-center gap-3 bg-[#2d6a4f] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-teal-900/10 hover:bg-[#1b4332] hover:scale-105 transition-all"
        >
          <UserPlus size={18} /> Enregistrer une Patiente
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input
              type="text"
              placeholder="Rechercher par nom ou téléphone..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2d6a4f] focus:bg-white transition-all font-bold text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-6 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors text-xs font-black uppercase tracking-widest text-gray-400">
              <Filter size={16} /> Filtres
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4 text-gray-400">
               <Loader2 className="animate-spin" size={32} />
               <p className="text-xs font-black uppercase tracking-widest">Chargement de la base de données...</p>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="p-20 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                 <Search size={32} />
              </div>
              <div>
                <p className="text-gray-900 font-black uppercase italic">Aucune patiente trouvée</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase">Essayez un autre nom ou inscrivez une nouvelle patiente</p>
              </div>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-widest border-b border-gray-50">
                  <th className="px-8 py-5 font-black">Patiente</th>
                  <th className="px-8 py-5 font-black">Grossesse</th>
                  <th className="px-8 py-5 font-black">Dernière CPN</th>
                  <th className="px-8 py-5 font-black">Risque</th>
                  <th className="px-8 py-5 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-teal-50/20 transition-colors group cursor-pointer" onClick={() => setSelectedPatient(patient)}>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#2d6a4f] font-black text-xs uppercase tracking-tighter shadow-sm group-hover:scale-110 transition-transform">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 group-hover:text-[#2d6a4f] transition-colors uppercase italic">{patient.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{patient.age} ans • {patient.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-gray-700 tracking-tighter">{patient.gestationalAge || '--'} SA</p>
                    </td>
                    <td className="px-8 py-6">
                      {/* Fixed: Use 'lastVisit' property as defined in Patient interface, correcting the previous 'lastVisitDate' error */}
                      <p className="text-xs font-bold text-gray-500">{patient.lastVisit || 'Jamais'}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black border tracking-widest uppercase ${getRiskStyles(patient.riskLevel)}`}>
                        {patient.riskLevel}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-3 bg-gray-50 text-gray-400 group-hover:bg-[#2d6a4f] group-hover:text-white rounded-2xl transition-all shadow-sm">
                        <FileText size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CPNList;
