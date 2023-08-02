import React from 'react';
import {  useNavigate } from 'react-router-dom';


const ResultPage = ({ score }) => {
    const navigate = useNavigate();

  return (
    <div>
      <h2>Result:{score.correct}/{score.correct+score.wrong}</h2>
      <p>Correct Answers: {score.correct}</p>
      <p>Wrong Answers: {score.wrong}</p>

      <button onClick={() =>navigate('/')} >أعادة اللعب</button>
    </div>
  );
};

export default ResultPage;