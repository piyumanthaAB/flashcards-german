'use client';

import { useEffect, useState, useCallback } from 'react';
import Flashcard from './components/Flashcard';
import data from './data/data.json';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const [shuffledCards, setShuffledCards] = useState<typeof data>([]);
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [selectedSection, setSelectedSection] = useState('basic-verbs');

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'All Levels'];
  const sections = [
    'basic-verbs',
    'nouns-people-family',
    'noun-places-objects-nature',
    'adjectives',
    'numbers-colors-days-months',
    'pronouns-articles-prepositions',
    'common-phrases-expressions',
    'all-sections',
  ];

  // Fisher–Yates shuffle
  const shuffleCards = useCallback(() => {
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledCards(shuffled);
  }, []);

  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  if (!shuffledCards.length) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <h1 className="text-4xl font-bold mb-8 tracking-tight text-gray-800">
        🇩🇪 German Flashcards
      </h1>

      {/* Selection Controls */}
      <Card className="w-full max-w-5xl mb-8 shadow-sm border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold mb-2 text-center">
            Customize Your Practice
          </CardTitle>
          <div className="flex flex-col md:flex-row justify-center gap-4 flex-wrap">
            {/* Level Selector */}
            <div className="flex flex-wrap justify-center gap-2">
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? 'default' : 'outline'}
                  onClick={() => setSelectedLevel(level)}
                  className="px-4"
                >
                  {level}
                </Button>
              ))}
            </div>

            {/* Section Selector */}
            <div className="flex flex-wrap justify-center gap-2">
              {sections.map((section) => (
                <Button
                  key={section}
                  variant={selectedSection === section ? 'default' : 'outline'}
                  onClick={() => setSelectedSection(section)}
                  className="capitalize px-4"
                >
                  {section.replace(/-/g, ' ')}
                </Button>
              ))}
            </div>

            {/* Shuffle Button */}
            <div className="flex justify-center">
              <Button
                onClick={shuffleCards}
                variant="secondary"
                className="font-medium px-4"
              >
                🔀 Shuffle Cards
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Info */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Tap a card to flip it ✨</h2>
        <p className="text-gray-700">
          Current Selection:{' '}
          <span className="font-semibold text-gray-900">
            {selectedLevel} – {selectedSection.replace(/-/g, ' ')}
          </span>
        </p>
      </div>

      {/* Flashcards Display */}
      <div className="w-full flex justify-center flex-wrap gap-6 pb-12">
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
