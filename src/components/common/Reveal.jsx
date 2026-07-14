import { useRef } from 'react';
import { useReveal } from '../../hooks/useReveal';

/**
 * Bungkus elemen apa pun agar fade-up saat masuk viewport.
 *
 * @param {string} as       tag HTML yang dirender (default: 'div')
 * @param {boolean} enabled aktif setelah preloader selesai
 */
export default function Reveal({
  as: Tag = 'div',
  enabled,
  children,
  ...rest
}) {
  const ref = useRef(null);
  useReveal(ref, enabled);

  return (
    <Tag ref={ref} data-reveal {...rest}>
      {children}
    </Tag>
  );
}
