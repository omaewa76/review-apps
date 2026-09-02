import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Ambil dari environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Validasi environment variables
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL in environment variables');
}

if (!supabasePublishableKey) {
  throw new Error(
    'Missing VITE_SUPABASE_PUBLISHABLE_KEY in environment variables'
  );
}

// Inisialisasi Supabase client dengan publishable key (aman untuk client-side)
export const supabase = createClient<Database>(
  supabaseUrl,
  supabasePublishableKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce', // PKCE flow untuk keamanan lebih baik
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
    db: {
      schema: 'public',
    },
  }
);

// Helper untuk subscription realtime dengan tipe yang aman
export const subscribeToReviews = (
  onInsert: (payload: any) => void,
  onUpdate?: (payload: any) => void,
  onDelete?: (payload: any) => void
) => {
  const channel = supabase
    .channel('reviews-changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'reviews' },
      payload => onInsert(payload)
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'reviews' },
      payload => onUpdate?.(payload)
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'reviews' },
      payload => onDelete?.(payload)
    );

  return channel.subscribe();
};

// Helper untuk mendapatkan user session (jika menggunakan Auth)
export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  return session;
};

// Log environment info (hanya di development)
if (import.meta.env.VITE_APP_ENV === 'development') {
  console.log('🔗 Supabase URL:', supabaseUrl);
  console.log('🔑 Using publishable key (safe for client-side)');
  console.log('📱 App Name:', import.meta.env.VITE_APP_NAME);
}
