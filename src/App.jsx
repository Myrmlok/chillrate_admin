import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoachHomePage from './mainPage';
import DashboardLayout from './teamPage';
import UserDetailPage from './UserDetailPage';
import AuthPage from './auth';
import WelcomePage from './welcomePage';
import ConfirmEmailPage from './confirmEmailPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<CoachHomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/team/:name" element={< DashboardLayout/>} />
        <Route path="/:teamId/:email" element={<UserDetailPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/confirm" element={<ConfirmEmailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
