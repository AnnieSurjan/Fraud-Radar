
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ScanManager from './components/ScanManager';
import CalendarView from './components/CalendarView';
import UserProfile from './components/UserProfile';
import ChatAssistant from './components/ChatAssistant';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import PaymentGateway from './components/PaymentGateway';
import { UserProfile as IUserProfile, UserRole, ScanResult, AuditLogEntry, AnomalyGroup, AppNotification } from './types';
import { MOCK_SCAN_HISTORY } from './services/mockData';

type ViewState = 'landing' | 'auth' | 'app';

const DEFAULT_USER: IUserProfile = {
    name: 'Alex Accountant',
    email: 'alex@finance-pro.com',
    role: UserRole.MANAGER, 
    plan: 'Starter', 
    companyName: '', 
    isQuickBooksConnected: false,
    isXeroConnected: false,
    isTrial: true,
    reportFrequency: 'Never'
};

const INITIAL_NOTIFICATIONS: AppNotification[] = [
    { id: '1', title: 'System Warning', message: 'Potential transaction splitting detected in recent sync.', type: 'warning', isRead: false, time: '2h ago', targetTab: 'scan' },
    { id: '2', title: 'Welcome to Radar', message: 'Securely link your QuickBooks to begin anomaly detection.', type: 'info', isRead: true, time: '1d ago', targetTab: 'profile' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(() => (localStorage.getItem('fraud_radar_view') as ViewState) || 'landing');
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('fraud_radar_auth') === 'true');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isConnectingQB, setIsConnectingQB] = useState(false);
  const [isConnectingXero, setIsConnectingXero] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>(MOCK_SCAN_HISTORY);
  const [user, setUser] = useState<IUserProfile>(() => {
      const savedUser = localStorage.getItem('fraud_radar_user');
      return savedUser ? JSON.parse(savedUser) : DEFAULT_USER;
  });

  useEffect(() => { localStorage.setItem('fraud_radar_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('fraud_radar_view', currentView); localStorage.setItem('fraud_radar_auth', String(isAuthenticated)); }, [currentView, isAuthenticated]);

  const handleAddAuditLog = (action: string, details: string, type: 'info' | 'warning' | 'danger' | 'success' = 'info') => {
      setAuditLogs(prev => [{ id: Date.now().toString(), time: new Date().toLocaleString(), user: user.name, action, details, type }, ...prev]);
  };

  const handleMarkNotificationRead = (id: string) => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleScanComplete = (results: AnomalyGroup[]) => {
      const totalExposure = results.reduce((acc, group) => acc + group.transactions.reduce((sum, t) => sum + t.amount, 0), 0);
      setScanHistory(prev => [{ id: `RAD-${Date.now().toString().slice(-4)}`, date: new Date().toISOString().split('T')[0], anomaliesFound: results.length, totalRiskExposure: totalExposure, status: 'Completed' }, ...prev]);
  };

  const handleLogin = (data?: { name: string; email: string; companyName: string }) => {
    if (data) setUser(prev => ({ ...prev, name: data.name, email: data.email, companyName: data.companyName || prev.companyName }));
    setIsAuthenticated(true);
    setCurrentView('app');
    handleAddAuditLog('Login', 'User logged in successfully', 'info');
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('landing');
    setActiveTab('dashboard');
    setUser(DEFAULT_USER);
  };

  const handleUpgradeClick = (plan: string, price: string) => {
      setSelectedPlan({ name: plan, price: price });
      setShowPaymentModal(true);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
      if (user.isTrial) {
        handleUpgradeClick('Professional', '69');
        return;
      }
      alert(`Generating Forensic Audit Trail in ${format.toUpperCase()} format...`);
      handleAddAuditLog('Export', `Audit trail exported to ${format.toUpperCase()}`, 'info');
  };

  const handlePaymentSuccess = () => {
      if (selectedPlan) {
          setUser(prev => ({ ...prev, plan: selectedPlan.name as any, isTrial: false }));
          handleAddAuditLog('Upgrade', `Plan upgraded to ${selectedPlan.name}`, 'success');
          setShowPaymentModal(false);
          if (currentView === 'landing') setCurrentView('auth');
      }
  };

  if (currentView === 'landing') return <LandingPage onGetStarted={() => setCurrentView('auth')} onLogin={() => setCurrentView('auth')} onUpgrade={handleUpgradeClick} onStartDemo={() => handleLogin()} />;
  if (currentView === 'auth') return <Auth onLogin={handleLogin} onBack={() => setCurrentView('landing')} />;

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        onLogout={handleLogout}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
      >
        {activeTab === 'dashboard' && <Dashboard scanHistory={scanHistory} user={user} onConnectQuickBooks={() => {}} setActiveTab={setActiveTab} />}
        {activeTab === 'scan' && <ScanManager user={user} onUpdateUser={setUser} onAddAuditLog={handleAddAuditLog} onScanComplete={handleScanComplete} onUpgradePrompt={handleUpgradeClick} />}
        {activeTab === 'history' && <CalendarView history={scanHistory} onUpgradePrompt={() => handleUpgradeClick('Professional', '69')} isTrial={!!user.isTrial} />}
        {activeTab === 'audit' && (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Audit Trail</h2>
                        <p className="text-slate-500">Forensic-grade action tracking.</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => handleExport('csv')} className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 text-sm font-bold flex items-center shadow-sm transition-all active:scale-95">CSV</button>
                        <button onClick={() => handleExport('pdf')} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center shadow-sm transition-all active:scale-95">PDF Export</button>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Timestamp</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">User</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Action</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {auditLogs.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-slate-400">No audit logs available. Start a scan to generate activity.</td></tr>}
                            {auditLogs.map((log, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-slate-600 font-mono">{log.time}</td>
                                    <td className="px-6 py-4 text-slate-800 font-medium">{log.user}</td>
                                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${log.type === 'danger' ? 'bg-red-100 text-red-700' : log.type === 'warning' ? 'bg-orange-100 text-orange-700' : log.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{log.action}</span></td>
                                    <td className="px-6 py-4 text-slate-500">{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
        {activeTab === 'profile' && <UserProfile user={user} isConnectingQB={false} isConnectingXero={false} onUpdateUser={setUser} onUpgradePrompt={() => handleUpgradeClick('Professional', '69')} />}
      </Layout>
      {showPaymentModal && selectedPlan && <PaymentGateway planName={selectedPlan.name} price={selectedPlan.price} onClose={() => setShowPaymentModal(false)} onSuccess={handlePaymentSuccess} />}
      <ChatAssistant />
    </div>
  );
};

export default App;
