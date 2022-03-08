import React from 'react';

export default class Numbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      numbers: [],
      playZero: false
    };
  }

  componentDidMount() {
    fetch('api/numbers')
      .then(res => res.json())
      .then(numbers => {
        this.setState({ numbers });
        if (this.state.playZero === false) {
          this.auto0 = setTimeout(() => {
            this.setState({ playZero: true });
            const audio = new Audio(this.state.numbers[0].audioUrl); audio.play();
          }, 1300);
        }
      });
    window.addEventListener('keydown', this.handlePress);
  }

  componentWillUnmount() {
    clearTimeout(this.autoA);
    window.removeEventListener('keydown', this.handlePress);
  }

  render() {
    return (
      <div className="container">
        <div className="style">
          <div className="row">
            <div className="column-third">
              <i onClick={this.handleClick} className="fas fa-chevron-left"></i>
            </div>
            <div className="center-img">
              {/* {display} */}
            </div>
            <div className="column-third">
              <i onClick={this.handleClick} className="fas fa-chevron-right"></i>
            </div>
          </div>
          <div className='col-full text-align'>
            {/* {showImageText} */}
          </div>
        </div>
      </div>
    );
  }
}
