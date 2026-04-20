"use client";

import { Nav } from '@/components/Nav';
import { PaintCanvas } from '@/components/PaintCanvas';

export default function StudioPage() {
  return (
    <main className="shell">
      <Nav />

      <section className="subHero">
        <div>
          <p className="eyebrow">Creative studio</p>
          <h1>Choose an art mode and begin with calming sound.</h1>
        </div>
      </section>

      <section className="studioGrid">
        <div className="canvasBoard">
          <PaintCanvas />
        </div>
        {/* Add any additional controls or panels here if needed */}
      </section>
    </main>
  );
}
