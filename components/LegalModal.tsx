
import React, { useState } from 'react';
import { X, FileText, Shield, Scale, Lock, Building, Cookie, Globe } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'terms' | 'privacy';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, initialTab = 'terms' }) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(initialTab);

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
                <span>Terms of Service</span>
            </button>
            <button 
                onClick={() => setActiveTab('privacy')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center space-x-2 transition-colors border-b-2 ${activeTab === 'privacy' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
                <Shield size={16}/>
                <span>Privacy & GDPR</span>
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-white text-slate-700 leading-relaxed scroll-smooth">
            {activeTab === 'terms' ? (
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="border-b border-slate-100 pb-4">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Terms of Service</h3>
                        <p className="text-sm text-slate-500">Last updated: May 20, 2024</p>
                    </div>

                    <section>
                        <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center"><FileText size={18} className="mr-2 text-blue-600"/> 1. Introduction</h4>
                        <p className="text-sm text-slate-600">
                            Welcome to <strong>Fraud Radar</strong>. These Terms of Service govern your use of the AI-powered anomaly detection application operated by <strong>Dat-assist Kft.</strong> ("we", "us", or "our"), registered in Budapest, Hungary. By accessing or using our Service, you agree to be bound by these Terms.
                        </p>
                    </section>

                    <section>
                        <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center"><Shield size={18} className="mr-2 text-blue-600"/> 2. Nature of Service & Liability</h4>
                        <p className="text-sm text-slate-600 mb-2">
                            Fraud Radar utilizes artificial intelligence (Google Gemini models) to identify potential financial anomalies and suspicious patterns. You acknowledge and agree that:
                        </p>
                        <ul className="list-disc list-inside text-sm space-y-1 ml-4 text-slate-600">
                            <li><strong>AI Limitations:</strong> The AI suggestions are probabilistic insights. We do not guarantee 100% accuracy in detecting every single fraudulent activity.</li>
                            <li><strong>User Responsibility:</strong> You are solely responsible for reviewing and confirming any actions or investigations initiated based on Fraud Radar alerts.</li>
                            <li><strong>No Financial Advice:</strong> The Service does not provide professional accounting, tax, or legal advice.</li>
                        </ul>
                    </section>

                    <section>
                        <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center"><Lock size={18} className="mr-2 text-blue-600"/> 3. Data Processing Agreement (DPA)</h4>
                        <p className="text-sm text-slate-600">
                            For users in the EU/EEA: You act as the <strong>Data Controller</strong> of the financial data you synchronize, and Dat-assist Kft. acts as the <strong>Data Processor</strong>. We process data solely to provide the anomaly detection service as per your configuration.
                        </p>
                    </section>

                    <section>
                        <h4 className="text-lg font-bold text-slate-900 mb-3">4. Subscription & Trial</h4>
                        <p className="text-sm text-slate-600">
                            Fraud Radar offers a 7-day free trial limited to detection only. Full resolution features require a paid subscription. Payments are processed by our Merchant of Record, <strong>Paddle.com</strong>.
                        </p>
                    </section>

                    <section>
                        <h4 className="text-lg font-bold text-slate-900 mb-3">5. Governing Law</h4>
                        <p className="text-sm text-slate-600">
                            These Terms shall be governed by the laws of <strong>Hungary</strong>. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Budapest.
                        </p>
                    </section>
                </div>
            ) : (
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="border-b border-slate-100 pb-4">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Privacy Policy & GDPR Compliance</h3>
                        <p className="text-sm text-slate-500">Effective Date: May 20, 2024</p>
                        <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                            <Globe size={12} className="mr-1"/> GDPR Compliant
                        </div>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex items-start space-x-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                             <Building className="text-blue-600" size={24}/>
                        </div>
                        <div className="text-sm text-slate-700">
                            <strong>Data Controller:</strong> Dat-assist Kft.<br/>
                            <strong>Registered Office:</strong> 1051 Budapest, Hungary.<br/>
                            <strong>Data Protection Officer (DPO):</strong> dpo@fraudradar.com
                        </div>
                    </div>

                    <section>
                        <h4 className="text-lg font-bold text-slate-900 mb-3">1. Legal Basis for Processing</h4>
                        <p className="text-sm text-slate-600 mb-2">Under GDPR Article 6, Fraud Radar processes your data based on:</p>
                        <ul className="list-disc list-inside text-sm space-y-1 ml-4 text-slate-600">
                            <li><strong>Contractual Necessity:</strong> To provide the software service and anomaly detection.</li>
                            <li><strong>Legitimate Interest:</strong> To improve our fraud detection algorithms and overall security.</li>
                            <li><strong>Legal Obligation:</strong> To comply with Hungarian tax and accounting laws regarding retention.</li>
                        </ul>
                    </section>

                    <section>
                        <h4 className="text-lg font-bold text-slate-900 mb-3">2. Sub-processors</h4>
                        <p className="text-sm text-slate-600 mb-2">We share data only with strictly necessary providers:</p>
                        <div className="overflow-hidden rounded-lg border border-slate-200">
                            <table className="min-w-full text-sm text-left">
                                <thead className="bg-slate-50 font-semibold text-slate-700">
                                    <tr>
                                        <th className="px-4 py-2">Provider</th>
                                        <th className="px-4 py-2">Purpose</th>
                                        <th className="px-4 py-2">Location</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr><td className="px-4 py-2">Google Cloud (Vertex AI)</td><td className="px-4 py-2">AI Processing</td><td className="px-4 py-2">EU (Belgium)</td></tr>
                                    <tr><td className="px-4 py-2">Intuit / Xero</td><td className="px-4 py-2">Source Integration</td><td className="px-4 py-2">US / Global</td></tr>
                                    <tr><td className="px-4 py-2">Paddle.com</td><td className="px-4 py-2">Billing</td><td className="px-4 py-2">UK</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center"><Cookie size={18} className="mr-2 text-orange-500"/> 3. Cookie Policy</h4>
                        <p className="text-sm text-slate-600">
                            Fraud Radar uses only <strong>essential cookies</strong> required for authentication and security. We do not use third-party tracking cookies for advertising purposes within your dashboard.
                        </p>
                    </section>
                </div>
            )}
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
