import React from 'react';
import './Header.css';
import Scoreboard from '../Scoreboard/Scoreboard';

class Header extends React.Component {
    handleMenuToggle = (e) => {
        e.preventDefault();
        const options = document.querySelector('#options');
        options.classList.contains('options-showing') ? options.classList.remove('options-showing') : options.classList.add('options-showing');
    }
    render(){
        return(
            <React.Fragment>
            <div className="progress-bar">
                <div className="progress" style={{ width: (100 / (this.props.countdown + this.props.score.right + this.props.score.wrong)) * (this.props.score.right + this.props.score.wrong) + 'vw' }}></div>
            </div>
            <header id="app-header">
                <Scoreboard right={this.props.score.right} wrong={this.props.score.wrong} countdown={this.props.countdown}/>
            </header>
            </React.Fragment>
        );
    }
}

export default Header;