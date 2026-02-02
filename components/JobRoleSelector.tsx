
import React from 'react';
import { Shield, UserPlus, Stethoscope, ClipboardCheck, ArrowRight } from 'lucide-react';
import { Role, JobRole } from '../types';

interface JobRoleSelectorProps {
  onSelect: (job: JobRole) => void;
  role: Role;
}

const JobRoleSelector: React.FC<JobRoleSelectorProps> = ({ onSelect, role }) => {
  const jobs = [
    { id: JobRole.ADMIN, name: 'Administrateur', icon: Shield, desc: 'Gestion des comptes et rapports DHIS2' },
    { id: JobRole.MEDECIN, name: 'Médecin', icon: Stethoscope, desc: 'Validation clinique et cas critiques' },
    { id: JobRole.INFIRMIER, name: 'Infirmier(e)', icon: ClipboardCheck, desc: 'Consultations CPN et soins de base' },
    { id: JobRole.SAGE_FEMME, name: 'Sage-femme', icon: UserPlus, desc: 'Suivi parthogramme et accouchements' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Votre Poste de Travail</h2>
          <p className="text-gray-500 font-medium italic mt-2">Personnalisation de l'interface {role.replace('_', ' ')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map(job => (
            <button 
              key={job.id}
              onClick={() => onSelect(job.id)}
              className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all text-left group flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#2d6a4f] flex items-center justify-center mb-6 group-hover:bg-[#2d6a4f] group-hover:text-white transition-colors">
                <job.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-1 uppercase tracking-tight">{job.name}</h3>
              <p className="text-xs text-gray-400 font-bold mb-6">{job.desc}</p>
              <div className="mt-auto flex items-center gap-2 text-[#2d6a4f] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Activer la session <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobRoleSelector;
