import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './quiz.css';
import ResultPage1 from './ResultPage1';

const MyTable = () => {
  const data = getFamilyFeudData(); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [cardStates, setCardStates] = useState(
    Array(data[currentQuestionIndex].answers.length).fill({ flipped: false })
  );
  const navigate = useNavigate();
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(1); 
  const [totalMarksTeam1, setTotalMarksTeam1] = useState(0);
  const [totalMarksTeam2, setTotalMarksTeam2] = useState(0);

  const flipCard = (index) => {
    setCardStates((prevStates) => {
      const updatedStates = prevStates.map((state, i) => ({
        flipped: i === index ? !state.flipped : state.flipped,
      }));
      return updatedStates;
    });
  
    const mark = data[currentQuestionIndex].answers[index].mark;
    
    if (currentTeam === 1) {
      const updatedTotalMarks = cardStates[index].flipped
        ? totalMarksTeam1 - mark
        : totalMarksTeam1 + mark;
      setTotalMarksTeam1(updatedTotalMarks);
    } else {
      const updatedTotalMarks = cardStates[index].flipped
        ? totalMarksTeam2 - mark
        : totalMarksTeam2 + mark;
      setTotalMarksTeam2(updatedTotalMarks);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCardStates(
        Array(data[currentQuestionIndex + 1].answers.length).fill({
          flipped: false,
        })
      );
    } else if (currentTeam === 1) {
      setCurrentTeam(2); 
      setCurrentQuestionIndex(0); 
      setCardStates(
        Array(data[0].answers.length).fill({
          flipped: false,
        })
      );
    } else {
      setIsLastQuestion(true);
      navigate('/result2', { state: { totalMarksTeam1, totalMarksTeam2 } }); 
    }
  };

  const [showMessage, setShowMessage] = useState(false);

  const handleButtonClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div>
      <div className="total-marks">
        Team 1: {totalMarksTeam1}  Team 2: {totalMarksTeam2}
      </div>
  
      <table>
        <caption>
          {currentTeam === 1 ? 'Team 1: ' : 'Team 2: '}
          {data[currentQuestionIndex].question} ؟
        </caption>
  
        <tbody>
          {data[currentQuestionIndex].answers.map((answer, index) => (
            <tr key={index}>
              <td
                onClick={() => flipCard(index)}
                className={cardStates[index].flipped ? 'card flipped' : 'card'}
              >
                <div className="card-content">
                  <div className="front">{index + 1}</div>
                  <div className="back">{answer.answer}</div>
                </div>
              </td>
              <td className="card empty-card">
                <span className="answer-mark">
                  {cardStates[index].flipped && `${answer.mark}`}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {isLastQuestion ? (
        <ResultPage1 totalMarksTeam1={totalMarksTeam1} totalMarksTeam2={totalMarksTeam2} />
      ) : (
        <>
          <button onClick={goToNextQuestion}>
            {currentTeam === 1
              ? 'السؤال التالي للفريق الاول'
              : 'السؤال التالي للفريق الثاني'}
          </button>
          <button className="custom-button" onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faTimes} className="icon" />
            <span className="button-text"> إجابة خاطئة</span>
          </button>
          {showMessage && (
            <div className="message-container">
              <FontAwesomeIcon icon={faTimes} className="red-icon" />
              <FontAwesomeIcon icon={faTimes} className="red-icon" />
              <FontAwesomeIcon icon={faTimes} className="red-icon" />
            </div>
          )}
        </>
      )}
    </div>
  );  
};
export default MyTable;

function getFamilyFeudData() {
    const data = [
        {
            question: 'اخر 8 من المبشرين بالجنة',
            answers: [
              { answer: 'أبو عبيدة عامر بن الجراح', mark: 40 },
              { answer: 'سعد بن أبي وقاص', mark: 35 },
              { answer: 'سعيد بن زيد', mark: 30 },
              { answer: 'عبدالرحمن بن  عوف', mark: 25 },
              { answer: 'طلحة بن عبيد الله', mark: 20 },
              { answer: 'الزبير بن العوام', mark: 15 },
              { answer: 'علي بن ابي طالب', mark: 10 },
              { answer: 'عثمان بن عفان', mark: 5 },
            ]
        },
        {
            question: 'اسماء الكواكب',
            answers: [
              { answer: 'اورانوس', mark: 10 },
              { answer: 'نبتون', mark: 10 },
              { answer: 'المشتري', mark: 10 },
              { answer: 'الزهرة', mark: 10 },
              { answer: 'الارض', mark: 10 },
              { answer: 'المريخ', mark: 10 },
              { answer: 'عطارد', mark: 10 },
              { answer: 'زحل', mark: 10 },
            ]
        },
        {
            question: 'أخر 6 غزوات للرسول ',
            answers: [
              { answer: 'غزوة تبوك', mark: 30 },
              { answer: 'غزوة الطائف', mark: 25 },
              { answer: 'غزوة حنين', mark: 20 },
              { answer: 'فتح مكة', mark: 15 },
              { answer: 'غزوة مؤتة', mark: 10 },
              { answer: 'ذات الرقاع', mark: 5 },
            ]
        },
    ];
    return data;
}