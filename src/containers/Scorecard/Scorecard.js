import React, { Component } from 'react';

import HoleScore from '../../components/HoleScore/HoleScore';
import Total from '../../components/Total/Total';

class Scorecard extends Component {
    render() {
        const scorecard1 = (
            this.props.holesArray.slice(0,9).map(hole => {
                return <HoleScore key={hole.id} holeNumber={hole.id} holeScore={hole.value}/>
            })
        )

        const scorecard2 = (
            this.props.holesArray.slice(9).map(hole => {
                return <HoleScore key={hole.id} holeNumber={hole.id} holeScore={hole.value}/>
            })
        )

        return (
            <div>
                {scorecard1}
                <Total total={this.props.total1} />
                {scorecard2}
                <Total total={this.props.total2} />
                <Total total={this.props.total} />
            </div>
        );
    }
}

export default Scorecard;