// Stub pre Supabase klienta.
// Pre skutočné použitie nainštalujte @supabase/supabase-js a nastavte env vars.

import { Database } from '@/types/database.types';

export const createClient = () => {
  // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  // return createBrowserClient<Database>(supabaseUrl, supabaseKey);
  
  return {
    from: (table: string) => ({
      select: (query: string) => Promise.resolve({ data: [], error: null })
    })
  } as any;
}
