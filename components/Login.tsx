
import React, { useState } from 'react';
import { ArrowLeft, Lock, Phone, AlertCircle, MapPin, Building2 } from 'lucide-react';
import { Role, Province, HealthStructure } from '../types';

interface LoginProps {
  role: Role;
  province?: Province | null;
  structure?: HealthStructure | null;
  onLogin: (id: string) => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ role, province, structure, onLogin, onBack }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Supporting two test IDs for community personalization
    const validIds = ['0991234567', '0812345678'];
    if (validIds.includes(id) && password === '12345678') {
      onLogin(id);
    } else {
      setError('Identifiant ou mot de passe incorrect (Test: 0991234567 ou 0812345678 / Pass: 12345678)');
    }
  };

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 md:bg-white md:rounded-3xl md:shadow-2xl md:border border-gray-100">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-[#2d6a4f] transition-colors mb-12 font-bold text-sm">
          <ArrowLeft size={18} /> Retour
        </button>

        <div className="mb-10 text-center">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic">Authentification</h2>
          <div className="mt-3 flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-[10px] font-black uppercase tracking-wider border border-teal-100">
              {role.replace('_', ' ')}
            </div>
            {province && (
              <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs">
                <MapPin size={12} className="text-teal-600" /> DPS {province.name}
              </div>
            )}
            {structure && (
              <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs">
                <Building2 size={12} className="text-teal-600" /> {structure.name}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Numéro de Téléphone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Ex: 0991234567" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:bg-white transition-all font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Mot de Passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:bg-white transition-all font-bold"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-xs font-bold border border-red-100">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button className="w-full py-4 bg-[#2d6a4f] text-white rounded-2xl font-black shadow-xl shadow-teal-900/20 hover:bg-[#1b4332] hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-widest">
            Accéder à mon Espace
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
