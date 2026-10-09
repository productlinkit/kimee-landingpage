import { createRoot } from 'react-dom/client';

// PENTING: style global di-import SEBELUM App. Import ESM dieksekusi sesuai
// urutan penulisan, jadi ini memastikan tokens/base masuk lebih dulu dan CSS
// per-komponen bisa meng-override-nya pada specificity yang sama
// (mis. `.hero-headline em` harus menang atas `.display em`).
import './styles/tokens.css';
import './styles/base.css';

import './i18n';
import App from './App';

// Catatan: sengaja TANPA <StrictMode>. Double-invoke effect di dev membuat
// ScrollTrigger membuat & membuang pin spacer dua kali, yang bisa menggeser
// posisi trigger. Animasi scrub/pin di sini sangat bergantung pada posisi itu.
createRoot(document.getElementById('root')).render(<App />);
