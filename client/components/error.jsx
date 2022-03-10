import React from 'react';

export default class ShowError extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="style">
          <div className="row">
            <div className="column-third">
              <i className="fas fa-chevron-left"></i>
            </div>
            <div className="center-img">
              <span className='network-err'>
                Oops! There was an error connecting to the network!
              </span>;
            </div>
            <div className="column-third">
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
          <div className='col-full text-align'>
            <span className='word-text'></span>;
          </div>
        </div>
      </div>
    );
  }
}
