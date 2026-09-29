import { Home, Users, BarChart2, Calendar, Settings, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 glass-panel border-l-0 border-y-0 rounded-none flex flex-col p-4 z-10">
      <div className="flex items-center gap-2 px-2 py-4 mb-8">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-wider">MYDRAS</span>
      </div>
      
      <nav className="flex-1 flex flex-col gap-2">
        <NavItem icon={<Home className="w-5 h-5"/>} label="Dashboard" active />
        <NavItem icon={<Users className="w-5 h-5"/>} label="Clientes" />
        <NavItem icon={<BarChart2 className="w-5 h-5"/>} label="Pipeline" />
        <NavItem icon={<Calendar className="w-5 h-5"/>} label="Agenda" />
        <NavItem icon={<Settings className="w-5 h-5"/>} label="Configurações" />
      </nav>
      
      <div className="mt-auto glass-panel p-4 flex flex-col gap-2 items-center text-center">
        <Brain className="w-8 h-8 text-purple-400" />
        <h4 className="text-sm font-semibold">Mydras AI</h4>
        <p className="text-xs text-gray-400">Seu assistente premium ativo.</p>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${active ? 'bg-white/10 text-white shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  )
}