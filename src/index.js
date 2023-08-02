import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import WelcomePage1 from './pages/WelcomePage1';
import Quiz from './pages/Quiz';
import WelcomePage from './pages/WelcomePage';
import WelcomePage2 from './pages/WelcomePage2';
import MillionaireGame from './pages/MillionaireGame';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage1 />} /> {/* Initial page */}
        <Route path="/quiz" element={<Quiz />} /> {/* Paper Group */}
        <Route path="/millionaire" element={<MillionaireGame />} /> {/* Who Wants To Be A Millionaire? */}
        <Route path="/welcome" element={<WelcomePage />} /> {/* WelcomePage for the first game (Paper Group) */}
        <Route path="/welcome2" element={<WelcomePage2 />} /> {/* WelcomePage for the secound game (Who Wants To Be A Millionaire?) */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
