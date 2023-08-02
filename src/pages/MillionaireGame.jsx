import React from 'react';
import { useLocation } from 'react-router-dom';

const MillionaireGame = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedThemeImage = searchParams.get('theme');
  return (
    <div style={{ backgroundImage: selectedThemeImage ? `url(${selectedThemeImage})` : '' }}>
      <h2>MillionaireGame</h2>
    </div>
  );
};

export default MillionaireGame;
