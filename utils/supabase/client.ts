import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseUrl = (envUrl && envUrl.startsWith('http')) ? envUrl : 'https://placeholder-project.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}
