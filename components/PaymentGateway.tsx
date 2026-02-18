
import React, { useState, useEffect } from 'react';
/* Added ChevronDown to the imports from lucide-react */
import { X, Lock, CreditCard, CheckCircle, ShieldCheck, Globe, Mail, MapPin, Zap, ShieldAlert, Database, FileText, Check, Loader2, ChevronDown } from 'lucide-react';

interface PaymentGatewayProps {
  planName: string;
  price: string;
  onClose: () => void;
  onSuccess: () => void;
}

const VAT_RATES: Record<string, number> = {
  HU: 0.27,
  DE: 0.19,
  FR: 0.20,
  GB: 0.20,
  US: 0.00,
};

const PLAN_FEATURES: Record<string, string[]> = {
  'Starter': [
    '1 Active Ledger Connection (QB/Xero)',
    'Daily AI Radar Background Scan',
    'Standard Anomaly Detection Logic',
    'Email Alert Notifications',
    '7-Day Full Detection Trial'
  ],
  'Professional': [
    'Up to 5 Multi-Ledger Connections',
    'Real-time AI Forensic Alerts',
    'Full Audit Trail Export (PDF/CSV)',
    'Forensic Case Management Tools',
    '7-Day Full Detection Trial'
  ],
  'Enterprise': [
    'Unlimited Ledger Connections',
    'Priority Forensic Support 24/7',
    'Custom AI Detection Rules',
    'SSO & Advanced Role Permissions',
    'Dedicated Account Manager'
  ]
};

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ planName, price, onClose, onSuccess }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('HU'); 
  const [zipCode, setZipCode] = useState('');
  const [taxRate, setTaxRate] = useState(0.27); 

  const basePrice = parseFloat(price);

  useEffect(() => {
    const rate = VAT_RATES[country] !== undefined ? VAT_RATES[country] : 0.00;
    setTaxRate(rate);
  }, [country]);

  const taxAmount = basePrice * taxRate;
  const totalPrice = basePrice + taxAmount;
  const features = PLAN_FEATURES[planName] || PLAN_FEATURES['Starter'];

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="bg-white w-full max-w-[950px] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative border border-slate-200">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors z-50 p-2 hover:bg-slate-100 rounded-full">
           <X size={24} />
        </button>

        {/* Plan Summary & Features (Left Side) */}
        <div className="bg-slate-900 md:w-5/12 p-10 text-white flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-600 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                 <div className="flex items-center space-x-3 mb-10">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <ShieldAlert size={24}/>
                    </div>
                    <span className="font-black text-xl tracking-tight">Fraud Radar</span>
                 </div>
                 
                 <div className="space-y-2 mb-8">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Selected Plan</div>
                    <h2 className="text-3xl font-black">{planName} Suite</h2>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black">${basePrice}</span>
                        <span className="text-slate-400 font-bold">/month</span>
                    </div>
                 </div>

                 <div className="space-y-6 mb-12">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">What's included</div>
                    <ul className="space-y-4">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 group">
                                <div className="mt-1 p-0.5 bg-green-500 rounded-full text-white shadow-lg shadow-green-500/20">
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{feature}</span>
                            </li>
                        ))}
                    </ul>
                 </div>
                 
                 <div className="mt-auto border-t border-white/10 pt-8 space-y-3">
                     <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                         <span>Subtotal</span>
                         <span>${basePrice.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                         <span>Estimated Tax ({country})</span>
                         <span>${taxAmount.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between items-center pt-2">
                         <span className="text-sm font-black text-white uppercase tracking-widest">Grand Total</span>
                         <span className="text-3xl font-black text-white">${totalPrice.toFixed(2)}</span>
                     </div>
                 </div>
            </div>
            
            <div className="mt-8 pt-6 text-[10px] text-slate-500 leading-relaxed border-t border-white/5 relative z-10">
                <p className="flex items-center gap-1.5 mb-2 font-black uppercase tracking-tighter">
                    <Lock size={12} className="text-green-500"/> 
                    Secure Checkout by <strong>Paddle.com</strong>
                </p>
                Paddle.com is the Merchant of Record. Your billing statement will show "PADDLE.NET * FRAUD RADAR".
            </div>
        </div>

        {/* Payment Form (Right Side) */}
        <div className="bg-white md:w-7/12 p-12 relative overflow-y-auto flex flex-col justify-center">
            {step === 'details' && (
                <div className="animate-in slide-in-from-right duration-300 space-y-8">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Billing Information</h3>
                        <p className="text-sm text-slate-500 font-medium">Please provide your business billing details to continue.</p>
                    </div>

                    <form onSubmit={handleDetailsSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email Address</label>
                            <div className="relative">
                                <Mail className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" size={18} />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="finance@company.com" 
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-600 outline-none transition-all font-bold text-slate-800"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tax Residency</label>
                                <div className="relative">
                                    <Globe className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" size={18} />
                                    <select 
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-600 outline-none cursor-pointer font-bold text-slate-800 appearance-none"
                                    >
                                        <option value="HU">Hungary (EU)</option>
                                        <option value="US">United States</option>
                                        <option value="GB">United Kingdom</option>
                                        <option value="DE">Germany (EU)</option>
                                        <option value="FR">France (EU)</option>
                                    </select>
                                    <ChevronDown className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400 pointer-events-none" size={18}/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ZIP / Postal Code</label>
                                <div className="relative">
                                    <MapPin className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" size={18} />
                                    <input 
                                        type="text" 
                                        required
                                        value={zipCode}
                                        onChange={e => setZipCode(e.target.value)}
                                        placeholder="1051" 
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-600 outline-none font-bold text-slate-800"
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-600/20 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3"
                        >
                            Review & Pay <ArrowRight size={20}/>
                        </button>
                    </form>
                </div>
            )}

            {step === 'payment' && (
                <div className="animate-in slide-in-from-right duration-300 space-y-10">
                    <button onClick={() => setStep('details')} className="text-xs font-black text-slate-400 hover:text-red-600 transition-colors flex items-center gap-2 uppercase tracking-widest">
                        <ChevronLeft size={16}/> Edit Billing Details
                    </button>
                    
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Final Step</h3>
                        <p className="text-sm text-slate-500 font-medium">Select your preferred payment method via Paddle.</p>
                    </div>

                    <div className="space-y-4">
                        <button 
                            onClick={handlePayment} 
                            className="w-full border-2 border-slate-100 hover:border-red-600 hover:bg-red-50 p-6 rounded-3xl flex items-center justify-between group transition-all shadow-sm active:scale-95"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                                    <CreditCard size={24} />
                                </div>
                                <div className="text-left">
                                    <span className="font-black text-slate-900 block">Credit or Debit Card</span>
                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Visa, MasterCard, Amex</span>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-slate-300 group-hover:text-red-600 transition-colors" />
                        </button>

                        <button 
                            onClick={handlePayment} 
                            className="w-full border-2 border-slate-100 hover:border-red-600 hover:bg-red-50 p-6 rounded-3xl flex items-center justify-between group transition-all shadow-sm active:scale-95"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-red-100 transition-colors">
                                    <Globe size={24} />
                                </div>
                                <div className="text-left">
                                    <span className="font-black text-slate-900 block">PayPal Express</span>
                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Fast & Secure</span>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-slate-300 group-hover:text-red-600 transition-colors" />
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-6 opacity-40 grayscale">
                        <ShieldCheck size={32}/>
                        <div className="w-12 h-6 bg-slate-200 rounded"></div>
                        <div className="w-12 h-6 bg-slate-200 rounded"></div>
                        <div className="w-12 h-6 bg-slate-200 rounded"></div>
                    </div>
                </div>
            )}

            {step === 'processing' && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-red-50 border-t-red-600 rounded-full animate-spin"></div>
                        <ShieldAlert className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600" size={32} />
                    </div>
                    <div>
                        <h3 className="font-black text-2xl text-slate-900">Validating Transaction</h3>
                        <p className="text-slate-500 font-medium">Securing your financial radar license...</p>
                    </div>
                </div>
            )}

            {step === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 space-y-8">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-600/20">
                        <CheckCircle size={48} strokeWidth={3} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-3xl font-black text-slate-900">Payment Successful</h3>
                        <p className="text-slate-500 font-bold max-w-xs mx-auto">
                            License for <span className="text-slate-900">{planName}</span> activated. Redirecting to your Radar Dashboard...
                        </p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const ChevronLeft = ({ size = 20, className = "" }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>;
const ChevronRight = ({ size = 20, className = "" }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>;
const ArrowRight = ({ size = 20, className = "" }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;

export default PaymentGateway;
