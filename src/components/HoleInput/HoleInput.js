import React from "react";

import { Grid, Typography, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "../UI/Button/Button";

const styles = theme => ({
  holeScore: {
    padding: "5px 10px"
  },
  card: {
    padding: "10px 10px 20px",
    borderRadius: "0"
  },
  score: {
    display: "inline-block",
    fontSize: "2.5rem",
    margin: "0 15px"
  },
  button: {
    margin: "0 10px",
    minWidth: "45px",
    borderRadius: "0",
    backgroundColor: theme.palette.secondary.main,
    color: "white"
  },
  cardHeader: {
    margin: "-10px -10px 10px",
    backgroundColor: theme.palette.primary.light,
    padding: "5px",
    color: "white"
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
  }
});

const HoleScore = props => {
  return (
    <Grid item xs={12} sm={6} lg={4} className={props.classes.holeScore}>
      <Card className={props.classes.card}>
        <Typography variant="subheading" className={props.classes.cardHeader}>
          Hole {props.number}
        </Typography>
        <div className={props.classes.cardContent}>
          <div className={props.classes.cardLeftPane}>
            <Typography variant="body1">Par - {props.par}</Typography>
            <Typography variant="body1">
              Difficulty - {props.difficulty}
            </Typography>
            <Typography variant="body1">Yards - {props.yards}</Typography>
          </div>
          <div className={props.classes.cardRightPane}>
            <Button clicked={props.decrement}>-</Button>
            <Typography variant="title" className={props.classes.score}>
              {props.score}
            </Typography>
            <Button clicked={props.increment}>+</Button>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(HoleScore);
