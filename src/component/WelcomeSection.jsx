// src/component/WelcomeSection.jsx
import React, { useState, useEffect } from 'react';
import '../WelcomeSection.css';

const WelcomeSection = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Diario: Journaling Together Lasts Forever.";

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    
    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText = fullText.slice(0, currentIndex + 1);
        setTypedText(currentText);
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="welcome-section">
      <h1 className="welcome-heading">
        {typedText}
        <span className="cursor">|</span>
      </h1>
      <div className="welcome-subheading">
        Get Started Below
      </div>
    </div>
  );
};

export default WelcomeSection;