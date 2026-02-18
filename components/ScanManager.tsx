
import React, { useState, useMemo } from 'react';
import { AnomalyGroup, Transaction, RiskLevel, UserProfile as IUserProfile, DetectionRule } from '../types';
import { detectAnomalies, MOCK_TRANSACTIONS } from '../services/mockData';
import { ShieldAlert, Info, Search, ExternalLink, User, CheckCircle2, XCircle, Loader2, Filter, Calendar, ShieldCheck, ChevronDown, ChevronUp, List, LayoutList, Database, FilterX, Clock, Sparkles, FileText, Lightbulb } from 'lucide-react';

interface ScanManagerProps {
  onAddAuditLog: (action: string, details: string, type: 'info' | 'warning' | 'danger' | 'success') => void;
  onScanComplete?: (results: AnomalyGroup[]) => void;
  user: IUserProfile;
  onUpgradePrompt: (plan: string, price: string) => void;
  onUpdateUser?: (updated: IUserProfile) => void;
}

const MOCK_RULES: DetectionRule[] = [
  { id: '1', type: 'ExcludeVendor', value: 'Internal Payroll', isActive: true },
  { id: '2', type: 'AmountThreshold', value: '10.00', isActive: true },
];

const ScanManager: React.FC<ScanManagerProps> = ({ onAddAuditLog, onScanComplete, user, onUpdateUser }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [anomalies, setAnomalies] = useState<AnomalyGroup[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rules, setRules] = useState<DetectionRule[]>(MOCK_RULES);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [aiSummaryId, setAiSummaryId] = useState<string | null>(null);
  
  // Internal format remains YYYY-MM-DD for logic, but UI will force USA display
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const runScan = () => {
    setIsScanning(true);
    setAnomalies([]);
    setExpandedGroups(new Set());
    setTimeout(() => {
      const results = detectAnomalies(MOCK_TRANSACTIONS);
      setAnomalies(results);
      setIsScanning(false);
      onAddAuditLog('Scan Process', `Anomaly scan completed. ${results.length} suspicious events found.`, 'warning');
      if (onScanComplete) onScanComplete(results);
    }, 1500);
  };

  const toggleGroupExpansion = (id: string) => {
    const next = new Set(expandedGroups);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedGroups(next);
  };

  const handleDismiss = (id: string) => {
    setProcessingId(id);
    setTimeout(() => {
      setAnomalies(prev => prev.filter(a => a.id !== id));
      setProcessingId(null);
      onAddAuditLog('Resolution', `Anomaly group ${id} dismissed as false positive.`, 'info');
    }, 800);
  };

  const handleInvestigate = (id: string) => {
    setProcessingId(id);
    setTimeout(() => {
      setAnomalies(prev => prev.map(a => a.id === id ? { ...a, investigationStatus: 'investigating' } : a));
      setProcessingId(null);
      onAddAuditLog('Investigation', `Forensic investigation opened for group ${id}.`, 'warning');
      alert(`Investigation Case Created: ${id}\n\nThis group has been flagged for deep forensic review.`);
    }, 800);
  };

  const handleToggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
    const rule = rules.find(r => r.id === id);
    if (rule) {
      onAddAuditLog('Security Config', `Rule for "${rule.value}" ${!rule.isActive ? 'enabled' : 'disabled'}`, 'info');
    }
  };

  const handleUpdateFrequency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (onUpdateUser) {
      onUpdateUser({ ...user, reportFrequency: value as any });
      onAddAuditLog('Config Change', `Radar frequency set to ${value}`, 'info');
    }
  };

  const generateAiSummary = (id: string) => {
    setAiSummaryId(id);
    // Simulate Gemini analysis
    setTimeout(() => {
      setAiSummaryId(null);
      alert("AI FORENSIC SUMMARY:\n\nBased on historical data for this vendor, this pattern deviates significantly from the 6-month average. The recorded timestamps suggest these entries were batched manually. Recommendation: Verify vendor bank account details for recent changes.");
      onAddAuditLog('AI Analysis', `Generated forensic summary for group ${id}`, 'info');
    }, 2000);
  };

  // Convert YYYY-MM-DD to MM/DD/YYYY
  const formatToUSADate = (dateStr: string) => {
    if (!dateStr) return 'MM/DD/YYYY';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const [year, month, day] = parts;
    return `${month}/${day}/${year}`;
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

  // Memoized Filtered Anomalies
  const filteredAnomalies = useMemo(() => {
    if (!startDate && !endDate) return anomalies;
    
    return anomalies.filter(group => {
      return group.transactions.some(t => {
        const tDate = t.date; // YYYY-MM-DD
        if (startDate && tDate < startDate) return false;
        if (endDate && tDate > endDate) return false;
        return true;
      });
    });
  }, [anomalies, startDate, endDate]);

  const clearDateFilter = () => {
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="space-y-12 pb-20">
      {/* SCAN HEADER */}
      <section className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Radar Center</h2>
              <p className="text-slate-500 text-sm font-medium">Real-time AI surveillance for your QuickBooks ledger.</p>
            </div>
            <button 
              onClick={runScan}
              disabled={isScanning}
              className="w-full md:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black shadow-xl transition-all disabled:opacity-50 active:scale-95 uppercase tracking-widest text-sm"
            >
              {isScanning ? <Loader2 className="animate-spin mr-2" size={20}/> : <Search size={20} />}
              <span>{isScanning ? 'Analyzing Ledger...' : 'Initiate Radar Scan'}</span>
            </button>
          </div>

          {/* USA DATE RANGE FILTER BAR */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                      <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
                      <div className="w-1.5 h-6 bg-slate-200 rounded-full"></div>
                      <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Timeframe Filter</span>
                      <span className="text-[11px] font-bold text-slate-900">USA Format (MM/DD/YYYY)</span>
                  </div>
              </div>
              
              <div className="flex items-center gap-4 bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 shadow-inner">
                  <div className="flex flex-col min-w-[100px]">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Start (MM/DD/YYYY)</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                        />
                        <div className="text-sm font-black text-slate-800 pointer-events-none">
                            {formatToUSADate(startDate)}
                        </div>
                      </div>
                  </div>
                  <div className="h-8 w-px bg-slate-200"></div>
                  <div className="flex flex-col min-w-[100px]">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">End (MM/DD/YYYY)</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                        />
                        <div className="text-sm font-black text-slate-800 pointer-events-none">
                            {formatToUSADate(endDate)}
                        </div>
                      </div>
                  </div>
              </div>

              {(startDate || endDate) && (
                  <button 
                    onClick={clearDateFilter}
                    className="flex items-center gap-2 px-5 py-3 text-[11px] font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-red-600 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <FilterX size={14} /> Clear Range
                  </button>
              )}

              <div className="ml-auto flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                  <Clock size={14}/>
                  {filteredAnomalies.length} Flagged / {anomalies.length} Total
              </div>
          </div>

          {filteredAnomalies.length > 0 ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {filteredAnomalies.map((group) => {
                const isExpanded = expandedGroups.has(group.id);
                const totalAmount = group.transactions.reduce((acc, t) => acc + t.amount, 0);
                
                return (
                  <div 
                      key={group.id} 
                      className={`bg-white rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-md ${group.investigationStatus === 'investigating' ? 'border-yellow-400 ring-4 ring-yellow-400/10' : 'border-slate-200 hover:border-red-200'}`}
                  >
                    <div className={`p-6 border-b flex flex-wrap justify-between items-center gap-4 ${group.investigationStatus === 'investigating' ? 'bg-yellow-50 border-yellow-200' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center gap-5">
                         <div className={`p-4 rounded-2xl ${group.riskLevel === RiskLevel.CRITICAL ? 'bg-red-600 text-white' : 'bg-orange-500 text-white shadow-lg'}`}>
                              <ShieldAlert size={28} />
                         </div>
                         <div>
                              <h3 className="font-black text-slate-900 flex items-center gap-3 text-xl">
                                  {group.reason}
                                  {group.investigationStatus === 'investigating' && <span className="bg-yellow-200 text-yellow-800 text-[10px] px-2 py-1 rounded-lg uppercase font-black tracking-tighter border border-yellow-300">Under Review</span>}
                              </h3>
                              <div className="flex flex-wrap gap-3 items-center mt-1">
                                  {getRiskBadge(group.riskLevel)}
                                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">Case: {group.id.split('-').pop()}</span>
                                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                                      <Database size={12}/> {group.transactions[0]?.currency} {totalAmount.toLocaleString()}
                                  </span>
                              </div>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button 
                            onClick={() => generateAiSummary(group.id)}
                            disabled={aiSummaryId === group.id}
                            className="flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-widest rounded-xl bg-white border-2 border-red-100 text-red-600 hover:bg-red-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                        >
                            {aiSummaryId === group.id ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={18} />}
                            AI Summary
                        </button>
                        <button 
                          onClick={() => toggleGroupExpansion(group.id)}
                          className={`flex items-center gap-2 px-6 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-all shadow-lg border-2 ${isExpanded ? 'bg-white border-slate-900 text-slate-900' : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'}`}
                        >
                          <LayoutList size={18} />
                          {isExpanded ? 'Hide Transactions' : 'View Transactions'}
                          {isExpanded ? <ChevronUp size={18} className="ml-1" /> : <ChevronDown size={18} className="ml-1" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-8">
                       <div className={`mb-8 p-6 rounded-3xl border-l-8 shadow-sm flex items-start gap-5 ${group.investigationStatus === 'investigating' ? 'bg-yellow-50 border-yellow-500 text-yellow-900' : 'bg-blue-50 border-blue-600 text-blue-900'}`}>
                          <div className={`p-2 rounded-xl ${group.investigationStatus === 'investigating' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                            <Info size={28} className="shrink-0 text-current opacity-80" />
                          </div>
                          <div className="space-y-1">
                              <p className="font-black text-xs uppercase tracking-[0.2em] opacity-60">AI Forensic Insight</p>
                              <p className="text-lg leading-relaxed font-medium">{group.explanation}</p>
                          </div>
                       </div>

                       {isExpanded && (
                        <div className="overflow-hidden border-2 border-slate-100 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                           <table className="w-full text-left text-sm">
                             <thead className="bg-slate-900 text-slate-400 font-black uppercase text-[10px] tracking-[0.15em]">
                               <tr>
                                 <th className="px-8 py-5">Date (MM/DD/YYYY)</th>
                                 <th className="px-8 py-5">Entity / User</th>
                                 <th className="px-8 py-5">Ledger Account</th>
                                 <th className="px-8 py-5">Amount</th>
                                 <th className="px-8 py-5 text-center">Source Link</th>
                               </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-100">
                               {group.transactions.map(t => (
                                 <tr key={t.id} className="hover:bg-red-50/40 transition-colors group/row">
                                   <td className="px-8 py-6">
                                       <div className="font-black text-slate-900 text-lg">{formatToUSADate(t.date)}</div>
                                       <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 font-bold">
                                           <Clock size={12} className="text-slate-400"/> 
                                           <span>Entry Time: {t.timestamp?.split(' ')[1]}</span>
                                       </div>
                                   </td>
                                   <td className="px-8 py-6">
                                       <div className="font-black text-slate-900 text-base">{t.entityName}</div>
                                       <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 font-bold uppercase tracking-widest">
                                           <User size={12} className="text-slate-400"/> {t.recordedBy}
                                       </div>
                                   </td>
                                   <td className="px-8 py-6">
                                       <span className="text-slate-700 font-black px-3 py-1.5 bg-slate-100 rounded-xl text-[11px] uppercase tracking-wider border border-slate-200">
                                           {t.account}
                                       </span>
                                   </td>
                                   <td className="px-8 py-6">
                                       <div className="font-mono font-black text-slate-900 text-xl flex items-center">
                                           <span className="text-xs mr-1.5 text-slate-400 font-sans">{t.currency}</span>
                                           {t.amount.toLocaleString()}
                                       </div>
                                   </td>
                                   <td className="px-8 py-6 text-center">
                                       <a 
                                           href={t.sourceUrl} 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl transition-all shadow-md group font-black text-xs uppercase tracking-widest ${
                                               t.sourceUrl?.includes('xero') 
                                               ? 'bg-[#13B5EA]/10 text-[#13B5EA] border border-[#13B5EA]/20 hover:bg-[#13B5EA] hover:text-white' 
                                               : 'bg-[#2CA01C]/10 text-[#2CA01C] border border-[#2CA01C]/20 hover:bg-[#2CA01C] hover:text-white'
                                           }`}
                                       >
                                           <Database size={16} className="group-hover:scale-110 transition-transform"/>
                                           {t.sourceUrl?.includes('xero') ? 'Xero' : 'QB Online'}
                                           <ExternalLink size={14}/>
                                       </a>
                                   </td>
                                 </tr>
                               ))}
                             </tbody>
                           </table>
                           <div className="bg-slate-50 p-5 text-center border-t-2 border-slate-100">
                               <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                                   <ShieldCheck size={14} className="text-green-600"/> Data Verified for SME Compliance
                               </p>
                           </div>
                        </div>
                       )}
                    </div>

                    <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-black uppercase tracking-widest">
                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
                         Audit Confidence: 99.4%
                      </div>
                      <div className="flex gap-4">
                        <button 
                            onClick={() => handleDismiss(group.id)}
                            disabled={processingId === group.id}
                            className="px-6 py-3 text-xs font-black uppercase tracking-widest rounded-2xl flex items-center gap-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all disabled:opacity-50 active:scale-95"
                        >
                            {processingId === group.id ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={18} />}
                            False Positive
                        </button>
                        <button 
                            onClick={() => handleInvestigate(group.id)}
                            disabled={processingId === group.id || group.investigationStatus === 'investigating'}
                            className={`px-8 py-4 text-xs font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 transition-all shadow-xl active:scale-95 disabled:opacity-50 ${
                                group.investigationStatus === 'investigating' 
                                ? 'bg-yellow-500 text-white cursor-default shadow-none border-2 border-yellow-600' 
                                : 'bg-red-600 text-white hover:bg-red-700'
                            }`}
                        >
                            {processingId === group.id ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={20} />}
                            {group.investigationStatus === 'investigating' ? 'Case Active' : 'Begin Forensic Review'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : !isScanning && (
              <div className="text-center py-24 bg-white rounded-[3rem] border-4 border-dashed border-slate-100 shadow-inner">
                {startDate || endDate ? (
                    <div className="animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-red-50/50">
                            <FilterX className="h-12 w-12 text-red-300" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Zero Anomalies Found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto mt-4 text-lg font-medium">
                            The radar detected no suspicious activity between <br/>
                            <span className="text-slate-900 font-black">{formatToUSADate(startDate)}</span> and <span className="text-slate-900 font-black">{formatToUSADate(endDate)}</span>.
                        </p>
                        <button 
                          onClick={clearDateFilter}
                          className="mt-10 px-10 py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-3 mx-auto"
                        >
                          Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-slate-50/50">
                            <Search className="h-12 w-12 text-slate-200" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Radar Engine Standby</h3>
                        <p className="text-slate-500 max-w-sm mx-auto mt-4 text-lg font-medium leading-relaxed">
                            AI surveillance ready to scan QuickBooks & Xero ledgers for forensic-grade anomalies.
                        </p>
                        <button 
                          onClick={runScan}
                          className="mt-10 px-10 py-5 bg-red-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl hover:bg-red-700 transition-all active:scale-95 flex items-center gap-4 mx-auto"
                        >
                          <Search size={24}/> Initiate Deep Scan
                        </button>
                    </div>
                )}
              </div>
          )}
      </section>

      {/* RADAR CONFIGURATION SECTION */}
      <section className="pt-16 border-t-2 border-slate-100">
        <div className="mb-10 flex items-center justify-between">
            <div>
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <ShieldCheck size={28} className="text-red-600" />
                    Radar Optimization Logic
                </h3>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Configure automated forensic behaviors</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl flex items-center gap-3 border border-slate-800 shadow-xl">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Surveillance Active</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* FALSE POSITIVE RULES */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
                <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                    <h4 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em] flex items-center gap-3">
                        <Filter size={20} className="text-orange-500" />
                        Whitelisting & Exclusions
                    </h4>
                    <button className="text-[11px] font-black text-red-600 hover:text-red-700 transition-all uppercase tracking-widest bg-red-50 px-4 py-2 rounded-xl border border-red-100">+ Add Rule</button>
                </div>
                <div className="p-8 flex-1 space-y-5">
                    {rules.map(rule => (
                        <div key={rule.id} className="flex items-center justify-between p-5 border-2 border-slate-100 rounded-3xl bg-white hover:border-red-100 transition-all group shadow-sm">
                            <div className="flex items-center gap-5">
                                <div className={`p-3 rounded-2xl transition-colors ${rule.isActive ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-400'}`}>
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-base font-black text-slate-900">{rule.value}</p>
                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{rule.type === 'ExcludeVendor' ? 'Trusted Partner Profile' : 'Tolerance Threshold'}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleToggleRule(rule.id)} 
                                className={`text-[10px] font-black uppercase px-4 py-2 rounded-xl transition-all shadow-sm ${rule.isActive ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                            >
                                {rule.isActive ? 'Monitoring' : 'Muted'}
                            </button>
                        </div>
                    ))}
                    <div className="p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mt-4 flex items-center gap-4">
                        <div className="p-2 bg-white rounded-xl shadow-sm"><Info size={20} className="text-slate-400"/></div>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed italic">
                            Adding rules significantly reduces "Noise" by educating the AI on your unique business rhythm.
                        </p>
                    </div>
                </div>
            </div>

            {/* REPORT SCHEDULING */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
                <div className="p-8 border-b border-slate-50 bg-slate-50/50">
                    <h4 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em] flex items-center gap-3">
                        <Calendar size={20} className="text-blue-600" />
                        Automation Scheduler
                    </h4>
                </div>
                <div className="p-10 flex-1 space-y-10">
                    <div className="space-y-4">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Automated Scan Cadence</label>
                        <div className="relative">
                            <select 
                                value={user.reportFrequency || 'Never'} 
                                onChange={handleUpdateFrequency}
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-base font-black text-slate-800 outline-none focus:border-red-600 transition-all cursor-pointer appearance-none shadow-inner"
                            >
                                <option value="Never">Manual Surveillance Mode</option>
                                <option value="Daily">Daily AI Sweep (08:00 AM EST)</option>
                                <option value="Weekly">Weekly Comprehensive Audit</option>
                                <option value="Monthly">Monthly Integrity Overview</option>
                            </select>
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <ChevronDown size={24} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-8 bg-blue-600 rounded-[2rem] shadow-xl text-white flex items-start gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Sparkles size={100} />
                        </div>
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                            <Lightbulb size={28}/>
                        </div>
                        <div className="space-y-2 relative z-10">
                            <h5 className="font-black text-xs uppercase tracking-[0.2em] text-blue-100">Professional Advice</h5>
                            <p className="text-sm leading-relaxed font-bold">
                                For high-volume SMEs, we recommend **Weekly Sweeps**. It ensures security without alert fatigue, letting you focus on real issues.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ScanManager;
