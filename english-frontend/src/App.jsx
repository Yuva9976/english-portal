import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import Lessons from './pages/Lessons'
import LessonDetails from './pages/LessonDetails'
import Quiz from './pages/Quiz'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import TeacherTools from './pages/TeacherTools'
import LearnEnglish from './pages/Modules/LearnEnglish';
import LessonView from './components/Module2/LessonView';
import GrammarHub from './pages/Modules/GrammarHub';
import PartsOfSpeechIndex from './pages/Modules/PartsOfSpeechIndex';
import NounDetail from './pages/Modules/NounDetail';
import PronounDetail from './pages/Modules/PronounDetail';
import VerbsDetail from './pages/Modules/VerbsDetail';
import AdjectiveDetail from './pages/Modules/AdjectiveDetail';
import AdverbDetail from './pages/Modules/AdverbDetail';
import PrepositionDetail from './pages/Modules/PrepositionDetail';
import ConjunctionDetail from './pages/Modules/ConjunctionDetail';
import InterjectionDetail from './pages/Modules/InterjectionDetail';
import NounsDetail from './pages/Modules/NounsDetail';
import PronounsDetail from './pages/Modules/PronounsDetail';
import AdjectivesDetail from './pages/Modules/AdjectivesDetail';
import AdverbsDetail from './pages/Modules/AdverbsDetail';
import PrepositionsDetail from './pages/Modules/PrepositionsDetail';
import ConjunctionsDetail from './pages/Modules/ConjunctionsDetail';
import DeterminersDetail from './pages/Modules/DeterminersDetail';
import InterjectionsDetail from './pages/Modules/InterjectionsDetail';
import GrammarQuizGame from './pages/Modules/GrammarQuizGame';
import NavBar from './components/NavBar'
import SiteFooter from './components/SiteFooter'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div className='min-h-screen flex flex-col'>
  <NavBar />
      <main className='flex-1 container mx-auto px-4 py-8'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/lessons' element={<Lessons />} />
          <Route path='/lessons/:id' element={<LessonDetails />} />
          <Route path='/quiz/:lessonId' element={<Quiz />} />
          <Route path='/teacher-tools' element={<TeacherTools />} />
          <Route path='/modules/learn-english' element={<LearnEnglish />} />
          <Route path='/modules/learn-english/:slug' element={<LessonView />} />
          <Route path='/modules/grammar-hub' element={<GrammarHub />} />
          <Route path='/modules/parts-of-speech' element={<PartsOfSpeechIndex />} />
          <Route path='/modules/noun' element={<NounDetail />} />
          <Route path='/modules/pronoun' element={<PronounDetail />} />
          <Route path='/modules/adjective' element={<AdjectiveDetail />} />
          <Route path='/modules/adverb' element={<AdverbDetail />} />
          <Route path='/modules/preposition' element={<PrepositionDetail />} />
          <Route path='/modules/conjunction' element={<ConjunctionDetail />} />
          <Route path='/modules/interjection' element={<InterjectionDetail />} />
          <Route path='/modules/grammar-hub/nouns' element={<NounsDetail />} />
          <Route path='/modules/grammar-hub/nouns-quiz' element={<GrammarQuizGame quizType="nouns" />} />
          <Route path='/modules/grammar-hub/pronouns' element={<PronounsDetail />} />
          <Route path='/modules/grammar-hub/pronouns-quiz' element={<GrammarQuizGame quizType="pronouns" />} />
          <Route path='/modules/grammar-hub/verbs' element={<VerbsDetail />} />
          <Route path='/modules/grammar-hub/verbs-quiz' element={<GrammarQuizGame quizType="verbs" />} />
          <Route path='/modules/grammar-hub/adjectives' element={<AdjectivesDetail />} />
          <Route path='/modules/grammar-hub/adjectives-quiz' element={<GrammarQuizGame quizType="adjectives" />} />
          <Route path='/modules/grammar-hub/adverbs' element={<AdverbsDetail />} />
          <Route path='/modules/grammar-hub/adverbs-quiz' element={<GrammarQuizGame quizType="adverbs" />} />
          <Route path='/modules/grammar-hub/prepositions' element={<PrepositionsDetail />} />
          <Route path='/modules/grammar-hub/prepositions-quiz' element={<GrammarQuizGame quizType="prepositions" />} />
          <Route path='/modules/grammar-hub/conjunctions' element={<ConjunctionsDetail />} />
          <Route path='/modules/grammar-hub/conjunctions-quiz' element={<GrammarQuizGame quizType="conjunctions" />} />
          <Route path='/modules/grammar-hub/determiners' element={<DeterminersDetail />} />
          <Route path='/modules/grammar-hub/determiners-quiz' element={<GrammarQuizGame quizType="determiners" />} />
          <Route path='/modules/grammar-hub/interjections' element={<InterjectionsDetail />} />
          <Route path='/modules/grammar-hub/interjections-quiz' element={<GrammarQuizGame quizType="interjections" />} />
          <Route path='/dashboard' element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path='/admin-dashboard' element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}
