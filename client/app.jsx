import React from 'react';
import Home from './pages/home';
import InteractiveBg from './components/background';
import Navbar from './components/navbar';
import parseRoute from './lib/parse-route';

// import Letters from './pages/letters';

import Colors from './pages/colors';
import Numbers from './pages/numbers';
import Refactor from './pages/letters-hooks';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const parsedRoute = parseRoute(window.location.hash);
      this.setState({ route: parsedRoute });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'letters') {
      return <Refactor />;
      // return <Letters />;
    }
    if (route.path === 'colors') {
      return <Colors />;
    }
    if (route.path === 'numbers') {
      return <Numbers />;
    }
  }

  render() {
    return (
        <>
          <Navbar />
          <InteractiveBg />
          { this.renderPage() }
        </>
    );
  }
}
