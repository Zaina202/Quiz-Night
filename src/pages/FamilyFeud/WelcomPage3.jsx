import React, { useState } from 'react';
import styles from './WelcomePage3.module.css';
import { Link, useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div
    className={styles['container']}>
      <div className={styles['btn-container']}>
     <button className={styles['button1']} onClick={() => navigate('/familyFeud')}>
        Start game
      </button>
      </div>
    </div>
  );
};

export default WelcomePage;
