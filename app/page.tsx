"use client";
import React, { useState } from 'react';
import { Sparkles, Download, Globe, Loader2, Lock, FileText, PenTool, Languages, User, Mail, Briefcase } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MyResumePDF } from './ResumePDF';

const ui: any = {
  English: { title: "CareerBoost AI", name: "Full Name", email: "Email", job: "Target Job", exp: "Work Experience", btn: "Professionalize", unlock: "Unlock PDF", letterBtn: "Write Cover Letter" },
  German: { title: "KarriereBoost AI", name: "Name", email: "E-Mail", job: "Zielposition", exp: "Erfahrung", btn: "Professionalisieren", unlock: "Freischalten", letterBtn: "Anschreiben" },
  Persian: { title: "رزومه‌ساز هوشمند", name: "نام کامل", email: "ایمیل", job: "شغل هدف", exp: "سوابق کاری", btn: "حرفه‌ای سازی", unlock: "خرید و دانلود", letterBtn: "ساخت کاور لتر" },
  Italian: { title: "CarrieraBoost AI", name: "Nome", email: "Email", job: "Posizione", exp: "Esperienza", btn: "Professionalizzare", unlock: "Sblocca", letterBtn: "Crea Lettera" },
  Spanish: { title: "ImpulsoCarrera AI", name: "Nombre", email: "Email", job: "Puesto", exp: "Experiencia", btn: "Profesionalizar", unlock: "Desbloquear", letterBtn: "Crear Carta" }
};

export default function CareerSaaS() {
  const [lang, setLang] = useState('English');
  const [tab, setTab] = useState<'resume' | 'letter'>('resume');
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", jobTitle: "", experience: "", jobDesc: "", coverLetter: "" });

  const t = ui[lang];
  const isRTL = lang === 'Persian';

  const handleAI = async (path: string, body: object) => {
    setLoading(true);
    try {
      const res = await fetch(path, { method: 'POST', body: JSON.stringify(body) });
      const data = await res.json();
      return data.result;
    } finally { setLoading(false); }
  };

  return (
    <main className={`flex h-screen bg-slate-50 overflow-hidden ${isRTL ? 'flex-row-reverse text-right' : 'flex-row'}`}>
      {/* LEFT: FORM */}
      <section className="w-[40%] p-8 overflow-y-auto bg-white border-x z-20 shadow-xl">
        <div className="flex justify-between items-center mb-8 text-indigo-600">
          <h1 className="text-xl font-black flex items-center gap-2"><Globe size={24}/> {t.title}</h1>
          <select value={lang} onChange={(e)=>setLang(e.target.value)} className="text-xs font-bold bg-slate-100 p-2 rounded-lg outline-none">
            {Object.keys(ui).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-style">{t.name}</label>
              <input className="input-style" placeholder="Reza Mehranpour" onChange={(e)=>setFormData({...formData, fullName: e.target.value})} />
            </div>
            <div>
              <label className="label-style">{t.email}</label>
              <input className="input-style" placeholder="reza@example.com" onChange={(e)=>setFormData({...formData, email: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="label-style">{t.job}</label>
            <input className="input-style" placeholder="PLC Programmer" onChange={(e)=>setFormData({...formData, jobTitle: e.target.value})} />
          </div>

          <div className="pt-4 border-t">
            <label className="label-style">{t.exp}</label>
            <textarea rows={5} className="input-style mt-1" value={formData.experience} onChange={(e)=>setFormData({...formData, experience: e.target.value})} />
            <button onClick={async()=>{const r=await handleAI('/api/improve', {text:formData.experience, jobTitle:formData.jobTitle, targetLanguage:lang}); if(r)setFormData({...formData, experience:r})}} disabled={loading} className="w-full mt-2 bg-indigo-600 text-white p-4 rounded-xl font-bold flex justify-center gap-2 shadow-lg">
              {loading ? <Loader2 className="animate-spin"/> : <Sparkles size={18}/>} {t.btn}
            </button>
          </div>

          <div className="pt-4 border-t">
            <label className="label-style text-emerald-600">Job Description for Letter</label>
            <textarea rows={3} className="input-style mt-1 bg-emerald-50/20" onChange={(e)=>setFormData({...formData, jobDesc: e.target.value})} />
            <button onClick={async()=>{const r=await handleAI('/api/cover-letter', {resumeData:formData.experience, jobDescription:formData.jobDesc, fullName:formData.fullName, targetLanguage:lang}); if(r)setFormData({...formData, coverLetter:r}); setTab('letter')}} disabled={loading} className="w-full mt-2 bg-emerald-600 text-white p-4 rounded-xl font-bold flex justify-center gap-2 shadow-lg">
              <PenTool size={18}/> {t.letterBtn}
            </button>
          </div>
        </div>
      </section>

      {/* RIGHT: PREVIEW */}
      <section className="flex-1 p-10 overflow-y-auto flex flex-col items-center relative bg-slate-200">
        <div className="bg-white/90 p-1.5 rounded-2xl shadow-xl flex mb-8 backdrop-blur-md">
          <button onClick={()=>setTab('resume')} className={`px-10 py-2.5 rounded-xl font-bold transition ${tab==='resume'?'bg-indigo-600 text-white shadow-lg':'text-slate-400'}`}>Resume</button>
          <button onClick={()=>setTab('letter')} className={`px-10 py-2.5 rounded-xl font-bold transition ${tab==='letter'?'bg-indigo-600 text-white shadow-lg':'text-slate-400'}`}>Letter</button>
        </div>

        <div className="w-[600px] min-h-[850px] bg-white shadow-2xl p-16 relative">
          {tab === 'resume' ? (
            <div className="animate-in fade-in duration-700">
              <header className="border-b-[10px] border-slate-900 pb-4 mb-10">
                <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">{formData.fullName || "ENTER NAME"}</h2>
                <p className="text-indigo-600 font-bold text-xs uppercase tracking-[0.2em]">{formData.jobTitle || "POSITION"}</p>
              </header>
              <div className="text-sm leading-relaxed whitespace-pre-line text-slate-700">{formData.experience || "Experience content..."}</div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-700 text-slate-700 leading-relaxed text-sm whitespace-pre-line font-serif">
              <h2 className="text-2xl font-bold border-b pb-4 mb-8 text-slate-900">Cover Letter</h2>
              {formData.coverLetter || "Generate a letter..."}
            </div>
          )}
        </div>

        <div className="fixed bottom-10 right-10">
          {isPaid ? (
            <PDFDownloadLink document={<MyResumePDF data={formData} coverLetter={formData.coverLetter} />} fileName="pro-career.pdf" className="bg-slate-900 text-white px-10 py-5 rounded-full shadow-2xl flex items-center gap-2 font-black text-xl hover:scale-105 transition animate-bounce">
              <Download /> {t.download}
            </PDFDownloadLink>
          ) : (
            <button onClick={()=>setIsPaid(confirm("Proceed to Payment?"))} className="bg-indigo-600 text-white px-10 py-5 rounded-full shadow-2xl flex items-center gap-3 font-black text-xl hover:bg-black transition active:scale-95 group">
              <Lock className="group-hover:hidden" /> <Sparkles size={22} className="hidden group-hover:block text-yellow-300 animate-pulse" /> {t.unlock}
            </button>
          )}
        </div>
      </section>

      <style jsx global>{`
        .input-style { width: 100%; padding: 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; font-size: 0.875rem; outline: none; }
        .input-style:focus { border-color: #4f46e5; box-shadow: 0 0 0 4px rgba(79,70,229,0.1); }
        .label-style { font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; }
      `}</style>
    </main>
  );
}