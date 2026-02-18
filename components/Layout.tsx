
import React, { useState } from 'react';
import { LayoutDashboard, ShieldAlert, Calendar, Settings, LogOut, Menu, Bell, HelpCircle, PanelLeftClose, ChevronRight, ClipboardList, CheckCircle2 } from 'lucide-react';
import { UserProfile, UserRole, AppNotification } from '../types';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  onLogout: () => void;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, user, onLogout, notifications, onMarkNotificationRead }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scan', label: 'Radar & Scan', icon: ShieldAlert },
    { id: 'history', label: 'Alert History', icon: Calendar },
    { id: 'audit', label: 'Audit Trail', icon: ClipboardList, roles: [UserRole.ADMIN] },
    { id: 'profile', label: 'Settings', icon: Settings },
  ];

  const visibleMenuItems = menuItems.filter(item => !item.roles || item.roles.includes(user.role));
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <aside className={`fixed md:relative z-40 h-full bg-slate-900 text-white flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div 
          className="p-6 border-b border-slate-800 h-20 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors"
          onClick={() => setActiveTab('dashboard')}
        >
          {!isSidebarCollapsed ? <Logo variant="light" /> : <ShieldAlert className="mx-auto text-red-500" size={24}/>}
        </div>

        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-3">
            {visibleMenuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                  <item.icon size={20} className="shrink-0" />
                  {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800 flex flex-col gap-2">
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="flex items-center justify-center p-2 rounded-lg text-slate-400 hover:bg-slate-800">
             {isSidebarCollapsed ? <ChevronRight size={20}/> : <PanelLeftClose size={20}/>}
          </button>
          <button onClick={onLogout} className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-red-900/30 text-slate-300 py-2.5 rounded-lg transition-all">
            <LogOut size={16} />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shrink-0 relative z-30">
            <h2 className="text-xl font-bold text-slate-800 capitalize">
                {menuItems.find(i => i.id === activeTab)?.label}
            </h2>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`p-2 hover:bg-slate-100 rounded-full relative transition-colors ${showNotifications ? 'bg-slate-100' : ''}`}
                    >
                        <Bell size={20} className={unreadCount > 0 ? 'text-red-500 animate-pulse' : 'text-slate-400'} />
                        {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 rounded-full border-2 border-white text-[10px] text-white flex items-center justify-center font-bold">{unreadCount}</span>}
                    </button>

                    {showNotifications && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                    <h3 className="font-bold text-slate-800">Notifications</h3>
                                    <span className="text-xs text-slate-500">{unreadCount} unread</span>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="p-8 text-center text-slate-400">No notifications yet</div>
                                    ) : (
                                        notifications.map(notif => (
                                            <div 
                                                key={notif.id} 
                                                onClick={() => {
                                                    onMarkNotificationRead(notif.id);
                                                    if (notif.targetTab) setActiveTab(notif.targetTab);
                                                    setShowNotifications(false);
                                                }}
                                                className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3 ${!notif.isRead ? 'bg-red-50/50' : ''}`}
                                            >
                                                <div className={`mt-1 shrink-0 w-2 h-2 rounded-full ${notif.isRead ? 'bg-slate-200' : 'bg-red-500'}`}></div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{notif.title}</p>
                                                    <p className="text-xs text-slate-500 line-clamp-2">{notif.message}</p>
                                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">{notif.time}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div 
                    className="flex items-center space-x-3 border-l border-slate-200 pl-4 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setActiveTab('profile')}
                >
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.role}</p>
                    </div>
                    <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 overflow-hidden border-2 border-white shadow-sm">
                        {user.name.charAt(0)}
                    </div>
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
