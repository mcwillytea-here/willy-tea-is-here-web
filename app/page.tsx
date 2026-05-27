import Link from 'next/link';
import { Skull } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 flex flex-col items-center justify-center text-center min-h-[calc(100vh-8rem)]">
      <div className="relative mb-12 group">
        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full scale-110 group-hover:bg-emerald-500/30 transition-all duration-700"></div>
        <Skull className="w-24 h-24 md:w-32 md:h-32 text-emerald-500 relative z-10" strokeWidth={1} />
      </div>
      
      <h1 className="text-4xl md:text-7xl font-mono font-bold tracking-tighter italic uppercase mb-6 text-white drop-shadow-lg">
        Tohle není hra. <br/>
        <span className="text-emerald-500">Tohle je realita.</span>
      </h1>
      
      <p className="max-w-2xl text-lg md:text-xl text-zinc-500 font-mono mb-12">
        Systém je rozbitý, algoritmy nás krmí sračkama a umění umírá v korporátních excelech. Vstup do archivu.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link href="/archiv" className="px-8 py-4 bg-white text-black font-mono font-bold tracking-widest hover:bg-emerald-500 hover:text-white transition-colors uppercase text-sm border border-transparent hover:border-emerald-500">
          Poslechnout Archiv
        </Link>
        <Link href="/manifesto" className="px-8 py-4 bg-transparent text-white font-mono font-bold tracking-widest hover:bg-zinc-900 transition-colors uppercase text-sm border border-zinc-700">
          Číst Manifest
        </Link>
      </div>
    </div>
  );
}
