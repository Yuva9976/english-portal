import React from 'react';
import LessonCard from './LessonCard';

export default function LessonList({ lessons = [] }) {
  if (!lessons.length) return <div>No lessons yet. Content will appear here once seeded.</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lessons.map((l) => (
        <LessonCard key={l.slug} lesson={l} />
      ))}
    </div>
  );
}
