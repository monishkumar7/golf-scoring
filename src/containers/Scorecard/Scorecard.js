import React, { Component } from 'react';

import HoleScore from '../../components/HoleScore/HoleScore';
import Total from '../../components/Total/Total';

class Scorecard extends Component {
    render() {
        const scorecard = (
            this.props.holesArray.map(hole => {
                return <HoleScore key={hole.id} holeNumber={hole.id} holeScore={hole.value}/>
            })
        )

        return (
            <div>
                {scorecard}
                <Total total={this.props.total} />
            </div>
        );
    }
}

export default Scorecard;