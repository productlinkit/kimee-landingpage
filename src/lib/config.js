/** Deploy-time settings (see .env.example). Trailing slashes are stripped. */
const strip = (v) => (v || '').replace(/\/+$/, '');

export const API_BASE_URL = strip(import.meta.env.VITE_API_BASE_URL);
export const APP_URL = strip(import.meta.env.VITE_APP_URL);
export const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || 'support@Kidemy.com';
