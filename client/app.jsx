import React from 'react';
import Home from './pages/home';
import InteractiveBg from './components/background';

export default class App extends React.Component {
  render() {
    return (
      <>
        <InteractiveBg />
        <Home />
      </>
    );
  }
}
