import React, { useState, useEffect } from 'react';
import './quiz.css';

const MyTable = () => {
  const data = getFamilyFeudData();
  const [currentTeam, setCurrentTeam] = useState(1); // 1 for Team 1, 2 for Team 2
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [cardStates, setCardStates] = useState([]);
  const [showRedX, setShowRedX] = useState(false);
  const [totalScoreTeam1, setTotalScoreTeam1] = useState(0);
  const [totalScoreTeam2, setTotalScoreTeam2] = useState(0);
  useEffect(() => {
    // Initialize cardStates whenever currentQuestionIndex changes
    const team1CardStates = Array(data[currentQuestionIndex]?.answers.length).fill({
      flipped: false,
    });
    const team2CardStates = Array(data[currentQuestionIndex]?.answers.length).fill({
      flipped: false,
    });
    setCardStates([team1CardStates, team2CardStates]);
  }, [currentQuestionIndex, data]);
  

 const flipCard = (index) => {
  setCardStates((prevCardStates) => {
    const updatedStates = prevCardStates.map((teamCardStates, i) => {
      if (i === currentTeam - 1) {
        return teamCardStates.map((cardState, j) => ({
          flipped: j === index ? !cardState.flipped : cardState.flipped,
        }));
      }
      return teamCardStates;
    });

    const selectedAnswer = data[currentQuestionIndex]?.answers[index];
    const scoreChange = prevCardStates[currentTeam - 1][index]?.flipped
      ? -selectedAnswer?.mark
      : selectedAnswer?.mark;

    if (currentTeam === 1) {
      setTotalScoreTeam1((prevScore) => prevScore + scoreChange);
    } else {
      setTotalScoreTeam2((prevScore) => prevScore + scoreChange);
    }

    return updatedStates;
  });
};
const [isLastQuestionForCurrentTeam, setIsLastQuestionForCurrentTeam] = useState(false);

  useEffect(() => {
    setIsLastQuestionForCurrentTeam(currentQuestionIndex === data.length - 1 && currentTeam === 1);
  }, [currentQuestionIndex, currentTeam, data.length]);

  const goToNextQuestion = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else if (currentTeam === 1) {
      // Switch to the other team's turn
      setCurrentTeam(2);
      // Reset the current question index for the next team
      setCurrentQuestionIndex(0);
      setIsLastQuestionForCurrentTeam(false); // Reset the flag for the new team
    } else {
      // Show the total scores and the winning team
      setShowRedX(false);
      alert(`مجموع الفريق الأول: ${totalScoreTeam1}\nمجموع الفريق الثاني: ${totalScoreTeam2}`);
      const winningTeam = totalScoreTeam1 > totalScoreTeam2 ? 'الفريق الأول' : 'الفريق الثاني';
      alert(`الفريق الفائز هو: ${winningTeam}`);
      // Reset the game to play again
      setCurrentTeam(1);
      setCurrentQuestionIndex(0);
      setTotalScoreTeam1(0);
      setTotalScoreTeam2(0);
      setCardStates([]); // Reset the card states
      setShowRedX(false);
    }
  };


  const toggleShowRedX = () => {
    setShowRedX((prevShowRedX) => !prevShowRedX);
  };

  return (
    <div>
      <div className="total-scoreboard">مجموع الفريق الأول: {totalScoreTeam1}</div>
      <div className="total-scoreboard">مجموع الفريق الثاني: {totalScoreTeam2}</div>
      <button onClick={toggleShowRedX}>
        {showRedX ? 'إخفاء X' : 'عرض X'}
      </button>
      {showRedX && <div className="red-x">X</div>}
      <table>
        <caption>السؤال : {data[currentQuestionIndex]?.question} ؟</caption>
        <tbody>
          {data[currentQuestionIndex]?.answers.map((answer, index) => (
            <tr key={index}>
              <td
                onClick={() => flipCard(index)}
                className={cardStates[index]?.flipped ? 'card flipped' : 'card'}
              >
                <div className="card-content">
                  <div className="front">{index + 1}</div>
                  <div className="back">{answer.answer}</div>
                </div>
              </td>
              <td className="card empty-card">
                <span className="answer-mark">
                  {cardStates[index]?.flipped && `${answer.mark}`}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLastQuestionForCurrentTeam ? (
        <button onClick={goToNextQuestion}>
          {currentTeam === 1 ? 'الفريق الثاني' : 'النهاية'}
        </button>
      ) : (
        <button onClick={goToNextQuestion}>السؤال التالي</button>
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
      ],
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
      ],
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
      ],
    },
  ];
  return data;
}
