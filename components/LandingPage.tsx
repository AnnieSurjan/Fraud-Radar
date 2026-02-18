
import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, TrendingUp, Shield, Clock, Database, PlayCircle, Star, Zap, Info, Lock, ChevronLeft, FileText, Scale, HelpCircle, CreditCard, RotateCcw } from 'lucide-react';
import Logo from './Logo';
import HelpCenter from './HelpCenter';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onUpgrade: (plan: string, price: string) => void;
  onStartDemo: () => void;
  initialLegalTab?: 'terms' | 'privacy' | 'refund' | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin, onUpgrade, onStartDemo, initialLegalTab }) => {
  const [activeLegalView, setActiveLegalView] = useState<'terms' | 'privacy' | 'refund' | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (initialLegalTab) {
      setActiveLegalView(initialLegalTab);
    }
  }, [initialLegalTab]);

  if (activeLegalView) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
          <div className="max-w-7xl auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Logo variant="light" />
            <button 
              onClick={() => setActiveLegalView(null)}
              className="flex items-center text-slate-300 hover:text-white transition-colors gap-2 font-bold group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform"/> Back to Home
            </button>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto py-20 px-6">
           <LegalContent activeTab={activeLegalView} />
        </div>
        <footer className="bg-slate-50 border-t border-slate-200 py-12 text-center">
            <button 
                onClick={() => setActiveLegalView(null)}
                className="px-10 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all shadow-xl active:scale-95"
            >
                Return to Landing Page
            </button>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-red-500 selection:text-white">
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

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
          
          <button 
            onClick={() => onUpgrade('Starter', '29')}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-sm font-bold uppercase tracking-wider animate-pulse hover:bg-red-600/20 hover:border-red-500/40 transition-all cursor-pointer group"
          >
            <Clock size={16} className="group-hover:scale-110 transition-transform" /> 7-Day Free Detection Trial Available
          </button>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Advanced Financial <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">Security for SMEs.</span>
          </h1>
          
          <p className="max-w-3xl text-xl text-slate-400 mb-10 leading-relaxed">
            Fraud Radar is an AI-powered financial surveillance tool designed for businesses to identify suspicious patterns and potential fraud within QuickBooks and Xero ledgers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => onUpgrade('Starter', '29')} className="group flex items-center justify-center space-x-2 bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-red-50 transition-all shadow-xl">
              <span>Start 7-Day Trial</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={onStartDemo} className="flex items-center justify-center space-x-2 bg-slate-800/50 text-white border border-slate-700 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-800 transition-all backdrop-blur-sm">
              <Zap size={20} className="text-yellow-400 fill-current" />
              <span>Watch Live Radar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
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
                        <li className="flex items-center text-slate-600"><CheckCircle size={16} className="text-green-500 mr-2"/> Unlimited Ledger Connections</li>
                        <li className="flex items-center text-slate-600"><CheckCircle size={16} className="text-green-500 mr-2"/> Priority Forensic Support</li>
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
              <div className="flex flex-wrap justify-center space-x-8 text-sm font-medium mt-4 md:mt-0">
                  <button onClick={() => setActiveLegalView('terms')} className="hover:text-white transition-colors">Terms of Service</button>
                  <button onClick={() => setActiveLegalView('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
                  <button onClick={() => setActiveLegalView('refund')} className="hover:text-white transition-colors">Refund Policy</button>
                  <button onClick={() => setShowHelp(true)} className="hover:text-white transition-colors">Support</button>
              </div>
          </div>
      </footer>
      <HelpCenter isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};

// Simplified component for legal content to be used in both modal and pages
export const LegalContent: React.FC<{ activeTab: 'terms' | 'privacy' | 'refund' }> = ({ activeTab }) => {
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    switch (activeTab) {
        case 'terms':
            return (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="border-b border-slate-100 pb-4">
                        <h3 className="text-4xl font-black text-slate-900 mb-2">Terms of Service</h3>
                        <p className="text-sm font-bold text-red-600 uppercase tracking-widest">Last updated: {today}</p>
                    </div>
                    <section className="space-y-4">
                        <h4 className="text-xl font-bold text-slate-900 flex items-center"><FileText size={24} className="mr-2 text-red-600"/> 1. Introduction</h4>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Welcome to <strong>Fraud Radar</strong>. These Terms of Service govern your use of the AI-powered anomaly detection application operated by <strong>Dat-assist Kft.</strong>, registered in Budapest, Hungary. By accessing our platform, you agree to comply with all EU financial regulations and these specific terms.
                        </p>
                    </section>
                    <section className="space-y-4">
                        <h4 className="text-xl font-bold text-slate-900 flex items-center"><Scale size={24} className="mr-2 text-red-600"/> 2. Service Description & Responsibility</h4>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Fraud Radar provides automated detection and insights based on journal entries and ledger data. While our AI Radar is highly accurate, users are responsible for final forensic investigation and verification of all flagged anomalies before taking disciplinary or legal action.
                        </p>
                    </section>
                </div>
            );
        case 'privacy':
            return (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="border-b border-slate-100 pb-4">
                        <h3 className="text-4xl font-black text-slate-900 mb-2">Privacy & GDPR</h3>
                        <p className="text-sm font-bold text-red-600 uppercase tracking-widest">Last updated: {today}</p>
                    </div>
                    <section className="space-y-4">
                        <h4 className="text-xl font-bold text-slate-900 flex items-center"><Shield size={24} className="mr-2 text-red-600"/> Data Protection & Security</h4>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            We are committed to protecting your financial data under strict GDPR regulations. Fraud Radar utilizes 256-bit AES encryption for all data at rest and TLS 1.3 for data in transit. <strong>We do not store your QuickBooks or Xero passwords.</strong> All processing occurs within secure, audited EU-based data centers.
                        </p>
                    </section>
                    <section className="space-y-4">
                        <h4 className="text-xl font-bold text-slate-900 flex items-center"><Lock size={24} className="mr-2 text-red-600"/> Data Sovereignty</h4>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            You retain 100% ownership of your financial data. Dat-assist Kft. acts only as a Data Processor. You may request full deletion of your indexed radar data at any time through the Profile settings.
                        </p>
                    </section>
                </div>
            );
        case 'refund':
            return (
                <div className="space-y-12 animate-in fade-in duration-500">
                    <div className="border-b border-slate-100 pb-4">
                        <h3 className="text-4xl font-black text-slate-900 mb-2">Refund & Billing Policy</h3>
                        <p className="text-sm font-bold text-red-600 uppercase tracking-widest">Last updated: {today}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <h4 className="text-xl font-bold text-slate-900 flex items-center"><CreditCard size={24} className="mr-2 text-red-600"/> Billing & Merchant of Record</h4>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Our order process is conducted by our online reseller <strong>Paddle.com</strong>. Paddle is the <strong>Merchant of Record</strong> for all our orders. Paddle handles all payment processing, tax collection (VAT/GST), and initial customer service inquiries regarding billing. Secure transactions are guaranteed via the Paddle.com Marketplace.
                            </p>
                        </section>

                        <section className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <h4 className="text-xl font-bold text-slate-900 flex items-center"><RotateCcw size={24} className="mr-2 text-red-600"/> Cancellations</h4>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                You can cancel your subscription at any time via your <strong>My Profile</strong> settings. Upon cancellation, your account will remain active until the end of the current paid billing cycle (monthly or annual), after which no further charges will be made.
                            </p>
                        </section>
                    </div>

                    <section className="space-y-6">
                        <h4 className="text-2xl font-bold text-slate-900 border-l-4 border-red-600 pl-4">Refund Eligibility</h4>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            As a software-as-a-service (SaaS) provider, we generally do not offer refunds once a billing cycle has begun, as access is immediate. However, we honor the following:
                        </p>
                        <ul className="space-y-4 ml-4">
                            <li className="flex items-start gap-4">
                                <div className="mt-1 p-1 bg-red-100 text-red-600 rounded">
                                    <Shield size={16} />
                                </div>
                                <div>
                                    <strong className="text-slate-800 block">Technical Faults</strong>
                                    <span className="text-slate-600 text-sm">If a documented bug prevented you from using the Radar Service for more than 72 consecutive hours, you may request a pro-rated refund.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 p-1 bg-red-100 text-red-600 rounded">
                                    <Info size={16} />
                                </div>
                                <div>
                                    <strong className="text-slate-800 block">EU Statutory Rights</strong>
                                    <span className="text-slate-600 text-sm">Consumers within the European Union have a 14-day "cooling off" period, provided the service has not been fully performed (e.g., if you haven't initiated a full ledger scan).</span>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                        <h4 className="font-bold text-red-900 mb-2">Need Assistance?</h4>
                        <p className="text-red-700 text-sm">
                            For all billing questions or refund requests, please contact our support team through the <strong>Help Center</strong> in the app or reach out directly to Paddle support.
                        </p>
                    </div>
                </div>
            );
    }
};

export default LandingPage;
