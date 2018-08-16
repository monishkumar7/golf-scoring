import React from "react";

import { Button, Grid, Typography, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  holeScore: {
    padding: "5px 10px"
  },
  card: {
    padding: "10px 10px 20px"
  },
  score: {
    display: "inline-block"
  },
  button: {
    margin: "0 10px",
    minWidth: "45px"
  },
  cardHeader: {
    margin: "-10px -10px 10px",
    backgroundColor: "yellow",
    padding: "5px"
  }
};

const HoleScore = props => {
  return (
    <Grid item xs={12} sm={6} lg={4} className={props.classes.holeScore}>
      <Card className={props.classes.card}>
        <Typography variant="subheading" className={props.classes.cardHeader}>
          Hole {props.number}
        </Typography>
        <div
          style={{
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "inline-block",
              flex: "0 1 50%"
            }}
          >
            <Typography variant="body1">Par - {props.par}</Typography>
            <Typography variant="body1">
              Difficulty - {props.difficulty}
            </Typography>
            <Typography variant="body1">Yards - {props.yards}</Typography>
          </div>
          <div
            style={{
              display: "inline-block",
              flex: "0 1 50%"
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={props.decrement}
              className={props.classes.button}
            >
              <Typography variant="button">-</Typography>
            </Button>
            <Typography variant="body1" className={props.classes.score}>
              {props.score}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={props.increment}
              className={props.classes.button}
            >
              <Typography variant="button">+</Typography>
            </Button>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(HoleScore);
