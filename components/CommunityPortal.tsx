
import React, { useState, useMemo } from 'react';
import { Sparkles, Calendar, MessageCircle, HeartPulse, Info, ArrowRight, Activity, Bell, Phone, AlertCircle, Baby as BabyIcon, X, ShieldCheck, Heart, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CommunityPortalProps {
  userId: string;
}

const CommunityPortal: React.FC<CommunityPortalProps> = ({ userId }) => {
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [sosSent, setSosSent] = useState(false);

  // Mock data store for patients
  const patientDataMap: Record<string, any> = {
    '0991234567': {
      name: 'Sarah Masika',
      weeks: 32,
      healthCenter: 'CS Heal Africa',
      nextVisit: '12 Juin 2024',
      vaccineStatus: 'VAT 2 : Prêt',
      husbandName: 'Papa Sarah',
      progress: 80,
      doctorPhone: '0990000001',
      mood: 'En forme',
      tip: "Pensez à marcher 20 minutes par jour pour faciliter l'accouchement."
    },
    '0812345678': {
      name: 'Zawadi Neema',
      weeks: 14,
      healthCenter: 'CS Mabanga Sud',
      nextVisit: '18 Juin 2024',
      vaccineStatus: 'VAT 1 : Terminé',
      husbandName: 'Papa Zawadi',
      progress: 35,
      doctorPhone: '0810000002',
      mood: 'Un peu fatiguée',
      tip: "Le fer est essentiel pour vous et bébé. N'oubliez pas vos comprimés."
    }
  };

  const user = useMemo(() => patientDataMap[userId] || patientDataMap['0991234567'], [userId]);

  const triggerSOS = () => {
    setSosSent(true);
    setTimeout(() => {
      setShowSOSModal(true);
      setSosSent(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* Welcome Greeting */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Bienvenue,</p>
          <h2 className="text-2xl font-black text-gray-900 tracking-tighter italic">Maman {user.name.split(' ')[0]} 👋</h2>
        </div>
        <div className="w-14 h-14 bg-rose-100 rounded-3xl border-4 border-white shadow-xl flex items-center justify-center text-rose-500 font-black">
          {user.name[0]}
        </div>
      </div>

      {/* Main Journey Card */}
      <div className="relative bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] p-8 rounded-[48px] text-white shadow-2xl shadow-teal-900/20 overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Star size={14} className="text-teal-300 fill-teal-300" />
            <span className="text-[10px] font-black uppercase tracking-widest text-teal-200">Ma 32ème Semaine</span>
          </div>
          
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] font-bold text-teal-100 uppercase opacity-60">État de grossesse</p>
              <h3 className="text-4xl font-black tracking-tighter italic">80% Prêt</h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-teal-100 uppercase opacity-60">Poids Estimé</p>
              <h3 className="text-2xl font-black tracking-tighter">~1.8 kg</h3>
            </div>
          </div>

          <div className="relative h-2.5 bg-white/10 rounded-full mb-4">
            <div className="absolute h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${user.progress}%` }}></div>
            <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center" style={{ left: `calc(${user.progress}% - 12px)` }}>
              <BabyIcon size={12} className="text-[#2d6a4f]" />
            </div>
          </div>
          <p className="text-[9px] font-bold text-teal-100 italic">"Bébé a maintenant la taille d'une courge !"</p>
        </div>
        
        {/* Visual Decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
      </div>

      {/* Quick Access Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-rose-50/50 p-6 rounded-[32px] border border-rose-100 flex flex-col items-center text-center">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm mb-3">
            <Calendar size={20} />
          </div>
          <p className="text-[9px] font-black text-rose-400 uppercase mb-1">RDV Prochain</p>
          <p className="text-xs font-black text-gray-800">{user.nextVisit}</p>
        </div>
        <div className="bg-blue-50/50 p-6 rounded-[32px] border border-blue-100 flex flex-col items-center text-center">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm mb-3">
            <MapPin size={20} />
          </div>
          <p className="text-[9px] font-black text-blue-400 uppercase mb-1">Ma Structure</p>
          <p className="text-xs font-black text-gray-800">{user.healthCenter.split(' ')[1]}</p>
        </div>
      </div>

      {/* Daily Tip Card */}
      <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex items-start gap-4">
        <div className="w-12 h-12 shrink-0 bg-yellow-50 text-yellow-600 rounded-3xl flex items-center justify-center italic font-black">Tip</div>
        <div>
          <h4 className="text-[10px] font-black uppercase text-gray-400 mb-1">Conseil du Jour</h4>
          <p className="text-xs font-medium text-gray-700 leading-relaxed italic">"{user.tip}"</p>
        </div>
      </div>

      {/* SOS EMERGENCY BUTTON - VERY PROMINENT */}
      <button 
        onClick={triggerSOS}
        disabled={sosSent}
        className={`w-full p-8 rounded-[48px] text-white transition-all relative overflow-hidden flex items-center justify-between shadow-2xl ${sosSent ? 'bg-orange-500 scale-95' : 'bg-rose-600 hover:scale-[1.02] shadow-rose-900/30'}`}
      >
        <div className="relative z-10 text-left">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-1 italic">
            {sosSent ? 'Alerte Active...' : 'Signe de Danger ?'}
          </h3>
          <p className="text-[10px] font-black opacity-80 uppercase tracking-widest">Besoin d'aide immédiate</p>
        </div>
        {sosSent ? <Activity size={32} className="animate-pulse" /> : <AlertCircle size={32} />}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
      </button>

      {/* Husband Space - Visual Departure */}
      <div className="bg-gray-900 p-10 rounded-[56px] text-white relative overflow-hidden group">
         <div className="relative z-10">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-rose-500 rounded-2xl text-white shadow-lg shadow-rose-900/40"><ShieldCheck size={24} /></div>
              <h4 className="text-lg font-black uppercase tracking-tighter italic">Espace {user.husbandName}</h4>
           </div>
           <p className="text-sm text-gray-400 font-medium leading-relaxed mb-10 italic border-l-4 border-rose-500 pl-6">
              "Papa, préparez dès maintenant le transport pour le jour J. Maman compte sur vous."
           </p>
           <button 
            onClick={() => setShowGuideModal(true)}
            className="w-full py-5 bg-white text-gray-900 rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
           >
             Guide du futur Papa &rarr;
           </button>
         </div>
         <div className="absolute right-0 bottom-0 opacity-10">
            <Heart size={200} className="text-rose-500" />
         </div>
      </div>

      {/* SOS Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-sm rounded-[56px] p-10 text-center shadow-2xl animate-in zoom-in-95">
              <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <AlertCircle size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic">Alerte Transmise !</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">
                L'équipe du {user.healthCenter} a reçu votre alerte. Restez assise et calmez-vous, ils vous appellent.
              </p>
              <button 
                onClick={() => setShowSOSModal(false)}
                className="w-full py-5 bg-gray-900 text-white rounded-[24px] font-black uppercase tracking-widest"
              >
                J'ai compris
              </button>
           </div>
        </div>
      )}

      {/* Papa Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-sm rounded-[64px] p-10 shadow-2xl overflow-y-auto max-h-[80vh] relative animate-in slide-in-from-bottom-8">
              <button onClick={() => setShowGuideModal(false)} className="absolute top-6 right-6 p-3 bg-gray-50 rounded-2xl"><X size={24}/></button>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">Le Guide du Papa</h3>
              <div className="space-y-8">
                <div className="p-8 bg-teal-50 rounded-[40px]">
                   <h4 className="font-black text-xs uppercase text-teal-700 mb-4 tracking-widest flex items-center gap-2">
                     <Star size={14} /> Kit d'accouchement
                   </h4>
                   <ul className="text-[11px] text-teal-900 space-y-3 font-bold">
                      <li className="flex items-center gap-2">✅ 2 savons (Baby)</li>
                      <li className="flex items-center gap-2">✅ Linge propre & sec</li>
                      <li className="flex items-center gap-2">✅ Lampe chargée</li>
                      <li className="flex items-center gap-2">✅ Carnet CPN de {user.name.split(' ')[0]}</li>
                   </ul>
                </div>
                <div className="p-8 bg-rose-50 rounded-[40px]">
                   <h4 className="font-black text-xs uppercase text-rose-700 mb-4 tracking-widest flex items-center gap-2">
                     <AlertCircle size={14} /> En cas d'urgence
                   </h4>
                   <p className="text-[11px] text-rose-900 font-bold leading-relaxed italic">
                     Appelez le {user.doctorPhone} ou appuyez sur le bouton SOS de l'application si Maman saigne ou a des vertiges.
                   </p>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPortal;
