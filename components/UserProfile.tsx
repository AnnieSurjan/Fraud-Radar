
import React, { useState } from 'react';
import { UserProfile as IUserProfile, UserRole } from '../types';
import { Shield, Link, RotateCw, Download, Users, Plus, X, Activity } from 'lucide-react';
import LegalModal from './LegalModal';

interface UserProfileProps {
  user: IUserProfile;
  onConnectQuickBooks?: () => void;
  onConnectXero?: () => void;
  isConnectingQB?: boolean;
  isConnectingXero?: boolean;
  onManagePlan?: () => void;
  onUpgradePrompt?: () => void;
  onUpdateUser?: (updated: IUserProfile) => void;
  onExportAudit?: (format: 'csv' | 'pdf') => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  onConnectQuickBooks, 
  onConnectXero, 
  isConnectingQB, 
  isConnectingXero, 
  onUpdateUser,
  onExportAudit
}) => {
  const [showLegal, setShowLegal] = useState(false);
  const [legalTab, setLegalTab] = useState<'terms' | 'privacy'>('terms');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState(UserRole.VIEWER);
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-end border-b border-slate-200 pb-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Professional Profile</h2>
            <p className="text-slate-500 text-sm">Manage company-wide access and secure integrations.</p>
        </div>
        <div className="text-right">
            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-green-100 text-green-700 border border-green-200`}>
                Professional Account Active
            </span>
        </div>
      </div>

      {/* Integration Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
             <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <Link className="mr-2 text-blue-600" size={20}/>
                Data Connections
             </h3>
        </div>
        <div className="p-8 space-y-8">
            {/* QuickBooks Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-8">
                <div className="flex items-center space-x-4 w-full">
                    <div className="w-14 h-14 bg-[#2CA01C] rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                        <span className="text-white font-black text-2xl">qb</span>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-900">QuickBooks Online</h4>
                        <p className="text-sm text-slate-500">{user.isQuickBooksConnected ? `Active surveillance on: ${user.companyName}` : 'Sync your ledger directly.'}</p>
                    </div>
                </div>
                <button 
                  onClick={onConnectQuickBooks} 
                  disabled={isConnectingQB}
                  className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                    user.isQuickBooksConnected ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-[#2CA01C] text-white hover:bg-[#238016]'
                  }`}
                >
                  {isConnectingQB ? <RotateCw className="animate-spin" size={18}/> : user.isQuickBooksConnected ? 'Manage Integration' : 'Connect QB'}
                </button>
            </div>

            {/* Xero Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4 w-full">
                    <div className="w-14 h-14 bg-[#13B5EA] rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                        <Activity className="text-white" size={32} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-900">Xero Accounting</h4>
                        <p className="text-sm text-slate-500">{user.isXeroConnected ? `Monitoring Xero organization: ${user.companyName}` : 'Connect your Xero organization for real-time audits.'}</p>
                    </div>
                </div>
                <button 
                  onClick={onConnectXero} 
                  disabled={isConnectingXero}
                  className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                    user.isXeroConnected ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-[#13B5EA] text-white hover:bg-[#0f8cb6]'
                  }`}
                >
                  {isConnectingXero ? <RotateCw className="animate-spin" size={18}/> : user.isXeroConnected ? 'Manage Integration' : 'Connect Xero'}
                </button>
            </div>
        </div>
      </div>

      {/* TEAM & INVITES */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
             <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <Users className="mr-2 text-indigo-600" size={20}/>
                Finance Team Access
             </h3>
             <button 
                onClick={() => setShowInviteModal(true)}
                className="flex items-center gap-2 text-sm font-black text-indigo-600 hover:underline uppercase tracking-wider"
            >
                <Plus size={16}/> Invite User
            </button>
        </div>
        <div className="p-8">
            <div className="space-y-4">
                <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-black text-lg border-2 border-white shadow-sm">{user.name.charAt(0)}</div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">{user.name} (Primary Account)</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{user.role}</span>
                </div>
            </div>
        </div>
      </div>

      {/* SECURITY & COMPLIANCE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <Shield className="mr-2 text-green-600" size={20}/>
            Secure Audit Hub
        </h3>
        <p className="text-sm text-slate-500 mb-8">Access historical forensic data and compliance logs. All data processing is strictly GDPR-compliant.</p>
        
        <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-800 font-bold text-sm">Security & Forensic Logs</span>
                <button 
                  onClick={() => onExportAudit?.('pdf')}
                  className="bg-white text-blue-600 border border-blue-100 px-4 py-2 rounded-lg font-bold text-xs hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 shadow-sm"
                >
                  <Download size={14}/> Export Audit Trail (PDF)
                </button>
            </div>
             <div className="flex items-center justify-between px-4 py-2">
                <span className="text-slate-500 font-medium text-xs uppercase tracking-widest">Compliance Center</span>
                <div className="space-x-6">
                    <button onClick={() => { setLegalTab('terms'); setShowLegal(true); }} className="text-slate-400 font-bold text-xs hover:text-slate-800 uppercase tracking-tighter transition-colors">Terms of Service</button>
                    <button onClick={() => { setLegalTab('privacy'); setShowLegal(true); }} className="text-slate-400 font-bold text-xs hover:text-slate-800 uppercase tracking-tighter transition-colors">GDPR Privacy Policy</button>
                </div>
            </div>
        </div>
      </div>

      {/* INVITE MODAL */}
      {showInviteModal && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800">Invite Finance Teammate</h3>
                      <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-600 transition-transform active:scale-90 p-1"><X size={24}/></button>
                  </div>
                  <div className="p-8 space-y-6">
                      <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Member Email</label>
                          <input 
                            type="email" 
                            value={inviteEmail} 
                            onChange={e => setInviteEmail(e.target.value)} 
                            placeholder="teammate@company.com" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                          />
                      </div>
                      <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Access Level</label>
                          <select 
                            value={inviteRole} 
                            onChange={e => setInviteRole(e.target.value as any)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer font-medium"
                          >
                              <option value={UserRole.VIEWER}>Auditor (Read Only)</option>
                              <option value={UserRole.MANAGER}>Manager (Case Resolver)</option>
                              <option value={UserRole.ADMIN}>Administrator (Full Suite)</option>
                          </select>
                      </div>
                      <button 
                        onClick={() => { alert(`Invitation sent to ${inviteEmail}`); setShowInviteModal(false); }}
                        className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest"
                      >
                          <Plus size={20}/> Send Invitation
                      </button>
                  </div>
              </div>
          </div>
      )}

      <LegalModal isOpen={showLegal} onClose={() => setShowLegal(false)} initialTab={legalTab} />
    </div>
  );
};

export default UserProfile;
