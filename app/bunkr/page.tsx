import { HateForm } from '@/components/bunkr/hate-form';

export const dynamic = 'force-dynamic';

// Fake fetch pro simulaci databáze
async function getApprovedHates() {
  // await supabase.from('hate_mail').select('*').eq('is_approved', true).order('created_at', { ascending: false });
  return [
    {
      id: '1',
      sender_name: 'ToxickejFan',
      message: 'Tvoje beaty jsou moc složitý, nedá se na to tancovat v klubu.',
      artist_response: 'Moje beaty nejsou na to, abys na ně trsal na diskotéce jako cvičená opice. Jsou na to, aby ti rozbily iluze.',
      created_at: '2026-05-20T10:00:00Z',
    },
    {
      id: '2',
      sender_name: 'HudebniKritik',
      message: 'Už to nezní jako starý dobrý techno. Prodal ses.',
      artist_response: 'Evoluce bolí. Zůstaň ve svý zaprášený krabici z roku 2005, já jdu dál.',
      created_at: '2026-05-22T15:30:00Z',
    }
  ];
}

export default async function BunkrPage() {
  const hates = await getApprovedHates();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-20 font-mono">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter uppercase text-white italic">Bunkr</h1>
      <p className="text-zinc-500 text-sm max-w-sm mb-12">Schránka na hejty, vzkazy a názory. Nečekej, že ti odepíšu hned. Možná vůbec.</p>
      
      <div className="bg-[#050505] p-8 h-auto border-t-2 border-emerald-500 mb-8">
        <span className="text-[10px] uppercase font-bold text-emerald-500 block mb-6">Bunkr Feedback (Live)</span>
        <div className="space-y-4">
          <div className="flex gap-3 text-xs leading-tight">
            <span className="text-zinc-600">[02:44]</span>
            <p><span className="text-zinc-400 font-bold">user_98:</span> ty basy v tom novém tracku mi urvaly repráky. respekt.</p>
          </div>
          <div className="flex gap-3 text-xs leading-tight">
            <span className="text-zinc-600">[01:12]</span>
            <p><span className="text-zinc-400 font-bold">anon:</span> kdy bude další techno night v bunkru?</p>
          </div>
          <div className="flex gap-3 text-xs leading-tight">
            <span className="text-zinc-600">[23:58]</span>
            <p><span className="text-zinc-400 font-bold">admin:</span> server patch v0.9.2 nahozen.</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <HateForm />
      </div>

      <div className="border-t border-zinc-900 pt-16">
        <h2 className="text-2xl font-bold text-white mb-8 tracking-tighter uppercase italic">Zeď slávy / Zeď nářků</h2>
        <div className="space-y-8">
          {hates.map((hate) => (
            <div key={hate.id} className="bg-[#050505] p-6 border border-zinc-800 flex flex-col gap-4">
              <div className="flex items-start gap-3 text-xs">
                 <span className="text-zinc-600 font-bold">[{hate.sender_name || 'Anonym'}]</span>
                 <p className="text-zinc-400 leading-relaxed">"{hate.message}"</p>
              </div>
              {hate.artist_response && (
                <div className="border-l-2 border-red-600 pl-4 mt-2">
                   <span className="text-[10px] text-red-600 font-bold uppercase tracking-[0.2em] mb-1 block">// ARTIST RESPONSE</span>
                   <p className="text-white text-sm italic">"{hate.artist_response}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
