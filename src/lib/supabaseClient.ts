import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const publishableKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Configuração do Supabase ausente. Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env."
    );
  }

  if (!client) {
    client = createClient(url, publishableKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }

  return client;
}
