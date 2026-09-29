import { Search, Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 glass-panel border-t-0 border-x-0 rounded-none px-6 flex items-center justify-between z-10 sticky top-0 bg-[#0f172a]/50">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Busque clientes, pipelines ou pergunte à Mydras AI..." 
          className="w-full bg-black/20 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors relative">
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center">
              <User className="w-5 h-5 text-gray-300" />
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Líder Comercial</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}