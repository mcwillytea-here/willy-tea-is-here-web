import Link from 'next/link';

export default async function ManifestoDetail({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-24 font-mono">
      <Link href="/manifesto" className="text-emerald-500 text-xs font-bold uppercase tracking-widest hover:text-emerald-400 mb-12 inline-block">
        &lt; Zpět na seznam
      </Link>
      
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-tighter uppercase leading-none italic border-b border-zinc-800 pb-8">
        {slug.split('-').join(' ')}
      </h1>
      
      <article className="prose prose-invert max-w-none text-zinc-300 leading-relaxed text-sm md:text-base border-l-2 border-emerald-500 pl-6">
        <p>
          Společnost je nemocná a vy všichni s ní. Sedíte u těch svejch posranejch svítících krabiček a čekáte, 
          až vám algoritmus řekne, co si máte myslet. Já nepotřebuju umělou inteligenci, abych věděl, že tenhle 
          svět jde do prdele.
        </p>
        <p>
          Hudba není o zkurvených plays na Spotify. Je to krev, pot a pravda, kterou ti namrdám přímo do uší, 
          ať chceš nebo nechceš.
        </p>
      </article>
    </div>
  );
}
