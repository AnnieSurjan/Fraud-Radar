
import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, TrendingUp, Shield, Clock, Database, PlayCircle, Star, Zap, Info, Lock } from 'lucide-react';
import Logo from './Logo';
import LegalModal from './LegalModal';
import HelpCenter from './HelpCenter';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onUpgrade: (plan: string, price: string) => void;
  onStartDemo: () => void;
  initialLegalTab?: 'terms' | 'privacy' | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin, onUpgrade, onStartDemo, initialLegalTab }) => {
  const [showLegal, setShowLegal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [legalTab, setLegalTab] = useState<'terms' | 'privacy'>('terms');

  useEffect(() => {
    if (initialLegalTab) {
      setLegalTab(initialLegalTab);
      setShowLegal(true);
    }
  }, [initialLegalTab]);

  const openLegal = (tab: 'terms' | 'privacy') => {
      setLegalTab(tab);
      setShowLegal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Logo variant="light" />
            <div className="flex items-center space-x-6">
              <button onClick={onLogin} className="text-slate-300 hover:text-white font-medium px-4 py-2 transition-colors text-lg">Log in</button>
              <button onClick={onGetStarted} className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-red-900/20 text-lg flex items-center">Get Started <ArrowRight size={20} className="ml-2"/></button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden bg-slate-900 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
          <button 
            onClick={onGetStarted}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-sm font-bold uppercase tracking-wider animate-pulse hover:bg-red-600/20 hover:border-red-500/40 transition-all cursor-pointer group"
          >
            <Clock size={16} className="group-hover:scale-110 transition-transform" /> 7-Day Free Detection Trial Available
          </button>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Secure Your Finances. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">Detect Fraud Early.</span>
          </h1>
          <p className="max-w-3xl text-xl text-slate-400 mb-10 leading-relaxed">
            Fraud Radar is an AI-powered financial surveillance tool designed for SMEs to identify suspicious patterns and potential fraud within QuickBooks and Xero ledgers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onGetStarted} className="group flex items-center justify-center space-x-2 bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-red-50 transition-all shadow-xl">
              <span>Start 7-Day Trial</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={onStartDemo} className="flex items-center justify-center space-x-2 bg-slate-800/50 text-white border border-slate-700 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-800 transition-all backdrop-blur-sm">
              <Zap size={20} className="text-yellow-400 fill-current" />
              <span>Watch Live Radar</span>
            </button>
          </div>
          <p className="mt-8 text-slate-500 text-sm italic max-w-2xl">
            It utilizes advanced machine learning to provide real-time risk scoring and automated anomaly detection, helping businesses secure their finances before losses occur.
          </p>
        </div>
      </div>

      <div className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900">Advanced SME Protection</h2>
                <p className="text-slate-500 mt-4 max-w-2xl mx-auto">We use machine learning to scan for patterns associated with internal and external fraud.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-left">
                    <div className="text-red-600 font-bold text-lg mb-2 flex items-center gap-2">
                        <CheckCircle size={20}/> Included in Trial
                    </div>
                    <ul className="space-y-3 text-slate-600">
                        <li>• Unlimited scanning of your connected ledger</li>
                        <li>• Full AI Anomaly explanations & Insights</li>
                        <li>• Detailed risk scoring for all transactions</li>
                        <li>• Access to Real-time Radar Dashboard</li>
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-left opacity-75">
                    <div className="text-slate-500 font-bold text-lg mb-2 flex items-center gap-2">
                        <Lock size={20}/> Requires Paid Plan
                    </div>
                    <ul className="space-y-3 text-slate-500 italic">
                        <li>• Bulk-resolve duplicate transactions</li>
                        <li>• Batch delete flagged entries in QuickBooks</li>
                        <li>• Mark entries as 'Cleared' in Main Ledger</li>
                        <li>• Export Forensic Audit Trail Reports</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>

      <div className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900">Professional Protection Pricing</h2>
                <p className="text-slate-500 mt-4">Transparent security for businesses of all sizes.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-900">Starter</h3>
                    <div className="mt-4 flex items-baseline"><span className="text-4xl font-bold text-slate-900">$29</span><span className="text-slate-500 ml-1">/mo</span></div>
                    <ul className="mt-6 space-y-4 text-sm flex-1">
                        <li className="flex items-center text-slate-600"><CheckCircle size={16} className="text-green-500 mr-2"/> 1 Ledger Connection</li>
                        <li className="flex items-center text-slate-600"><CheckCircle size={16} className="text-green-500 mr-2"/> Daily AI Radar Scan</li>
                        <li className="flex items-center text-red-600 font-bold"><CheckCircle size={16} className="text-red-500 mr-2"/> 7-Day Detection Trial</li>
                    </ul>
                    <button onClick={() => onUpgrade('Starter', '29')} className="mt-8 w-full py-3 bg-slate-50 border border-slate-200 hover:bg-red-50 text-slate-900 font-semibold rounded-lg transition-all">Start Trial</button>
                </div>

                <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl transform md:-translate-y-4 relative z-10 border border-slate-800 flex flex-col">
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">BEST VALUE</div>
                    <h3 className="text-lg font-semibold text-white">Security Pro</h3>
                    <div className="mt-4 flex items-baseline"><span className="text-4xl font-bold text-white">$69</span><span className="text-slate-400 ml-1">/mo</span></div>
                    <ul className="mt-6 space-y-4 text-sm flex-1">
                        <li className="flex items-center text-slate-300"><CheckCircle size={16} className="text-red-400 mr-2"/> Up to 5 Connections</li>
                        <li className="flex items-center text-slate-300"><CheckCircle size={16} className="text-red-400 mr-2"/> Real-time AI Alerts</li>
                        <li className="flex items-center text-slate-300"><CheckCircle size={16} className="text-red-400 mr-2"/> Audit Trail Export</li>
                        <li className="flex items-center text-slate-300 font-bold text-red-400"><CheckCircle size={16} className="text-red-400 mr-2"/> 7-Day Detection Trial</li>
                    </ul>
                    <button onClick={() => onUpgrade('Professional', '69')} className="mt-8 w-full py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors shadow-lg">Upgrade Now</button>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-900">Enterprise</h3>
                    <div className="mt-4 flex items-baseline"><span className="text-4xl font-bold text-slate-900">$199</span><span className="text-slate-500 ml-1">/mo</span></div>
                    <ul className="mt-6 space-y-4 text-sm flex-1">
                        <li className="flex items-center text-slate-600"><CheckCircle size={16} className="text-green-500 mr-2"/> Unlimited Connections</li>
                        <li className="flex items-center text-slate-600"><CheckCircle size={16} className="text-green-500 mr-2"/> Forensics Support</li>
                        <li className="flex items-center text-slate-600"><CheckCircle size={16} className="text-green-500 mr-2"/> SSO & Role Access</li>
                    </ul>
                    <button onClick={() => onUpgrade('Enterprise', '199')} className="mt-8 w-full py-3 bg-slate-50 border border-slate-200 hover:bg-red-50 text-slate-900 font-semibold rounded-lg transition-all">Contact Sales</button>
                </div>
            </div>
        </div>
      </div>

      <footer className="bg-slate-900 border-t border-slate-800 py-12 text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
              <div><Logo variant="light" className="scale-75 origin-left" /><p className="text-xs mt-2 opacity-60">&copy; 2026 Dat-assist Kft. All rights reserved.</p></div>
              <div className="flex space-x-8 text-sm font-medium mt-4 md:mt-0">
                  <button onClick={() => openLegal('terms')} className="hover:text-white">Terms</button>
                  <button onClick={() => openLegal('privacy')} className="hover:text-white">Privacy</button>
                  <button onClick={() => setShowHelp(true)} className="hover:text-white">Support</button>
              </div>
          </div>
      </footer>
      <LegalModal isOpen={showLegal} onClose={() => setShowLegal(false)} initialTab={legalTab} />
      <HelpCenter isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};

export default LandingPage;
