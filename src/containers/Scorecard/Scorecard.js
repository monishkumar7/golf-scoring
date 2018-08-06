import React, { Component } from "react";
import { connect } from "react-redux";

import HoleScore from "../../components/Scorecard/HoleScore/HoleScore";
import TableHeader from "../../components/Scorecard/TableHeader/TableHeader";
import classes from "./Scorecard.css";

class Scorecard extends Component {
  render() {
    const scorecard1 = this.props.holesArray.slice(0, 9).map(hole => {
      return (
        <HoleScore key={hole.id} holeNumber={hole.id} holeScore={hole.value} />
      );
    });

    const scorecard2 = this.props.holesArray.slice(9).map(hole => {
      return (
        <HoleScore key={hole.id} holeNumber={hole.id} holeScore={hole.value} />
      );
    });

    return (
      <div className={classes.Scorecard}>
        <p className={classes.Header}>
          RB Golf Scorecard | User - {this.props.userName}
        </p>
        <TableHeader title="Hole" text content="Score" />
        {scorecard1}
        <TableHeader title="Front" content={this.props.total1} />
        <br />
        <hr className={classes.Separator} />
        <TableHeader title="Hole" text content="Score" />
        {scorecard2}
        <TableHeader title="Back" content={this.props.total2} />
        <br />
        <hr className={classes.Separator} />
        <TableHeader title="Par" summary content="72" />
        <TableHeader title="Total" summary content={this.props.total} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.auth.userName
  };
};
export default connect(mapStateToProps)(Scorecard);
