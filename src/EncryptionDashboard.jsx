import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const copiarAlPortapapeles = (texto, onDone) => {
  navigator.clipboard.writeText(texto)
    .then(onDone)
    .catch(() => {
      const el = document.createElement('textarea');
      el.value = texto;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      onDone();
    });
};

const EncryptionDashboard = ({ subscriptionId }) => {
  const [inputText,  setInputText]  = useState('');
  const [resultText, setResultText] = useState('');
  const [loading,    setLoading]    = useState(false);
  const [mode,       setMode]       = useState('encrypt');
  const [copied,     setCopied]     = useState(false);

  const handleAction = async () => {
    if (!inputText) return;
    setLoading(true);
    try {
      const endpoint = mode === 'encrypt' ? '/encrypt' : '/decrypt';
      const payload = mode === 'encrypt' 
        ? { text: inputText, subscriptionId } 
        : { encryptedText: inputText, subscriptionId };
      
      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      setResultText(mode === 'encrypt' ? response.data.encryptedText : response.data.decryptedText);
    } catch (err) {
      alert('Operación fallida. Verifique su suscripción.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block p-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold mb-4"
        >
          Suscripción Activa: {subscriptionId.slice(0, 8)}...
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Núcleo de Cifrado Neural</h1>
        <p className="text-slate-400">Protección cuántica impulsada por IA para tu información confidencial.</p>
      </div>

      <div className="glass-card rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
        <div className="flex p-1 bg-slate-950/50 backdrop-blur-md rounded-2xl mb-8 border border-white/5">
          <button 
            onClick={() => { setMode('encrypt'); setResultText(''); }}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'encrypt' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            Cifrar
          </button>
          <button 
            onClick={() => { setMode('decrypt'); setResultText(''); }}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'decrypt' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            Descifrar
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
              Entrada de Datos
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encrypt' ? "Escribe el texto secreto aquí..." : "Pega el texto cifrado aquí..."}
              className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all min-h-[150px] backdrop-blur-sm"
            />
          </div>

          <button 
            onClick={handleAction} 
            disabled={loading || !inputText}
            className="w-full bg-indigo-500 text-white hover:bg-indigo-400 disabled:opacity-50 font-black py-5 rounded-2xl text-lg transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-[0.98]"
          >
            {loading ? 'Sincronizando con Red Neural...' : (mode === 'encrypt' ? 'Cifrado Neural' : 'Descifrado Neural')}
          </button>

          {resultText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <label className="block text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 ml-1">
                Resultado {mode === 'encrypt' ? 'Cifrado' : 'Descifrado'}
              </label>
              <div className="relative group">
                <textarea
                  readOnly
                  value={resultText}
                  className="w-full bg-indigo-500/5 border border-indigo-500/20 rounded-2xl px-6 py-4 text-indigo-200 font-mono text-sm min-h-[150px]"
                />
                <button
                  onClick={() => copiarAlPortapapeles(resultText, () => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  })}
                  className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-indigo-400 text-xs font-semibold"
                  style={copied
                    ? { background: 'rgba(0,255,136,0.12)', border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88' }
                    : { background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)' }
                  }
                  title="Copiar al portapapeles"
                >
                  {copied
                    ? <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                        Copiado
                      </>
                    : <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                        Copiar
                      </>
                  }
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EncryptionDashboard;
