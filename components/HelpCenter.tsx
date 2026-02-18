
import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, FileQuestion, Bug, Lightbulb, Send, HelpCircle, ChevronDown, ChevronUp, Bot, Loader2, CheckCircle } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'faq' | 'ai' | 'feedback';
type FeedbackType = 'Question' | 'Feature Request' | 'General Feedback' | 'Bug Report';

const HelpCenter: React.FC<HelpCenterProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('faq');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[600px] shadow-2xl flex flex-col overflow-hidden relative">
        
        <div className="bg-slate-900 text-white p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-600 rounded-lg">
                <HelpCircle size={24} />
            </div>
            <div>
                <h2 className="text-xl font-bold">Radar Support</h2>
                <p className="text-xs text-slate-400">Security & Compliance Center</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
            <button onClick={() => setActiveTab('faq')} className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 transition-colors border-b-2 ${activeTab === 'faq' ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                <FileQuestion size={18}/>
                <span>FAQ</span>
            </button>
            <button onClick={() => setActiveTab('ai')} className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 transition-colors border-b-2 ${activeTab === 'ai' ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                <Bot size={18}/>
                <span>Radar AI Support</span>
            </button>
            <button onClick={() => setActiveTab('feedback')} className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 transition-colors border-b-2 ${activeTab === 'feedback' ? 'border-red-600 text-red-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                <MessageCircle size={18}/>
                <span>Feedback</span>
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-white relative">
            {activeTab === 'faq' && <FaqTab />}
            {activeTab === 'ai' && <AiSupportTab />}
            {activeTab === 'feedback' && <FeedbackTab onClose={onClose} />}
        </div>
      </div>
    </div>
  );
};

const FaqTab = () => {
    const faqs = [
        { q: "How does anomaly detection work?", a: "Fraud Radar analyzes patterns in transaction dates, amounts, and user accounts. We look for splitting patterns, round amounts, and entries recorded at unusual hours." },
        { q: "Is my data secure?", a: "Yes. Fraud Radar uses 256-bit encryption and only reads data required for anomaly detection. We do not store your full login credentials." },
        { q: "What happens after the 7-day trial?", a: "The Radar will continue to show alerts, but you won't be able to initiate investigations or mark alerts as cleared without a paid plan." },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Radar FAQ</h3>
            {faqs.map((faq, idx) => (
                <details key={idx} className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                    <summary className="flex justify-between items-center p-4 font-medium text-slate-700 cursor-pointer list-none hover:bg-slate-100">
                        {faq.q}
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">
                            <ChevronDown size={20} />
                        </span>
                    </summary>
                    <div className="p-4 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100/50 mt-2">
                        {faq.a}
                    </div>
                </details>
            ))}
        </div>
    );
};

const AiSupportTab = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', role: 'model', text: 'Hi! I am the Fraud Radar AI support assistant. How can I help you secure your business today?', timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    const handleSend = async () => {
        if(!input.trim()) return;
        const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);
        try {
            const response = await sendMessageToGemini(messages, userMsg.text);
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: response, timestamp: new Date() }]);
        } catch (e) {
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Error connecting to AI. Please try the feedback tab.", timestamp: new Date() }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                {messages.map(m => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-red-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                            {m.text}
                        </div>
                    </div>
                ))}
                {loading && <div className="text-slate-400 text-xs flex items-center ml-2">Radar AI is scanning...</div>}
                <div ref={endRef} />
            </div>
            <div className="mt-4 flex gap-2 pt-4 border-t border-slate-100">
                <input className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none" placeholder="Ask about security settings..." value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} />
                <button onClick={handleSend} disabled={loading || !input.trim()} className="bg-red-600 text-white p-2 rounded-lg"><Send size={20} /></button>
            </div>
        </div>
    );
};

const FeedbackTab = ({ onClose }: { onClose: () => void }) => {
    const [sent, setSent] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => onClose(), 2000);
    };
    if (sent) return <div className="h-full flex items-center justify-center">Feedback sent to Fraud Radar team!</div>;
    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <textarea required rows={6} placeholder="How can we improve Fraud Radar for you?" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-lg outline-none"></textarea>
            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg shadow-lg">Submit Feedback</button>
        </form>
    );
};

export default HelpCenter;
