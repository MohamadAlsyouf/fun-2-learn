import React, { useState, useEffect, useRef } from 'react';
import ShowLoader from '../components/loader';
import ShowError from '../components/error';

function Colors() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [colors, setColors] = useState([]);
  const [playRed, setPlayRed] = useState(false);
  const [imageShowing, setImageShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      getColorData();
      mounted.current = true;
    } else {
      // componentDidUpdate
      const audio = new Audio(colors[0][currentIndex].colorAudioUrl); audio.play();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (playRed === false) {
      const autoRed = setTimeout(() => {
        setPlayRed(true);
        const audio = new Audio(colors[0][0].colorAudioUrl); audio.play();
      }, 1300);
      return () => clearTimeout(autoRed);
    }
  }, [colors]);

  useEffect(() => {
    window.addEventListener('keydown', handlePress);
    return () => {
      window.removeEventListener('keydown', handlePress);
    };
  }, [colors, currentIndex, imageShowing]);

  const getColorData = async () => {
    try {
      const res = await fetch('api/colors');
      const colors = await res.json();
      setColors([colors]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setIsLoading(false);
    }
  };

  const handleClick = (event, index) => {
    if (event.target.className === 'fas fa-chevron-right') {
      nextColor();
    } else if (event.target.className === 'fas fa-chevron-left') {
      previousColor();
    }

    if (event.target.id === 'image') {
      setImageShowing(true);
      const audio = new Audio(colors[0][currentIndex].imageAudioUrl); audio.play();
    } else if (event.target.id === 'color') {
      setImageShowing(false);
      const audio = new Audio(colors[0][currentIndex].colorAudioUrl); audio.play();
    } else {
      setImageShowing(false);
    }
  };

  const handlePress = () => {
    if (event.key === 'ArrowRight') {
      nextColor();
      setImageShowing(false);
    } else if (event.key === 'ArrowLeft') {
      previousColor();
      setImageShowing(false);
    }
    if (event.key === ' ') {
      setImageShowing(!imageShowing);
      if (!imageShowing) {
        const audio = new Audio(colors[0][currentIndex].imageAudioUrl); audio.play();
      } else if (imageShowing) {
        const audio = new Audio(colors[0][currentIndex].colorAudioUrl); audio.play();
      }
    }
  };

  const nextColor = () => {
    if (currentIndex >= colors[0].length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousColor = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(colors[0].length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const bgColor = () => {
    if (colors[0][currentIndex].color === 'red') return 'rgba(233, 30, 30, 0.8)';
    if (colors[0][currentIndex].color === 'orange') return 'rgba(255, 152, 17, 0.8)';
    if (colors[0][currentIndex].color === 'yellow') return 'rgba(255, 212, 34, 0.8)';
    if (colors[0][currentIndex].color === 'green') return 'rgba(109, 200, 42, 0.8)';
    if (colors[0][currentIndex].color === 'blue') return '';
    if (colors[0][currentIndex].color === 'purple') return 'rgba(171, 109, 208, 0.8)';
    if (colors[0][currentIndex].color === 'brown') return 'rgba(191, 125, 56, 0.8)';
    if (colors[0][currentIndex].color === 'pink') return 'rgba(255, 110, 148, 0.8)';
    if (colors[0][currentIndex].color === 'black') return 'rgba(0, 0, 0, 0.7)';
    if (colors[0][currentIndex].color === 'white') return 'rgba(255, 255, 255, 0.8)';
  };

  const textColorBW = () => {
    if (colors[0][currentIndex].color === 'black') return 'white';
    return '';
  };

  if (isLoading) return <ShowLoader />;
  if (error) return <ShowError />;
  if (colors.length === 0) return null;
  const imageUrl = colors[0][currentIndex].imageUrl;
  const color = colors[0][currentIndex].color;
  const imageText = colors[0][currentIndex].imageText;
  const colorClass = bgColor();
  const textColor = textColorBW();
  let display;
  let showImageText;

  if (!imageShowing) {
    display = <span id='image' onClick={handleClick}>{color}</span>;
    showImageText = <span className='word-text'></span>;
  } else if (imageShowing) {
    display = <img id='color' src={imageUrl} onClick={handleClick}></img>;
    showImageText = <span className='word-text'>{imageText}</span>;
  }

  return (
    <>
    <div className="container">
        <div className='style' style={{ backgroundColor: `${colorClass}`, color: `${textColor}` }}>
          <div className="row">
            <div className="column-third">
              <i onClick={handleClick} className="fas fa-chevron-left"></i>
            </div>
            <div className="center-img row">
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
    </>
  );
}

export default Colors;
