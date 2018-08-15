import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Header = props => (
  <AppBar position="static">
    <Toolbar style={{ justifyContent: "space-between" }}>
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

export default Header;
