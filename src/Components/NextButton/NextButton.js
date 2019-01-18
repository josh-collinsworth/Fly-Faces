import React from 'react';
import './NextButton.css';

class NextButton extends React.Component {
    handleAnswer = (e) => {
        const oldScore = this.props.score;
        if(this.props.skipped || this.props.answered){
            if (this.props.answered) {
                oldScore.right++;
            } else {
                oldScore.wrong++;
            }
            this.props.randomSelection(oldScore);
        } else {
            this.props.handleSkip();
            return;
        }    
    }
    render(){
        return(
            <div className="button-container">
                <button style={{ color: this.props.answered && this.props.state.colorize ? this.props.state.current_color : '' }} id="next-button" onClick={this.handleAnswer} className={this.props.answered ? 'next' : 'skip'}>
                    {this.props.answered ? 'Next!' : 'Skip'}
                </button>
            </div>
        );
    }
}

export default NextButton;