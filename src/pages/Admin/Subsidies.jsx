import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../config/api';
import { 
  User, 
  Target, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSubsidies = () => {
  const [subsidies, setSubsidies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubsidies();
  }, [page]);

  const fetchSubsidies = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(apiUrl(`/api/admin/subsidies?page=${page}`), {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubsidies(res.data.subsidies);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error('Failed to fetch subsidies');
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
          <div className="space-y-6">
            {subsidies.map((form, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={form._id}
                className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left: Key Stats */}
                  <div className="lg:w-72 bg-slate-50 dark:bg-slate-800/50 p-8 border-r border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-3xl shadow-lg flex items-center justify-center text-indigo-600 mb-4 border border-slate-100 dark:border-slate-800">
                        <User size={32}/>
                      </div>
                      <h3 className="font-black text-xl leading-tight mb-1">{form.u_name}</h3>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{form.category}</p>
                      
                      <div className="mt-6 w-full space-y-3">
                        <div className={`py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 ${
                          form.paymentStatus === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          <CreditCard size={12}/>
                          {form.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                        </div>
                        <div className="py-2 px-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2">
                          <Calendar size={12}/>
                          {new Date(form.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Data */}
                  <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Target size={14} className="text-indigo-500"/> Target Information
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">Full Name</p>
                          <p className="font-bold">{form.t_name}</p>
                        </div>
                        <div className="flex gap-8">
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Phone</p>
                            <p className="font-bold">{form.t_phone}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Relation</p>
                            <p className="font-bold">{form.relation}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">Social Link</p>
                          <a href={form.t_social} target="_blank" rel="noreferrer" className="text-indigo-600 font-bold flex items-center gap-1 hover:underline text-sm truncate">
                            {form.t_social} <ExternalLink size={12}/>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <MapPin size={14} className="text-sky-500"/> Application Details
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">State</p>
                          <p className="font-bold">{form.state}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">Selected Roles</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {form.roles.map(role => (
                              <span key={role} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">Contact</p>
                          <p className="font-bold text-sm">{form.u_email}</p>
                          <p className="font-bold text-sm">{form.u_phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: ID Proofs */}
                  <div className="lg:w-80 p-8 border-l border-slate-100 dark:border-slate-800">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ImageIcon size={14} className="text-emerald-500"/> Verification Documents
                    </h4>
                    {form.idProofUrls && form.idProofUrls.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {form.idProofUrls.map((url, i) => (
                          <a 
                            key={i} 
                            href={apiUrl(url)} 
                            target="_blank" 
                            rel="noreferrer"
                            className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden group/img relative shadow-sm"
                          >
                            <img src={apiUrl(url)} alt="ID Proof" className="w-full h-full object-cover transition-transform group-hover/img:scale-110" />
                            <div className="absolute inset-0 bg-indigo-600/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                              <ExternalLink size={20} className="text-white"/>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No Documents</p>
                      </div>
                    )}
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

export default AdminSubsidies;
