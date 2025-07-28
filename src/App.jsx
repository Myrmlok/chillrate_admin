import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoachHomePage from './mainPage';
import DashboardLayout from './teamPage';
import UserDetailPage from './UserDetailPage';
import AuthPage from './auth';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoachHomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/team/:name" element={< DashboardLayout/>} />
        <Route path="/user/:userId" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
