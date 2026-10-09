import { Fragment } from 'react';

/**
 * Locale strings may carry `<em>…</em>` for the italic highlight and HTML
 * entities (`&rsquo;`, `&mdash;`). Entities are decoded and `<em>` becomes a
 * real element, so no HTML ever goes through dangerouslySetInnerHTML.
 */
const ENTITIES = { '&rsquo;': '’', '&mdash;': '—', '&amp;': '&' };
const decode = (s) => s.replace(/&(?:rsquo|mdash|amp);/g, (m) => ENTITIES[m]);

export function rich(text) {
  const parts = String(text).split(/(<em>.*?<\/em>)/g);
  return parts.map((part, i) => {
    const m = part.match(/^<em>(.*)<\/em>$/);
    return m ? <em key={i}>{decode(m[1])}</em> : <Fragment key={i}>{decode(part)}</Fragment>;
  });
}

export const plain = decode;
