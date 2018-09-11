import React from "react";

import { Grid, Typography, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "../UI/Button/Button";

const styles = theme => ({
  holeScore: {
    padding: "0.4rem 0.9rem"
  },
  card: {
    padding: "10px 10px 20px",
    borderRadius: "0"
  },
  score: {
    display: "inline-block",
    fontSize: "2.5rem",
    margin: "0 15px",
    width: "3rem",
    textAlign: "center"
  },
  button: {
    margin: "0 10px",
    minWidth: "45px",
    borderRadius: "0",
    backgroundColor: theme.palette.secondary.main,
    color: "white"
  },
  cardHeader: {
    margin: "-.7rem -.7rem 1rem",
    backgroundColor: theme.palette.primary.light,
    padding: ".5rem",
    color: "white",
    textAlign: "center"
  },
  cardContent: {
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  cardLeftPane: {
    display: "flex",
    flex: "0 1 50%",
    justifyContent: "center",
    alignContent: "center",
    flexFlow: "column"
  },
  cardRightPane: {
    display: "flex",
    flex: "0 1 50%",
    justifyContent: "center",
    alignContent: "center"
  },
  leftPaneText: {
    textAlign: "right"
  }
});

const HoleScore = props => {
  let holeScore = "-";
  if (props.touched) {
    holeScore = props.score;
  }

  return (
    <Grid item xs={12} sm={6} lg={4} className={props.classes.holeScore}>
      <Card className={props.classes.card}>
        <Typography variant="subheading" className={props.classes.cardHeader}>
          Hole {props.number}
        </Typography>
        <div className={props.classes.cardContent}>
          <div className={props.classes.cardLeftPane}>
            <Grid container justify="center">
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  className={props.classes.leftPaneText}
                >
                  Par - &nbsp;
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{props.par}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  className={props.classes.leftPaneText}
                >
                  Difficulty - &nbsp;
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{props.difficulty}</Typography>
              </Grid>
              {/* <Grid item xs={6}>
                <Typography
                  variant="body1"
                  className={props.classes.leftPaneText}
                >
                  Yards - &nbsp;
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{props.yards}</Typography>
              </Grid> */}
            </Grid>
          </div>
          <div className={props.classes.cardRightPane}>
            <Button disabled={!props.touched} clicked={props.decrement}>
              -
            </Button>
            <Typography
              onClick={props.scoreClicked}
              variant="title"
              className={props.classes.score}
            >
              {holeScore}
            </Typography>
            <Button clicked={props.increment}>+</Button>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(HoleScore);
