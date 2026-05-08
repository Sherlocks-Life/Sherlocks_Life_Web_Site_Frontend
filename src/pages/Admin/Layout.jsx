import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { apiUrl } from '../../config/api';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNotifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;
      const res = await axios.get(apiUrl('/api/admin/notifications'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data.notifications || []);
    } catch (err) {
      // Silently fail – backend may not be running
      setNotifications([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20}/>, path: '/admin/dashboard' },
    { name: 'Contacts', icon: <MessageSquare size={20}/>, path: '/admin/contacts' },
    { name: 'Subsidies', icon: <FileText size={20}/>, path: '/admin/subsidies' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-50"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="text-xl font-black bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent tracking-tighter">SHERLOCK ADMIN</span>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="font-semibold">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 rounded-xl w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
            <LogOut size={20}/>
            {isSidebarOpen && <span className="font-semibold">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-40">
          <h2 className="text-xl font-bold">
            {menuItems.find(i => i.path === location.pathname)?.name || 'Admin'}
          </h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setNotifOpen(true)}
              className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <Bell size={22}/>
              {notifications.length > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>}
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Akhil Thadaka</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600">
                <User size={20}/>
              </div>
            </div>
          </div>
        </header>

        {/* Page Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>

      {/* Notifications Drawer */}
      <AnimatePresence>
        {isNotifOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setNotifOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}
              className="fixed top-0 right-0 h-full w-[400px] bg-white dark:bg-slate-900 shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-bold">Recent Notifications</h3>
                <button onClick={() => setNotifOpen(false)}><X size={20}/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {notifications.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">No new notifications in last 24h</div>
                ) : (
                  notifications.map((n, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-4 hover:border-indigo-200 transition-all group">
                      <div className={`p-2 rounded-xl ${n.type === 'contact' ? 'bg-sky-100 text-sky-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {n.type === 'contact' ? <MessageSquare size={18}/> : <FileText size={18}/>}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold">New {n.type} submitted</p>
                        <p className="text-xs text-slate-500">From: {n.name}</p>
                        <p className="text-[10px] text-indigo-500 mt-2 font-medium">{new Date(n.time).toLocaleString()}</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform"/>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
