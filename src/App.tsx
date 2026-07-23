import React from 'react';
import { SettingsForm } from './components/SettingsForm';
import { Shield } from 'lucide-react';

function App() {
  const handleSaveSuccess = (data: any) => {
    console.log('Settings Saved:', data);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4">
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-8 select-none">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <Shield className="text-white" size={22} />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-none bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            AegisGuard
          </h1>
          <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">
            Intrusion Detection System
          </span>
        </div>
      </div>

      {/* Main Settings Form */}
      <SettingsForm onSubmitSuccess={handleSaveSuccess} />
    </div>
  );
}

export default App;
