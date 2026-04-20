export default async function ErrorPage({
  searchParams
}: {
  searchParams?: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  const message = params?.message || 'Something went wrong. Please try again.';

  return (
    <main className="shell">
      <section className="subHero">
        <div>
          <p className="eyebrow">Auth error</p>
          <h1>We couldn’t complete that action.</h1>
          <p className="lead">{message}</p>
        </div>
      </section>
    </main>
  );
}
