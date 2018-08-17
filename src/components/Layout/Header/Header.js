import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  headerToolbar: {
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.dark
  }
});

const Header = props => (
  <AppBar position="static">
    <Toolbar className={props.classes.headerToolbar}>
      <Typography variant="headline" color="inherit">
        Allcal Golf Scoring
      </Typography>
      {props.auth ? (
        <Typography variant="body1" color="inherit">
          {props.userName}
        </Typography>
      ) : (
        <Typography variant="body1" color="inherit">
          Not Logged In
        </Typography>
      )}
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
