import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  hrLine: {
    border: '0.5px solid #dedede',
    margin: '0.7em 0'
  }
};

const Divider = props => {
  return <hr className={props.classes.hrLine} />;
};

export default withStyles(styles)(Divider);
