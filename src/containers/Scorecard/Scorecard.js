import React, { Component } from "react";

import HoleScore from "../../components/HoleScore/HoleScore";
import Total from "../../components/Total/Total";
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

    let display = <div>Not Authenticated</div>;
    if (this.props.auth) {
      display = (
        <div className={classes.Scorecard}>
          {scorecard1}
          <Total title="Front" total={this.props.total1} />
          <br />
          {scorecard2}
          <Total title="Back" total={this.props.total2} />
          <br />
          <Total title="Total" total={this.props.total} />
        </div>
      );
    }

    return display;
  }
}

export default Scorecard;
