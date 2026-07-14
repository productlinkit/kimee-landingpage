import { useEffect, useState } from 'react';

/** Petunjuk "Scroll to explore" — hilang permanen setelah user scroll 40px. */
export default function ScrollHint() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) {
        setHidden(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={hidden ? 'scroll-hint hidden' : 'scroll-hint'}>
      <span>Scroll to explore</span>
      <div className="mouse">
        <i />
      </div>
    </div>
  );
}
