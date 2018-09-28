import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import PrevScorecard from "./PrevScorecard/PrevScorecard";
import * as actionCreators from "../../store/actions";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

class PrevScorecards extends Component {
  componentDidMount = () => {
    this.props.onFetchPreviousScorecard(
      localStorage.getItem("loginToken"),
      true
    );
  };

  render() {
    const totalLength = this.props.prevScorecards.length;
    const scorecards = this.props.prevScorecards.map((scorecard, index) => (
      <Grid item xs={12} key={scorecard.scorecardId}>
        <PrevScorecard
          total={scorecard.total}
          total1={scorecard.total1}
          total2={scorecard.total2}
          holesArray={scorecard.holesArray}
          id={scorecard.scorecardId}
          index={totalLength - index}
          lastUpdatedTime={scorecard.lastUpdatedTime}
        />
      </Grid>
    ));
    return (
      <Fragment>
        {this.props.loading ? (
          <Grid item xs={12}>
            <LoadingSpinner />
          </Grid>
        ) : (
          <Grid container>{scorecards}</Grid>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.scores.loading,
    prevScorecards: state.scores.previousScorecards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPreviousScorecard: (loginToken, withPrevious) =>
      dispatch(actionCreators.fetchAllScorecards(loginToken, withPrevious))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrevScorecards);
