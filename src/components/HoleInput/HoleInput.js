import React from 'react';

import Input from '../UI/Input/Input';

const holeInput = (props) => {
    return (
        <div>
            <h4>{props.holeNumber}</h4>
            <Input
                type="number"
                name={props.name}
                value={props.value} />
        </div>
    )
}

export default holeInput;