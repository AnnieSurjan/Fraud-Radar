
import React, { useState } from 'react';
import { AnomalyGroup, Transaction, RiskLevel, UserProfile, DetectionRule } from '../types';
import { detectAnomalies, MOCK_TRANSACTIONS } from '../services/mockData';
import { ShieldAlert, Info, Search, Lock, Zap, ShieldCheck, Download, Calendar, Filter, Plus, Trash2, User, ArrowRight, Clock } from 'lucide-react';

interface ScanManagerProps {
  onAddAuditLog: (action: string, details: string, type: 'info' | 'warning' | 'danger' | 'success') => void;
  onScanComplete?: (results: AnomalyGroup[]) => void;
  user: UserProfile;
  onUpgradePrompt: (plan: string, price: string) => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

const MOCK_RULES: DetectionRule[] = [
  { id: '1', type: 'ExcludeVendor', value: 'Internal Payroll', isActive: true },
  { id: '2', type: 'AmountThreshold', value: '10.00', isActive: true },
];

const ScanManager: React.FC<ScanManagerProps> = ({ onAddAuditLog, onScanComplete, user, onUpgradePrompt, onUpdateUser }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [anomalies, setAnomalies] = useState<AnomalyGroup[]>([]);
  const [showPremiumValue, setShowPremiumValue] = useState(false);
  const [rules, setRules] = useState<DetectionRule[]>(MOCK_RULES);
  const isTrial = user.isTrial ?? true;

  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const results = detectAnomalies(MOCK_TRANSACTIONS);
      setAnomalies(results);
      setIsScanning(false);
      onAddAuditLog('Scan Process', `Anomaly scan completed. ${results.length} suspicious events found.`, 'warning');
      if (onScanComplete) onScanComplete(results);
    }, 2000);
  };

  const handleActionClick = (actionName: string) => {
    if (isTrial) {
      setShowPremiumValue(true);
    } else {
      alert(`${actionName} initiated for this group.`);
      onAddAuditLog('Resolution', `${actionName} performed on anomaly group.`, 'success');
    }
  };

  const handleToggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
    onAddAuditLog('Settings Update', `Detection rule ${id} toggled.`, 'info');
  };

  const handleUpdateFrequency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onUpdateUser) {
        onUpdateUser({ ...user, reportFrequency: e.target.value as any });
        onAddAuditLog('Settings Update', `Report frequency changed to ${e.target.value}.`, 'info');
    }
  };

  const getRiskBadge = (level: RiskLevel) => {
      const styles = {
          [RiskLevel.LOW]: 'bg-blue-100 text-blue-700',
          [RiskLevel.MEDIUM]: 'bg-yellow-100 text-yellow-700',
          [RiskLevel.HIGH]: 'bg-orange-100 text-orange-700',
          [RiskLevel.CRITICAL]: 'bg-red-100 text-red-700 font-bold animate-pulse',
      };
      return <span className={`px-2 py-0.5 rounded-full text-xs ${styles[level]}`}>{level} Risk</span>;
  };

  return (
    <div className="space-y-8">
      {isTrial && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top duration-300">
             <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full text-red-600">
                    <Info size={18}/>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-red-900 uppercase tracking-wide">Detection-Only Mode</h4>
                    <p className="text-xs text-red-700">You are in a 7-day free trial. Anomaly detection is full, but resolution features are locked.</p>
                </div>
             </div>
             <button 
                onClick={() => onUpgradePrompt('Professional', '69')}
                className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                <Zap size={12} className="fill-current"/> Unlock Resolution
             </button>
          </div>
      )}

      {/* PREMIUM VALUE MODAL */}
      {showPremiumValue && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
                  <div className="p-8 text-center bg-slate-900 text-white">
                      <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                          <Zap size={32} className="fill-current"/>
                      </div>
                      <h3 className="text-2xl font-bold">Unlock Full Resolution</h3>
                      <p className="text-slate-400 mt-2">Take control of your financial security today.</p>
                  </div>
                  <div className="p-8 space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                          {[
                              { title: 'Interactive Resolution', desc: 'Resolve or clear alerts directly in your ledger.', icon: ShieldCheck },
                              { title: 'CSV & PDF Exports', desc: 'Download forensic-grade reports for audit compliance.', icon: Download },
                              { title: 'Team Management', desc: 'Invite up to 5 finance managers to review alerts.', icon: User },
                              { title: 'Priority Radar AI', desc: 'Real-time monitoring and instant SMS/Email alerts.', icon: Zap },
                          ].map((feat, i) => (
                              <div key={i} className="flex gap-4">
                                  <div className="shrink-0 p-2 bg-slate-50 text-red-600 rounded-lg"><feat.icon size={20}/></div>
                                  <div>
                                      <p className="text-sm font-bold text-slate-800">{feat.title}</p>
                                      <p className="text-xs text-slate-500">{feat.desc}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                      <div className="pt-6 flex gap-3">
                          <button onClick={() => setShowPremiumValue(false)} className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all">Maybe later</button>
                          <button onClick={() => { setShowPremiumValue(false); onUpgradePrompt('Professional', '69'); }} className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/20">Upgrade Now</button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 text-center sm:text-left">Radar & Audit</h2>
          <p className="text-slate-500">AI-powered pattern recognition for your accounting data.</p>
        </div>
        <button 
          onClick={runScan}
          disabled={isScanning}
          className="flex items-center space-x-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-md transition-all disabled:opacity-50"
        >
          {isScanning ? <span className="animate-spin mr-2">◌</span> : <Search size={18} />}
          <span>{isScanning ? 'Analyzing Data...' : 'Start Radar Scan'}</span>
        </button>
      </div>

      {anomalies.length > 0 && (
        <div className="space-y-4">
          {anomalies.map((group) => (
            <div key={group.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-red-300 transition-colors">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-lg ${group.riskLevel === RiskLevel.CRITICAL ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                        <ShieldAlert size={20} />
                   </div>
                   <h3 className="font-bold text-slate-800">{group.reason}</h3>
                   {getRiskBadge(group.riskLevel)}
                </div>
                <div className="text-xs font-mono text-slate-400">ID: {group.id}</div>
              </div>
              
              <div className="p-6">
                 <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                    <p className="text-sm text-blue-800 flex items-start gap-2">
                        <Info size={16} className="shrink-0 mt-0.5" />
                        <strong>AI Insight:</strong> {group.explanation}
                    </p>
                 </div>

                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          <th className="px-4 py-2">Date</th>
                          <th className="px-4 py-2">Entity</th>
                          <th className="px-4 py-2">Amount</th>
                          <th className="px-4 py-2">Recorded By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.transactions.map(t => (
                          <tr key={t.id} className="border-t border-slate-100">
                            <td className="px-4 py-3">{t.date} <span className="text-xs text-slate-400">({t.timestamp?.split(' ')[1]})</span></td>
                            <td className="px-4 py-3 font-medium">{t.entityName}</td>
                            <td className="px-4 py-3 font-mono font-bold">{t.currency} {t.amount.toLocaleString()}</td>
                            <td className="px-4 py-3 flex items-center gap-1 text-slate-500"><User size={14}/> {t.recordedBy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                <button 
                    onClick={() => handleActionClick('Dismiss Alert')}
                    className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                    {isTrial && <Lock size={14} className="text-slate-400"/>} Dismiss Alert
                </button>
                <button 
                    onClick={() => handleActionClick('Open Investigation')}
                    className="px-4 py-2 text-sm font-bold rounded-lg flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm"
                >
                    {isTrial && <Lock size={14} className="text-slate-400"/>} Open Investigation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isScanning && anomalies.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
            <ShieldAlert className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Radar is Standing By</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Initiate a scan to analyze your QuickBooks network and filter out anomalies.</p>
          </div>
      )}

      {/* Governance & Rules Section (Moved from Profile) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
          {/* FALSE POSITIVE RULES */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                 <h3 className="text-sm font-bold text-slate-800 flex items-center">
                    <Filter className="mr-2 text-orange-600" size={16}/>
                    False Positive Rules
                 </h3>
                 <button 
                    onClick={() => isTrial ? onUpgradePrompt('Professional', '69') : null}
                    className="flex items-center gap-1 text-[10px] font-bold text-orange-600 uppercase tracking-wider hover:underline"
                >
                    <Plus size={12}/> Add Rule
                </button>
            </div>
            <div className="p-6 flex-1">
                <p className="text-xs text-slate-500 mb-4">Exclude trusted vendors from being flagged by the Radar AI.</p>
                <div className="space-y-2">
                    {rules.map(rule => (
                        <div key={rule.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50 group hover:border-orange-200 transition-colors">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className={rule.isActive ? "text-green-500" : "text-slate-300"} size={16}/>
                                <div>
                                    <p className="text-xs font-bold text-slate-800">{rule.value}</p>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">{rule.type === 'ExcludeVendor' ? 'Vendor Excluded' : 'Threshold'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => handleToggleRule(rule.id)} className="text-[10px] font-bold text-blue-600 hover:underline">{rule.isActive ? 'Disable' : 'Enable'}</button>
                                <button className="text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* REPORT SCHEDULING */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
                 <h3 className="text-sm font-bold text-slate-800 flex items-center">
                    <Calendar className="mr-2 text-green-600" size={16}/>
                    Report Scheduling
                 </h3>
            </div>
            <div className="p-6">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Email Frequency</label>
                <select 
                    value={user.reportFrequency || 'Never'} 
                    onChange={handleUpdateFrequency}
                    disabled={isTrial}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all cursor-pointer"
                >
                    <option value="Never">Disabled</option>
                    <option value="Daily">Daily Summary (8:00 AM)</option>
                    <option value="Weekly">Weekly Digest (Monday)</option>
                    <option value="Monthly">Monthly Forensic Audit</option>
                </select>
                <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-start gap-3">
                    <Clock size={18} className="text-green-600 shrink-0"/>
                    <p className="text-[11px] text-green-800 leading-relaxed">
                        <strong>Security Tip:</strong> Weekly reports are recommended for most SMEs to capture patterns without overwhelming your inbox.
                    </p>
                </div>
                {isTrial && <p className="mt-4 text-[10px] text-orange-600 font-bold uppercase tracking-widest flex items-center gap-1 justify-center"><Lock size={10}/> Requires Professional Plan</p>}
            </div>
          </div>
      </div>
    </div>
  );
};

export default ScanManager;
