/* ============================================================
   CONTENT — semua copy & data dipisah dari komponen.
   Setiap `lines` array = satu baris yang di-reveal per baris oleh GSAP.
   ============================================================ */

export const HERO_SCENES = {
  /* Scene 1 — headline utama (bottom-left) */
  headline: [
    <>A world of learning,</>,
    <>
      <em>a place to grow.</em>
    </>,
  ],

  /* Scene 2 — body copy (bottom-left) */
  body: [
    <>Five learning islands,</>,
    <>hundreds of games,</>,
    <>
      and a friend named <em>Kimee</em> &mdash;
    </>,
    <>ready to turn your child&rsquo;s curiosity</>,
    <>into an adventure.</>,
  ],

  /* Scene 3 — tagline (top-center, muncul di frame 132) */
  tagline: [
    <>Kimee is designed to</>,
    <>
      <em>spark curiosity</em> every minute,
    </>,
    <>
      not just to <em>pass the time.</em>
    </>,
  ],
};

/* Band statistik tepat setelah hero. `value` = angka tujuan count-up. */
export const HERO_STATS = [
  { value: 500, decimals: 0, suffix: 'k+', label: 'Happy Learners' },
  { value: 4.9, decimals: 1, suffix: '', label: 'App Store Rating' },
  { value: 12, decimals: 0, suffix: 'M+', label: 'Lessons Completed' },
  { value: 100, decimals: 0, suffix: '%', label: 'Ad-Free Play' },
];

/* Section "The Honest Truth" — masalah dulu, baru solusinya di kartu kuning. */
export const HONEST = {
  eyebrow: 'The Honest Truth',
  title: [
    <>Most learning apps keep kids</>,
    <>busy. Few actually teach them.</>,
  ],
  body: (
    <>
      Parents struggle to find digital experiences that are genuinely enriching.
      Most apps are either mind-numbing entertainment or rigorous, joyless
      testing. The result? Guilt-inducing screen time.
    </>
  ),
  card: {
    title: 'The Kimee Resolution',
    cta: 'Start Learning Free',
    body: (
      <>
        We bridge the gap. Kimee transforms essential developmental skills into a
        magical world of exploration. It&rsquo;s screen time that parents trust
        and kids actually crave.
      </>
    ),
  },
};

/* Section "What is Kimee?" — accordion 3 kartu.
   `image` dipakai saat kartu tertutup, `gif` saat kartu aktif. */
export const ABOUT = {
  eyebrow: 'What is Kimee?',
  title: [<>Five worlds. One growing child.</>, <>Infinite potential.</>],
  cards: [
    {
      id: 'play',
      title: 'Learning that feels like play',
      body: (
        <>
          Interactive quests and games disguised as fun, ensuring your child
          stays engaged while absorbing core concepts.
        </>
      ),
      image: '/what-kimee/card-1.jpeg',
      gif: '/what-kimee/card-1-animated.gif',
    },
    {
      id: 'ai',
      title: 'AI that knows your child',
      body: (
        <>
          Kimee adapts to every answer. Pacing, hints, and challenges shift to
          match how your child actually learns.
        </>
      ),
      image: '/what-kimee/card-2.jpeg',
      gif: '/what-kimee/card-2-animated.gif',
    },
    {
      id: 'parents',
      title: 'Clarity for parents',
      body: (
        <>
          A weekly snapshot of what your child explored, what clicked, and where
          they need a little help. No guesswork.
        </>
      ),
      image: '/what-kimee/card-3.jpeg',
      gif: '/what-kimee/card-3-animated.gif',
    },
  ],
};

export const ISLANDS_TITLE = [
  <>Every island is</>,
  <>
    <em>a little world.</em>
  </>,
];

export const ISLANDS = [
  {
    id: 'jungle',
    image: '/island/island01.webp',
    title: 'Jungle Adventure',
    category: 'Math & Logic',
  },
  {
    id: 'storybook',
    image: '/island/island02.webp',
    title: 'Storybook Land',
    category: 'Literacy & Language',
  },
  {
    id: 'iceberg',
    image: '/island/island03.webp',
    title: 'Artful Iceberg',
    category: 'Creativity & Expression',
  },
  {
    id: 'empathy',
    image: '/island/island04.webp',
    title: 'Empathy Bay',
    category: 'Social Emotional',
  },
  {
    id: 'desert',
    image: '/island/island05.webp',
    title: 'Discovery Desert',
    category: 'Life Skills & Discovery',
  },
];

/* Section Sparky — teks besar di belakang device jalan kanan→kiri saat
   di-pin, lalu copy-nya muncul. */
export const SPARKY = {
  marquee: 'Meet Sparky',
  title: [
    <>Sparky answers the questions</>,
    <>a report card never could.</>,
  ],
  body: (
    <>
      Ask anything about your child&rsquo;s progress — strengths, gaps, what to
      practice next. Sparky reads every lesson they&rsquo;ve played and explains
      it in plain language, any time you ask.
    </>
  ),
};

export const HOW_IT_WORKS = {
  eyebrow: 'How it works, daily',
  title: '10 minutes a day. Real progress in 30 days.',
  steps: [
    {
      n: 1,
      title: 'AI builds plan',
      body: 'A tailored weekly roadmap is generated based on current skill levels.',
    },
    {
      n: 2,
      title: 'Child explores',
      body: '10-15 minutes of immersive, guided play across the learning islands.',
    },
    {
      n: 3,
      title: 'Parent sees results',
      body: 'Receive a simple, clear update on what was learned and achieved.',
    },
  ],
};

/* Testimoni — kartu di kolom kanan berjalan naik saat section di-pin. */
export const TESTIMONIALS = {
  eyebrow: 'What do they say?',
  title: [
    <>Parents who started free.</>,
    <>Parents who never looked back.</>,
  ],
  items: [
    {
      id: 'rina',
      quote:
        'Anak saya (5 thn) susah fokus belajar, tapi di Kimee dia betah main sambil belajar baca. Laporannya detail banget buat orang tua!',
      name: 'Rina M.',
      city: 'Jakarta',
      color: '#17c3ce',
    },
    {
      id: 'dimas',
      quote:
        'Awalnya ragu buat subscribe, tapi setelah lihat progress ngitungnya di Discovery Cove, worth it banget dibanding les biasa.',
      name: 'Dimas A.',
      city: 'Surabaya',
      color: '#f58220',
    },
    {
      id: 'sarah',
      quote:
        'Sparky AI ngebantu banget nebak kesulitan belajar anak. UI-nya aman, gak ada iklan sama sekali. Tenang rasanya.',
      name: 'Sarah P.',
      city: 'Bandung',
      color: '#9b6be0',
    },
  ],
};

export const FAQ = {
  eyebrow: 'Questions parents ask',
  title: 'Answers, before you have to ask.',
  items: [
    {
      id: 'usia',
      q: 'Apakah Kimee cocok untuk anak prasekolah?',
      a: 'Cocok. Kimee dirancang untuk anak usia 3–8 tahun. Setiap mini-game dimulai dari level paling dasar dan menyesuaikan sendiri dengan kemampuan anak, jadi anak prasekolah tetap bisa bermain tanpa perlu bisa membaca lebih dulu.',
    },
    {
      id: 'iklan',
      q: 'Apakah ada iklan di dalam aplikasi?',
      a: 'Tidak ada, sama sekali. Tidak ada iklan, tidak ada pembelian di dalam game, dan tidak ada tautan keluar aplikasi — termasuk di paket gratis.',
    },
    {
      id: 'berhenti',
      q: 'Bagaimana cara berhenti berlangganan?',
      a: 'Bisa dibatalkan kapan saja lewat pengaturan akun, tanpa perlu menghubungi kami. Akses tetap aktif sampai periode yang sudah dibayar berakhir, dan progres belajar anak tidak hilang.',
    },
  ],
};

export const CTA = {
  title: [
    <>Your child is ready to learn. Are</>,
    <>you ready to see them grow?</>,
  ],
  body: 'Join thousands of parents building better foundations today.',
  button: 'Start Learning Free',
};

export const FOOTER = {
  tagline: <>Where every child&rsquo;s potential finds its path.</>,
  copyright: '© 2026 Kimee AI EdTech.',
  links: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Support', href: '#support' },
  ],
  lang: 'ID / EN',
};

/* `tone` menentukan warna tombol: muted | green | yellow. */
export const PRICING = {
  eyebrow: 'Simple, honest pricing',
  title: 'Less than one tutoring session. Every single month.',
  plans: [
    {
      id: 'free',
      name: 'Free',
      price: 'Rp 0',
      period: '',
      features: ['1 Island access', 'Basic tracking', 'Ad-free forever'],
      cta: 'Start Free',
      tone: 'muted',
    },
    {
      id: 'monthly',
      name: 'Monthly',
      price: 'Rp 89k',
      period: '/mo',
      features: ['All Islands', 'Sparky AI Insights', 'Weekly reports'],
      cta: 'Choose Monthly',
      tone: 'muted',
    },
    {
      id: 'six',
      name: '6 Months',
      price: 'Rp 69k',
      period: '/mo',
      features: ['Everything in Monthly', 'Save 22%', 'Priority support'],
      cta: 'Choose 6 Months',
      tone: 'green',
      badge: '★ Popular',
      accent: 'popular',
    },
    {
      id: 'annual',
      name: 'Annual',
      price: 'Rp 49k',
      period: '/mo',
      features: ['Everything in 6 Months', 'Save 45%', 'Offline mode'],
      cta: 'Choose Annual',
      tone: 'yellow',
      badge: '★ Best Value',
      accent: 'best',
    },
  ],
};

