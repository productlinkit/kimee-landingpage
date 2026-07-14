/** Satu kartu pulau: artwork + label. Zigzag diatur CSS (:nth-child(even)).
 *
 * TANPA loading="lazy": kartu digeser horizontal lewat transform di dalam
 * container overflow:hidden, jadi browser menganggap kartu di luar layar awal
 * "belum terlihat" dan gambarnya tidak pernah diminta — di mobile pulaunya
 * hilang sama sekali, tersisa labelnya. Hanya 5 gambar, jadi eager aman. */
export default function IslandCard({ image, title, category }) {
  return (
    <article className="island-card">
      <div className="island-art">
        <img src={image} alt={title} />
      </div>
      <div className="island-label">
        <h3>{title}</h3>
        <p>{category}</p>
      </div>
    </article>
  );
}
