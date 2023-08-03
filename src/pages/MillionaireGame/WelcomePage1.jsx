import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../PaperGroup/WelcomePage.module.css';
import style from './WelcomePage1.module.css';



const WelcomePage1 = () => {
  return (
    <div className={styles.container}>
      <h1>Welcom to Quiz Fast contast ... Share in different contsats to test your self !</h1>
      <div className={styles.mainContainer}>
        <h2>Choose the type of game</h2>
        <div className={styles.themeContainer}>
          <div className={`${styles.theme} ${style.flip}`}>
            <div className={style.card}>
              <div className={style.cardInner}>
                <div className={style.cardFront}>
                  <div className={style.paper} />
                </div>
                <div className={style.cardBack}>
                  <p>The host displays the question, and then the answers one by one, gives the contenders enough time to
                  discuss your answer and write it, and then moves on to the next
                  question.</p>
                </div>
              </div>
            </div>
            <div className={styles.title}>
              <h4>
                <b>
                  <Link to="/welcome" className={style.link}>Paper Group</Link>
                </b>
              </h4>
            </div>
          </div>
          <div className={`${styles.theme} ${style.flip}`}>
            <div className={style.card}>
              <div className={style.cardInner}>
                <div className={style.cardFront}>
                  <div className={style.millionaire} />
                </div>
                <div className={style.cardBack}>
                  <p>Click on your selected answer, green for correct, red for wrong. Scoreboard tallies your progress.</p>
                </div>
              </div>
            </div>
            <div className={styles.title}>
              <h4>
                <b>
                  <Link to="/welcome2" className={style.link}>Who Wants To Be A Millionaire?</Link>
                </b>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage1;
