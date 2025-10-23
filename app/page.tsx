'use client';

import { useEffect, useState } from 'react';
import Flashcard from './components/Flashcard';
import data from './data/data.json';

export default function HomePage() {
  const [shuffledCards, setShuffledCards] = useState<typeof data>([]);

  useEffect(() => {
    // Shuffle only once when the component mounts
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledCards(shuffled);
  }, []);

  if (shuffledCards.length === 0) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">German Flashcards</h1>
      <div className="w-full flex justify-between items-center flex-wrap">
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
