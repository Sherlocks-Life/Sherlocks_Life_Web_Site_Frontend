import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Calendar, User, MessageSquare, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { apiUrl } from '../../config/api';
import { motion } from 'framer-motion';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, [page]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(apiUrl(`/api/admin/contacts?page=${page}`), {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(res.data.contacts);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-indigo-500" size={40} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={contact._id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600">
                    <User size={20}/>
                  </div>
                  <div>
                    <h3 className="font-black text-lg">{contact.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar size={12}/> {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Mail size={16} className="text-slate-400"/>
                    <span className="truncate">{contact.email}</span>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <MessageSquare size={12}/> Message
                    </p>
                    <p className="text-sm leading-relaxed italic">"{contact.message}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              <ChevronLeft size={20}/>
            </button>
            <span className="font-black text-sm">Page {page} of {totalPages}</span>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              <ChevronRight size={20}/>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminContacts;
