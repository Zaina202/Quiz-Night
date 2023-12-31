import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getWhosGoingToBeAMillinorData } from './quizData';
import styles from '../PaperGroup/Quiz.module.css';
import style from './MillionaireGame.module.css';
import darkStyles from '../PaperGroup/QuizDark.module.css';
import ResultPage from './ResultPage';
import Design2 from '../images/Design2.png';

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
  const darkMode = selectedThemeImage === Design2;

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
    const isAnswered = selectedAnswer !== null;
  
    return (
      <div>
        <h2>{currentQuestion.question}</h2>
        <div className={styles['choices-container']}>
          {!showResult && (
            <>
              <div
                className={`${style.choiceItem} ${isAnswered ? (selectedAnswer === currentQuestion.answer1 ? (isCorrect ? style.correctAnswer : style.wrongAnswer) : (currentQuestion.correctAnswer === currentQuestion.answer1 ? style.correctAnswer : '')) : ''}`}
                onClick={() => handleAnswerSelection(currentQuestion.answer1)}
              >
                {currentQuestion.answer1}
              </div>
              <div
                className={`${style.choiceItem} ${isAnswered ? (selectedAnswer === currentQuestion.answer2 ? (isCorrect ? style.correctAnswer : style.wrongAnswer) : (currentQuestion.correctAnswer === currentQuestion.answer2 ? style.correctAnswer : '')) : ''}`}
                onClick={() => handleAnswerSelection(currentQuestion.answer2)}
              >
                {currentQuestion.answer2}
              </div>
              <div
                className={`${style.choiceItem} ${isAnswered ? (selectedAnswer === currentQuestion.answer3 ? (isCorrect ? style.correctAnswer : style.wrongAnswer) : (currentQuestion.correctAnswer === currentQuestion.answer3 ? style.correctAnswer : '')) : ''}`}
                onClick={() => handleAnswerSelection(currentQuestion.answer3)}
              >
                {currentQuestion.answer3}
              </div>
              <div
                className={`${style.choiceItem} ${isAnswered ? (selectedAnswer === currentQuestion.answer4 ? (isCorrect ? style.correctAnswer : style.wrongAnswer) : (currentQuestion.correctAnswer === currentQuestion.answer4 ? style.correctAnswer : '')) : ''}`}
                onClick={() => handleAnswerSelection(currentQuestion.answer4)}
              >
                {currentQuestion.answer4}
              </div>
               
            </>
            
          )}
           
        </div>
        <button onClick={handleNextQuestion} className={style['button2']}>
                  {currentQuestionIndex + 1 < questions.length ? 'السوال التالي' : 'النهاية'}
                </button>
      </div>
    );
  };
  
  

  return (
    <div className={`${styles['quiz-container']} ${darkMode ? darkStyles['dark-mode'] : ''}`}
     style={{ backgroundImage: selectedThemeImage ? `url(${selectedThemeImage})` : '' }}>
      {!showResult ? renderQuestion() : <ResultPage score={score} />}
      
    </div>
  );
};

export default MillionaireGame;