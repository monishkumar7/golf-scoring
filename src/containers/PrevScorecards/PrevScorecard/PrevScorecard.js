import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  Collapse
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Scorecard from "../../../components/Scorecard/Scorecard";

const styles = theme => ({
  scorecard: {
    margin: ".4rem .5rem"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  cardDate: {
    textAlign: "center"
  },
  cardIcon: {
    textAlign: "right"
  },
  collapse: {
    padding: "0"
  },
  cardHeader: {
    padding: "1rem"
  }
});

class PrevScorecard extends Component {
  state = {
    expanded: false
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes } = this.props;
    const scorecard = (
      <Scorecard
        total={this.props.total}
        total1={this.props.total1}
        total2={this.props.total2}
        holesArray={this.props.holesArray}
      />
    );
    return (
      <Card className={classes.scorecard}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.cardHeader}
        >
          <Grid item xs={7}>
            <Typography variant="subheading">Game {this.props.id}</Typography>
          </Grid>
          <Grid item xs={4} className={classes.cardDate}>
            <Typography variant="body1">Aug 22, 2018 - Wednesday</Typography>
          </Grid>
          <Grid item xs={1} className={classes.cardIcon}>
            <IconButton
              className={[
                classes.expand,
                this.state.expanded ? [classes.expandOpen] : null
              ].join(" ")}
              onClick={this.handleExpandClick}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Collapse
          in={this.state.expanded}
          timeout="auto"
          className={classes.collapse}
        >
          {scorecard}
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(PrevScorecard);