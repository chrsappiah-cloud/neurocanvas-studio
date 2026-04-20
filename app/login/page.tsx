"use client";

import { login, signup } from './actions';


import { use } from 'react';

export default function LoginPage({ searchParams }: { searchParams?: Promise<{ checkEmail?: string }> }) {
  const params = searchParams ? use(searchParams) : {};
  const checkEmail = params?.checkEmail === '1';

  return (
    <main className="shell">
      <section className="subHero">
        <div>
          <p className="eyebrow">Secure sign in</p>
        </div>
      </section>
      <section className="voicePanel authCard">
        {checkEmail && (
          <div className="checkEmailMsg">Check your email for a login link.</div>
        )}
        <form className="authForm">
          <label className="field">
            <span>Email</span>
            <input name="email" type="email" required className="sessionNotes" />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className="sessionNotes"
            />
          </label>
          <div className="ctaRow">
            <button formAction={login} className="primaryBtn">
              Log in
            </button>
            <button formAction={signup} className="ghostBtn">
              Sign up
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
