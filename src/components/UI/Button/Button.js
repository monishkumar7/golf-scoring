import React from 'react';

import classes from './Button.css';

const button = props => {
  let buttonClass = [classes.Button];
  switch (props.type) {
    case 'scoreButton':
      buttonClass.push(classes.ScoreButton);
      break;
    case 'distanceButton':
      buttonClass.push(classes.DistanceButton);
      break;
    default:
      break;
  }
  return (
    <button
      className={buttonClass.join(' ')}
      disabled={props.disabled}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default button;
