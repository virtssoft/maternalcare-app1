
import React, { useState } from 'react';
import { ShieldCheck, Building2, Map, Home, Users, HeartPulse, ChevronRight, Globe, LayoutGrid, MapPin } from 'lucide-react';
import { Role, Province, HealthStructure, ZoneDeSante } from '../types';

interface RoleSelectorProps {
  onSelect: (role: Role, province?: Province, structure?: HealthStructure) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect }) => {
  const [step, setStep] = useState<'ROLE' | 'PROVINCE' | 'ZONE' | 'STRUCTURE'>('ROLE');
  const [selectedBaseRole, setSelectedBaseRole] = useState<Role | null>(null);
  const [selectedZone, setSelectedZone] = useState<ZoneDeSante | null>(null);

  const provinces: Province[] = [{ id: 'NK', name: 'Nord-Kivu' }];

  // Fixed missing provinceId and hgrId properties for ZoneDeSante mock data
  const zones: ZoneDeSante[] = [
    { id: 'GOMA', name: 'Zone Goma', provinceId: 'NK', hgrId: 'HGR-GOMA', hgrName: 'HGR Provincial Nord-Kivu' },
    { id: 'NYIRAGONGO', name: 'Zone Nyiragongo', provinceId: 'NK', hgrId: 'HGR-NYI', hgrName: 'HGR Nyiragongo' },
    { id: 'KARISIMBI', name: 'Zone Karisimbi', provinceId: 'NK', hgrId: 'HGR-KAR', hgrName: 'HGR Karisimbi' },
  ];

  // Fixed missing provinceId property for HealthStructure mock data
  const structures: HealthStructure[] = [
    { id: 'HEAL', name: 'Heal Africa', type: 'CS', zoneId: 'GOMA', provinceId: 'NK' },
    { id: 'MOTCARMEL', name: 'CS Mot Carmel', type: 'CS', zoneId: 'GOMA', provinceId: 'NK' },
    { id: 'RUSAYO', name: 'CS Rusayo', type: 'CS', zoneId: 'NYIRAGONGO', provinceId: 'NK' },
    { id: 'KIZIBA', name: 'CS Kiziba', type: 'CS', zoneId: 'NYIRAGONGO', provinceId: 'NK' },
    { id: 'MABANGA', name: 'CS Mabanga Sud', type: 'CS', zoneId: 'KARISIMBI', provinceId: 'NK' },
    { id: 'METHODISTE', name: 'CS Méthodiste', type: 'CS', zoneId: 'KARISIMBI', provinceId: 'NK' },
  ];

  const handleRoleClick = (role: Role) => {
    setSelectedBaseRole(role);
    if (role === Role.DPS) setStep('PROVINCE');
    else if (role === Role.ZONE_DE_SANTE || role === Role.AIRE_DE_SANTE) setStep('ZONE');
    else onSelect(role);
  };

  if (step === 'PROVINCE') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl border border-gray-100">
          <button onClick={() => setStep('ROLE')} className="text-gray-400 font-bold text-sm mb-8">&larr; Retour</button>
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">Division Provinciale de la Santé</h2>
          <div className="space-y-3">
            {provinces.map(p => (
              <button key={p.id} onClick={() => onSelect(Role.DPS, p)} className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-[24px] font-black group transition-all hover:bg-teal-50">
                {p.name} <ChevronRight size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'ZONE') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl border border-gray-100">
          <button onClick={() => setStep('ROLE')} className="text-gray-400 font-bold text-sm mb-8">&larr; Retour</button>
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">Choisir la Zone de Santé</h2>
          <div className="space-y-3">
            {zones.map(z => (
              <button key={z.id} onClick={() => {
                // Fixed: added provinceId to the passed object to match HealthStructure type
                if (selectedBaseRole === Role.ZONE_DE_SANTE) onSelect(Role.ZONE_DE_SANTE, undefined, { id: z.id, name: z.hgrName || z.name, type: 'HGR', zoneId: z.id, provinceId: z.provinceId });
                else { setSelectedZone(z); setStep('STRUCTURE'); }
              }} className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-[24px] font-black group transition-all hover:bg-teal-50">
                {z.name} <ChevronRight size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'STRUCTURE') {
    const items = structures.filter(s => s.zoneId === selectedZone?.id);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl border border-gray-100">
          <button onClick={() => setStep('ZONE')} className="text-gray-400 font-bold text-sm mb-8">&larr; Retour</button>
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">Centre de Santé ({selectedZone?.name})</h2>
          <div className="space-y-3">
            {items.map(s => (
              <button key={s.id} onClick={() => onSelect(Role.AIRE_DE_SANTE, undefined, s)} className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-[24px] font-black group transition-all hover:bg-teal-50">
                {s.name} <ChevronRight size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const interfaces = {
    [Role.DPS]: { name: 'DPS', icon: Map, color: 'bg-teal-700' },
    [Role.ZONE_DE_SANTE]: { name: 'Zone / HGR', icon: Building2, color: 'bg-[#1b4332]' },
    [Role.AIRE_DE_SANTE]: { name: 'Aire / CS', icon: Home, color: 'bg-teal-500' },
    [Role.COMMUNAUTE]: { name: 'Patiente', icon: Users, color: 'bg-rose-500' },
    [Role.COMFORT_ASBL]: { name: 'Comfort', icon: ShieldCheck, color: 'bg-emerald-600' },
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="text-center mb-16">
        <HeartPulse size={48} className="text-[#2d6a4f] mx-auto mb-4" />
        <h1 className="text-4xl font-black uppercase tracking-tighter">MaternalCare+</h1>
        <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-1 italic">Comfort ASBL | Projet ODESS</p>
      </div>
      <div className="relative w-full max-w-[500px] aspect-square grid grid-cols-3 grid-rows-3 gap-4">
        <div className="col-start-2 row-start-1"><RoleBox role={Role.DPS} interfaces={interfaces} onClick={() => handleRoleClick(Role.DPS)} /></div>
        <div className="col-start-1 row-start-2"><RoleBox role={Role.COMMUNAUTE} interfaces={interfaces} onClick={() => handleRoleClick(Role.COMMUNAUTE)} /></div>
        <div className="col-start-2 row-start-2"><RoleBox role={Role.COMFORT_ASBL} interfaces={interfaces} onClick={() => handleRoleClick(Role.COMFORT_ASBL)} /></div>
        <div className="col-start-3 row-start-2"><RoleBox role={Role.ZONE_DE_SANTE} interfaces={interfaces} onClick={() => handleRoleClick(Role.ZONE_DE_SANTE)} /></div>
        <div className="col-start-2 row-start-3"><RoleBox role={Role.AIRE_DE_SANTE} interfaces={interfaces} onClick={() => handleRoleClick(Role.AIRE_DE_SANTE)} /></div>
      </div>
    </div>
  );
};

const RoleBox = ({ role, interfaces, onClick }: any) => {
  const data = interfaces[role];
  const Icon = data.icon;
  return (
    <button onClick={onClick} className={`w-full h-full ${data.color} rounded-[32px] p-6 text-white shadow-xl flex flex-col items-center justify-center transition-all hover:scale-105 border-4 border-white`}>
      <Icon size={32} className="mb-2" />
      <span className="text-[10px] font-black uppercase tracking-widest">{data.name}</span>
    </button>
  );
};

export default RoleSelector;
