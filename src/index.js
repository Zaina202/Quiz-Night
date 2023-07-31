import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './index.css';
import WelcomePage from './pages/WelcomePage';
import Quiz from './pages/Quiz';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/design2" element={<Quiz />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
