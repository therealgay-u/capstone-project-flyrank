import React from 'react';
import { 
  Settings, 
  User, 
  ShieldAlert, 
  Bell, 
  Menu, 
  HelpCircle, 
  LogOut,
  Sliders,
  Database,
  KeyRound
} from 'lucide-react';
import SettingsForm from './components/SettingsForm';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar Nav */}
      <aside className="w-full md:w-64 bg-slate-900/40 border-r border-slate-900 flex flex-col shrink-0">
        {/* Brand */}
        <div className="h-16 px-6 flex items-center gap-2.5 border-b border-slate-900 bg-slate-900/50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Settings className="text-white animate-spin-slow" size={18} />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-none bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Antigravity</h1>
            <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">Console</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Settings Manager</div>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-slate-800/60 text-indigo-400 font-medium border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <Sliders size={18} />
            System Config
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 transition-all">
            <KeyRound size={18} />
            API Keys
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 transition-all">
            <Database size={18} />
            Data Backup
          </a>
          <div className="px-3 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Support</div>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 transition-all">
            <HelpCircle size={18} />
            Documentation
          </a>
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-900/80">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-rose-400/80 hover:text-rose-400 hover:bg-rose-950/20 transition-all font-medium">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950/90 relative overflow-y-auto">
        {/* Dynamic Glowing background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px] pointer-events-none" />

        {/* Header */}
        <header className="h-16 border-b border-slate-900 px-6 md:px-8 flex items-center justify-between shrink-0 bg-slate-950/40 backdrop-blur-md z-10">
          <div className="flex items-center gap-3 md:hidden">
            <button className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900/50">
              <Menu size={20} />
            </button>
          </div>
          <div className="hidden md:block">
            <h2 className="text-sm font-medium text-slate-400">Settings Workspace</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900/50 relative">
              <Bell size={18} />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 absolute top-1 right-1" />
            </button>
            <div className="h-8 w-px bg-slate-900" />
            <div className="flex items-center gap-2">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
                alt="Avatar" 
                className="w-7 h-7 rounded-full object-cover border border-slate-800"
              />
              <span className="text-xs font-semibold text-slate-300">Jane Doe</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-8 max-w-5xl w-full mx-auto space-y-6 z-10">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Settings & Customizations
            </h1>
            <p className="text-sm text-slate-400">
              Configure profile information, update account options, and customize notifications.
            </p>
          </div>

          {/* Form */}
          <SettingsForm />
        </div>
      </main>
    </div>
  );
}
