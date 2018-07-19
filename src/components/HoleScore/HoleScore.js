import React from 'react';

import classes from './HoleScore.css';
const holeScore = (props) => {
    return (
        <div className={classes.HoleScore}>
            <div className={classes.Number}>#{props.holeNumber}</div>
            <div className={classes.Score}>{props.holeScore}</div>
        </div>
    )
}

export default holeScore;