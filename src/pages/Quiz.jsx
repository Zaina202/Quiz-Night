import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedThemeImage = searchParams.get('theme');

  const data = getPaperGroupData();
  const categories = Object.keys(data);

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < data[categories[currentCategoryIndex]].questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResult(true);
    }
  };
  

  const handleNextRound = () => {
    setShowResult(false);
    setCurrentQuestionIndex(0);

    if (currentCategoryIndex + 1 < categories.length) {
      setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
    }
  };

  const renderResult = () => {
    const categoryQuestions = data[categories[currentCategoryIndex]].questions;
    const correctAnswers = categoryQuestions.map((question) => question.correctAnswer);

    return (
      <div className="result">
        <h3>Round Result</h3>
        <Button label="Next Round" onClick={handleNextRound} />
        <div className="correct-answers">
          {categoryQuestions.map((question, index) => (
            <div key={index} className="question-answer">
              <p>السؤال  {index + 1}: {question.question}</p>
              <p>الأجابة الصحيحة: {question.correctAnswer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles['quiz-container']} style={{ backgroundImage: selectedThemeImage ? `url(${selectedThemeImage})` : '' }}>
      {showResult ? (
        renderResult()
      ) : (
        <div>
          <h2>{data[categories[currentCategoryIndex]].categoryTitle}</h2>
          <h3>السؤال {currentQuestionIndex + 1}</h3>
          <p>{data[categories[currentCategoryIndex]].questions[currentQuestionIndex].question}</p>

          {/* Modified mapping logic for rendering answer choices */}
          <div className={styles['choices-container']}>
            {Object.keys(data[categories[currentCategoryIndex]].questions[currentQuestionIndex]).map((answerKey, index) => {
              if (answerKey.startsWith('answer')) {
                const choice = data[categories[currentCategoryIndex]].questions[currentQuestionIndex][answerKey];
                return (
                  <div key={answerKey} className={styles['choice-item']}>
                    <span className={styles['choice-number']}>{index}: </span>
                    <span className={styles['choice-text']}>{choice}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <Button
            label={
              currentQuestionIndex + 1 < data[categories[currentCategoryIndex]].questions.length
                ? 'Next'
                : 'Finish'
            }
            onClick={handleNextQuestion}
          />
        </div>
      )}
    </div>
  );
};


export default Quiz;
