import { Nav } from '@/components/Nav';

export default function CaregiverPage() {
  return (
    <main className="shell">
      <Nav />

      <section className="subHero">
        <div>
          <p className="eyebrow">Caregiver dashboard</p>
          <h1>Monitor sessions, wellbeing signals, and saved creations.</h1>
        </div>
      </section>

      <section className="dashboardGrid">
        <article className="metricCard">
          <strong>42</strong>
          <span>Completed art sessions</span>
        </article>

        <article className="metricCard">
          <strong>18 min</strong>
          <span>Average engaged time</span>
        </article>

        <article className="metricCard">
          <strong>Calm piano</strong>
          <span>Most effective soundtrack</span>
        </article>
      </section>

      <section className="tablePanel">
        <table>
          <thead>
            <tr>
              <th>Resident</th>
              <th>Mood</th>
              <th>Mode</th>
              <th>Music</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Evelyn</td>
              <td>Calm</td>
              <td>Painting</td>
              <td>Ocean piano</td>
            </tr>
            <tr>
              <td>Robert</td>
              <td>Focused</td>
              <td>Drawing</td>
              <td>Soft strings</td>
            </tr>
            <tr>
              <td>June</td>
              <td>Joyful</td>
              <td>Painting</td>
              <td>Birdsong calm</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
