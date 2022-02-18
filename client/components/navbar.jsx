import React from 'react';

export default class Navbar extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.handleClick = this.handleClick.bind(this);
  // }

  // handleClick() {
  //   // const audio = new Audio('./images/letters.mp3');
  //   // audio.play();
  // }

  render() {
    return (
      <>
        <header className='navbar'>
          <div className='container'>
            <div className='row'>
              <div className='col-full'>
                <h2 className='logo'>Fun-2-Learn</h2>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}
