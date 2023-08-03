import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import styles from '../PaperGroup/WelcomePage.module.css';
import Design1 from '../images/Design1.png';
import Design2 from '../images/Design2.png';

const WelcomePage3 = () => {
  const navigate = useNavigate();
  const [selectedThemeImage, setSelectedThemeImage] = useState(null);

  const handleThemeSelect = (themeImage) => {
    setSelectedThemeImage(themeImage);
    navigate(`/familyFeud?theme=${encodeURIComponent(themeImage)}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <h2>اختر وضع الخلفة</h2>
        <div className={styles.themeContainer}>
          <div
            className={styles.theme}
            id="night-theme"
            onClick={() => handleThemeSelect(Design1)}
          >
            <img src={Design1} alt="night" className={styles.image} />
            <div className={styles.title}>
              <h4>
                <i className="fas fa-cloud-sun"></i> <b>Quiz Day</b>
              </h4>
            </div>
          </div>
          <div
            className={styles.theme}
            id="day-theme"
            onClick={() => handleThemeSelect(Design2)}
          >
            <img src={Design2} alt="day" className={styles.image} />
            <div className={styles.title}>
              <h4>
                <i className="fas fa-moon"></i> <b>Quiz Night</b>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage3;