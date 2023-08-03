import React, { useState } from 'react';
import './quiz.css';

const MyTable = () => {
  const data = getFamilyFeudData(); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [cardStates, setCardStates] = useState(
    Array(data[currentQuestionIndex].answers.length).fill({ flipped: false })
  );

  const flipCard = (index) => {
    setCardStates((prevStates) => {
      const updatedStates = prevStates.map((state, i) => ({
        flipped: i === index ? !state.flipped : false,
      }));
      return updatedStates;
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCardStates(
        Array(data[currentQuestionIndex + 1].answers.length).fill({
          flipped: false,
        })
      );
    }
  };

  return (
    <div>
      <table>
      <caption>السؤال : {data[currentQuestionIndex].question} ؟</caption>
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
      <button onClick={goToNextQuestion}>السؤال التالي</button>
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
