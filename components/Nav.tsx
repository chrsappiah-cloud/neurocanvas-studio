import Link from 'next/link';
// Nav component
export function Nav() {
  return (
    <header className="siteHeader">
      <div className="brandMark" aria-label="NeuroCanvas Studio logo">
        <span className="orb" />
        <div>
          <strong>NeuroCanvas</strong>
          <small>Digital arts care</small>
        </div>
      </div>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/studio">Studio</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/caregiver">Caregiver</Link>
      </nav>
    </header>
  );
}
