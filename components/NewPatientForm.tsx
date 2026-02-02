
import React, { useState } from 'react';
import { X, Save, UserPlus, Heart, MapPin, History } from 'lucide-react';

interface NewPatientFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const NewPatientForm: React.FC<NewPatientFormProps> = ({ onClose, onSave }) => {
  const [step, setStep] = useState(1);

  const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
    <div className="flex items-center gap-2 mb-6 border-b pb-2">
      <Icon className="text-[#2d6a4f]" size={20} />
      <h3 className="font-black text-xs uppercase tracking-widest text-gray-700">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#2d6a4f] p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <UserPlus size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Nouvelle Inscription</h2>
              <p className="text-teal-100 text-xs">Ouverture d'une fiche CPN et Partogramme</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Identity */}
            <div className="space-y-6">
              <SectionHeader icon={Heart} title="Identité de la Patiente" />
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Nom</label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d6a4f]/20" placeholder="Ex: Masika" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Postnom</label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d6a4f]/20" placeholder="Ex: Kavira" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Prénom</label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d6a4f]/20" placeholder="Ex: Solange" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Âge</label>
                  <input type="number" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d6a4f]/20" placeholder="24" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Téléphone</label>
                  <input type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d6a4f]/20" placeholder="099..." />
                </div>
              </div>

              <SectionHeader icon={MapPin} title="Localisation" />
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Adresse Complète</label>
                  <textarea className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 h-20" placeholder="Quartier, Avenue, N°..."></textarea>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Provenance</label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 appearance-none">
                    <option>Aire de Santé (AS)</option>
                    <option>Hors Aire (HAS)</option>
                    <option>Hors Zone (HZ)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* History */}
            <div className="space-y-6">
              <SectionHeader icon={History} title="Antécédents Obstétricaux" />
              <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-center">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Gestité</label>
                  <input type="number" className="w-full text-center font-black text-xl text-[#2d6a4f] outline-none" defaultValue="1" />
                </div>
                <div className="text-center">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Parité</label>
                  <input type="number" className="w-full text-center font-black text-xl text-[#2d6a4f] outline-none" defaultValue="0" />
                </div>
                <div className="text-center">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Vivants</label>
                  <input type="number" className="w-full text-center font-black text-xl text-emerald-600 outline-none" defaultValue="0" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Complications antérieures</label>
                {[
                  'Césarienne',
                  'Dystocie',
                  'Bébé > 4kg',
                  'Hémorragie Post-partum',
                  'Fausse couche'
                ].map(comp => (
                  <label key={comp} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 hover:border-[#2d6a4f]/30 cursor-pointer transition-all">
                    <input type="checkbox" className="w-5 h-5 accent-[#2d6a4f]" />
                    <span className="text-sm font-medium text-gray-700">{comp}</span>
                  </label>
                ))}
              </div>

              <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
                <label className="block text-[10px] font-bold text-teal-700 uppercase mb-2">Grossesse Actuelle</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-teal-600 mb-1">Date DDR</label>
                    <input type="date" className="w-full bg-white border border-teal-200 rounded-lg p-2 text-xs font-bold" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-teal-600 mb-1">DPA Calculée</label>
                    <input type="date" disabled className="w-full bg-teal-100 border border-teal-200 rounded-lg p-2 text-xs font-bold text-teal-800" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button className="px-10 py-3 bg-[#2d6a4f] text-white rounded-xl font-black shadow-lg shadow-teal-900/20 hover:bg-[#1b4332] transition-all flex items-center gap-2">
            <Save size={20} /> Enregistrer la Patiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPatientForm;
