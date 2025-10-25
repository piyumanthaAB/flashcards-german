'use client';

import { useEffect, useState, useCallback } from 'react';
import Flashcard from './components/Flashcard';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

// ✅ Import all A1 datasets
import basic_verbs_A1 from './data/A1/basic-verbs.json';
import people_family_A1 from './data/A1/people-and-family.json';
import adjectives_A1 from './data/A1/adjectives.json';
import places_objects_nature_A1 from './data/A1/places-objects-nature.json';
import numbers_colors_days_A1 from './data/A1/numbers-colors-days.json';
import pronouns_articles_A1 from './data/A1/pronouns-articles.json';

// 🧩 Define types
type FlashcardItem = {
  id: number;
  question: string;
  answer: string;
};

type SectionKey =
  | 'basic-verbs'
  | 'nouns-people-family'
  | 'adjectives'
  | 'noun-places-objects-nature'
  | 'numbers-colors-days-months'
  | 'pronouns-articles-prepositions';

type LevelKey = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

type DatasetStructure = {
  [L in LevelKey]?: {
    [S in SectionKey]?: FlashcardItem[];
  };
};

// ✅ Centralized dataset mapping
const datasets: DatasetStructure = {
  A1: {
    'basic-verbs': basic_verbs_A1,
    'nouns-people-family': people_family_A1,
    adjectives: adjectives_A1,
    'noun-places-objects-nature': places_objects_nature_A1,
    'numbers-colors-days-months': numbers_colors_days_A1,
    'pronouns-articles-prepositions': pronouns_articles_A1,
  },
  A2: {},
  B1: {},
  B2: {},
  C1: {},
};

export default function HomePage() {
  const [cards, setCards] = useState<FlashcardItem[]>([]);
  const [shuffledCards, setShuffledCards] = useState<FlashcardItem[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<LevelKey>('A1');
  const [selectedSection, setSelectedSection] =
    useState<SectionKey>('basic-verbs');
  const [isInverse, setIsInverse] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const levels: LevelKey[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const sections: SectionKey[] = [
    'basic-verbs',
    'nouns-people-family',
    'adjectives',
    'noun-places-objects-nature',
    'numbers-colors-days-months',
    'pronouns-articles-prepositions',
  ];

  // ✅ Load dataset dynamically
  useEffect(() => {
    const selectedLevelData = datasets[selectedLevel];
    const selectedData = selectedLevelData?.[selectedSection] ?? [];
    setCards(selectedData);
  }, [selectedLevel, selectedSection]);

  // ✅ Shuffle function
  const shuffleCards = useCallback(
    (data?: FlashcardItem[]) => {
      const source = data || cards;
      const shuffled = [...source];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setShuffledCards(shuffled);
    },
    [cards]
  );

  // ✅ Shuffle when cards change
  useEffect(() => {
    if (cards.length > 0) shuffleCards(cards);
  }, [cards, shuffleCards]);

  if (!shuffledCards.length) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
        <p>Loading flashcards...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8 tracking-tight text-gray-800 text-center">
        🇩🇪 German Flashcards
      </h1>

      {/* Selection Controls */}
      <Card className="w-full max-w-5xl mb-6 sm:mb-8 shadow-sm border">
        <CardHeader
          onClick={() => setShowFilters((prev) => !prev)}
          className="cursor-pointer flex justify-between items-center sm:cursor-default sm:block"
        >
          <CardTitle className="text-lg font-semibold text-center sm:text-left flex items-center justify-center gap-2">
            Customize Your Practice
            <span className="sm:hidden">
              {showFilters ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </span>
          </CardTitle>
        </CardHeader>

        {/* Collapsible filter section */}
        {(showFilters ||
          (typeof window !== 'undefined' && window.innerWidth >= 640)) && (
          <CardContent className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            {/* Level Selector */}
            <div className="flex flex-wrap justify-center gap-2">
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? 'default' : 'outline'}
                  onClick={() => setSelectedLevel(level)}
                  className="px-3 text-sm sm:text-base"
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
                  className="capitalize px-3 text-sm sm:text-base"
                >
                  {section.replace(/-/g, ' ')}
                </Button>
              ))}
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                onClick={() => shuffleCards(cards)}
                variant="secondary"
                className="font-medium px-3 text-sm sm:text-base"
              >
                🔀 Shuffle
              </Button>
              <Button
                onClick={() => setIsInverse((prev) => !prev)}
                variant={isInverse ? 'destructive' : 'outline'}
                className="font-medium px-3 text-sm sm:text-base"
              >
                🔁 {isInverse ? 'Normal' : 'Inverse'}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Info Section */}
      <div className="text-center mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Tap a card to flip it ✨
        </h2>
        <p className="text-gray-700 text-sm sm:text-base">
          Current Selection:{' '}
          <span className="font-semibold text-gray-900">
            {selectedLevel} – {selectedSection.replace(/-/g, ' ')}
          </span>
        </p>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Mode: {isInverse ? 'English → German' : 'German → English'}
        </p>
      </div>

      {/* Flashcards */}
      <div className="w-full flex justify-center flex-wrap gap-4 sm:gap-6 pb-12">
        {shuffledCards.map((card) => (
          <Flashcard
            key={card.id}
            question={isInverse ? card.answer : card.question}
            answer={isInverse ? card.question : card.answer}
          />
        ))}
      </div>
    </main>
  );
}
