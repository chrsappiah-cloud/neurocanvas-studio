import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { VoiceGuide } from '@/components/VoiceGuide';

export default function HomePage() {
  return (
    <main className="shell">
      <Nav />

      <section className="heroPanel">
        <div className="heroCopy">
          <p className="eyebrow">Future-ready dementia arts platform</p>
          <h1>
            Painting, drawing, calming music, and voice-led support in one therapeutic web
            experience.
          </h1>


          <div className="ctaRow">
            <Link href="/studio" className="primaryBtn">
              Open the studio
            </Link>
            <Link href="/caregiver" className="ghostBtn">
              Caregiver dashboard
            </Link>
          </div>
        </div>

        <div className="glassShowcase">
          <div className="visualCard large artGradient">
            <p>Adaptive painting surface</p>
            <span>Large tools · calm prompts · easy restart</span>
          </div>

          <div className="miniGrid">
            <div className="visualCard musicGlow">
              <p>Ambient music</p>
              <span>Focus, reminiscence, calm</span>
            </div>

            <div className="visualCard voiceGlow">
              <p>Voice help</p>
              <span>Tap for spoken guidance</span>
            </div>
          </div>
        </div>
      </section>

      <section className="featureGrid">
        <article className="infoCard">
          <h2>Digital painting</h2>
          <p>
            Simple art flows reduce interaction friction with oversized controls, step-by-step
            prompts, and forgiving session recovery.
          </p>
        </article>

        <article className="infoCard">
          <h2>Music-assisted sessions</h2>
          <p>
            Background music can support mood regulation and engagement during digital arts
            activities when personalised and carefully paced.
          </p>
        </article>

        <article className="infoCard">
          <h2>Caregiver visibility</h2>
          <p>
            Supabase tables can track session duration, mood tags, selected music, and saved
            artwork metadata for clinical or family review.
          </p>
        </article>
      </section>

      <VoiceGuide />


      <footer style={{ marginTop: 48, textAlign: 'center', fontSize: 15, color: '#888' }}>
        <div>
          World class scholars led by Dr Christopher Appiah-Thompson
        </div>
        <div style={{ marginTop: 4 }}>
          &copy; {new Date().getFullYear()} NeuroCanvas Studio. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
