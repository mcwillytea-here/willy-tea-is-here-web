'use client';

import { useState, useTransition } from 'react';
import { submitHate } from '@/app/bunkr/actions';

export function HateForm() {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<{ error?: string; success?: string } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await submitHate(formData);
      setResponse(result);
      if (result.success) {
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <span className="text-6xl text-emerald-500 block leading-none font-black italic uppercase">B</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* Neviditelný Honeypot pro boty */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="bot_trap_username"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="sender_name" className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest font-bold">Tvoje jméno / Alias (Nepovinné)</label>
          <input 
            type="text"
            id="sender_name" 
            name="sender_name" 
            className="w-full bg-black border border-zinc-800 p-4 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            placeholder="Anonymní srab"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest font-bold">Tvůj e-mail (Nepovinné)</label>
          <input 
            type="email"
            id="email" 
            name="email" 
            className="w-full bg-black border border-zinc-800 p-4 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            placeholder="Nech prázdný, jestli jsi srab..."
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest font-bold">Tvůj vzkaz</label>
          <textarea 
            id="message" 
            name="message" 
            rows={5}
            className="w-full bg-black border border-zinc-800 p-4 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
            placeholder="Napiš, proč jsem ten největší kokot na scéně..."
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-widest py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs"
        >
          {isPending ? 'Odesílám do bunkru...' : 'Odeslat hejt'}
        </button>
        
        {response?.error && (
          <p className="text-white text-xs mt-4 border-l-2 border-red-500 pl-3">
            <span className="text-red-500 font-bold">// ERROR:</span> {response.error}
          </p>
        )}
        {response?.success && (
          <p className="text-white text-xs mt-4 border-l-2 border-emerald-500 pl-3">
            <span className="text-emerald-500 font-bold">// SUCCESS:</span> {response.success}
          </p>
        )}
      </form>
    </div>
  );
}
