import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  Collapse,
  CardContent
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  scorecard: {
    padding: "1rem",
    margin: ".4rem 1rem"
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
    return (
      <Card className={classes.scorecard}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={3}>
            <Typography variant="subheading">Game {this.props.id}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subheading" />
          </Grid>
          <Grid item xs={3}>
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
        <Collapse in={this.state.expanded} timeout="auto">
          <CardContent>
            <Typography variant="title">Collapsed</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(PrevScorecard);
