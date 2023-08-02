import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getWhosGoingToBeAMillinorData } from './quizData';
import styles from '../PaperGroup/Quiz.module.css';
import style from './MillionaireGame.module.css';
import ResultPage from './ResultPage';

const MillionaireGame = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedThemeImage = searchParams.get('theme');
  const questions = getWhosGoingToBeAMillinorData();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });

  const handleAnswerSelection = (answer) => {
    if (!showResult) {
      setSelectedAnswer(answer);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

      if (isCorrect) {
        setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
      } else {
        setScore((prevScore) => ({ ...prevScore, wrong: prevScore.wrong + 1 }));
      }
    }

    setShowResult(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    return (
      <div>
        <h2>{currentQuestion.question}</h2>
        <div className={styles['choices-container']}>
          {!showResult && (
            <>
              <div 
               className={`${styles.choiceItem} ${selectedAnswer === currentQuestion.answer1 ? (isCorrect ? style.correctAnswer : style.wrongAnswer) : ''}`}
               onClick={() => handleAnswerSelection(currentQuestion.answer1)}
              >
                {currentQuestion.answer1}
              </div>
              <div 
               className={`${styles.choiceItem} ${selectedAnswer === currentQuestion.answer2 ? (isCorrect ? style.correctAnswer : style.wrongAnswer) : ''}`}
               onClick={() => handleAnswerSelection(currentQuestion.answer2)}
               >
                {currentQuestion.answer2}
              </div>
              <div 
              className={`${styles.choiceItem} ${selectedAnswer === currentQuestion.answer3 ? (isCorrect ? style.correctAnswer : style.wrongAnswer) : ''}`}
              onClick={() => handleAnswerSelection(currentQuestion.answer3)} 
              >
                {currentQuestion.answer3}
              </div>
              <div 
              className={`${styles.choiceItem} ${selectedAnswer === currentQuestion.answer4 ? (isCorrect ? style.correctAnswer : style.wrongAnswer) : ''}`}
              onClick={() => handleAnswerSelection(currentQuestion.answer4)}
              >
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
      {!showResult ? renderQuestion() : <ResultPage score={score} />}
    </div>
  );
};

export default MillionaireGame;