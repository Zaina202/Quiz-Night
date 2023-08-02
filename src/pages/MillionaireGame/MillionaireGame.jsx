import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getWhosGoingToBeAMillinorData } from './quizData';
import styles from '../PaperGroup/Quiz.module.css';
import style from './MillionaireGame.module.css';

const MillionaireGame = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedThemeImage = searchParams.get('theme');
  const questions = getWhosGoingToBeAMillinorData(); // Get the questions data
  const navigate = useNavigate(); // Get the navigate function

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNextQuestion = () => {
    setShowResult(false);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // If it's the last question, navigate to WelcomePage1
      navigate('/');
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div>
        <h2>{currentQuestion.question}</h2>
        <div className={styles.answerContainer}>
          {!showResult && (
            <>
              <div className={styles.answer} >
                {currentQuestion.answer1}
              </div>
              <div className={styles.answer} >
                {currentQuestion.answer2}
              </div>
              <div className={styles.answer} >
                {currentQuestion.answer3}
              </div>
              <div className={styles.answer}>
                {currentQuestion.answer4}
              </div>
              <div>
            <button onClick={handleNextQuestion} className={styles.nextButton}>
              {currentQuestionIndex + 1 < questions.length ? 'Next Question' : 'Finish'}
            </button>
          </div>
            </>   )}
    </div>
    </div>
  );
};

  return (
    <div className={styles['quiz-container']} style={{ backgroundImage: selectedThemeImage ? `url(${selectedThemeImage})` : '' }}>
      <h2>Who Wants To Be A Millionaire?</h2>
      {renderQuestion()}
    </div>
  );
};

export default MillionaireGame;