
import React, { useState } from 'react';
import { ArrowRightLeft, Send, CheckCircle, Clock, MapPin, Phone, X, ShieldAlert, FileText, Activity } from 'lucide-react';

const initialReferrals = [
  { id: 'REF-001', patient: 'Kavira Masika', from: 'CS Mot Carmel', to: 'HGR Provincial', status: 'IN_TRANSIT', time: '14:20', priority: 'EMERGENCY' },
  { id: 'REF-002', patient: 'Zawadi Neema', from: 'CS Rusayo', to: 'HGR Nyiragongo', status: 'COMPLETED', time: '09:00', priority: 'ROUTINE' },
];

const ReferralSystem: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRef, setSelectedRef] = useState<any>(null);

  const handleCreateReferral = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Référence envoyée en temps réel. La structure destinataire a été notifiée par SMS et Push.");
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Références & Contre-Références</h2>
          <p className="text-gray-500 italic">Coordination des transferts entre centres et hôpitaux</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-[#2d6a4f] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-teal-900/10 hover:scale-105 transition-all"
        >
          <Send size={18} /> Initier une Référence
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialReferrals.map((ref) => (
          <div key={ref.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
            <div className={`p-4 flex justify-between items-center ${ref.priority === 'EMERGENCY' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
              <span className="text-[10px] font-black tracking-widest uppercase">{ref.id}</span>
              <span className="text-[10px] font-black bg-white px-3 py-1 rounded-full shadow-sm tracking-widest uppercase">{ref.priority}</span>
            </div>
            <div className="p-8">
              <h3 className="font-black text-xl text-gray-900 mb-6 group-hover:text-[#2d6a4f] transition-colors">{ref.patient}</h3>
              
              <div className="flex items-center justify-between mb-8">
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Origine</p>
                  <p className="text-sm font-black text-gray-700">{ref.from}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl text-gray-300">
                   <ArrowRightLeft size={20} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Destination</p>
                  <p className="text-sm font-black text-gray-700">{ref.to}</p>
                </div>
              </div>

              <div className="flex items-center justify-between py-5 border-t border-gray-50">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Posté à {ref.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  {ref.status === 'IN_TRANSIT' ? (
                    <span className="flex items-center gap-2 text-orange-600 text-[10px] font-black uppercase tracking-widest">
                      <span className="w-2 h-2 bg-orange-600 rounded-full animate-ping"></span>
                      En transit
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                      <CheckCircle size={16} /> Arrivé
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  onClick={() => setSelectedRef(ref)}
                  className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest py-4 bg-gray-50 text-gray-600 rounded-2xl border border-transparent hover:bg-teal-50 hover:text-teal-700 transition-all"
                >
                  <FileText size={16} /> Détails
                </button>
                <a 
                  href="tel:0991234567"
                  className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest py-4 bg-[#2d6a4f] text-white rounded-2xl shadow-lg hover:bg-black transition-all"
                >
                  <Phone size={16} /> Appeler
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Initiation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl p-10 border border-gray-100 overflow-y-auto max-h-[90vh] animate-in slide-in-from-bottom-6">
              <div className="flex justify-between items-center mb-10">
                <div>
                   <h3 className="text-2xl font-black uppercase tracking-tighter italic">Nouvelle Référence</h3>
                   <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">Formulaire Obstétrical d'Urgence</p>
                </div>
                <button onClick={() => setShowCreateModal(false)} className="p-3 bg-gray-50 rounded-2xl"><X size={24}/></button>
              </div>

              <form onSubmit={handleCreateReferral} className="space-y-8">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Patiente</label>
                       <select className="w-full p-4 bg-gray-50 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-teal-500 appearance-none">
                          <option>Kavira Masika (32 SA)</option>
                          <option>Sarah B. (Travail actif)</option>
                          <option>Neema Z. (Post-partum)</option>
                       </select>
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Structure Destination</label>
                       <select className="w-full p-4 bg-gray-50 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-teal-500 appearance-none">
                          <option>HGR Provincial Goma</option>
                          <option>HGR Charité Maternelle</option>
                          <option>HGR Karisimbi</option>
                       </select>
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Niveau d'Urgence</label>
                       <div className="flex gap-2">
                          <button type="button" className="flex-1 p-4 bg-red-50 text-red-600 rounded-2xl font-black text-[10px] border-2 border-red-100">VITAL</button>
                          <button type="button" className="flex-1 p-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] border-2 border-transparent">ROUTINE</button>
                       </div>
                    </div>
                    <div className="col-span-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Motif du transfert & Clinique</label>
                       <textarea className="w-full p-4 bg-gray-50 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-teal-500 h-32" placeholder="Ex: Dilatation stagnante depuis 4h, BCF irréguliers..."></textarea>
                    </div>
                 </div>
                 
                 <div className="bg-rose-50 p-6 rounded-[32px] border border-rose-100 flex items-center gap-4">
                    <ShieldAlert size={24} className="text-rose-600" />
                    <p className="text-[10px] font-black text-rose-800 leading-relaxed uppercase">
                       L'envoi de ce formulaire déclenche une notification prioritaire immédiate à l'hôpital de destination.
                    </p>
                 </div>

                 <button className="w-full py-5 bg-[#2d6a4f] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-teal-900/20 hover:bg-black transition-all">
                    Confirmer l'Envoi
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedRef && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl p-10 border border-gray-100 animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Fiche Clinique : {selectedRef.id}</h3>
                <button onClick={() => setSelectedRef(null)} className="p-3 bg-gray-50 rounded-2xl"><X size={24}/></button>
              </div>
              <div className="space-y-6">
                 <div className="flex items-center gap-4 p-5 bg-teal-50/50 rounded-3xl">
                    <div className="p-3 bg-white rounded-2xl text-teal-600 shadow-sm"><Activity size={20}/></div>
                    <div>
                       <p className="text-[10px] font-black text-teal-700 uppercase">Derniers paramètres</p>
                       <p className="text-sm font-black">TA: 14/9 mmHg • BCF: 142 bpm • Dil: 6cm</p>
                    </div>
                 </div>
                 <div className="p-6 bg-gray-50 rounded-[32px]">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Historique du Transfert</p>
                    <div className="space-y-4">
                       <div className="flex gap-4">
                          <div className="w-1 h-1 bg-teal-600 rounded-full mt-2 shrink-0"></div>
                          <p className="text-xs font-bold">14:20 - Référence initiée par Sage-femme Sarah</p>
                       </div>
                       <div className="flex gap-4">
                          <div className="w-1 h-1 bg-gray-300 rounded-full mt-2 shrink-0"></div>
                          <p className="text-xs font-bold text-gray-400">En attente de réception à l'HGR...</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ReferralSystem;
