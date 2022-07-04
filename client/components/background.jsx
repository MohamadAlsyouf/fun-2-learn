import React, { useState } from 'react';
import Snowfall from 'react-snowfall';
import Sound from 'react-sound';

function InteractiveBg() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  const playStatus = () => {
    if (isPlaying) return 'PLAYING';
    if (!isPlaying) return 'PAUSED';
  };

  let musicIcon;

  if (isPlaying) {
    musicIcon = <i onClick={handleClick} className="fas fa-volume-xmark"></i>;
  } else {
    musicIcon = <i onClick={handleClick} className="fas fa-music"></i>;
  }

  return (
    <div className="container">
      <Snowfall
        color="white"
        snowflakeCount={40}
        height='100vh'
        width='100vw'
      />
      <Sound
        url='./images/monkey.mp3'
        loop={true}
        playStatus={playStatus()}
        autoLoad={true}
        volume={10}
      />
      <div className='col-full music-toggle'>
        {musicIcon}
      </div>
    </div>
  );
}

export default InteractiveBg;
