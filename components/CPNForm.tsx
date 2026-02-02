
import React, { useState } from 'react';
import { ArrowLeft, Save, Printer, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Patient } from '../types';

interface CPNFormProps {
  patient: Patient;
  onBack: () => void;
}

// Fixed SectionTitle by making children optional in the prop type to handle JSX children correctly in all TS environments
const SectionTitle = ({ children }: { children?: React.ReactNode }) => (
  <h3 className="text-sm font-black text-[#2d6a4f] uppercase tracking-widest border-l-4 border-[#2d6a4f] pl-3 mb-6">
    {children}
  </h3>
);

const CPNForm: React.FC<CPNFormProps> = ({ patient, onBack }) => {
  const [activeTab, setActiveTab] = useState<'id' | 'evolution' | 'measures' | 'delivery'>('id');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-[#2d6a4f] transition-colors">
          <ArrowLeft size={20} /> Retour à la liste
        </button>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
            <Printer size={18} /> Imprimer
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-[#2d6a4f] text-white rounded-lg font-bold shadow-lg shadow-teal-900/20">
            <Save size={18} /> Enregistrer
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Fiche de Consultation Prénatale (CPN)</h1>
          <p className="text-gray-500 font-medium">République Démocratique du Congo | Ministère de la Santé</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase">ID National</p>
            <p className="text-lg font-mono font-bold text-[#2d6a4f] tracking-tighter">PNSR-{patient.id.padStart(6, '0')}</p>
          </div>
          <div className={`px-4 py-2 rounded-xl border-2 font-black text-xs ${patient.riskLevel === 'HIGH' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-emerald-50 border-emerald-100 text-[#2d6a4f]'}`}>
            {patient.riskLevel === 'HIGH' ? 'HAUT RISQUE' : 'RISQUE NORMAL'}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
        {[
          { id: 'id', label: 'Identification & Antécédents' },
          { id: 'evolution', label: 'Évolution Grossesse' },
          { id: 'measures', label: 'Mesures Préventives' },
          { id: 'delivery', label: 'Accouchement & Suivi' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab.id ? 'border-[#2d6a4f] text-[#2d6a4f]' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 min-h-[500px]">
        {activeTab === 'id' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <SectionTitle>I. Identification</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Nom et Postnoms</label>
                  <p className="border-b-2 border-gray-100 py-1 font-bold text-gray-800">{patient.name} {patient.postname || ''}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Date de Naissance</label>
                  <p className="border-b-2 border-gray-100 py-1 font-bold text-gray-800">{patient.dob || '--/--/----'}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">État Civil</label>
                  <p className="border-b-2 border-gray-100 py-1 font-bold text-gray-800">{patient.civilStatus || 'Mariée'}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Adresse</label>
                  <p className="border-b-2 border-gray-100 py-1 font-bold text-gray-800">{patient.address || 'Q. Mabanga Sud, Goma'}</p>
                </div>
              </div>

              <SectionTitle>II. Antécédents Médicaux</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {['TB', 'HTA', 'SCA', 'DBT', 'CAR', 'HMO', 'MGF', 'RA'].map(code => (
                  <div key={code} className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
                    patient.antecedents?.medical?.includes(code) 
                    ? 'bg-red-50 border-red-200 text-red-600' 
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}>
                    {code}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <SectionTitle>III. Antécédents Obstétricaux</SectionTitle>
              <div className="grid grid-cols-4 gap-4 bg-gray-50 p-6 rounded-xl">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold">Parité</p>
                  <p className="text-2xl font-black text-[#2d6a4f]">{patient.antecedents?.obstetrical.parity || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold">Gravidité</p>
                  <p className="text-2xl font-black text-[#2d6a4f]">{patient.antecedents?.obstetrical.gravidity || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold">Avortement</p>
                  <p className="text-2xl font-black text-red-500">{patient.antecedents?.obstetrical.abortions || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold">Vivants</p>
                  <p className="text-2xl font-black text-emerald-600">{patient.antecedents?.obstetrical.livingChildren || 0}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-3">
                {[
                  { label: 'Césarienne', value: patient.antecedents?.obstetrical.cSection },
                  { label: 'Cerclage', value: patient.antecedents?.obstetrical.cerclage },
                  { label: 'Ventouse/Forceps', value: patient.antecedents?.obstetrical.vacuum },
                  { label: 'Bassin Vicié', value: patient.antecedents?.obstetrical.fracturedPelvis },
                  { label: 'Dystocie', value: patient.antecedents?.obstetrical.dystocia },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${item.value ? 'bg-[#2d6a4f] border-[#2d6a4f]' : 'border-gray-300'}`}>
                      {item.value && <CheckCircle2 size={10} className="text-white" />}
                    </div>
                    <span className="text-xs font-bold text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evolution' && (
          <div className="space-y-6">
            <SectionTitle>Évolution de la grossesse actuelle</SectionTitle>
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-black uppercase">
                  <tr>
                    <th className="px-4 py-3 border-b">Date</th>
                    <th className="px-4 py-3 border-b">Mois/Sem</th>
                    <th className="px-4 py-3 border-b">Poids (kg)</th>
                    <th className="px-4 py-3 border-b">T.A. (mmHg)</th>
                    <th className="px-4 py-3 border-b">Mvts Foet.</th>
                    <th className="px-4 py-3 border-b">RCF (BPM)</th>
                    <th className="px-4 py-3 border-b">Présent.</th>
                    <th className="px-4 py-3 border-b">Oedèmes</th>
                    <th className="px-4 py-3 border-b">Alb./Glu.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {/* Added safety check for optional evolution array */}
                  {(patient.evolution || []).map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium">{row.date}</td>
                      <td className="px-4 py-3">{row.monthsWeeks}</td>
                      <td className="px-4 py-3 font-bold">{row.weight}</td>
                      <td className={`px-4 py-3 font-bold ${row.bp.includes('14') ? 'text-red-500' : ''}`}>{row.bp}</td>
                      <td className="px-4 py-3">{row.fetalMovements ? 'Présents' : 'Absents'}</td>
                      <td className="px-4 py-3">{row.fetalHeartRate}</td>
                      <td className="px-4 py-3">{row.presentation}</td>
                      <td className="px-4 py-3">{row.edema ? 'Oui' : 'Non'}</td>
                      <td className="px-4 py-3 text-[10px]">{row.albuminuria}/{row.glucosuria}</td>
                    </tr>
                  ))}
                  <tr className="bg-teal-50/20">
                    <td className="px-4 py-3 border-t"><input type="date" className="bg-transparent w-full outline-none" /></td>
                    <td className="px-4 py-3 border-t"><input type="text" className="bg-transparent w-full outline-none" placeholder="..." /></td>
                    <td className="px-4 py-3 border-t"><input type="number" className="bg-transparent w-full outline-none" placeholder="--" /></td>
                    <td className="px-4 py-3 border-t"><input type="text" className="bg-transparent w-full outline-none" placeholder="12/8" /></td>
                    <td className="px-4 py-3 border-t"><select className="bg-transparent outline-none"><option>Oui</option><option>Non</option></select></td>
                    <td className="px-4 py-3 border-t"><input type="text" className="bg-transparent w-full outline-none" placeholder="140" /></td>
                    <td className="px-4 py-3 border-t"><input type="text" className="bg-transparent w-full outline-none" placeholder="Céphal." /></td>
                    <td className="px-4 py-3 border-t"><select className="bg-transparent outline-none"><option>Non</option><option>Oui</option></select></td>
                    <td className="px-4 py-3 border-t">...</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-2xl flex items-start gap-4 border border-orange-100">
              <AlertTriangle className="text-orange-600 shrink-0" />
              <div>
                <h4 className="font-bold text-orange-900 text-sm">Vérification de Danger</h4>
                <p className="text-xs text-orange-800/80 leading-relaxed mt-1">
                  Rechercher : Saignements, Maux de tête violents, Fièvre, Vision floue, Absence de mouvements foetaux.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'measures' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <SectionTitle>Vaccination Antitétanique (VAT)</SectionTitle>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(v => (
                  <div key={v} className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50">
                    <span className="text-xs font-bold text-gray-700">VAT {v}</span>
                    {/* Added optional chaining to handle potentially undefined preventiveMeasures */}
                    <input type="date" className="text-xs font-bold outline-none border-b border-gray-100 bg-transparent" defaultValue={patient.preventiveMeasures?.vatDates[v-1]} />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <SectionTitle>Autres Mesures Préventives</SectionTitle>
              <div className="space-y-4">
                <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100">
                  <h4 className="text-xs font-bold text-teal-800 mb-4 uppercase">Antipaludique (SP)</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map(dose => (
                      <div key={dose} className="text-center">
                        <p className="text-[10px] text-teal-600 font-bold mb-1">Dose {dose}</p>
                        <input type="date" className="w-full text-[10px] p-2 rounded bg-white border border-teal-200" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 border rounded-xl">
                    {/* Added optional chaining for preventiveMeasures property access */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${patient.preventiveMeasures?.ironFolic ? 'bg-[#2d6a4f] text-white' : 'bg-gray-100 text-gray-300'}`}>
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-xs font-bold">Fer / Acide Folique</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 border rounded-xl">
                    {/* Added optional chaining for preventiveMeasures property access */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${patient.preventiveMeasures?.mebendazole ? 'bg-[#2d6a4f] text-white' : 'bg-gray-100 text-gray-300'}`}>
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-xs font-bold">Mébendazole</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 border rounded-xl col-span-2">
                    {/* Added optional chaining for preventiveMeasures property access */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${patient.preventiveMeasures?.itn ? 'bg-[#2d6a4f] text-white' : 'bg-gray-100 text-gray-300'}`}>
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-xs font-bold">MII (Moustiquaire Imprégnée)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-400">
            <AlertTriangle size={48} />
            <div>
              <p className="font-bold text-lg">Données Post-partum non disponibles</p>
              <p className="text-sm">Veuillez compléter le travail via l'onglet Parthogramme d'abord.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CPNForm;