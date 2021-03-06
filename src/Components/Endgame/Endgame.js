import React from 'react';
import './Endgame.css';
import isThis from './is_this.jpg';

class Endgame extends React.Component {
    handleNewGame = () => {
        this.props.resetBoardForNewGame();
    }
    prettifyString = (str) => {
        const newStr = str.replace(/_/g, " ");
        return newStr.replace(/\w\S*/g, (txt)=>txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
    render() {
        const final = this.props.state;
        const percent = (100 / (final.score.right + final.score.wrong) * final.score.right).toFixed(0);
        const mode = this.props.state.game_mode;
        return (
            <div id="endgame" className={this.props.state.the_end ? 'ended' : ''}>
                <h1><span role="img" alt="" aria-label="Checkered flag">🏁</span> Finished! <span role="img" alt="" aria-label="Champagne">🍾</span></h1>
                <p>Game mode: <strong>{mode.charAt(0).toUpperCase() + mode.substr(1)}{this.props.state.filter ? ' (' + this.prettifyString(this.props.state.filter) + ')' : ''}</strong>
                    <br />Difficulty: <strong>{this.prettifyString(this.props.state.mode)}</strong>
                </p>
                <p>Your final score: <strong>{final.score.right} out of {final.score.right + final.score.wrong}</strong>
                    <br /><strong>{(100 / (final.score.right + final.score.wrong) * final.score.right).toFixed(2) }% correct.</strong></p>
                {percent === 100 ? <h2><strong><span role="img" alt="" aria-label="Trophy">🏆</span> FLAWLESS VICTORY <span role="img" alt="" aria-label="Trophy">🏆</span></strong></h2> : ''}
                {percent > 100 ? <p>Cheatin', huh?</p> : ''}
                {percent >= 90 && percent <= 100 && final.score.right + final.score.wrong >= 9 ? <p><strong>Awesome work!</strong> Give yourself a fly five! (Don't really; that would be weird. But still: great job.) <span role="img" alt="" aria-label="Party!">🎉🤩🤓</span></p> : ''}
                {percent >= 90 && percent <= 100 && final.score.right + final.score.wrong <= 9 ? <p><strong>Awesome work!</strong> (I mean, that was a short game, but still: great job!) <span role="img" alt="" aria-label="Party!">🎉</span></p> : ''}
                {percent >= 80 && percent < 90 ? <p>Nice work! Not quite perfect, but your coworker's names and faces are clearly not a brainer for you. <span role="img" alt="" aria-label="Brain">🚫🧠</span></p> : ''}
                {percent >= 70 && percent < 80 ? <p>Solid showing! You must pay attention to Slack. <span role="img" alt="" aria-label="Sunglasses">😎</span></p> : ''}
                {(percent >= 69 && percent < 70) || (final.score.wrong === 69 || final.score.right === 69) ? <p>Nice.</p> : ''}
                {percent >= 50 && percent < 69 ? <p>You cleared the .500 mark. Good hustle! <span role="img" alt="" aria-label="Chart with increasing numbers">📈</span></p> : ''}
                {percent >= 25 && percent < 50 ? <p>It's ok; you're still kinda new. (Hopefully.) <span role="img" alt="" aria-label="Thinking face">🤔</span></p> : ''}
                {percent >= 18 && percent < 25 ? <p>Ouch. Oof. Owww. My coworkers. <span role="img" alt="" aria-label="Grimacing face">😖</span></p> : ''}
                {percent >= 10 && percent < 18 ? <p>You do know where you work…right? <span role="img" alt="" aria-label="Sunglasses">😳</span></p> : ''}
                {percent < 10 ? <p><img src={isThis} alt="The butterfly meme: 'Is this a coworker?'"/>You just made Brett cry. </p> : ''}

                {this.props.state.the_end && <button onClick={this.handleNewGame} autoFocus>New game!</button>}
            </div>
        );
    }
}

export default Endgame;