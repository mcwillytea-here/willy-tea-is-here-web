'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface LyricLine {
  id: string;
  text: string;
  note?: string | null;
}

interface LyricsInteractiveProps {
  lines: LyricLine[];
}

export function LyricsInteractive({ lines }: LyricsInteractiveProps) {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const toggleNote = (id: string, hasNote: boolean) => {
    if (!hasNote) return;
    setActiveNoteId(prev => (prev === id ? null : id));
  };

  return (
    <div className="relative font-mono leading-relaxed max-w-prose text-sm md:text-base">
      <div className="space-y-4 md:space-y-6">
        {lines.map((line) => (
          <div key={line.id} className="relative">
            <p 
              className={`transition-colors py-1 ${
                line.note 
                  ? 'cursor-pointer text-zinc-300 hover:text-white underline decoration-emerald-500/50 hover:decoration-emerald-500 underline-offset-8 decoration-2' 
                  : 'text-zinc-600'
              }`}
              onClick={() => toggleNote(line.id, !!line.note)}
            >
              {line.text}
            </p>
            <AnimatePresence>
              {activeNoteId === line.id && line.note && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 md:p-6 bg-zinc-950 border border-zinc-800 border-l-2 border-l-emerald-500 text-zinc-400">
                    <span className="text-emerald-500 font-bold mb-3 block uppercase tracking-[0.2em] text-[10px] md:text-xs">
                      // Analysis
                    </span>
                    <p className="text-sm italic">"{line.note}"</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
