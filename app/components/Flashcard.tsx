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
    <Card className="max-w-md mx-auto my-6 shadow-lg border">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">
          {/* {showAnswer ? `Answer - ${id}` : `Question ${id}`} */}
          {showAnswer ? `Answer ` : `Question`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-700 min-h-[60px]">
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
