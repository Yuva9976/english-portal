import React from 'react';
import { Link } from 'react-router-dom';

export default function DeterminersDetail(){
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Determiners</h1>
        <p className="text-gray-600">Learn how determiners introduce nouns and show reference.</p>
      </header>

      <section className="grid gap-4">
        <article className="p-4 bg-white rounded-lg shadow-sm">
          <h2 className="font-semibold">What are determiners?</h2>
          <p className="text-sm text-gray-700">Determiners come before nouns to indicate reference, quantity, possession, or definiteness.</p>
        </article>

        <article className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Quick Practice</h3>
            <p className="text-sm text-gray-600">10-question quick quiz to test determiners.</p>
          </div>
          <Link to="/modules/grammar-hub/determiners-quiz" className="px-4 py-2 bg-indigo-600 text-white rounded">Start Quiz</Link>
        </article>

      </section>

    </div>
  )
}
