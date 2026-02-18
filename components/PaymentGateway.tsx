
import React, { useState, useEffect } from 'react';
import { X, Lock, CreditCard, CheckCircle, ShieldCheck, Globe, Mail, MapPin } from 'lucide-react';

interface PaymentGatewayProps {
  planName: string;
  price: string;
  onClose: () => void;
  onSuccess: () => void;
}

const ALL_COUNTRIES = [
  { code: "AF", name: "Afghanistan" },
  { code: "HU", name: "Hungary" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  // ... rest of countries would be here
];

const VAT_RATES: Record<string, number> = {
  HU: 0.27,
  DE: 0.19,
  FR: 0.20,
  GB: 0.20,
  US: 0.00,
};

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ planName, price, onClose, onSuccess }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('HU'); 
  const [zipCode, setZipCode] = useState('');
  const [taxRate, setTaxRate] = useState(0.27); 

  const basePrice = parseFloat(price);

  useEffect(() => {
    setStep('details');
    setEmail('');
    setCountry('HU');
    setZipCode('');
  }, [planName]);
  
  useEffect(() => {
    const rate = VAT_RATES[country] !== undefined ? VAT_RATES[country] : 0.00;
    setTaxRate(rate);
  }, [country]);

  const taxAmount = basePrice * taxRate;
  const totalPrice = basePrice + taxAmount;

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
      }, 2500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="bg-[#fcfcfc] w-full max-w-[900px] h-auto md:h-[600px] rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-50">
           <X size={20} />
        </button>

        <div className="bg-slate-50 md:w-5/12 p-8 border-r border-slate-200 flex flex-col">
            <div className="mb-6">
                 <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold">R</div>
                    <span className="font-bold text-slate-700">Fraud Radar</span>
                 </div>
                 <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-2">Order Summary</div>
                 <h2 className="text-2xl font-bold text-slate-900 mb-1">{planName} Protection</h2>
                 <p className="text-slate-500 text-sm mb-4">Full Anomaly Resolution & Audit Logs.</p>
                 
                 <div className="border-t border-b border-slate-200 py-4 space-y-2">
                     <div className="flex justify-between text-sm text-slate-600">
                         <span>{planName} License</span>
                         <span>${basePrice.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-sm text-slate-500">
                         <span>VAT / Tax ({(taxRate * 100).toFixed(1)}%)</span>
                         <span>${taxAmount.toFixed(2)}</span>
                     </div>
                 </div>
                 
                 <div className="flex justify-between items-center mt-4">
                     <span className="text-sm font-bold text-slate-700">Total</span>
                     <span className="text-2xl font-bold text-slate-900">${totalPrice.toFixed(2)}</span>
                 </div>
            </div>
            
            <div className="mt-auto pt-6 text-[10px] text-slate-400 leading-relaxed border-t border-slate-100">
                <p className="flex items-center gap-1 mb-1">
                    <ShieldCheck size={12}/> 
                    Powered by <strong>Paddle</strong>
                </p>
                Paddle.com is the Merchant of Record for this order. 
            </div>
        </div>

        <div className="bg-white md:w-7/12 p-8 relative overflow-y-auto">
            {step === 'details' && (
                <div className="animate-in slide-in-from-right duration-300">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Customer Information</h3>
                    <form onSubmit={handleDetailsSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Billing Email</label>
                            <div className="relative">
                                <Mail className="absolute top-2.5 left-3 text-slate-400" size={16} />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="finance@company.com" 
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded focus:ring-2 focus:ring-red-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Country</label>
                                <select 
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:ring-2 focus:ring-red-500 outline-none cursor-pointer"
                                >
                                    <option value="HU">Hungary</option>
                                    <option value="US">United States</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="DE">Germany</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Zip Code</label>
                                <input 
                                    type="text" 
                                    required
                                    value={zipCode}
                                    onChange={e => setZipCode(e.target.value)}
                                    placeholder="1051" 
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded shadow-sm transition-colors mt-4"
                        >
                            Continue to Payment
                        </button>
                    </form>
                </div>
            )}

            {step === 'payment' && (
                <div className="animate-in slide-in-from-right duration-300">
                    <button onClick={() => setStep('details')} className="text-xs text-slate-500 hover:text-slate-800 mb-6 flex items-center">
                        ← Edit information
                    </button>
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Payment Method</h3>
                    <div className="space-y-3">
                        <button onClick={handlePayment} className="w-full border border-slate-300 hover:border-red-500 hover:bg-red-50 p-4 rounded flex items-center justify-between group transition-all">
                            <div className="flex items-center space-x-3">
                                <CreditCard className="text-slate-400 group-hover:text-red-600" />
                                <span className="font-medium text-slate-700">Credit / Debit Card</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {step === 'processing' && (
                <div className="h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
                    <h3 className="font-bold text-slate-800">Processing...</h3>
                </div>
            )}

            {step === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Payment Confirmed</h3>
                    <p className="text-slate-600 mt-2 text-sm max-w-xs mx-auto">
                        Welcome to Fraud Radar. Your premium resolution features are now active.
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
