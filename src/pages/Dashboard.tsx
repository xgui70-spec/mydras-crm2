import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity, BrainCircuit, CheckCircle2, Clock } from 'lucide-react';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Abr', value: 4500 },
  { name: 'Mai', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7500 },
];

const recentClients = [
  { id: 1, name: 'TechCorp Brasil', status: 'Em negociação', value: 'R$ 45.000', color: 'text-blue-400' },
  { id: 2, name: 'Global Industries', status: 'Fechado', value: 'R$ 120.000', color: 'text-green-400' },
  { id: 3, name: 'EcoSolutions', status: 'Proposta', value: 'R$ 18.500', color: 'text-yellow-400' },
];

const activities = [
  { id: 1, type: 'call', title: 'Call de alinhamento com Marcos', time: '10:00 AM' },
  { id: 2, type: 'email', title: 'Enviar proposta formal para EcoSolutions', time: '14:30 PM' },
  { id: 3, type: 'meeting', title: 'Reunião de fechamento Global Industries', time: '16:00 PM' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Visão Geral
          </h1>
          <p className="text-gray-400 mt-1">Bem-vindo de volta. Aqui está o resumo do seu pipeline hoje.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Receita Mensal" value="R$ 124.500" trend="+14%" icon={<DollarSign className="w-5 h-5 text-blue-400" />} />
        <MetricCard title="Novos Leads" value="342" trend="+8%" icon={<Users className="w-5 h-5 text-purple-400" />} />
        <MetricCard title="Taxa de Conversão" value="24.5%" trend="-2%" icon={<Activity className="w-5 h-5 text-green-400" />} />
        <MetricCard title="Deals Fechados" value="28" trend="+12%" icon={<TrendingUp className="w-5 h-5 text-orange-400" />} />
      </div>

      {/* Main Grid: Chart & AI Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6">
          <h2 className="text-lg font-semibold mb-6">Evolução de Receita</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#6b7280" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(8px)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <BrainCircuit className="w-6 h-6 text-purple-400" />
            <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Mydras AI Insights</h2>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/5">
              <p className="text-sm text-gray-300">Há uma probabilidade de <span className="text-green-400 font-bold">85%</span> de fechar o deal com a <strong className="text-white">TechCorp Brasil</strong> se você contatá-los hoje à tarde.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/5">
              <p className="text-sm text-gray-300">Notei que a <strong className="text-white">EcoSolutions</strong> atrasou a resposta da proposta. Deseja que eu rascunhe um email de follow-up?</p>
              <button className="mt-3 text-xs bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-full hover:bg-purple-500/30 transition-colors border border-purple-500/30">Gerar Rascunho</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Pipeline, Clients, Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold mb-4">Pipeline de Vendas</h2>
          <div className="space-y-4">
            <PipelineBar label="Prospecção" value={45} count={12} color="bg-blue-400" />
            <PipelineBar label="Qualificação" value={30} count={8} color="bg-purple-400" />
            <PipelineBar label="Proposta" value={15} count={4} color="bg-yellow-400" />
            <PipelineBar label="Fechamento" value={10} count={2} color="bg-green-400" />
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Clientes Recentes</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300">Ver todos</button>
          </div>
          <div className="space-y-4">
            {recentClients.map(client => (
              <div key={client.id} className="flex flex-col p-3 rounded-lg bg-black/20 hover:bg-black/40 transition-colors border border-white/5">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">{client.name}</span>
                  <span className="text-sm font-semibold">{client.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-current ${client.color}`}></div>
                  <span className="text-xs text-gray-400">{client.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Próximas Atividades</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300">Agenda</button>
          </div>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[9px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {activities.map(act => (
              <div key={act.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 bg-[#0f172a] text-gray-400 shrink-0 z-10">
                  {act.type === 'call' ? <Activity className="w-3 h-3 text-blue-400" /> : act.type === 'email' ? <CheckCircle2 className="w-3 h-3 text-purple-400" /> : <Clock className="w-3 h-3 text-yellow-400" />}
                </div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg bg-black/20 border border-white/5 ml-4 md:ml-0 md:mr-4 md:group-odd:ml-4 md:group-odd:mr-0">
                  <h4 className="text-sm font-medium">{act.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="glass-panel p-5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
        <div className="w-16 h-16">{icon}</div>
      </div>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className="p-2 bg-black/20 rounded-lg border border-white/5">
          {icon}
        </div>
      </div>
      <div className="flex items-end gap-3">
        <h2 className="text-2xl font-bold">{value}</h2>
        <span className={`text-sm font-medium mb-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function PipelineBar({ label, value, count, color }: { label: string, value: number, count: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label} <span className="text-gray-500 text-xs ml-1">({count})</span></span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}