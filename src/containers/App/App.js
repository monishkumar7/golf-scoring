import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Scorecard from '../Scorecard/Scorecard';
import HoleInput from '../../components/HoleInput/HoleInput';
import Aux from '../../hoc/Aux';
import * as actionTypes from '../../store/actions';

class App extends Component {
  render() {
    return (
      <Aux>
        <Scorecard holeScore={this.props.score}/>
        <HoleInput holeNumber="1" name="hole1" value={this.props.score} changed={(event) => this.props.onInputChanged(event.target.value)}/>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    score: state.score
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInputChanged: (score) => dispatch({type: actionTypes.INPUT_CHANGE, newScore: score})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
