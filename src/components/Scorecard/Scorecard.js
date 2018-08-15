import React from "react";

import HoleScore from "./HoleScore/HoleScore";
import TableHeader from "./TableHeader/TableHeader";
import classes from "./Scorecard.css";

const scorecard = props => {
  const scorecard1 = props.holesArray.slice(0, 9).map(hole => {
    return (
      <HoleScore
        key={hole.id}
        holeNumber={hole.id}
        holeScore={hole.value}
        touched={hole.touched}
      />
    );
  });

  const scorecard2 = props.holesArray.slice(9).map(hole => {
    return (
      <HoleScore
        key={hole.id}
        holeNumber={hole.id}
        holeScore={hole.value}
        touched={hole.touched}
      />
    );
  });

  return (
    <div className={classes.Scorecard}>
      <TableHeader title="Hole" text content="Score" />
      {scorecard1}
      <TableHeader title="Front" content={props.total1} />
      <br />
      <hr className={classes.Separator} />
      <TableHeader title="Hole" text content="Score" />
      {scorecard2}
      <TableHeader title="Back" content={props.total2} />
      <br />
      <hr className={classes.Separator} />
      <TableHeader title="Par" summary content="72" />
      <TableHeader title="Total" summary content={props.total} />
    </div>
  );
};

export default scorecard;
