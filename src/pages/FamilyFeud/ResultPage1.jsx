import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultPage.css';

const ResultPage1 = () => {
  const location = useLocation();
  const { totalMarksTeam1, totalMarksTeam2 } = location.state || {};

  let team1Class = '';
  let team2Class = '';

  if (totalMarksTeam1 > totalMarksTeam2) {
    team1Class = 'highest-score';
    team2Class = 'lowest-score';
  } else if (totalMarksTeam2 > totalMarksTeam1) {
    team2Class = 'highest-score';
    team1Class = 'lowest-score';
  }else{
    team1Class = team2Class = 'tie';
  }

  const [winningTeam, setWinningTeam] = useState('');

  useEffect(() => {
    if (totalMarksTeam1 > totalMarksTeam2) {
      setWinningTeam('Team 1');
    } else if (totalMarksTeam2 > totalMarksTeam1) {
      setWinningTeam('Team 2');
    } else {
      setWinningTeam('It\'s a tie');
    }
  }, [totalMarksTeam1, totalMarksTeam2]);

  return (
    <div className="result-container">
      <h2 className="result-title">Result</h2>
      <div className="teams-container">
        <div className={`team ${team1Class}`}>
          <p className="team-name">Team 1</p>
          <p className="team-score">{totalMarksTeam1}</p>
        </div>
        <div className={`team ${team2Class}`}>
          <p className="team-name">Team 2</p>
          <p className="team-score">{totalMarksTeam2}</p>
        </div>
      </div>
      <div className={`winner ${winningTeam ? 'show' : ''}`}>
        The winning Team : {winningTeam}
      </div>
    </div>
  );
};

export default ResultPage1;
