import React, { useState, useEffect } from 'react';
import Home from './pages/home';
import InteractiveBg from './components/background';
import Navbar from './components/navbar';
import parseRoute from './lib/parse-route';
import Letters from './pages/letters';
import Colors from './pages/colors';
import Numbers from './pages/numbers';

function App() {
  const [route, setRoute] = useState(parseRoute(window.location.hash));

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setRoute(parseRoute(window.location.hash));
    });
  }, []);

  const renderPage = () => {
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'letters') {
      return <Letters />;
    }
    if (route.path === 'colors') {
      return <Colors />;
    }
    if (route.path === 'numbers') {
      return <Numbers />;
    }
  };

  return (
    <>
      <Navbar />
      <InteractiveBg />
      {renderPage()}
    </>
  );
}

export default App;
