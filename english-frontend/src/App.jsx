import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import Lessons from './pages/Lessons'
import LessonDetails from './pages/LessonDetails'
import Quiz from './pages/Quiz'
import Dashboard from './pages/Dashboard'
import LearnerDashboard from './pages/LearnerDashboard'
import ClassPage from './pages/ClassPage'
import ClassRoom from './pages/ClassRoom'
import BrowseClasses from './pages/BrowseClasses'
import AdminDashboard from './pages/AdminDashboard'
import TeacherTools from './pages/TeacherTools'
import TutorDashboardHome from './pages/TutorDashboardHome'
import TutorDashboardTest from './pages/TutorDashboardTest'
import TutorClasses from './pages/TutorClasses'
import TutorStudents from './pages/TutorStudents'
import LearnerClasses from './pages/LearnerClasses'
import LearnerClassDetail from './pages/LearnerClassDetail'
import LearnerTasks from './pages/LearnerTasks'
import TaskDetail from './pages/TaskDetail'
import ContentProviderDashboard from './pages/ContentProviderDashboard'
import CreateCourse from './pages/CreateCourse'
import CourseLessons from './pages/CourseLessons'
import LessonEditor from './pages/LessonEditor'
import QuizBuilder from './pages/QuizBuilder'
import LearnEnglish from './pages/Modules/LearnEnglish'
import LessonView from './components/Module2/LessonView'
import GrammarHub from './pages/Modules/GrammarHub'
import GrammarHubDashboard from './pages/GrammarHub/GrammarHubDashboard'
import VocabularyHub from './pages/GrammarHub/VocabularyHub'
import PronunciationHub from './pages/GrammarHub/PronunciationHub'
import GrammarPage from './pages/GrammarHub/GrammarPage'
import GrammarHubLayout from './pages/GrammarHub/GrammarHubLayout'
import PartsOfSpeechIndex from './pages/Modules/PartsOfSpeechIndex'
import NounsDetail from './pages/Modules/NounsDetail'
import PronounsDetail from './pages/Modules/PronounsDetail'
import VerbsDetail from './pages/Modules/VerbsDetail'
import AdjectivesDetail from './pages/Modules/AdjectivesDetail'
import AdverbsDetail from './pages/Modules/AdverbsDetail'
import PrepositionsDetail from './pages/Modules/PrepositionsDetail'
import ConjunctionsDetail from './pages/Modules/ConjunctionsDetail'
import InterjectionsDetail from './pages/Modules/InterjectionsDetail'
import DeterminersDetail from './pages/Modules/DeterminersDetail'
import GrammarQuizGame from './pages/Modules/GrammarQuizGame'
import SiteFooter from './components/SiteFooter'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      {/* Auth Routes (no layout) */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />

      {/* Admin Routes (no layout) */}
      <Route path='/admin-dashboard' element={
        <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>
      } />

      {/* Content Provider Routes (no layout) */}
      <Route path='/content-provider' element={
        <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'><ContentProviderDashboard /></div></ProtectedRoute>
      } />
      <Route path='/content-provider/create-course' element={
        <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'><CreateCourse /></div></ProtectedRoute>
      } />
      <Route path='/content-provider/courses/:courseId/lessons' element={
        <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'><CourseLessons /></div></ProtectedRoute>
      } />
      <Route path='/content-provider/lessons/:lessonId/edit' element={
        <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'><LessonEditor /></div></ProtectedRoute>
      } />
      <Route path='/content-provider/lessons/:courseId/create' element={
        <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'><LessonEditor /></div></ProtectedRoute>
      } />
      <Route path='/content-provider/quizzes/:lessonId/create' element={
        <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'><QuizBuilder /></div></ProtectedRoute>
      } />

      {/* Main Layout Routes (with global navbar, no sidebar) */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/lessons' element={<Lessons />} />
        <Route path='/lessons/:id' element={<LessonDetails />} />
        <Route path='/quiz/:lessonId' element={<Quiz />} />
        <Route path='/teacher-tools' element={<TeacherTools />} />
        <Route path='/modules/learn-english' element={<LearnEnglish />} />
        <Route path='/modules/learn-english/:slug' element={<LessonView />} />
        <Route path='/modules/grammar-hub' element={<GrammarHub />} />
        <Route path='/modules/parts-of-speech' element={<PartsOfSpeechIndex />} />
        <Route path='/modules/noun' element={<NounsDetail />} />
        <Route path='/modules/pronoun' element={<PronounsDetail />} />
        <Route path='/modules/adjective' element={<AdjectivesDetail />} />
        <Route path='/modules/adverb' element={<AdverbsDetail />} />
        <Route path='/modules/preposition' element={<PrepositionsDetail />} />
        <Route path='/modules/conjunction' element={<ConjunctionsDetail />} />
        <Route path='/modules/interjection' element={<InterjectionsDetail />} />
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
          <ProtectedRoute allowedRoles={['learner']}><Dashboard /></ProtectedRoute>
        } />
        <Route path='/class' element={
          <ProtectedRoute><ClassPage /></ProtectedRoute>
        } />
        <Route path='/class/:classId' element={
          <ProtectedRoute><ClassRoom /></ProtectedRoute>
        } />
        <Route path='/grammar-hub' element={
          <ProtectedRoute>
            <GrammarHubLayout />
          </ProtectedRoute>
        }>
          <Route index element={<GrammarHubDashboard />} />
          <Route path='grammar' element={<GrammarPage />} />
          <Route path='vocabulary' element={<VocabularyHub />} />
          <Route path='pronunciation' element={<PronunciationHub />} />
        </Route>
      </Route>

      {/* Learner Routes (no MainLayout - has custom header+sidebar) */}
      <Route path='/learner' element={
        <ProtectedRoute allowedRoles={['learner']}><LearnerDashboard /></ProtectedRoute>
      } />
      <Route path='/learner/classes' element={
        <ProtectedRoute allowedRoles={['learner']}><LearnerClasses /></ProtectedRoute>
      } />
      <Route path='/learner/class/:classId' element={
        <ProtectedRoute allowedRoles={['learner']}><LearnerClassDetail /></ProtectedRoute>
      } />
      <Route path='/learner/browse' element={
        <ProtectedRoute allowedRoles={['learner']}><BrowseClasses /></ProtectedRoute>
      } />
      <Route path='/learner/tasks' element={
        <ProtectedRoute allowedRoles={['learner']}><LearnerTasks /></ProtectedRoute>
      } />
      <Route path='/learner/tasks/:taskId' element={
        <ProtectedRoute allowedRoles={['learner']}><TaskDetail /></ProtectedRoute>
      } />

      {/* Tutor Routes (with TutorDashboardLayout that includes sidebar) */}
      <Route path='/tutor/dashboard' element={
        <ProtectedRoute allowedRoles={['tutor', 'teacher']}><TutorDashboardHome /></ProtectedRoute>
      } />
      <Route path='/tutor/classes' element={
        <ProtectedRoute allowedRoles={['tutor', 'teacher']}><TutorClasses /></ProtectedRoute>
      } />
      <Route path='/tutor/lessons-quizzes' element={
        <ProtectedRoute allowedRoles={['tutor', 'teacher']}><TutorDashboardTest /></ProtectedRoute>
      } />
      <Route path='/tutor/resources' element={
        <ProtectedRoute allowedRoles={['tutor', 'teacher']}><TutorDashboardTest /></ProtectedRoute>
      } />
      <Route path='/tutor/students' element={
        <ProtectedRoute allowedRoles={['tutor', 'teacher']}><TutorStudents /></ProtectedRoute>
      } />
      <Route path='/tutor/settings' element={
        <ProtectedRoute allowedRoles={['tutor', 'teacher']}><TutorDashboardTest /></ProtectedRoute>
      } />

      {/* Catch all */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}
