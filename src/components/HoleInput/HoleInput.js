import React from 'react';

import classes from './HoleInput.css';
import Input from '../UI/Input/Input';

const holeInput = (props) => {
    return (
        <div className={classes.HoleInput}>
            <h4>Hole #{props.holeNumber}</h4>
            <Input
                name={props.name}
                value={props.value}
                changed={props.changed}/>
            <h4>Par - {props.par}</h4>
        </div>
    )
}

export default holeInput;