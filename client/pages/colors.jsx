import React from 'react';

export default class Colors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      colors: [],
      playRed: false,
      imageShowing: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.nextColor = this.nextColor.bind(this);
    this.previousColor = this.previousColor.bind(this);
    this.bgColor = this.bgColor.bind(this);
    this.textColor = this.textColor.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    fetch('api/colors')
      .then(res => res.json())
      .then(colors => {
        this.setState({ colors });
        if (this.state.playRed === false) {
          this.autoRed = setTimeout(() => {
            this.setState({ playRed: true });
            const audio = new Audio(this.state.colors[0].colorAudioUrl); audio.play();
          }, 1200);
        }
      });
    window.addEventListener('keydown', this.handlePress);
  }

  componentWillUnmount() {
    clearTimeout(this.autoRed);
    window.removeEventListener('keydown', this.handlePress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentIndex !== prevState.currentIndex) {
      const audio = new Audio(this.state.colors[this.state.currentIndex].colorAudioUrl); audio.play();
    }
  }

  handleClick(event, index) {
    if (event.target.className === 'fas fa-chevron-right') {
      this.nextColor();
    } else if (event.target.className === 'fas fa-chevron-left') {
      this.previousColor();
    }

    if (event.target.id === 'image') {
      this.setState({ imageShowing: true });
      const audio = new Audio(this.state.colors[this.state.currentIndex].imageAudioUrl); audio.play();
    } else if (event.target.id === 'color') {
      this.setState({ imageShowing: false });
      const audio = new Audio(this.state.colors[this.state.currentIndex].colorAudioUrl); audio.play();
    } else {
      this.setState({ imageShowing: false });
    }
  }

  handlePress() {
    const { imageShowing } = this.state;
    if (event.key === 'ArrowRight') {
      this.nextColor();
      this.setState({ imageShowing: false });
    } else if (event.key === 'ArrowLeft') {
      this.previousColor();
      this.setState({ imageShowing: false });
    }

    if (event.key === ' ') {
      this.setState({ imageShowing: !imageShowing });
      if (!imageShowing) {
        const audio = new Audio(this.state.colors[this.state.currentIndex].imageAudioUrl); audio.play();
      } else if (imageShowing) {
        const audio = new Audio(this.state.colors[this.state.currentIndex].colorAudioUrl); audio.play();
      }
    }
  }

  nextColor() {
    if (this.state.currentIndex >= this.state.colors.length - 1) {
      this.setState({
        currentIndex: 0
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  }

  previousColor() {
    if (this.state.currentIndex <= 0) {
      this.setState({
        currentIndex: this.state.colors.length - 1
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex - 1
      });
    }
  }

  bgColor() {
    if (this.state.colors[this.state.currentIndex].color === 'red') return 'rgba(233, 30, 30, 0.8)';
    if (this.state.colors[this.state.currentIndex].color === 'orange') return 'rgba(255, 152, 17, 0.8)';
    if (this.state.colors[this.state.currentIndex].color === 'yellow') return 'rgba(255, 212, 34, 0.8)';
    if (this.state.colors[this.state.currentIndex].color === 'green') return 'rgba(109, 200, 42, 0.8)';
    if (this.state.colors[this.state.currentIndex].color === 'blue') return '';
    if (this.state.colors[this.state.currentIndex].color === 'purple') return 'rgba(171, 109, 208, 0.8)';
    if (this.state.colors[this.state.currentIndex].color === 'brown') return 'rgba(191, 125, 56, 0.8)';
    if (this.state.colors[this.state.currentIndex].color === 'pink') return 'rgba(255, 110, 148, 0.8)';
    if (this.state.colors[this.state.currentIndex].color === 'black') return 'rgba(0, 0, 0, 0.7)';
    if (this.state.colors[this.state.currentIndex].color === 'white') return 'rgba(255, 255, 255, 0.8)';
  }

  textColor() {
    if (this.state.colors[this.state.currentIndex].color === 'black') return 'white';
    return '';
  }

  render() {
    if (this.state.colors.length === 0) return null;
    const { imageUrl } = this.state.colors[this.state.currentIndex];
    const color = this.state.colors[this.state.currentIndex].color;
    const { imageText } = this.state.colors[this.state.currentIndex];
    const colorClass = this.bgColor();
    const textColor = this.textColor();
    let display;
    let showImageText;

    if (!this.state.imageShowing) {
      display = <span id='image' onClick={this.handleClick}>{color}</span>;
      showImageText = <span className='word-text'></span>;
    } else if (this.state.imageShowing) {
      display = <img id='color' src={imageUrl} onClick={this.handleClick}></img>;
      showImageText = <span className='word-text'>{imageText}</span>;
    }

    return (
      <>
      <div className="container">
          <div className='style' style={{ backgroundColor: `${colorClass}`, color: `${textColor}` }}>
            <div className="row">
              <div className="column-third">
                <i onClick={this.handleClick} className="fas fa-chevron-left"></i>
              </div>
              <div className="center-img row">
                {display}
              </div>
              <div className="column-third">
                <i onClick={this.handleClick} className="fas fa-chevron-right"></i>
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
}
