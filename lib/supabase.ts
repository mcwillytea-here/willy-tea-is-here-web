// Stub pre Supabase klienta.
// Pre skutočné použitie nainštalujte @supabase/supabase-js a nastavte env vars.

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yuortrvrmqsdtffxzgos.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_iwhwCpbT0SuB37Vk6RYSwg_ong7d63c';

export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

export const createClient = () => {
  return supabase;
}
