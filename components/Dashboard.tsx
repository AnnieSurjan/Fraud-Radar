
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShieldAlert, AlertTriangle, TrendingDown, Activity, Building, Zap, Search, ShieldCheck, Clock, CheckCircle, ArrowRight, ShieldX, Info } from 'lucide-react';
import { ScanResult, UserProfile } from '../types';

interface DashboardProps {
  scanHistory: ScanResult[];
  user: UserProfile;
  onConnectQuickBooks: () => void;
  setActiveTab?: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ scanHistory, user, onConnectQuickBooks, setActiveTab }) => {
  const totalAnomalies = scanHistory.reduce((acc, curr) => acc + curr.anomaliesFound, 0);
  const exposure = scanHistory.reduce((acc, curr) => acc + curr.totalRiskExposure, 0);

  const riskData = [
    { name: 'Splitting', value: 45 },
    { name: 'Timing Error', value: 25 },
    { name: 'Round Amount', value: 20 },
    { name: 'Duplicate', value: 10 },
  ];

  const COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#10B981'];

  // Setup Progress Mock
  const setupSteps = [
    { id: 1, label: 'Connect your Ledger', done: user.isQuickBooksConnected || user.isXeroConnected, tab: 'profile' },
    { id: 2, label: 'Run your first Radar Scan', done: scanHistory.length > 0, tab: 'scan' },
    { id: 3, label: 'Define False Positive Rules', done: false, tab: 'profile' },
    { id: 4, label: 'Invite your Finance Team', done: false, tab: 'profile' },
  ];

  const progressPercentage = Math.round((setupSteps.filter(s => s.done).length / setupSteps.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center flex-wrap gap-3">
                Overview Dashboard
                {(user.isQuickBooksConnected || user.isXeroConnected) && (
                    <span className="flex items-center text-slate-700 bg-white px-3 py-1 rounded-lg text-sm border border-slate-200 font-medium shadow-sm">
                        {user.isQuickBooksConnected ? <Building size={16} className="text-[#2CA01C]" /> : <Activity size={16} className="text-[#13B5EA]" />}
                        <span className="ml-2">{user.companyName || 'Connected Ledger'}</span>
                    </span>
                )}
                {user.isTrial && (
                    <span className="flex items-center text-orange-600 bg-orange-50 px-3 py-1 rounded-lg text-sm border border-orange-100 font-bold">
                        <Clock size={16} className="mr-2" />
                        7-Day Trial
                    </span>
                )}
            </h2>
            <p className="text-slate-500">Risk analysis and suspicious pattern overview.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SERIOUS THREAT GAUGE */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-red-100 flex flex-col items-center justify-center text-center">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">System Threat Level</h3>
            <div className="relative w-40 h-20 mb-4 overflow-hidden">
                <div className="absolute w-40 h-40 border-[20px] border-slate-100 rounded-full"></div>
                <div 
                    className="absolute w-40 h-40 border-[20px] border-transparent border-t-red-600 border-r-red-600 rounded-full rotate-45 transition-transform duration-1000"
                    style={{ transform: `rotate(${45 + (totalAnomalies * 10)}deg)` }}
                ></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <span className="text-3xl font-black text-slate-900 leading-none">{totalAnomalies > 5 ? 'SEVERE' : 'GUARDED'}</span>
                </div>
            </div>
            <p className="text-xs text-slate-400 max-w-[200px]">Threat level based on active anomalies and historical risk exposure.</p>
            {totalAnomalies > 0 && (
                <button 
                    onClick={() => setActiveTab && setActiveTab('scan')}
                    className="mt-6 flex items-center gap-2 text-red-600 font-bold text-sm hover:underline"
                >
                    Review Critical Alerts <ArrowRight size={14}/>
                </button>
            )}
        </div>

        {/* SETUP PROGRESS */}
        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-xl p-6 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck size={120} />
            </div>
            <div className="relative z-10">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="text-lg font-bold">Security Setup Progress</h3>
                        <p className="text-slate-400 text-sm">Follow these steps to maximize your protection.</p>
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-black text-red-500">{progressPercentage}%</span>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Complete</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {setupSteps.map(step => (
                        <div 
                            key={step.id} 
                            onClick={() => setActiveTab && setActiveTab(step.tab)}
                            className={`p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-all ${step.done ? 'bg-slate-800 border-slate-700 opacity-60' : 'bg-red-600/10 border-red-500/30 hover:bg-red-600/20'}`}
                        >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                {step.done ? <CheckCircle size={14} /> : <span className="text-xs font-bold">{step.id}</span>}
                            </div>
                            <span className={`text-sm font-medium ${step.done ? 'text-slate-400 line-through' : 'text-slate-100'}`}>{step.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-sm font-medium">Active Alerts</p>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><ShieldAlert size={20} /></div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mt-2">{totalAnomalies}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-sm font-medium">Risk Exposure</p>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><TrendingDown size={20} /></div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mt-2">${exposure.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-sm font-medium">Protected Entities</p>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ShieldCheck size={20} /></div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mt-2">128</h3>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-xl shadow-lg text-white">
          <p className="text-red-100 text-sm font-medium">Risk Status</p>
          <h3 className="text-2xl font-bold mt-2 uppercase">High Alert</h3>
          <p className="text-xs text-red-200 mt-1 italic">Immediate review recommended</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Anomaly Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {riskData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Security Insights</h3>
          <div className="flex flex-col flex-1 justify-center space-y-5">
             <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100 shadow-sm">
                <ShieldX className="text-red-600 shrink-0" size={28}/>
                <div>
                    <h4 className="font-bold text-red-900 text-sm">Critical Splitting Detected</h4>
                    <p className="text-xs text-red-700 leading-relaxed">3 transactions totaling $1,350 to 'Office Max' suggest limit bypass.</p>
                </div>
             </div>
             <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                <Info className="text-blue-600 shrink-0" size={28}/>
                <div>
                    <h4 className="font-bold text-slate-800 text-sm">Audit Coverage</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">100% of your ledger data is being scanned in real-time.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
