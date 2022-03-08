import React from 'react';

export default class Home extends React.Component {

  render() {
    return (
      <>
        <div className='row topics'>
          <a href="#letters"><img src='./images/home/abc-home.png' className='topic-img' onClick={() => { const audio = new Audio('./images/home/letters.mp3'); audio.play(); }}></img></a>
          <a href="#colors"><img src='./images/home/colors-home.png' className='topic-img' onClick={() => { const audio = new Audio('./images/home/colors.mp3'); audio.play(); }}></img></a>
          <a href="#numbers"><img src='./images/home/numbers-home.png' className='topic-img' onClick={() => { const audio = new Audio('./images/home/numbers.mp3'); audio.play(); }}></img></a>
        </div>
      </>
    );
  }
}
