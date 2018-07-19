import React from 'react';

import classes from './Total.css';

const total = (props) => {
    return (
        <div className={classes.Total}>
            <div className={classes.Title}>Total</div>
            <div className={classes.TotalValue}>{props.total}</div>
        </div>
    )
}

export default total;