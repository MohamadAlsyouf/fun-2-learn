import React from 'react';

export default class Navbar extends React.Component {

  render() {
    return (
      <>
        <header className='navbar'>
          <div className='container'>
              <div className='col-full row align-center'>
                <a href='#'><h2 className='logo'>Fun 2 Learn</h2></a>
              <a href='#'><img className='penguin' src='./images/pengoo.png'></img></a>
              </div>
          </div>
        </header>
      </>
    );
  }
}
