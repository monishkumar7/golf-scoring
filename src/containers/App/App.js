import React, { Component } from 'react';

import './App.css';
import Scorecard from '../Scorecard/Scorecard';
import HoleInput from '../../components/HoleInput/HoleInput';
import Aux from '../../hoc/Aux';

class App extends Component {
  render() {
    return (
      <Aux>
        <Scorecard />
        <HoleInput holeNumber="1" name="hole1" value="1" />
      </Aux>
    );
  }
}

export default App;
