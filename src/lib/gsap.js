/* ============================================================
   GSAP — registrasi plugin dilakukan sekali di level modul,
   sebelum komponen mana pun membuat ScrollTrigger.
   ============================================================ */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
