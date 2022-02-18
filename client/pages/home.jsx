import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // modify this according to the state (the current letter/image showing)
  handleClick() {
    const audio = new Audio('./images/letters.mp3');
    audio.play();
  }

  render() {
    return (
      <>
        <div className='row topics'>
          <a><img src='./images/abc-home.png' className='topic-img'onClick={() => { const audio = new Audio('./images/letters.mp3'); audio.play(); }}></img></a>
          <a><img src='./images/colors-home.png' className='topic-img' onClick={() => { const audio = new Audio('./images/colors.mp3'); audio.play(); }}></img></a>
          <a><img src='./images/numbers-home.png' className='topic-img' onClick={() => { const audio = new Audio('./images/numbers.mp3'); audio.play(); }}></img></a>
        </div>
      </>
    );
  }
}
