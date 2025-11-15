/**
 * IMPLEMENTATION GUIDE: How to Use ModernQuizModal in Your Quiz Pages
 * 
 * This guide shows how to integrate the ModernQuizModal component into
 * your PronounsDetail, NounsDetail, or any other quiz module.
 */

// Step 1: Import the component at the top of your file
// import ModernQuizModal from '../components/ModernQuizModal';

// Step 2: In your component, use it like this (example from PronounsDetail):

// Inside your JSX return statement, replace your old quiz modal with:

/*
<ModernQuizModal
  showQuizModal={showQuizModal}
  currentQuestionIndex={currentQuestionIndex}
  quizQuestions={quizQuestions}
  modalQuizAnswers={modalQuizAnswers}
  onClose={() => setShowQuizModal(false)}
  onAnswerSelect={(questionId, selectedIndex, isCorrect) => {
    setModalQuizAnswers(prev => ({
      ...prev,
      [questionId]: { selected: selectedIndex, correct: isCorrect }
    }));
  }}
  onNavigate={(direction) => {
    if (direction === 'prev') {
      setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }}
  onRestart={() => {
    setCurrentQuestionIndex(0);
    setModalQuizAnswers({});
  }}
/>
*/

// ============================================================================
// COMPLETE EXAMPLE: PronounsDetail with ModernQuizModal
// ============================================================================

import { useState } from 'react';
import ModernQuizModal from '../components/ModernQuizModal';

const PronounsDetailExample = () => {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalQuizAnswers, setModalQuizAnswers] = useState({});

  // Your quiz questions data
  const quizQuestions = [
    {
      id: 1,
      emoji: '👤',
      question: 'Which pronoun replaces "John"?',
      options: ['She', 'He', 'They', 'It'],
      correct: 1,
      hint: 'John is a male name',
      explanation: 'He is the correct pronoun for a male person.',
      funFact: 'Pronouns help avoid repetition in sentences.'
    },
    // ... more questions
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Pronouns Lesson</h1>

      {/* Your lesson content here */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Understanding Pronouns</h2>
        {/* ... your lesson content ... */}
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Test Your Knowledge</h2>
          <p className="text-lg text-slate-600 mb-8">
            Challenge yourself with our interactive quiz!
          </p>
          <button
            onClick={() => {
              setShowQuizModal(true);
              setCurrentQuestionIndex(0);
              setModalQuizAnswers({});
            }}
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-12 rounded-2xl shadow-lg transition-all transform hover:scale-105 text-lg"
          >
            🚀 Start Quiz
          </button>
        </div>
      </section>

      {/* Modern Quiz Modal - Simply plug it in! */}
      <ModernQuizModal
        showQuizModal={showQuizModal}
        currentQuestionIndex={currentQuestionIndex}
        quizQuestions={quizQuestions}
        modalQuizAnswers={modalQuizAnswers}
        onClose={() => setShowQuizModal(false)}
        onAnswerSelect={(questionId, selectedIndex, isCorrect) => {
          setModalQuizAnswers(prev => ({
            ...prev,
            [questionId]: { selected: selectedIndex, correct: isCorrect }
          }));
        }}
        onNavigate={(direction) => {
          if (direction === 'prev') {
            setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
          } else {
            setCurrentQuestionIndex(prev => prev + 1);
          }
        }}
        onRestart={() => {
          setCurrentQuestionIndex(0);
          setModalQuizAnswers({});
        }}
      />

      {/* Rest of your page content */}
    </div>
  );
};

export default PronounsDetailExample;

// ============================================================================
// DESIGN FEATURES IMPLEMENTED
// ============================================================================

/*
✅ Modern UI Improvements:

1. NARROWER, CARD-STYLE LAYOUT
   - max-w-2xl centered container instead of full-width
   - White card with rounded corners and subtle shadow
   - Proper spacing and padding (p-6 md:p-10)

2. CLEAN TOP NAVIGATION
   - Fixed top bar with progress bar
   - Question counter on left
   - Score (points) on right
   - Minimal close button (SVG icon, not text)
   - Slim progress bar (h-1) with gradient

3. IMPROVED QUESTION DISPLAY
   - Large emoji (text-5xl md:text-6xl)
   - Large question text (text-2xl md:text-3xl)
   - Question number in badge
   - Better spacing between elements

4. MODERN ANSWER OPTIONS
   - Uniform font sizes and padding
   - Circular letter badges (A, B, C, D)
   - Hover effects: border color + background change
   - Color highlights when selected:
     * Green background + border for correct
     * Red background + border for incorrect
     * Gray for unselected options
   - Checkmarks (✅) and X (❌) for feedback

5. RESPONSIVE DESIGN
   - Mobile: Smaller text, compact padding
   - Desktop: Larger text, generous padding
   - Tailwind breakpoints: sm, md
   - Touch-friendly button sizes on mobile

6. BETTER VISUAL HIERARCHY
   - Color-coded statistics cards (green, red, blue)
   - Large score display (text-6xl md:text-7xl)
   - Gradient backgrounds for emphasis
   - Proper typography scale

7. INTERACTIVE FEEDBACK
   - Disabled options after answering
   - Smooth transitions (transition-all)
   - Hover shadows on buttons
   - Disabled state styling (opacity-50)

8. COMPLETE RESULTS SCREEN
   - Final score prominently displayed
   - Performance message (personalized)
   - Statistics grid (Correct/Incorrect/Accuracy)
   - Action buttons (Close/Restart)

9. FULLY RESPONSIVE
   - Works great on mobile (p-4)
   - Optimized for desktop (p-10)
   - Flexible grid (grid-cols-3)
   - Adaptive font sizes (md: breakpoints)

10. ELEGANT COLOR SCHEME
    - Neutral slate background (slate-50 to slate-100)
    - Blue-purple gradient accents
    - Semantic colors (green=correct, red=wrong)
    - Consistent border colors (slate-200, etc.)
*/

// ============================================================================
// TAILWIND CLASSES BREAKDOWN
// ============================================================================

/*
Core Layout:
- fixed inset-0: Full screen overlay
- max-w-2xl: Maximum width (640px)
- rounded-2xl: Large rounded corners
- shadow-md: Subtle shadow for depth
- border border-slate-200: Clean border

Typography:
- text-slate-800: Dark text for readability
- font-bold: Strong headings
- text-lg md:text-xl: Responsive sizing
- leading-relaxed: Better line height

Interactive:
- hover:bg-slate-50: Gentle hover effect
- transition-all: Smooth animations
- disabled:opacity-50: Disabled state
- cursor-pointer: Interactive hint

Colors:
- from-blue-500 to-purple-500: Gradient buttons
- bg-green-50 border-green-400: Correct answer
- bg-red-50 border-red-400: Wrong answer
- bg-amber-50: Score card background
*/
