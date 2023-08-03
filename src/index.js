import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import WelcomePage1 from './pages/MillionaireGame/WelcomePage1';
import Quiz from './pages/PaperGroup/Quiz';
import WelcomePage from './pages/PaperGroup/WelcomePage';
import WelcomePage2 from './pages/MillionaireGame/WelcomePage2';
import MillionaireGame from './pages/MillionaireGame/MillionaireGame';
import ResultPage from './pages/MillionaireGame/ResultPage';
import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage1 />} /> {/* Initial page */}
        <Route path="/quiz" element={<Quiz />} /> {/* Paper Group */}
        <Route path="/millionaire" element={<MillionaireGame />} /> {/* Who Wants To Be A Millionaire? */}
        <Route path="/welcome" element={<WelcomePage />} /> {/* WelcomePage for the first game (Paper Group) */}
        <Route path="/welcome2" element={<WelcomePage2 />} /> {/* WelcomePage for the secound game (Who Wants To Be A Millionaire?) */}
        <Route path="/result" element={<ResultPage />} /> {/* Result Page for the secound game (Who Wants To Be A Millionaire?) */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
