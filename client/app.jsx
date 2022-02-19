import React from 'react';
import Home from './pages/home';
import InteractiveBg from './components/background';
import Navbar from './components/navbar';
// import { parseRoute } from './lib';
// import Letters from './pages/letters';

// THE VIEW SWAPPING STUFF IS IN DA COMMENTS CUHHHHHHHHHHHH
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // route: parseRoute(window.location.hash)
    };
  }

  // componentDidMount() {
  //   window.addEventListener('hashchange', () => {
  //     const parsedRoute = parseRoute(window.location.hash);
  //     this.setState({ route: parsedRoute });
  //   });
  // }

  render() {
    // const { route } = this.state;
    // if (route.path === '') {
    //   return <Home />;
    // }
    // if (route.path === 'letters') {
    //   const letterId = route.params.get('letterId');
    //   return (<Letters letterId={letterId} />);
    // }
    return (
      <>
        <Navbar />
        <InteractiveBg />
        <Home />
      </>
    );
  }
}
