import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Lessons from './pages/Lessons'
import LessonDetails from './pages/LessonDetails'
import Quiz from './pages/Quiz'
import Dashboard from './pages/Dashboard'
import TeacherTools from './pages/TeacherTools'
import LearnEnglish from './pages/Modules/LearnEnglish';
import LessonView from './components/Module2/LessonView';
import GrammarHub from './pages/Modules/GrammarHub';
import NounsDetail from './pages/Modules/NounsDetail';
import PronounsDetail from './pages/Modules/PronounsDetail';
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
          <Route path='/lessons' element={<Lessons />} />
          <Route path='/lessons/:id' element={<LessonDetails />} />
          <Route path='/quiz/:lessonId' element={<Quiz />} />
          <Route path='/teacher-tools' element={<TeacherTools />} />
          <Route path='/modules/learn-english' element={<LearnEnglish />} />
          <Route path='/modules/learn-english/:slug' element={<LessonView />} />
          <Route path='/modules/grammar-hub' element={<GrammarHub />} />
          <Route path='/modules/grammar-hub/nouns' element={<NounsDetail />} />
          <Route path='/modules/grammar-hub/nouns-quiz' element={<GrammarQuizGame quizType="nouns" />} />
          <Route path='/modules/grammar-hub/pronouns' element={<PronounsDetail />} />
          <Route path='/modules/grammar-hub/pronouns-quiz' element={<GrammarQuizGame quizType="pronouns" />} />
          <Route path='/dashboard' element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}
