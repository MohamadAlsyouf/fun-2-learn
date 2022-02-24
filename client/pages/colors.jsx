import React from 'react';

export default class Colors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      colors: [],
      playRed: false,
      wordShowing: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.nextColor = this.nextColor.bind(this);
    this.previousColor = this.previousColor.bind(this);
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
          }, 1500);
        }
        // console.log(colors);
      });
  }

  componentWillUnmount() {
    clearTimeout(this.autoRed);
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
      this.setState({ wordShowing: true });
      const audio = new Audio(this.state.colors[this.state.currentIndex].colorAudioUrl); audio.play();
    } else if (event.target.id === 'word') {
      this.setState({ wordShowing: false });
      const audio = new Audio(this.state.colors[this.state.currentIndex].colorAudioUrl); audio.play();
    } else {
      this.setState({ wordShowing: false });
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

  render() {
    if (this.state.colors.length === 0) return null;
    const { imageUrl } = this.state.colors[this.state.currentIndex];
    const color = this.state.colors[this.state.currentIndex].color;

    const displayType = !this.state.wordShowing
      ? <div className="style">
        <div className="row">
          <div className="column-third">
            <i onClick={this.handleClick} className="fas fa-chevron-left"></i>
          </div>
          <div className="center-img">
            <span
              id='image'
              onClick={this.handleClick}>
                {color}
            </span>
          </div>
          <div className="column-third">
            <i onClick={this.handleClick} className="fas fa-chevron-right"></i>
          </div>
        </div>
        <div className='col-full text-align'>
          <span className='word-text'></span>
        </div>
      </div>
      : <div className="style">
        <div className="row">
          <div className="column-third">
            <i onClick={this.handleClick} className="fas fa-chevron-left"></i>
          </div>
          <div className="center-img">
            <img
              id='word'
              src={imageUrl}
              onClick={this.handleClick}>
            </img>
          </div>
          <div className="column-third">
            <i onClick={this.handleClick} className="fas fa-chevron-right"></i>
          </div>
        </div>
        <div className='col-full text-align'>
          <span className='word-text'>{color}</span>
        </div>
      </div>;

    return (
      <>
      <div className="container">
        {displayType}
      </div>
      </>
    );
  }
}
