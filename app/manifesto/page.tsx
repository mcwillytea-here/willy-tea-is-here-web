import Link from 'next/link';

const ESSAYS = [
  { slug: 'smrt-algoritmum', title: 'Smrt algoritmům, ať žije krev', date: '2025-10-12' },
  { slug: 'proc-vas-nenavidim', title: 'Proč vás všechny kurva nenávidím', date: '2024-03-01' },
];

export default function ManifestoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 font-mono">
      <div className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none mb-4 italic uppercase">
          Mani-<br/>festo
        </h1>
        <p className="text-zinc-500 text-sm max-w-sm">
          V0.4: Myšlenkové depeše z bunkru. INTP-T stream vědomí v digitálním věku.
        </p>
      </div>
      
      <div className="space-y-6 font-mono">
        {ESSAYS.map((essay, index) => (
          <Link key={essay.slug} href={`/manifesto/${essay.slug}`} className={`block pl-6 bg-[#050505] transition-all hover:bg-zinc-900/40 border-l-2 ${index === 0 ? 'border-emerald-500' : 'border-zinc-800 opacity-50 hover:opacity-100'}`}>
            <span className={`text-[10px] block mb-1 font-bold italic ${index === 0 ? 'text-emerald-500' : 'text-zinc-600'}`}>// LOG_ENTRY: {essay.date.replace(/-/g, '_')}</span>
            <h2 className={`text-xl font-bold mb-2 ${index === 0 ? 'text-white' : 'text-zinc-400'}`}>
              {essay.title}
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-prose line-clamp-2">
              Přečti si tenhle záznam v archivu. Systém se hroutí a my to analyzujeme pěkně řádek po řádku.
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
