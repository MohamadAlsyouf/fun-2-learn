import React from 'react';

export default class Navbar extends React.Component {

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
