
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  UserCircle, ClipboardList, Activity, MessageSquare, Share2, 
  BarChart3, Menu, X, Bell, Syringe, LogOut, Home, ChevronRight, 
  LogOut as QuitIcon, CloudOff, Wifi, CheckCircle2, AlertTriangle,
  Baby, Calendar, PhoneCall, Heart
} from 'lucide-react';
import { Role, JobRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  role: Role;
  jobRole: JobRole | null;
  onLogout: () => void;
  onQuit: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, jobRole, onLogout, onQuit }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStatusChange = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  const isCommunity = role === Role.COMMUNAUTE;

  // --- LOGIQUE DES MENUS PROFESSIONNELS ---
  const getProMenuItems = () => {
    const isAdmin = jobRole === JobRole.ADMIN;
    const isMedical = jobRole === JobRole.MEDECIN || jobRole === JobRole.SAGE_FEMME;
    const isNursing = jobRole === JobRole.INFIRMIER;
    const baseItems = [{ name: 'Accueil', icon: Home, path: '/' }, { name: 'AfyaBot', icon: MessageSquare, path: '/afyabot' }];

    if (role === Role.AIRE_DE_SANTE || role === Role.ZONE_DE_SANTE) {
      let items = [...baseItems];
      if (isMedical || isNursing) items.push({ name: 'CPN', icon: ClipboardList, path: '/cpn' });
      if (isMedical) items.push({ name: 'Partogramme', icon: Activity, path: '/partogram' });
      if (isAdmin || isMedical) items.push({ name: 'Réfs', icon: Share2, path: '/referrals' });
      return items;
    }
    // Menu par défaut pour DPS et COMFORT
    return [...baseItems, { name: 'CPN', icon: ClipboardList, path: '/cpn' }, { name: 'Stats', icon: BarChart3, path: '/stats' }];
  };

  // --- RENDU 1 : ESPACE PROFESSIONNEL (DPS, ZONE, AIRE, COMFORT) ---
  if (!isCommunity) {
    const proMenu = getProMenuItems();
    return (
      <div className="min-h-screen flex bg-[#f8fafc]">
        {/* Sidebar Desktop Professionnelle */}
        <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 h-screen sticky top-0">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#2d6a4f] rounded-2xl flex items-center justify-center text-white font-black shadow-lg">M+</div>
              <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">MaternalCare+</h1>
            </div>
          </div>
          <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto no-scrollbar">
            {proMenu.map((item) => (
              <Link key={item.path} to={item.path} className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${location.pathname === item.path ? 'bg-[#2d6a4f] text-white shadow-xl shadow-teal-900/10' : 'text-gray-500 hover:bg-teal-50 hover:text-[#2d6a4f]'}`}>
                <div className="flex items-center gap-3"><item.icon size={18} /> <span className="text-sm font-bold">{item.name}</span></div>
                {location.pathname === item.path && <ChevronRight size={14} />}
              </Link>
            ))}
          </nav>
          <div className="p-6 border-t border-gray-50 space-y-2">
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-600 hover:bg-gray-50 font-bold text-sm"><LogOut size={18} /> Déconnexion</button>
            <button onClick={onQuit} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 font-bold text-sm"><QuitIcon size={18} /> Quitter</button>
          </div>
        </aside>

        {/* Content Area Professionnelle */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-50 sticky top-0 z-40">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">Console {role.replace('_', ' ')}</h2>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase ${isOnline ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600 animate-pulse'}`}>
                {isOnline ? <Wifi size={12} /> : <CloudOff size={12} />} {isOnline ? 'Online' : 'Offline'}
              </div>
              <div className="w-9 h-9 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#2d6a4f]"><UserCircle size={20} /></div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6 lg:p-10 pb-24 lg:pb-10 no-scrollbar">{children}</main>

          {/* Navigation Mobile Professionnelle (Rétablie pour DPS/Zone/etc) */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-between z-50">
            {proMenu.slice(0, 4).map((item) => (
              <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 ${location.pathname === item.path ? 'text-[#2d6a4f]' : 'text-gray-300'}`}>
                <div className={`p-2.5 rounded-xl ${location.pathname === item.path ? 'bg-[#2d6a4f] text-white shadow-lg' : ''}`}>
                  <item.icon size={20} />
                </div>
                <span className="text-[9px] font-black uppercase">{item.name}</span>
              </Link>
            ))}
            <button onClick={onLogout} className="flex flex-col items-center gap-1 text-red-400">
               <div className="p-2.5 rounded-xl bg-red-50"><LogOut size={20} /></div>
               <span className="text-[9px] font-black uppercase">Quitter</span>
            </button>
          </nav>
        </div>
      </div>
    );
  }

  // --- RENDU 2 : ESPACE COMMUNAUTAIRE (APPLICATION MAMAN) ---
  return (
    <div className="min-h-screen bg-rose-50/20 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col overflow-hidden border-x border-rose-100/30">
        
        {/* Header Communautaire Mobile Style */}
        <header className="px-6 pt-12 pb-6 flex items-center justify-between bg-gradient-to-b from-rose-50/50 to-white">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Heart size={12} className="text-rose-400 fill-rose-400 animate-pulse" />
              <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Ma Santé Maternelle</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">MaternalCare</h1>
          </div>
          <button onClick={onLogout} className="p-3 bg-white shadow-xl shadow-rose-900/5 border border-rose-50 rounded-2xl text-gray-400 hover:text-rose-500 transition-colors">
            <LogOut size={20} />
          </button>
        </header>

        {/* Content Communautaire */}
        <main className="flex-1 px-6 pb-32 overflow-y-auto no-scrollbar">
          {children}
        </main>

        {/* Navigation Communautaire Mobile Unique (Tab Bar Rose/Teal) */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-2xl border-t border-rose-50 px-8 py-4 flex items-center justify-between z-50 rounded-t-[40px] shadow-[0_-15px_40px_-15px_rgba(244,63,94,0.15)]">
          <Link to="/" className={`flex flex-col items-center gap-1.5 transition-all ${location.pathname === '/' ? 'text-rose-600 scale-110' : 'text-gray-300'}`}>
            <div className={`p-3 rounded-2xl transition-colors ${location.pathname === '/' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-transparent'}`}>
              <Baby size={22} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">Maman</span>
          </Link>
          
          <Link to="/afyabot" className={`flex flex-col items-center gap-1.5 transition-all ${location.pathname === '/afyabot' ? 'text-teal-600 scale-110' : 'text-gray-300'}`}>
            <div className={`p-3 rounded-2xl transition-colors ${location.pathname === '/afyabot' ? 'bg-teal-500 text-white shadow-lg shadow-teal-200' : 'bg-transparent'}`}>
              <MessageSquare size={22} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">AfyaBot</span>
          </Link>

          <Link to="/vaccination" className={`flex flex-col items-center gap-1.5 transition-all ${location.pathname === '/vaccination' ? 'text-purple-600 scale-110' : 'text-gray-300'}`}>
            <div className={`p-3 rounded-2xl transition-colors ${location.pathname === '/vaccination' ? 'bg-purple-500 text-white shadow-lg shadow-purple-200' : 'bg-transparent'}`}>
              <Calendar size={22} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">Vaccins</span>
          </Link>

          <button onClick={onQuit} className="flex flex-col items-center gap-1.5 text-gray-300 hover:text-rose-500 transition-colors">
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <PhoneCall size={22} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">Quitter</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
