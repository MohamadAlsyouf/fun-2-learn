import React from 'react';
import Snowfall from 'react-snowfall';
import Sound from 'react-sound';

export default class InteractiveBg extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ isPlaying: true });

    this.handleClick = this.handleClick.bind(this);
    this.playStatus = this.playStatus.bind(this);
  }

  handleClick() {
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  playStatus() {
    const { isPlaying } = this.state;
    if (isPlaying) return 'PLAYING';
    if (!isPlaying) return 'PAUSED';
  }

  render() {
    const isPlaying = this.state.isPlaying;
    let musicIcon;

    if (isPlaying) {
      musicIcon = <i onClick={this.handleClick} className="fas fa-volume-xmark"></i>;
    } else {
      musicIcon = <i onClick={this.handleClick} className="fas fa-music"></i>;
    }

    return (
      <div className="container">
        <Snowfall
          color="white"
          snowflakeCount={50}
          height='100vh'
          width='100vw'
        />
        <Sound
          url='./images/monkey.mp3'
          loop={true}
          playStatus={this.playStatus()}
          autoLoad={true}
          autoplay={true}
          volume={15}
        />
        <div className='col-full music-toggle'>
          {musicIcon}
        </div>
      </div>
    );
  }
}
