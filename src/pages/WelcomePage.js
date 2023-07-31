import React from 'react';
import styles from './WelcomePage.module.css'; 
import Design1 from './images/Design1.png'; 
import Design2 from './images/Design2.png'; 


const WelcomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <h2>اختر وضع الخلفية</h2>
        <div className={styles.themeContainer}>
          <div className={styles.theme} id="night-theme">
            <img src={Design1} alt="night" className={styles.image} />
            <div className={styles.title}>
              <h4><i className="fas fa-cloud-sun"></i> <b>Quiz Day</b></h4>
            </div>
          </div>
          <div className={styles.theme} id="day-theme">
            <img src={Design2} alt="day" className={styles.image} />
            <div className={styles.title}>
              <h4><i className="fas fa-moon"></i> <b>Quiz Night</b></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
