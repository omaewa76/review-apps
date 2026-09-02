import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import 'ui/styles/global.css';

try {
  await import('./src/lib/supabaseClient');
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  document.body.innerHTML = `
    <div style="padding: 40px; text-align: center; font-family: sans-serif;">
      <h1>⚠️ Configuration Error</h1>
      <p style="color: #6B7280;">
        Supabase configuration is missing. Please check your environment variables.
      </p>
      <pre style="background: #F3F4F6; padding: 16px; border-radius: 8px; font-size: 12px; text-align: left;">
        VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY must be set.
        Get your keys from: Supabase Dashboard > Settings > API Keys
      </pre>
    </div>
  `;
  throw error;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
