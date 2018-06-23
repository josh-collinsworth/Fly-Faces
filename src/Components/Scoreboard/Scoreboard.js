import React from 'react';
import './Scoreboard.css';

class Scoreboard extends React.Component {
    render() {
        return (
            <div id="scoreboard">
                <p><small>{this.props.score.right}-{this.props.score.wrong} of {this.props.countdown + this.props.score.right + this.props.score.wrong} <br />{(this.props.score.right + this.props.score.wrong > 0) ? (100 / (this.props.score.right + this.props.score.wrong) * this.props.score.right).toFixed(1) + '%' : ''}</small></p>
            </div>
        );
    }
}

export default Scoreboard;