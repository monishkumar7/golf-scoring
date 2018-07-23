import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Scorecard from '../Scorecard/Scorecard';
import HoleInput from '../../components/HoleInput/HoleInput';
import Aux from '../../hoc/Aux';
import * as actionTypes from '../../store/actions';
import Button from '../../components/UI/Button/Button';

class App extends Component {
  render() {
    const holeInput = (
      this.props.holesArray.map(hole => {
        return <HoleInput key={hole.id} holeNumber={hole.id} name={hole.id} par={hole.par} value={hole.value} changed={(event) => this.props.onInputChanged(event.target.value, hole.id)}/>
      })
    );

    return (
      <Aux>
        <Button disabled={false} clicked={this.props.onResetClicked}>Reset Score</Button>
        <Scorecard total={this.props.total} total1={this.props.total1} total2={this.props.total2} holesArray={this.props.holesArray}/>
        <div style={{margin: "20px auto", width: "90%"}}>
        {holeInput}
        </div>
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
    onInputChanged: (score, id) => dispatch({type: actionTypes.INPUT_CHANGE, newScore: score, holeId: id}),
    onResetClicked: () => dispatch({type: actionTypes.RESET_SCORE})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
