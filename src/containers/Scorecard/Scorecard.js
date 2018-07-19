import React, { Component } from 'react';

import HoleScore from '../../components/HoleScore/HoleScore';
import Total from '../../components/Total/Total';

class Scorecard extends Component {
    render() {
        return (
            <div>
                <HoleScore holeNumber="1" holeScore={this.props.holeScore}/>
                <Total total="10" />
            </div>
        );
    }
}

export default Scorecard;