import React from 'react';
import Home from './pages/home';
import InteractiveBg from './components/background';
import Navbar from './components/navbar';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <InteractiveBg />
        <Home />
      </>
    );
  }
}
