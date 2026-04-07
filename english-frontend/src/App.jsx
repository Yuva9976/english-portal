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
import LearnerProgress from './pages/LearnerProgress'
import ClassPage from './pages/ClassPage'
import ClassRoom from './pages/ClassRoom'
import BrowseClasses from './pages/BrowseClasses'
import AdminDashboard from './pages/AdminDashboard'
import TeacherTools from './pages/TeacherTools'
import TutorDashboardHome from './pages/TutorDashboardHome'
import TutorDashboardTest from './pages/TutorDashboardTest'
import TutorClasses from './pages/TutorClasses'
import TutorClassResources from './pages/TutorClassResources'
import TutorStudents from './pages/TutorStudents'
import TutorSettings from './pages/TutorSettings'
import LearnerClasses from './pages/LearnerClasses'
import LearnerClassDetail from './pages/LearnerClassDetail'
import LearnerTasks from './pages/LearnerTasks'
import LearnerGrammar from './pages/LearnerGrammar'
import LearnerVocabulary from './pages/LearnerVocabulary'
import LearnerPronunciation from './pages/LearnerPronunciation'
import LearnerCertificates from './pages/LearnerCertificates'
import ProfileSettings from './pages/ProfileSettings'
import TaskDetail from './pages/TaskDetail'
import ContentProviderDashboard from './pages/ContentProviderDashboard'
import ContentProviderVocabulary from './pages/ContentProviderVocabulary'
import BulkUpload from './pages/BulkUpload'
import CreateCourse from './pages/CreateCourse'
import CourseLessons from './pages/CourseLessons'
import CoursePreview from './pages/CoursePreview'
import LessonEditor from './pages/LessonEditor'
import QuizBuilder from './pages/QuizBuilder'
import TeacherResourcesPage from './pages/TeacherResourcesPage'
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
import LessonDetail from './pages/Modules/LessonDetail'
import SiteFooter from './components/SiteFooter'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'

export default function App() {
  return (
    <Routes>
      {/* Auth Routes (no layout) */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />

      {/* Unified Dashboard Routes */}
      <Route element={<DashboardLayout />}>
        {/* Admin Dashboard */}
        {/* Admin Dashboard */}
        <Route path='/admin-dashboard' element={<Navigate to="/admin-dashboard/overview" replace />} />
        <Route path='/admin-dashboard/:tab' element={
          <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>
        } />

        {/* Content Provider Routes */}
        <Route path='/content-provider/dashboard' element={
          <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><ContentProviderDashboard /></ProtectedRoute>
        } />
        <Route path='/content-provider' element={<Navigate to="/content-provider/dashboard" replace />} />
        <Route path='/content-provider/bulk-upload' element={
          <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><BulkUpload /></ProtectedRoute>
        } />
        <Route path='/content-provider/create-course' element={
          <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><CreateCourse /></ProtectedRoute>
        } />
        <Route path='/content-provider/courses/:courseId/edit' element={
          <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><CreateCourse /></ProtectedRoute>
        } />
        <Route path='/content-provider/courses/:courseId/preview' element={
          <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><CoursePreview /></ProtectedRoute>
        } />
        <Route path='/content-provider/courses/:courseId/lessons' element={
          <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><CourseLessons /></ProtectedRoute>
        } />
        <Route path='/content-provider/lessons/:lessonId/edit' element={
          <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider', 'tutor', 'teacher']}><LessonEditor /></ProtectedRoute>
        } />
        <Route path='/content-provider/lessons/:courseId/create' element={
          <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider', 'tutor', 'teacher']}><LessonEditor /></ProtectedRoute>
        } />
        <Route path='/content-provider/courses' element={
          <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><ContentProviderDashboard /></ProtectedRoute>
        } />
        <Route path='/content-provider/vocabulary' element={
          <Navigate to="/vocabulary-hub" replace />
        } />
        <Route path='/content-provider/resources' element={
          <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><TeacherResourcesPage /></ProtectedRoute>
        } />
        <Route path='/content-provider/settings' element={
          <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider']}><ProfileSettings /></ProtectedRoute>
        } />
        <Route path='/content-provider/quizzes/:lessonId/create' element={
          <ProtectedRoute allowedRoles={['admin', 'content_provider', 'provider', 'tutor', 'teacher']}><QuizBuilder /></ProtectedRoute>
        } />

        {/* Learner Dashboard Routes */}
        <Route path='/learner' element={
          <ProtectedRoute allowedRoles={['learner']}><LearnerDashboard /></ProtectedRoute>
        } />
        <Route path='/learner/certificates' element={
          <ProtectedRoute allowedRoles={['learner']}><LearnerCertificates /></ProtectedRoute>
        } />
        <Route path='/learner/settings' element={
          <ProtectedRoute allowedRoles={['learner']}><ProfileSettings /></ProtectedRoute>
        } />
        <Route path='/learner/progress' element={
          <ProtectedRoute allowedRoles={['learner']}><LearnerProgress /></ProtectedRoute>
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
        <Route path='/learner/browse/:view' element={
          <ProtectedRoute allowedRoles={['learner']}><BrowseClasses /></ProtectedRoute>
        } />
        <Route path='/learner/tasks' element={
          <ProtectedRoute allowedRoles={['learner']}><LearnerTasks /></ProtectedRoute>
        } />
        <Route path='/learner/tasks/:taskId' element={
          <ProtectedRoute allowedRoles={['learner']}><TaskDetail /></ProtectedRoute>
        } />
        <Route path='/learner/grammar' element={
          <ProtectedRoute allowedRoles={['learner']}><LearnerGrammar /></ProtectedRoute>
        } />
        <Route path='/learner/vocabulary' element={
          <ProtectedRoute allowedRoles={['learner']}><LearnerVocabulary /></ProtectedRoute>
        } />
        <Route path='/learner/pronunciation' element={
          <ProtectedRoute allowedRoles={['learner']}><LearnerPronunciation /></ProtectedRoute>
        } />

        {/* Tutor Dashboard Routes */}
        <Route path='/tutor/dashboard' element={
          <ProtectedRoute allowedRoles={['tutor', 'teacher']}><TutorDashboardHome /></ProtectedRoute>
        } />
        <Route path='/tutor/classes' element={
          <ProtectedRoute allowedRoles={['tutor', 'teacher']}><TutorClasses /></ProtectedRoute>
        } />
        <Route path='/tutor/classes/:classId/resources' element={
          <ProtectedRoute allowedRoles={['tutor', 'teacher']}><TutorClassResources /></ProtectedRoute>
        } />
        <Route path='/tutor/lessons-quizzes' element={
          <ProtectedRoute allowedRoles={['tutor', 'teacher']}><TutorDashboardTest /></ProtectedRoute>
        } />
        <Route path='/tutor/resources' element={
          <ProtectedRoute allowedRoles={['tutor', 'teacher']}><TeacherResourcesPage /></ProtectedRoute>
        } />
        <Route path='/tutor/students' element={
          <ProtectedRoute allowedRoles={['tutor', 'teacher']}><TutorStudents /></ProtectedRoute>
        } />
        <Route path='/tutor/settings' element={
          <ProtectedRoute allowedRoles={['tutor', 'teacher']}><ProfileSettings /></ProtectedRoute>
        } />

        {/* Global Vocabulary Hub */}
        <Route path='/vocabulary-hub' element={
          <ProtectedRoute><VocabularyHub isInline={true} /></ProtectedRoute>
        } />
      </Route>

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

        {/* ── Dynamic Grammar Lesson (replaces all hardcoded pages) ── */}
        <Route path='/modules/grammar-hub/lesson/:partId' element={<LessonDetail />} />

        {/* ── Legacy routes kept for backward compatibility ── */}
        <Route path='/modules/noun' element={<NounsDetail />} />
        <Route path='/modules/pronoun' element={<PronounsDetail />} />
        <Route path='/modules/adjective' element={<AdjectivesDetail />} />
        <Route path='/modules/adverb' element={<AdverbsDetail />} />
        <Route path='/modules/preposition' element={<PrepositionsDetail />} />
        <Route path='/modules/conjunction' element={<ConjunctionsDetail />} />
        <Route path='/modules/interjection' element={<InterjectionsDetail />} />
        <Route path='/modules/grammar-hub/nouns' element={<NounsDetail />} />
        <Route path='/modules/grammar-hub/pronouns' element={<PronounsDetail />} />
        <Route path='/modules/grammar-hub/verbs' element={<VerbsDetail />} />
        <Route path='/modules/grammar-hub/adjectives' element={<AdjectivesDetail />} />
        <Route path='/modules/grammar-hub/adverbs' element={<AdverbsDetail />} />
        <Route path='/modules/grammar-hub/prepositions' element={<PrepositionsDetail />} />
        <Route path='/modules/grammar-hub/conjunctions' element={<ConjunctionsDetail />} />
        <Route path='/modules/grammar-hub/determiners' element={<DeterminersDetail />} />
        <Route path='/modules/grammar-hub/interjections' element={<InterjectionsDetail />} />

        {/* Quiz routes */}
        <Route path='/modules/grammar-hub/nouns-quiz' element={<GrammarQuizGame quizType="nouns" />} />
        <Route path='/modules/grammar-hub/pronouns-quiz' element={<GrammarQuizGame quizType="pronouns" />} />
        <Route path='/modules/grammar-hub/verbs-quiz' element={<GrammarQuizGame quizType="verbs" />} />
        <Route path='/modules/grammar-hub/adjectives-quiz' element={<GrammarQuizGame quizType="adjectives" />} />
        <Route path='/modules/grammar-hub/adverbs-quiz' element={<GrammarQuizGame quizType="adverbs" />} />
        <Route path='/modules/grammar-hub/prepositions-quiz' element={<GrammarQuizGame quizType="prepositions" />} />
        <Route path='/modules/grammar-hub/conjunctions-quiz' element={<GrammarQuizGame quizType="conjunctions" />} />
        <Route path='/modules/grammar-hub/determiners-quiz' element={<GrammarQuizGame quizType="determiners" />} />
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


      {/* Catch all */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}
