'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Flashcard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Card
      onClick={() => setFlipped((prev) => !prev)}
      className="w-36 h-28 flex items-center justify-center text-center 
                 cursor-pointer shadow-md hover:shadow-lg transition-transform 
                 duration-300 transform hover:scale-105 bg-white"
    >
      <span className="text-lg font-medium text-gray-800 select-none">
        {/* {flipped ? answer : question} */}
        {flipped ? <p className="font-bold">{answer}</p> : <p>{question}</p>}
      </span>
    </Card>
  );
}
