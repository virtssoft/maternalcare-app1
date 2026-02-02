
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Download, TrendingUp, TrendingDown, Map as MapIcon } from 'lucide-react';

const zoneData = [
  { name: 'Goma', active: 1284, highRisk: 145, deathRate: 0.02 },
  { name: 'Karisimbi', active: 945, highRisk: 88, deathRate: 0.01 },
  { name: 'Nyiragongo', active: 756, highRisk: 112, deathRate: 0.05 },
];

const riskData = [
  { name: 'Bas Risque', value: 70 },
  { name: 'Moyen Risque', value: 20 },
  { name: 'Haut Risque', value: 10 },
];

const COLORS = ['#2d6a4f', '#52b788', '#ef4444'];

const Statistics: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Rapport Statistique Provincial</h2>
          <p className="text-gray-500">DPS Nord-Kivu | Consolidation COMFORT ASBL</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50">
          <Download size={18} /> Exporter Excel (DHIS2)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-xs text-gray-400 uppercase font-bold">Décès Maternels (2024)</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-black text-gray-900">08</p>
            <span className="flex items-center text-green-600 text-xs font-bold">
              <TrendingDown size={14} className="mr-1" /> -15% vs 2023
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-xs text-gray-400 uppercase font-bold">Référence vers HGR</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-black text-gray-900">342</p>
            <span className="flex items-center text-blue-600 text-xs font-bold">
              <TrendingUp size={14} className="mr-1" /> +8%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-xs text-gray-400 uppercase font-bold">Utilisatrices AfyaBot</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-black text-gray-900">2,410</p>
            <span className="flex items-center text-teal-600 text-xs font-bold">
              Nouvel Indicateur
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <MapIcon size={20} className="text-teal-600" /> Cas par Zone de Santé
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="active" fill="#2d6a4f" radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10 }} />
                <Bar dataKey="highRisk" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold mb-6">Répartition par Niveau de Risque</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
