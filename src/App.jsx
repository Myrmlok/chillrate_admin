import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoachHomePage from './components/pages/main/mainPage';
import DashboardLayout from './components/pages/team/teamPage';
import UserDetailPage from './components/pages/UserDatail/UserDetailPage';
import AuthPage from './components/pages/auth/auth';
import WelcomePage from './components/pages/welcomePage/welcomePage';
import ConfirmEmailPage from './components/pages/confirmEmail/confirmEmailPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<CoachHomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/team/:teamId" element={< DashboardLayout/>} />
        <Route path="/:teamId/:email" element={<UserDetailPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/confirm" element={<ConfirmEmailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
