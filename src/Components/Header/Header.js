import React from 'react';
import './Header.css';
import Scoreboard from '../Scoreboard/Scoreboard';

const Header = ({ score, countdown}) => {
    return(
        <React.Fragment>
        <div className="progress-bar">
            <div className="progress" style={{ width: (100 / (countdown + score.right + score.wrong)) * (score.right + score.wrong) + 'vw' }}></div>
        </div>
        <header id="app-header">
            <Scoreboard right={score.right} wrong={score.wrong} countdown={countdown}/>
        </header>
        </React.Fragment>
    );
}

export default Header;