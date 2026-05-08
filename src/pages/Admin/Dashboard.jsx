import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../config/api';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ contacts: 0, subsidies: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [c, s] = await Promise.all([
          axios.get(apiUrl('/api/admin/contacts'), config),
          axios.get(apiUrl('/api/admin/subsidies'), config)
        ]);
        setStats({ contacts: c.data.total, subsidies: s.data.total });
      } catch (err) {
        console.error('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { name: 'Total Subsidies', value: stats.subsidies, icon: <FileText size={24}/>, color: 'indigo', trend: '+12%' },
    { name: 'Active Contacts', value: stats.contacts, icon: <MessageSquare size={24}/>, color: 'sky', trend: '+5%' },
    { name: 'Total Users', value: stats.subsidies + stats.contacts, icon: <Users size={24}/>, color: 'emerald', trend: '+18%' },
    { name: 'Conversion', value: '42%', icon: <TrendingUp size={24}/>, color: 'purple', trend: '+2%' },
  ];

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${card.color}-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform`}></div>
            
            <div className={`w-14 h-14 bg-${card.color}-100 dark:bg-${card.color}-900/30 rounded-2xl flex items-center justify-center text-${card.color}-600 mb-6 shadow-sm`}>
              {card.icon}
            </div>
            
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[2px] mb-2">{card.name}</p>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-black tracking-tighter">{card.value}</h3>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full mb-1 flex items-center gap-0.5">
                  <ArrowUpRight size={10}/> {card.trend}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 h-[400px] flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center text-slate-300 mb-6 border-2 border-dashed border-slate-200 dark:border-slate-700">
              <TrendingUp size={32}/>
            </div>
            <h4 className="text-xl font-bold mb-2">Analytics View</h4>
            <p className="text-slate-500 max-w-xs text-sm">System metrics and growth charts will be displayed here as data accumulates.</p>
          </div>
        </div>

        <div className="bg-[#0f172a] p-8 rounded-[32px] text-white relative overflow-hidden h-[400px]">
          <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-indigo-600/30 blur-[80px] rounded-full"></div>
          <div className="relative z-10 h-full flex flex-col">
            <h4 className="text-lg font-black mb-6 flex items-center gap-2">
              <Clock size={20} className="text-indigo-400"/> 
              System Activity
            </h4>
            <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Today</p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-1 bg-indigo-500 h-10 rounded-full"></div>
                  <div>
                    <p className="text-sm font-bold">Admin Session Started</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Secure JWT Login - Just Now</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1 bg-emerald-500 h-10 rounded-full"></div>
                  <div>
                    <p className="text-sm font-bold">Database Synchronized</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">MongoDB Atlas - 2 mins ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
