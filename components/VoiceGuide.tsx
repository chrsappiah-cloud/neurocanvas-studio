'use client';

import { useState } from 'react';

const steps = [
  'Welcome. Tap the glowing cards to begin painting or drawing.',
  'Choose calm music before starting your art session.',
  'Use large controls and simple wording designed for cognitive accessibility.',
  'A caregiver can review saved sessions from the dashboard at any time.'
];

export function VoiceGuide() {
  const [active, setActive] = useState<number | null>(null);

  const speak = (index: number) => {
    setActive(index);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(steps[index]);
      utterance.rate = 0.92;
      utterance.pitch = 1;
      utterance.lang = 'en-AU';
      window.speechSynthesis.speak(utterance);
    }
  };


  return (
    <aside aria-live="polite" className="voiceGuide">
      <p>For accessibility, use keyboard navigation and screen reader support is enabled.</p>
    </aside>
  );
}
