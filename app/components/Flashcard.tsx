'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FlashcardProps {
  question: string;
  answer: string;
  id?: string;
}

export default function Flashcard({ question, answer, id }: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Card
      className="w-md mx-auto my-6 shadow-lg border hover:cursor-pointer hover:shadow-xl transition-shadow"
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <CardHeader>
        <CardTitle className="text-center text-md font-semibold">
          {/* {showAnswer ? `Answer - ${id}` : `Question ${id}`} */}
          {showAnswer ? `English Meaning ` : `German Word`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center font-extrabold text-2xl text-gray-700 min-h-[60px]">
          {showAnswer ? answer : question}
        </p>
        <div className="flex justify-center mt-4">
          <Button onClick={() => setShowAnswer(!showAnswer)} variant="default">
            {showAnswer ? 'Show Question' : 'Show Answer'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
