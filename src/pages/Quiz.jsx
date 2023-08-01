import React, { useState } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import styles from './Quiz.module.css';

const getPaperGroupData = () => {
  const data = {
    category1: {
      categoryTitle: 'وطنيات',
      questions: [
        {
          question: 'كم تبلغ مساحة دولة فلسطين التاريخية؟',
          answer1: '21000',
          answer2: '30000',
          answer3: '29029',
          answer4: '27027',
          correctAnswer: '27027',
        },
        {
          question: 'ما هو الاسم الذي كان يطلق على العملة الفلسطينية القديمة؟',
          answer1: 'شيكل',
          answer2: 'دينار',
          answer3: 'جنيه',
          answer4: 'ريال',
          correctAnswer: 'جنيه',
        },
      ],
    },
    category2: {
      categoryTitle: 'دينيات',
      questions: [
        {
          question: 'كم عدد ركعات صلاة النصر؟',
          answer1: '2',
          answer2: '4',
          answer3: '7',
          answer4: '8',
          correctAnswer: '8',
        },
        {
          question: 'كم لبث سيدنا نوح عليه السلام في قومه؟',
          answer1: '309',
          answer2: '950',
          answer3: '100',
          answer4: '1000',
          correctAnswer: '950',
        },
      ],
    },
    category3: {
      categoryTitle: 'معلومات عامة',
      questions: [
        {
          question: 'ماذا يحد فلسطين من الجنوب؟',
          answer1: 'النقب',
          answer2: 'مصر',
          answer3: 'السودان',
          answer4: 'البحر الأحمر',
          correctAnswer: 'البحر الأحمر',
        },
        {
          question: 'ما اسم المكون الأساسي للزجاج؟',
          answer1: 'الحديد',
          answer2: 'الرمل',
          answer3: 'الكربون',
          answer4: 'الصدف',
          correctAnswer: 'الرمل',
        },
      ],
    },
  };
  return data;
}; 

const Quiz = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [isLastRound, setIsLastRound] = useState(false); 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedThemeImage = searchParams.get('theme');
  const navigate = useNavigate();

  const data = getPaperGroupData();
  const categories = Object.keys(data);

  const handleNextQuestion = () => {
    if (showOptions) {
      if (currentOptionIndex + 1 < 4) {
        setCurrentOptionIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentOptionIndex(0);

        if (currentQuestionIndex + 1 < data[categories[currentCategoryIndex]].questions.length) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          setShowResult(true);
        }
      }
    } else {
      setShowOptions(true);
    }
    if (currentCategoryIndex + 1 >= categories.length && currentQuestionIndex + 1 >= data[categories[currentCategoryIndex]].questions.length) {
      setIsLastRound(true);
    }
  };

  const handleNextRound = () => {
    setShowResult(false);
    setCurrentQuestionIndex(0);
    setCurrentOptionIndex(0);
    setShowOptions(false);
    if (currentCategoryIndex + 1 < categories.length) {
      setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
      setCurrentQuestionIndex(0); 
      setShowRoundTitle(true);
    }   
    setIsLastRound(false); 
  };

  const renderResult = () => {
    const categoryQuestions = data[categories[currentCategoryIndex]].questions;

    return (
      <div className="result">
        <h3>ورقة الاجابة</h3>
        <div className="correct-answers">
          {categoryQuestions.map((question, index) => (
            <div key={index} className="question-answer">
              <p>السؤال {index + 1}: {question.question}</p>
              <p>الأجابة الصحيحة: {question.correctAnswer}</p>
            </div>
          ))}
        </div>
        <div>
          {/* Show "Finish" button if it's the last round, otherwise show "Next Round" button */}
          {isLastRound ? (
      <button onClick={() => navigate('/')} className={styles['button1']}>النهاية</button>
      ) : (
        <button onClick={handleNextRound} className={styles['button1']}>الجولة التالية</button>
          )}
        </div>
      </div>
    );
  };
  const [showRoundTitle, setShowRoundTitle] = useState(true);

  const handleStartRound = () => {
    setShowRoundTitle(false);
    setShowOptions(true);
  };

  return (
    <div
    className={styles['quiz-container']}
    style={{ backgroundImage: selectedThemeImage ? `url(${selectedThemeImage})` : '' }}
    onClick={showRoundTitle ? handleStartRound : handleNextQuestion}
  >
    {showResult ? (
      renderResult()
    ) : showRoundTitle ? (
      <div>
        <h1>{`الجولة ${currentCategoryIndex + 1}`}</h1>
        <h2>{data[categories[currentCategoryIndex]].categoryTitle}</h2>
      </div>
    ) : (
        <div>
          <h2 className="line">{data[categories[currentCategoryIndex]].categoryTitle}</h2>
          <h3 style={{ textAlign: 'right' }}>السؤال {currentQuestionIndex + 1}<span className="line"></span></h3>
          <p>{data[categories[currentCategoryIndex]].questions[currentQuestionIndex].question}<span className="line"></span></p>

          {showOptions && (
            <div className={styles['choices-container']}>
              <div className={styles['choice-item']}>
                <span className={styles['choice-number']}>1: </span>
                <span className={styles['choice-text']}>
                  {data[categories[currentCategoryIndex]].questions[currentQuestionIndex].answer1}
                </span>
              </div>
              {currentOptionIndex >= 1 && (
                <div className={styles['choice-item']}>
                  <span className={styles['choice-number']}>2: </span>
                  <span className={styles['choice-text']}>
                    {data[categories[currentCategoryIndex]].questions[currentQuestionIndex].answer2}
                  </span>
                </div>
              )}
              {currentOptionIndex >= 2 && (
                <div className={styles['choice-item']}>
                  <span className={styles['choice-number']}>3: </span>
                  <span className={styles['choice-text']}>
                    {data[categories[currentCategoryIndex]].questions[currentQuestionIndex].answer3}
                  </span>
                </div>
              )}
              {currentOptionIndex >= 3 && (
                <div className={styles['choice-item']}>
                  <span className={styles['choice-number']}>4: </span>
                  <span className={styles['choice-text']}>
                    {data[categories[currentCategoryIndex]].questions[currentQuestionIndex].answer4}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;