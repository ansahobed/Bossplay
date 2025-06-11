// lib/logout.ts
import { supabase } from '../lib/supabaseClient'

export const logout = async () => {
  await supabase.auth.signOut()
  window.location.href = '/admin/login'
}
