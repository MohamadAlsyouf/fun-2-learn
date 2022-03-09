import React from 'react';

export default class ShowLoader extends React.Component {
  render() {
    return (
    // <div className='row'>
    //   <div
    //   id='loadSpinner'
    //   className='spinner loadingio-spinner-rolling-sz6x1e80f7m'>
    //     <div className='row spinner ldio-mpfig5gfwfi'>
    //       <div></div>
    //     </div>
    //   </div>
    // </div>

        <div className="container">
          <div className="style">
            <div className="row">
              <div className="column-third">
                <i className="fas fa-chevron-left"></i>
              </div>
              <div className="center-img">
                <div className='row'>
                  <div
                  id='loadSpinner'
                  className='spinner loadingio-spinner-rolling-sz6x1e80f7m'>
                    <div className='row spinner ldio-mpfig5gfwfi'>
                      <div></div>
                    </div>
                  </div>
                </div>
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
