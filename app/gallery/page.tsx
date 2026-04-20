import { Nav } from '@/components/Nav';
import { ArtworkUploader } from '@/components/ArtworkUploader';

const items = [
  ['Morning Garden', 'Watercolour dream', 'Piano Bloom'],
  ['Memory Path', 'Pastel sketch', 'Soft guitar'],
  ['Sky of Joy', 'Finger painting', 'Ambient strings']
];

export default function GalleryPage() {
  return (
    <main className="shell">
      <Nav />

      <section className="subHero">
        <div>
          <p className="eyebrow">Saved artwork</p>
          <h1>A familiar gallery for residents, families, and therapists.</h1>
        </div>
      </section>

      <section className="galleryGrid">
        {items.map(([title, medium, music]) => (
          <article key={title} className="galleryCard">
            <div className="artThumb" />
            <h2>{title}</h2>
            <p>{medium}</p>
            <span>{music}</span>
          </article>
        ))}
      </section>

      <section className="artworkUploader">
        {/* TODO: Replace 'demo-user' with actual userId from session/auth */}
        <ArtworkUploader userId="demo-user" />
      </section>
    </main>
  );
}
