
import React, { useState } from 'react';
import { ScanResult } from '../types';
import { CheckCircle, XCircle, FileText, X, AlertTriangle, CheckSquare, Download, Mail } from 'lucide-react';

interface CalendarViewProps {
  history: ScanResult[];
  onUpgradePrompt?: () => void;
  isTrial?: boolean;
}

const CalendarView: React.FC<CalendarViewProps> = ({ history, onUpgradePrompt, isTrial }) => {
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);

  const formatToUSADate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const [year, month, day] = parts;
    return `${month}/${day}/${year}`;
  };

  const getMockDetails = (scan: ScanResult) => {
      if (scan.anomaliesFound === 0) return [];
      
      return Array.from({ length: scan.anomaliesFound }).map((_, i) => ({
          id: `DUP-${scan.id}-${i+1}`,
          description: `Duplicate Invoice group for Vendor #${100+i}`,
          status: i % 2 === 0 ? 'Resolved (Merged)' : 'Ignored (False Positive)',
          actionTime: '10:42 AM'
      }));
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert("Generating forensic PDF report for download...");
  };

  const handleResend = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    alert(`Report for ${id} has been resent to your finance team.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Scan History</h2>
        <button 
          onClick={handleDownload}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-all active:scale-95 shadow-md"
        >
          <Download size={16} className="mr-2"/>
          Download History Report
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Scan ID</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Date (MM/DD/YYYY)</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Anomalies Found</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {history.map((scan) => (
              <tr 
                key={scan.id} 
                className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                onClick={() => setSelectedScan(scan)}
              >
                <td className="px-6 py-4 text-slate-600 font-mono text-sm group-hover:text-blue-600 font-medium">{scan.id}</td>
                <td className="px-6 py-4 text-slate-800 font-medium">{formatToUSADate(scan.date)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {scan.status === 'Completed' ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <XCircle size={16} className="text-red-500" />
                    )}
                    <span className={`text-sm font-bold ${scan.status === 'Completed' ? 'text-green-700' : 'text-red-700'}`}>
                      {scan.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-black text-slate-800">
                  {scan.anomaliesFound}
                </td>
                 <td className="px-6 py-4 text-right">
                    <button 
                        onClick={(e) => handleResend(e, scan.id)} 
                        className="text-blue-600 hover:text-blue-800 text-sm font-black uppercase tracking-widest flex items-center justify-end gap-1 hover:underline"
                    >
                        <Mail size={14} className="mr-1"/> Resend Email
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedScan && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[85vh]">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                      <div>
                          <h3 className="text-lg font-bold text-slate-900 flex items-center">
                              <FileText size={20} className="mr-2 text-slate-500"/>
                              Scan Details: {selectedScan.id}
                          </h3>
                          <p className="text-sm text-slate-500">Executed on {formatToUSADate(selectedScan.date)}</p>
                      </div>
                      <button onClick={() => setSelectedScan(null)} className="text-slate-400 hover:text-slate-600 p-1 transition-transform active:scale-90">
                          <X size={24}/>
                      </button>
                  </div>
                  
                  <div className="p-6 overflow-y-auto">
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1 bg-white border border-slate-200 p-4 rounded-lg text-center">
                                <div className="text-sm text-slate-500 uppercase font-bold tracking-wide mb-1 text-xs">Status</div>
                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-bold ${selectedScan.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {selectedScan.status}
                                </div>
                            </div>
                            <div className="flex-1 bg-white border border-slate-200 p-4 rounded-lg text-center">
                                <div className="text-sm text-slate-500 uppercase font-bold tracking-wide mb-1 text-xs">Exposure</div>
                                <div className="text-2xl font-bold text-slate-800">${selectedScan.totalRiskExposure.toLocaleString()}</div>
                            </div>
                        </div>

                        <h4 className="font-bold text-slate-800 mb-3 text-sm border-b border-slate-100 pb-2 uppercase tracking-widest">Resolution History</h4>
                        
                        {selectedScan.anomaliesFound === 0 ? (
                            <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg">
                                <CheckCircle size={32} className="mx-auto text-green-400 mb-2"/>
                                No anomalies were found during this scan.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {getMockDetails(selectedScan).map((item, idx) => (
                                    <div key={idx} className="flex items-start p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className={`mt-0.5 p-1 rounded-full mr-3 ${item.status.includes('Resolved') ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}>
                                            {item.status.includes('Resolved') ? <CheckSquare size={14}/> : <AlertTriangle size={14}/>}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-slate-700 text-sm">{item.id}</span>
                                                <span className="text-xs text-slate-400">{item.actionTime}</span>
                                            </div>
                                            <p className="text-sm text-slate-600">{item.description}</p>
                                            <div className="mt-1 text-xs font-medium text-slate-500">
                                                Action Taken: <span className={item.status.includes('Resolved') ? 'text-green-600' : 'text-slate-600'}>{item.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                  </div>

                  <div className="p-4 border-t border-slate-100 flex justify-end">
                      <button onClick={() => setSelectedScan(null)} className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all active:scale-95 shadow-md uppercase tracking-widest text-xs">Close Details</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default CalendarView;
