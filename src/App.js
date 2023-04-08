import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/style/output.css';
import StudentLogin from './pages/auth/StudentLogin';
import StudentRegistration from "./pages/auth/StudentRegistration"
import Quiz from './pages/student/Quiz';
import CoursePlayer from './pages/student/CoursePlayer';
import Leaderboard from './pages/student/Leaderboard';
import AdminLogin from './pages/auth/AdminLogin';
import Assignment from './pages/admin/Assignment';
import AssignmentMark from './pages/admin/AssignmentMark';
import Dashboard from './pages/admin/Dashboard';
import Quizzes from './pages/admin/Quizzes';
import Videos from './pages/admin/Videos';
import useAthCheck from './hooks/useAuthCheck';
import PrivateRouter from './middlewares/PrivateRouter';
import PublicRouter from './middlewares/PublicRouter';
import PrivateAdminRouter from './middlewares/PrivateAdminRouter';
import PublicAdminRouter from './middlewares/PublicAdminRouter';

function App() {
  const authChecked = useAthCheck()
  return !authChecked ? (<>Checking authentication</>) : (
    <Router>
      <Routes>
        {/* student panel  */}
        <Route path='/' element={
          <PublicRouter>
            <StudentLogin />
          </PublicRouter>
        } />
        <Route path="/student-registration" element={
          <PublicRouter>
            <StudentRegistration />
          </PublicRouter>
        } />
        <Route path="/leader-board" element={
          <PrivateRouter>
            <Leaderboard />
          </PrivateRouter>
        } />
        <Route path="/course-player/:videoId" element={
          <PrivateRouter>
            <CoursePlayer />
          </PrivateRouter>
        } />
        <Route path="/quiz" element={
          <PrivateRouter>
            <Quiz />
          </PrivateRouter>
        } />
        {/* Admin panel  */}
        <Route path="/admin" element={
          <PublicAdminRouter>
            <AdminLogin />
          </PublicAdminRouter>

        } />
        <Route path="/admin/dashboard" element={
          <PrivateAdminRouter>
            <Dashboard />
          </PrivateAdminRouter>
        } />
        <Route path="/admin/assignment" element={
          <PrivateAdminRouter>
            <Assignment />
          </PrivateAdminRouter>
        } />
        <Route path="/admin/assignment-mark" element={
          <PrivateAdminRouter>
            <AssignmentMark />
          </PrivateAdminRouter>
        } />
        <Route path="/admin/quizzes" element={<PrivateAdminRouter>
          <Quizzes />
        </PrivateAdminRouter>
        } />
        <Route path="/admin/videos" element={
          <PrivateAdminRouter>
            <Videos />
          </PrivateAdminRouter>
        } />
      </Routes>
    </Router>
  );
}

export default App;
