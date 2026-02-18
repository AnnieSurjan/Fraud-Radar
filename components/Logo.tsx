
import React from 'react';
import { ShieldAlert, Radar } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '' }) => {
  const isLight = variant === 'light';
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-10 h-10 shrink-0">
        <div className="absolute inset-0 bg-red-600 rounded-xl shadow-lg shadow-red-600/20 flex items-center justify-center">
          <Radar className="text-white" size={22} strokeWidth={2.5} />
        </div>
        <div className="absolute -bottom-1.5 -right-1.5 bg-white p-0.5 rounded-full shadow-sm ring-1 ring-slate-100">
             <div className="bg-red-50 rounded-full p-1">
                <ShieldAlert className="text-red-600" size={14} strokeWidth={3} />
             </div>
        </div>
      </div>
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight leading-none">
          <span className={isLight ? 'text-white' : 'text-slate-900'}>Fraud</span>
          <span className="text-red-600">Radar</span>
        </h1>
        <p className={`text-[10px] font-bold tracking-widest uppercase ${isLight ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
          SME Anomaly Detector
        </p>
      </div>
    </div>
  );
};

export default Logo;
