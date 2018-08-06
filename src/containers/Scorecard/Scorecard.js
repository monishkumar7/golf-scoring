import React, { Component } from "react";

import HoleScore from "../../components/HoleScore/HoleScore";
import Text from "../../components/Text/Text";
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
        Scorecard
        <br />
        <Text title="Hole" value="Score" />
        {scorecard1}
        <Text title="Front" value={this.props.total1} />
        <br />
        <Text title="Hole" value="Score" />
        {scorecard2}
        <Text title="Back" value={this.props.total2} />
        <br />
        <Text title="Total" value={this.props.total} />
      </div>
    );
  }
}

export default Scorecard;
