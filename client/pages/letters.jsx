import React from 'react';

export default class Letters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      letters: [],
      // MAKE A GET/FETCH FOR THIS LIST OF WORDS FROM DB !!!!!
      words: [],
      playA: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
  }

  componentDidMount(letter) {
    fetch('api/letters')
      .then(res => res.json())
      .then(letters => {
        this.setState({ letters });
        setTimeout(() => {
          this.setState({ playA: true });
          const audio = new Audio(this.state.letters[0].audioUrl); audio.play();
        }, 1500);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentIndex !== prevState.currentIndex) {
      const audio = new Audio(this.state.letters[this.state.currentIndex].audioUrl); audio.play();
    }
  }

  handleClick(event, index) {
    if (event.target.className === 'fas fa-chevron-right') {
      this.nextImage();
    } else if (event.target.className === 'fas fa-chevron-left') {
      this.previousImage();
    }
  }

  nextImage() {
    if (this.state.currentIndex >= this.state.letters.length - 1) {
      this.setState({
        currentIndex: 0
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  }

  previousImage() {
    if (this.state.currentIndex <= 0) {
      this.setState({
        currentIndex: this.state.letters.length - 1
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex - 1
      });
    }
  }

  render() {
    if (this.state.letters.length === 0) return null;
    // PLAY THE WORD AUDIO URL WHEN CLICKING ON THE SPEAKER, OR HAVE IT AUTO PLAY WITH A TIMEOUT LIKE LETTER ******!!!!!
    const { imageUrl } = this.state.letters[this.state.currentIndex];

    return (
      <div className="container">
        <div className="style">
          <div className="row">
            <div className="column-third">
              <i onClick={this.handleClick} className="fas fa-chevron-left"></i>
            </div>
            <div className="center-img">
              <img
              src={imageUrl}
                // CHANGE ONCLICK TO SHOW THE IMAGE, NOT PLAY THE SOUND !!!***!!!!!!!!!!!!!
                // onClick={() => { const audio = new Audio(audioUrl); audio.play(); }}
              >
              </img>
            </div>
            <div className="column-third">
              <i onClick={this.handleClick} className="fas fa-chevron-right"></i>
            </div>
          </div>
          <div className='col-full text-align'>
            <span className='word-text'>Hello</span>
          </div>
        </div>
      </div>
    );
  }
}
