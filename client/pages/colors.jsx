import React from 'react';

export default class Colors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      letters: [],
      words: [],
      playA: false,
      wordShowing: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.nextLetter = this.nextLetter.bind(this);
    this.previousLetter = this.previousLetter.bind(this);
  }

  componentDidMount() {
    fetch('api/letters')
      .then(res => res.json())
      .then(letters => {
        this.setState({ letters });
        if (this.state.playA === false) {
          this.autoA = setTimeout(() => {
            this.setState({ playA: true });
            const audio = new Audio(this.state.letters[0].audioUrl); audio.play();
          }, 1500);
        }
      });
    fetch('api/words')
      .then(res => res.json())
      .then(words => {
        this.setState({ words });
      });
  }

  componentWillUnmount() {
    clearTimeout(this.autoA);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentIndex !== prevState.currentIndex) {
      const audio = new Audio(this.state.letters[this.state.currentIndex].audioUrl); audio.play();
    }
  }

  handleClick(event, index) {
    if (event.target.className === 'fas fa-chevron-right') {
      this.nextLetter();
    } else if (event.target.className === 'fas fa-chevron-left') {
      this.previousLetter();
    }
    if (event.target.id === 'letter') {
      this.setState({ wordShowing: true });
      const audio = new Audio(this.state.words[this.state.currentIndex].audioUrl); audio.play();
    } else if (event.target.id === 'word') {
      this.setState({ wordShowing: false });
      const audio = new Audio(this.state.letters[this.state.currentIndex].audioUrl); audio.play();
    } else {
      this.setState({ wordShowing: false });
    }
  }

  nextLetter() {
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

  previousLetter() {
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
    if (this.state.words.length === 0) return null;
    const { imageUrl } = this.state.letters[this.state.currentIndex];
    const wordImage = this.state.words[this.state.currentIndex].imageUrl;
    const word = this.state.words[this.state.currentIndex].word;

    const displayType = !this.state.wordShowing
      ? <div className="style">
        <div className="row">
          <div className="column-third">
            <i onClick={this.handleClick} className="fas fa-chevron-left"></i>
          </div>
          <div className="center-img">
            <img
              id='letter'
              src={imageUrl}
              onClick={this.handleClick}>
            </img>
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
              src={wordImage}
              onClick={this.handleClick}>
            </img>
          </div>
          <div className="column-third">
            <i onClick={this.handleClick} className="fas fa-chevron-right"></i>
          </div>
        </div>
        <div className='col-full text-align'>
          <span className='word-text'>{word}</span>
        </div>
      </div>;

    return (
      <div className="container">
        {displayType}
      </div>
    );
  }
}
