
'use client';

import { useState } from 'react';
import { createClient } from '../lib/supabase-client';

type Props = {
  userId: string;
  profileId?: string;
};

export function ArtworkUploader({ userId, profileId }: Props) {
  const supabase = createClient();

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [medium, setMedium] = useState('painting');
  const [mood, setMood] = useState('calm');
  const [music, setMusic] = useState('Ocean piano');

  const uploadArtwork: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      setUploading(true);
      setMessage('');

      const form = event.currentTarget;
      const input = form.querySelector('input[type="file"]') as HTMLInputElement | null;
      const file = input?.files?.[0];

      if (!file) {
        setMessage('Please choose an artwork image.');
        return;
      }

      const ext = file.name.split('.').pop();
      const path = `${userId}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('artworks')
        .upload(path, file, { upsert: false });

      if (uploadError) {
        setMessage(uploadError.message);
        return;
      }

      const { error: insertError } = await supabase.from('artworks').insert({
        resident_id: profileId,
        created_by: profileId,
        title,
        medium,
        mood,
        music,
        image_url: path
      });

      if (insertError) {
        setMessage(insertError.message);
        return;
      }

      setTitle('');
      setMessage('Artwork saved successfully.');
      form.reset();
    } catch (error) {
      setMessage('Artwork upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="playlistCard uploadForm" onSubmit={uploadArtwork}>
      <p>Save artwork to the private gallery</p>

      <label className="field">
        <span>Artwork title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="sessionNotes"
          placeholder="For example, Morning garden"
          required
        />
      </label>

      <div className="splitFields">
        <label className="field">
          <span>Art activity</span>
          <select
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            className="sessionNotes"
          >
            <option value="painting">Painting</option>
            <option value="drawing">Drawing</option>
            <option value="pastel">Pastel</option>
            <option value="mixed-media">Mixed media</option>
          </select>
        </label>

        <label className="field">
          <span>Observed mood</span>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="sessionNotes"
          >
            <option value="calm">Calm</option>
            <option value="focused">Focused</option>
            <option value="joyful">Joyful</option>
            <option value="reflective">Reflective</option>
          </select>
        </label>
      </div>

      <label className="field">
        <span>Music playing</span>
        <input
          value={music}
          onChange={(e) => setMusic(e.target.value)}
          className="sessionNotes"
        />
      </label>

      <label className="field">
        <span>Choose artwork image</span>
        <input type="file" accept="image/*" required />
      </label>

      <div className="ctaRow">
        <button type="submit" className="primaryBtn" disabled={uploading}>
          {uploading ? 'Saving artwork...' : 'Save artwork'}
        </button>
      </div>

      <p className="uploadStatus">{message}</p>
    </form>
  );
}
