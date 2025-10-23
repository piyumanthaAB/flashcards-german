'use client';

import { useEffect, useState } from 'react';
import Flashcard from './components/Flashcard';
import data from './data/data.json';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [shuffledCards, setShuffledCards] = useState<typeof data>([]);

  // Reusable shuffle function (Fisher–Yates)
  const shuffleCards = () => {
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledCards(shuffled);
  };

  useEffect(() => {
    shuffleCards(); // Shuffle once when component mounts
  }, []);

  if (shuffledCards.length === 0) return null;

  const levels = [
    { label: 'A1', value: 'basic-verbs' },
    { label: 'A1', value: 'Nouns-people-family' },
    { label: 'A1', value: 'Nouns-objects-nature' },
    { label: 'A1', value: 'Adjectives' },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">German Flashcards</h1>
      <div>
        <h3>Select Level</h3>
      </div>

      {/* Shuffle button */}
      <Button onClick={shuffleCards} className="mb-6">
        🔀 Shuffle Cards
      </Button>

      <div className="w-full flex justify-center flex-wrap gap-4">
        {shuffledCards.map((card) => (
          <Flashcard
            key={card.id}
            question={card.question}
            answer={card.answer}
          />
        ))}
      </div>
    </main>
  );
}
