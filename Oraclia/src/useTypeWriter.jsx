import { useState, useEffect } from 'react';

/**
 * useTypewriter - Custom React Hook to simulate typewriter effect
 * @param {string} text - The text to be typed out
 * @param {number} speed - Speed of typing in milliseconds (default: 100ms)
 * @returns {string} The current text being typed out
 */
const useTypewriter = (text, speed = 100) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return displayedText;
};

export default useTypewriter;
