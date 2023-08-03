import React from 'react';
import {  useNavigate } from 'react-router-dom';
import styles from '../PaperGroup/Quiz.module.css';


const ResultPage = ({ score }) => {
    const navigate = useNavigate();

  return (
    <div>
      <h2>Result : ( {score.correct}/{score.correct+score.wrong} ) </h2>
      <p>Correct Answers: {score.correct}</p>
      <p>Wrong Answers: {score.wrong}</p>

      <button onClick={() =>navigate('/')} className={styles['nextButton']} >أعادة اللعب</button>
    </div>
  );
};

export default ResultPage;