import React from 'react';

export default function LessonCard({ lesson }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-teal-700">{lesson.title}</h3>
      <p className="text-sm text-slate-600 mt-2">{lesson.excerpt}</p>
      <div className="mt-3">
        <a href={`/modules/learn-english/${lesson.slug}`} className="text-teal-600 hover:underline">
          View lesson →
        </a>
      </div>
    </div>
  );
}
