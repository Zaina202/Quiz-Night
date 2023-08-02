import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../PaperGroup/WelcomePage.module.css';
import style from './WelcomePage1.module.css';

const WelcomePage1 = () => { 
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
      <h2>اختر نوع اللعبة</h2>
        <div className={styles.themeContainer}>
          <div
            className={styles.theme}
          >
            <div className={style.paper} />
            <div className={styles.title}>
              <h4>
             <b><Link to="/welcome"  className={style.link}>Paper Group</Link></b> 
              </h4>
            </div>
          </div>
          <div
            className={styles.theme}
          >
            <div className={style.millionaire} />
            <div className={styles.title}>
              <h4>
             <b> <Link to="/welcome2"  className={style.link}>Who Wants To Be A Millionaire?</Link></b> 
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage1;
