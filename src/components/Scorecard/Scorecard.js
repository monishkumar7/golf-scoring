import React from "react";
import { Grid } from "@material-ui/core";

import HoleScore from "./HoleScore/HoleScore";
import TableHeader from "./TableHeader/TableHeader";

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
    <Grid container>
      <Grid item xs={12} md={6} xl={4}>
        <TableHeader title="Hole" text content="Score" />
        {scorecard1}
        <TableHeader title="Front" content={props.total1} />
      </Grid>
      <Grid item xs={12} md={6} xl={4}>
        <TableHeader title="Hole" text content="Score" />
        {scorecard2}
        <TableHeader title="Back" content={props.total2} />
      </Grid>
      <Grid item xs={12}>
        <TableHeader title="Par" summary content="72" />
        <TableHeader title="Total" summary content={props.total} />
      </Grid>
    </Grid>
  );
};

export default scorecard;
