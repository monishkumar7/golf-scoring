import React from 'react';

import classes from './Input.css'

const input = (props) => (
    <div className={classes.Input}>
        <input type={props.type} onClick={props.clicked} name={props.name} value={props.value}/>
    </div>
);

export default input;