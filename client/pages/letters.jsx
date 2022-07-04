import React, { useState, useEffect, useRef } from 'react';
import ShowLoader from '../components/loader';
import ShowError from '../components/error';

function Letters() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letters, setLetters] = useState([]);
  const [words, setWords] = useState([]);
  const [playA, setPlayA] = useState(false);
  const [wordShowing, setWordShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      getLetterData();
      mounted.current = true;
    } else {
      // componentDidUpdate
      const audio = new Audio(letters[0][currentIndex].audioUrl); audio.play();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (playA === false) {
      const autoA = setTimeout(() => {
        setPlayA(true);
        const audio = new Audio(letters[0][0].audioUrl); audio.play();
      }, 1300);
      return () => clearTimeout(autoA);
    }
  }, [letters]);

  useEffect(() => {
    window.addEventListener('keydown', handlePress);
    return () => {
      window.removeEventListener('keydown', handlePress);
    };
  }, [letters, words, currentIndex, wordShowing]);

  const getLetterData = async () => {
    try {
      const res = await fetch('api/letters');
      const letters = await res.json();
      setLetters([letters]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setIsLoading(false);
    }
    try {
      const res2 = await fetch('api/words');
      const words = await res2.json();
      setWords([words]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setIsLoading(false);
    }
  };

  const handleClick = (event, index) => {
    if (event.target.className === 'fas fa-chevron-right') {
      nextLetter();
    } else if (event.target.className === 'fas fa-chevron-left') {
      previousLetter();
    }
    if (event.target.id === 'letter') {
      setWordShowing(true);
      const audio = new Audio(words[0][currentIndex].audioUrl); audio.play();
    } else if (event.target.id === 'word') {
      setWordShowing(false);
      const audio = new Audio(letters[0][currentIndex].audioUrl); audio.play();
    } else {
      setWordShowing(false);
    }
  };

  const handlePress = () => {
    if (event.key === 'ArrowRight') {
      nextLetter();
      setWordShowing(false);
    } else if (event.key === 'ArrowLeft') {
      previousLetter();
      setWordShowing(false);
    }
    if (event.key === ' ') {
      setWordShowing(!wordShowing);
      if (!wordShowing) {
        const audio = new Audio(words[0][currentIndex].audioUrl); audio.play();
      } else if (wordShowing) {
        const audio = new Audio(letters[0][currentIndex].audioUrl); audio.play();
      }
    }
  };

  const nextLetter = () => {
    if (currentIndex >= letters[0].length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousLetter = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(letters[0].length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isLoading) return <ShowLoader />;
  if (error) return <ShowError />;
  if (letters.length === 0) return null;
  if (words.length === 0) return null;
  const imageUrl = letters[0][currentIndex].imageUrl;
  const wordImage = words[0][currentIndex].imageUrl;
  const word = words[0][currentIndex].word;
  let display;
  let showImageText;

  if (!wordShowing) {
    display = <img id='letter' src={imageUrl} onClick={handleClick}></img>;
    showImageText = <span className='word-text'></span>;
  } else if (wordShowing) {
    display = <img id='word' src={wordImage} onClick={handleClick}></img>;
    showImageText = <span className='word-text'>{word}</span>;
  }

  return (
    <div className="container">
      <div className="style">
        <div className="row">
          <div className="column-third">
            <i onClick={handleClick} className="fas fa-chevron-left"></i>
          </div>
          <div className="center-img">
            {display}
          </div>
          <div className="column-third">
            <i onClick={handleClick} className="fas fa-chevron-right"></i>
          </div>
        </div>
        <div className='col-full text-align'>
          {showImageText}
        </div>
      </div>
    </div>
  );
}

export default Letters;
