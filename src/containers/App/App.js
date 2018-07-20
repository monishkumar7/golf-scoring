import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Scorecard from '../Scorecard/Scorecard';
import HoleInput from '../../components/HoleInput/HoleInput';
import Aux from '../../hoc/Aux';
import * as actionTypes from '../../store/actions';

class App extends Component {
  render() {
    const holeInput = (
      this.props.holesArray.map(hole => {
        return <HoleInput key={hole.id} holeNumber={hole.id} name={hole.id} value={hole.value} changed={(event) => this.props.onInputChanged(event.target.value)}/>
      })
    );

    return (
      <Aux>
        <Scorecard total={this.props.total} holesArray={this.props.holesArray}/>
        {holeInput}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    holesArray: state.holesArray,
    total1: state.total1,
    total2: state.total2,
    total: state.total
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInputChanged: (score) => dispatch({type: actionTypes.INPUT_CHANGE, newScore: score})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
