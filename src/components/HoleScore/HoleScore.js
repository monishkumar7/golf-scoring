import React from 'react';

import classes from './HoleScore.css';
const holeScore = (props) => {
    let holeScore = '-';
    if(props.holeScore !== '') {
        holeScore = props.holeScore;
    }
    return (
        <div className={classes.HoleScore}>
            <div className={classes.Number}>#&nbsp;{props.holeNumber}</div>
            <hr/>
            <div className={classes.Score}>{holeScore}</div>
        </div>
    )
}

export default holeScore;