/// <reference types="vite/client" />

interface ImportMetaEnv {
  // App Config
  readonly VITE_APP_ENV: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_PORT: string;

  // Supabase (Publishable Key - SAFE for client-side)
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;

  // API
  readonly VITE_API_BASE_URL: string;

  // Features
  readonly VITE_ENABLE_ANALYTICS?: string;
  readonly VITE_ENABLE_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Database types (dapat di-generate dari Supabase CLI)
export type Database = {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: number;
          user_name: string;
          project_url: string;
          feedback: string;
          rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_name: string;
          project_url: string;
          feedback: string;
          rating: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_name?: string;
          project_url?: string;
          feedback?: string;
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
