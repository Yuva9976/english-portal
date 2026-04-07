import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';

export default function LearnerCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/dashboard/learner/certificates');
      setCertificates(res.data?.certificates || []);
    } catch (err) {
      console.error('Failed to load certificates:', err);
      setError('Failed to load achievements. Please complete more lessons!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-1">
      <div className="min-h-screen pt-10 pl-10 pr-10 pb-20 font-['Inter']">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="mb-2" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '42px',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #14b8a6 0%, #f43f5e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ WebkitTextFillColor: 'initial' }}>🎓</span> My Certificates
            </h1>
            <p className="text-slate-500 mt-2 font-medium" style={{ fontFamily: "'Inter', sans-serif", marginLeft: '4px' }}>Celebrate your progress with official certificates and excellence badges.</p>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-40">
                <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-slate-500 font-black uppercase tracking-widest text-sm">Reviewing your accomplishments...</p>
             </div>
          ) : error ? (
            <div className="bg-rose-50 border border-rose-100 p-12 rounded-[40px] text-center">
               <span className="text-5xl mb-6 block">📜</span>
               <h3 className="text-2xl font-black text-rose-900 mb-2 font-['Outfit']">Keep Learning!</h3>
               <p className="text-rose-600 font-medium">{error}</p>
            </div>
          ) : certificates.length === 0 ? (
            <div className="bg-white rounded-[32px] border border-slate-100 p-16 text-center shadow-xl">
               <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">🏆</div>
               <h3 className="text-2xl font-black text-slate-800 mb-3 font-['Outfit']">Your Trophy Shelf Awaits</h3>
               <p className="text-slate-500 font-medium max-w-md mx-auto mb-8 text-[15px]">Complete courses and score highly on quizzes to earn your first prestigious certificate.</p>
               <button className="px-8 py-4 bg-slate-900 text-white rounded-[20px] font-black text-[13px] uppercase tracking-[0.2em] hover:bg-teal-500 transition-all shadow-xl shadow-slate-900/10">Start Learning Now</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} cert={cert} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CertificateCard({ cert }) {
  return (
    <div className="bg-white rounded-[48px] p-2 shadow-2xl hover:shadow-teal-500/10 transition-all duration-700 group cursor-pointer relative overflow-hidden border border-slate-50">
      <div className="bg-slate-50/50 rounded-[44px] p-8 h-full border border-white flex flex-col items-center text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-full group-hover:scale-125 transition-transform duration-700"></div>
        <div className="w-20 h-20 bg-white rounded-[28px] shadow-xl flex items-center justify-center text-3xl mb-8 group-hover:rotate-6 transition-transform border border-slate-100">
           {cert.type === 'Course Completion' ? '📜' : '⭐'}
        </div>
        
        <div className="mb-6">
           <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-teal-100/50 mb-3 inline-block font-['Outfit']">
              {cert.type}
           </span>
           <h3 className="text-xl font-black text-slate-800 font-['Outfit'] mb-2 leading-tight uppercase tracking-tight">{cert.title}</h3>
           <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none font-['Outfit']">
              {cert.level !== 'N/A' ? `Level: ${cert.level}` : `Score: ${cert.score}%`}
           </p>
        </div>

        <div className="mt-auto w-full pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="text-left">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-['Outfit']">Issued On</p>
               <p className="text-[12px] font-bold text-slate-800 font-['Inter']">{new Date(cert.date).toLocaleDateString()}</p>
            </div>
            <button className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-teal-500 transition-all shadow-lg active:scale-95 group/down">
                <span className="group-hover:translate-y-0.5 transition-transform text-sm">⬇️</span>
            </button>
        </div>
      </div>
    </div>
  );
}
