import React from 'react';

type Quote = {
  content: string;
  author: string;
};

export default async function QuotePage() {
  const res = await fetch('https://api.quotable.io/random', { cache: 'no-store' });
  const data: Quote = await res.json();

  return (
    <section className="text-center">
      <h1 className="text-2xl font-bold mb-4">Random Quote</h1>
      <blockquote className="text-xl italic text-gray-800 mb-2">“{data.content}”</blockquote>
      <p className="text-gray-600">— {data.author}</p>
    </section>
  );
}
