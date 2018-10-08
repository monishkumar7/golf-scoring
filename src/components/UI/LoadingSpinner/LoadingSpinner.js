import React from 'react';

import classes from './LoadingSpinner.css';

const loadingSpinner = props => {
  const spinnerClasses = [classes.loader];
  if (props.type === 'small') spinnerClasses.push(classes.small);
  return <div className={spinnerClasses.join(' ')}>Loading...</div>;
};

export default loadingSpinner;
