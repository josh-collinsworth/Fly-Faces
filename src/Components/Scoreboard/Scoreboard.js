import React from 'react';
import './Scoreboard.css';

const Scoreboard = ({right, wrong, countdown }) => {
    return (
        <div id="scoreboard">
            <p><small>{right}-{wrong} of {countdown + right + wrong} <br />{(right + wrong > 0) ? (100 / (right + wrong) * right).toFixed(1) + '%' : ''}</small></p>
        </div>
    );
}

export default Scoreboard;