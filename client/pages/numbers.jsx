import React, { useState, useEffect, useRef } from 'react';
import ShowLoader from '../components/loader';
import ShowError from '../components/error';

function Numbers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [playZero, setPlayZero] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      getNumberData();
      mounted.current = true;
    } else {
      // componentDidUpdate
      const audio = new Audio(numbers[0][currentIndex].audioUrl); audio.play();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (playZero === false) {
      const autoZero = setTimeout(() => {
        setPlayZero(true);
        const audio = new Audio(numbers[0][0].audioUrl); audio.play();
      }, 1300);
      return () => clearTimeout(autoZero);
    }
  }, [numbers]);

  useEffect(() => {
    window.addEventListener('keydown', handlePress);
    return () => {
      window.removeEventListener('keydown', handlePress);
    };
  }, [numbers, currentIndex]);

  const getNumberData = async () => {
    try {
      const res = await fetch('api/numbers');
      const numbers = await res.json();
      setNumbers([numbers]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setIsLoading(false);
    }
  };

  const handleClick = (event, index) => {
    if (event.target.className === 'fas fa-chevron-right') nextNumber();
    if (event.target.className === 'fas fa-chevron-left') previousNumber();
    if (event.target.id === 'image') {
      const audio = new Audio(numbers[0][currentIndex].audioUrl); audio.play();
    }
  };

  const handlePress = () => {
    if (event.key === 'ArrowRight') nextNumber();
    if (event.key === 'ArrowLeft') previousNumber();
    if (event.key === ' ') {
      const audio = new Audio(numbers[0][currentIndex].audioUrl); audio.play();
    }
  };

  const nextNumber = () => {
    if (currentIndex >= numbers[0].length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousNumber = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(numbers[0].length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isLoading) return <ShowLoader />;
  if (error) return <ShowError />;
  if (numbers.length === 0) return null;
  const imageUrl = numbers[0][currentIndex].imageUrl;
  const number = numbers[0][currentIndex].number;

  return (
    <div className="container">
      <div className="style">
        <div className="row">
          <div className="column-third">
            <i onClick={handleClick} className="fas fa-chevron-left"></i>
          </div>
          <div className="center-img">
            <img id="image" src={imageUrl} onClick={handleClick}></img>;
          </div>
          <div className="column-third">
            <i onClick={handleClick} className="fas fa-chevron-right"></i>
          </div>
        </div>
        <div className='col-full text-align'>
          <span className='word-text'>{number}</span>;
        </div>
      </div>
    </div>
  );
}

export default Numbers;
