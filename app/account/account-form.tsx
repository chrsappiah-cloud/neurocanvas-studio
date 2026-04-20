'use client';

import { useState } from 'react';
import { ArtworkUploader } from '@/components/ArtworkUploader';

type Claims = {
  sub?: string;
  email?: string;
};

export default function AccountForm({ claims }: { claims: Claims | null }) {
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('caregiver');

  return (
    <main className="shell">
      <section className="subHero">
        <div>
          <p className="eyebrow">My account</p>
          <h1>Manage profile details and artwork uploads.</h1>
        </div>
      </section>

      <section className="voicePanel authCard">
        <div className="authForm">
          <label className="field">
            <span>Email</span>
            <input
              value={claims?.email || ''}
              disabled
              className="sessionNotes"
            />
          </label>

          <label className="field">
            <span>Full name</span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="sessionNotes"
            />
          </label>

          <label className="field">
            <span>Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="sessionNotes"
            >
              <option value="resident">Resident</option>
              <option value="caregiver">Caregiver</option>
              <option value="therapist">Therapist</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <ArtworkUploader userId={claims?.sub || ''} />

          <form action="/auth/signout" method="post">
            <button className="ghostBtn" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
