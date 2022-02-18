import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // i can just make this inline or modify it according to the state (the current letter/image showing)
  handleClick() {
    const audio = new Audio('./images/letters.mp3');
    audio.play();
  }
  // SUPER IMPORTANT!!!!!!!
  // MAKE A MP3 FILE FOR EVERY SOUND THAT I NEED ON CLICK
  // MAKE 2 DATABASE TABLES - ONE FOR WORD ONE FOR THE PATH TO THE MP3
  // CONNECT THEM WITH WORD ID FOREIGN KEY
  // JUST KEEP IT TO WHERE WHATEVER IMAGE IM DISPLAYING ADD THE CORRESPONDING MP3 FILE IN ITS AUDIO ON CLICK

  render() {
    return (
      <>
        <div className='row topics'>
          <img src='./images/abc-block.png' className='topic-img'onClick={() => { const audio = new Audio('./images/letters.mp3'); audio.play(); }}></img>
          <img src='./images/colors-desktop.png' className='topic-img' onClick={() => { const audio = new Audio('./images/colors.mp3'); audio.play(); }}></img>
          <img src='./images/numbers-desktop.png' className='topic-img' onClick={() => { const audio = new Audio('./images/numbers.mp3'); audio.play(); }}></img>
        </div>
      </>
    );
  }
}