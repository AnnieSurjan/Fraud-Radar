
import React, { useState } from 'react';
import { UserProfile as IUserProfile, UserRole } from '../types';
import { Shield, Link, RotateCw, Download, Lock, Users, Plus, X, ShieldCheck } from 'lucide-react';
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
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  onConnectQuickBooks, 
  onConnectXero, 
  isConnectingQB, 
  isConnectingXero, 
  onUpgradePrompt,
  onUpdateUser
}) => {
  const [showLegal, setShowLegal] = useState(false);
  const [legalTab, setLegalTab] = useState<'terms' | 'privacy'>('terms');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState(UserRole.VIEWER);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const isTrial = !!user.isTrial;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-end border-b border-slate-200 pb-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Account Settings</h2>
            <p className="text-slate-500 text-sm">Manage integrations, team access, and compliance.</p>
        </div>
        <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isTrial ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                {isTrial ? '7-Day Trial' : `${user.plan} Plan`}
            </span>
        </div>
      </div>

      {/* Integration Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <Link className="mr-2 text-blue-600" size={20}/>
                Integrations
             </h3>
        </div>
        <div className="p-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-8">
                <div className="flex items-center space-x-4 w-full">
                    <div className="w-14 h-14 bg-[#2CA01C] rounded-xl flex items-center justify-center shadow-md shrink-0">
                        <span className="text-white font-bold text-2xl">qb</span>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-900">QuickBooks Online</h4>
                        <p className="text-sm text-slate-500">{user.isQuickBooksConnected ? `Connected to ${user.companyName}` : 'Sync your invoices and bills directly.'}</p>
                    </div>
                </div>
                <button 
                  onClick={onConnectQuickBooks} 
                  disabled={isConnectingQB}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 ${
                    user.isQuickBooksConnected ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-[#2CA01C] text-white hover:bg-[#238016]'
                  }`}
                >
                  {isConnectingQB ? <RotateCw className="animate-spin" size={18}/> : user.isQuickBooksConnected ? 'Manage' : 'Connect'}
                </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4 w-full">
                    <div className="w-14 h-14 bg-[#13B5EA] rounded-xl flex items-center justify-center shadow-md shrink-0">
                        <div className="bg-white p-1 rounded-md">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#13B5EA"/>
                            <path d="M18.4 12.3C18.4 11.2 17.6 10.4 16.5 10.4C15.4 10.4 14.6 11.2 14.6 12.3C14.6 13.4 15.4 14.2 16.5 14.2C17.6 14.2 18.4 13.4 18.4 12.3Z" fill="white"/>
                            <path d="M9.4 12.3C9.4 11.2 8.6 10.4 7.5 10.4C6.4 10.4 5.6 11.2 5.6 12.3C5.6 13.4 6.4 14.2 7.5 14.2C8.6 14.2 9.4 13.4 9.4 12.3Z" fill="white"/>
                            <path d="M13 13.5V11H11V13.5H13Z" fill="white"/>
                          </svg>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-900">Xero Integration</h4>
                        <p className="text-sm text-slate-500">{user.isXeroConnected ? 'Successfully linked with Xero Organization.' : 'Monitor your Xero ledger.'}</p>
                    </div>
                </div>
                <button 
                  onClick={onConnectXero} 
                  disabled={isConnectingXero}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 ${
                    user.isXeroConnected ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-[#13B5EA] text-white hover:bg-[#0f96c2]'
                  }`}
                >
                  {isConnectingXero ? <RotateCw className="animate-spin" size={18}/> : user.isXeroConnected ? 'Sync Active' : 'Connect Xero'}
                </button>
            </div>
        </div>
      </div>

      {/* TEAM & INVITES */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <Users className="mr-2 text-indigo-600" size={20}/>
                Team & Access
             </h3>
             <button 
                onClick={() => isTrial ? onUpgradePrompt?.() : setShowInviteModal(true)}
                className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:underline"
            >
                <Plus size={16}/> Invite Member
            </button>
        </div>
        <div className="p-8">
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">{user.name.charAt(0)}</div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">{user.name} (You)</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                    </div>
                    <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">{user.role}</span>
                </div>
                {isTrial && (
                    <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center">
                        <Lock size={20} className="text-slate-300 mb-2"/>
                        <p className="text-xs text-slate-400 max-w-[200px]">Invite up to 5 finance managers to review Radar alerts with a <strong>Pro</strong> plan.</p>
                        <button onClick={onUpgradePrompt} className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-800 underline">Upgrade to Professional</button>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* SECURITY & COMPLIANCE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <Shield className="mr-2 text-green-600" size={20}/>
            Security & Compliance
        </h3>
        <p className="text-sm text-slate-500 mb-6">Fraud Radar performs secure, encrypted scans of your ledger. Review our compliance documentation and forensic audit settings.</p>
        
        <div className="space-y-4">
             <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-slate-700 font-medium">Security Audit Logs</span>
                  {isTrial && <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase flex items-center gap-1"><Lock size={10}/> Pro</span>}
                </div>
                <button className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1 transition-all">
                  <Download size={14} className="mr-1"/> Download History
                </button>
            </div>
             <div className="flex items-center justify-between py-3">
                <span className="text-slate-700 font-medium">Legal Documents</span>
                <div className="space-x-4">
                    <button onClick={() => { setLegalTab('terms'); setShowLegal(true); }} className="text-blue-600 font-bold text-sm hover:underline">Terms</button>
                    <button onClick={() => { setLegalTab('privacy'); setShowLegal(true); }} className="text-blue-600 font-bold text-sm hover:underline">Privacy</button>
                </div>
            </div>
        </div>
      </div>

      {/* INVITE MODAL */}
      {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800">Invite Team Member</h3>
                      <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-600 transition-transform active:scale-90"><X size={20}/></button>
                  </div>
                  <div className="p-8 space-y-4">
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                          <input 
                            type="email" 
                            value={inviteEmail} 
                            onChange={e => setInviteEmail(e.target.value)} 
                            placeholder="teammate@company.com" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Role</label>
                          <select 
                            value={inviteRole} 
                            onChange={e => setInviteRole(e.target.value as any)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none cursor-pointer"
                          >
                              <option value={UserRole.VIEWER}>Viewer (Read Only)</option>
                              <option value={UserRole.MANAGER}>Manager (Resolve Alerts)</option>
                              <option value={UserRole.ADMIN}>Admin (Full Access)</option>
                          </select>
                      </div>
                      <button 
                        onClick={() => { alert(`Invitation sent to ${inviteEmail}`); setShowInviteModal(false); }}
                        className="w-full py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                      >
                          <Plus size={18}/> Send Invitation
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
