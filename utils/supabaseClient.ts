// import { createClient } from '@supabase/supabase-js';
// import { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY} from './.env.local'

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY


// export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
