
import React, { useState } from 'react';
import { X, FileText, Shield, Scale, Lock, Building, Cookie, Globe, RotateCcw } from 'lucide-react';
import { LegalContent } from './LandingPage';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'terms' | 'privacy' | 'refund';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, initialTab = 'terms' }) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'refund'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-2xl w-full max-w-4xl h-[85vh] shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-slate-800 rounded-lg">
                <Scale size={20} className="text-slate-200"/>
             </div>
             <div>
                <h2 className="text-lg font-bold">Legal & Compliance</h2>
                <p className="text-xs text-slate-400">Dat-assist Kft. (EU/Hungary)</p>
             </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
            <button 
                onClick={() => setActiveTab('terms')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center space-x-2 transition-colors border-b-2 ${activeTab === 'terms' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
                <FileText size={16}/>
                <span>Terms</span>
            </button>
            <button 
                onClick={() => setActiveTab('privacy')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center space-x-2 transition-colors border-b-2 ${activeTab === 'privacy' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
                <Shield size={16}/>
                <span>Privacy</span>
            </button>
            <button 
                onClick={() => setActiveTab('refund')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center space-x-2 transition-colors border-b-2 ${activeTab === 'refund' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
                <RotateCcw size={16}/>
                <span>Refund</span>
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-white text-slate-700 leading-relaxed scroll-smooth">
            <LegalContent activeTab={activeTab} />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
            >
                I Understand
            </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
