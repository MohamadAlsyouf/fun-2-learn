import React from 'react';
import ShowLoader from '../components/loader';

export default class Numbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      numbers: [],
      playZero: false,
      isLoading: true,
      error: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.nextNumber = this.nextNumber.bind(this);
    this.previousNumber = this.previousNumber.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    fetch('api/numbers')
      .then(res => res.json())
      .then(numbers => {
        this.setState({ numbers, isLoading: false });
        if (this.state.playZero === false) {
          this.autoZero = setTimeout(() => {
            this.setState({ playZero: true });
            const audio = new Audio(this.state.numbers[0].audioUrl); audio.play();
          }, 1300);
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: true });
      });
    window.addEventListener('keydown', this.handlePress);
  }

  componentWillUnmount() {
    clearTimeout(this.autoZero);
    window.removeEventListener('keydown', this.handlePress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentIndex !== prevState.currentIndex) {
      const audio = new Audio(this.state.numbers[this.state.currentIndex].audioUrl); audio.play();
    }
  }

  handleClick(event, index) {
    if (event.target.className === 'fas fa-chevron-right') this.nextNumber();
    if (event.target.className === 'fas fa-chevron-left') this.previousNumber();
    if (event.target.id === 'image') {
      const audio = new Audio(this.state.numbers[this.state.currentIndex].audioUrl); audio.play();
    }
  }

  handlePress() {
    if (event.key === 'ArrowRight') this.nextNumber();
    if (event.key === 'ArrowLeft') this.previousNumber();
    if (event.key === ' ') {
      const audio = new Audio(this.state.numbers[this.state.currentIndex].audioUrl); audio.play();
    }
  }

  nextNumber() {
    if (this.state.currentIndex >= this.state.numbers.length - 1) {
      this.setState({
        currentIndex: 0
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  }

  previousNumber() {
    if (this.state.currentIndex <= 0) {
      this.setState({
        currentIndex: this.state.numbers.length - 1
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex - 1
      });
    }
  }

  render() {
    if (this.state.isLoading) return <ShowLoader />;

    if (this.state.numbers.length === 0) return null;
    const { imageUrl } = this.state.numbers[this.state.currentIndex];
    const number = this.state.numbers[this.state.currentIndex].number;
    let display;
    let numSpelling;

    if (this.state.error) {
      display =
        <span className='network-err'>
          Oops! There was an error connecting to the network!
        </span>;
      numSpelling = <span className='word-text'></span>;
    } else {
      display = <img id="image" src={imageUrl} onClick={this.handleClick}></img>;
      numSpelling = <span className='word-text'>{number}</span>;
    }

    return (
      <div className="container">
        <div className="style">
          <div className="row">
            <div className="column-third">
              <i onClick={this.handleClick} className="fas fa-chevron-left"></i>
            </div>
            <div className="center-img">
              {display}
            </div>
            <div className="column-third">
              <i onClick={this.handleClick} className="fas fa-chevron-right"></i>
            </div>
          </div>
          <div className='col-full text-align'>
            {numSpelling}
          </div>
        </div>
      </div>
    );
  }
}
