import React from 'react';
import './AnswerBox.css';
import NextButton from '../NextButton/NextButton';

class AnswerBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answered: false,
            skipped: false,
            skipWarn: false,
            warmer: false,
            colder: false
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({skipWarn: false});   
        }, 150);
    }
    handleSkip = () => {
        this.setState({ skipped: true });
    }
    checkAnswer = (e) => {
        if(this.props.state.game_start && !this.props.state.the_end){
            if(e.which === 13) {
                if(this.state.answered){
                    const score = this.props.state.score;
                    score.right++;
                    this.setState({ answered: false });
                    e.target.value = '';
                    setTimeout((e) => {
                        this.props.randomSelection(score);
                    }, 20);
                } else if(e.target.value.length === 0){
                    if(this.state.skipWarn === false){
                        this.setState({ skipWarn: true });
                    } else {
                        this.handleSkip();
                    }
                }
            }
            if(e.target.value.length > 0){
                this.setState({ skipWarn: false });
            }
            const entered = e.target.value;
            const fullName = e.target.getAttribute('answer');
            const firstName = this.props.state.mode === 'expert' ? fullName : fullName.substr(0, fullName.indexOf(" "));
            const match = new RegExp(`^${firstName}$`, 'i');
            const guess = e.target.value;
            const guessMatch = new RegExp(`^${firstName}$`.substr(0, guess.length + 1), 'i');
            if(this.props.state.mode === 'beginner'){
                if(guessMatch.test(guess)){
                    this.setState({ colder: false, warmer: true });
                } else {
                    this.setState({ colder: true, warmer: false });
                }
            }
            if (match.test(entered) 
                //Easter eggs follow; answer is correct under any of the below matches AND when 
                || (((fullName === 'John Schuncke' && (entered.match(/^JohnD/i) || entered.match(/^Phil Collins/i)))
                    || (fullName === 'Jamie Bell' && entered.match(/^2 ?lunch/i))
                    || (fullName === 'Will Mohon' && entered.match(/^Jeff/i))
                    || (fullName === 'Trevan Hetzel' && (entered.match(/^Bulldog/i) || entered.match(/^(The )?Abominable Snowman/i)))
                    || (fullName === 'Dan White' && entered.match(/^Papa Blanco/i))
                    || (fullName === 'Luke Pettipoole' && entered.match(/^Dadpoole/i))
                    || (fullName === 'Kaitlin Grohmann' && entered.match(/^Rage ?Kage/i))
                    || (fullName === 'Donovan Roehr' && entered.match(/^Donny/i))
                    || (fullName === 'Kimberly Bailey' && entered.match(/^Kimbo( Slice)?/i))
                    || (fullName === 'Daniel Fitch' && entered.match(/^(Dad Fish|Dan)/i))
                    || (fullName === 'Eric Swanson' && entered.match(/^DJ ?Sweetlife/i))
                    || (fullName === 'Genevieve Bachinski' && entered.match(/^Genny Cash/i))
                    || (fullName === 'Kristin Wittkamp' && entered.match(/^(Stevie Kicks|Krintin)/i))
                    || (fullName === 'Joey Teng' && entered.match(/^Croix ?boi/i))
                    || (fullName === 'Juan Aguero' && entered.match(/^Obi Juan/i))
                    || (fullName === 'Win Tong' && entered.match(/^Nguyen/i))
                    || (fullName === 'Aaron Jasso' && entered.match(/^AJ/i))
                    || (fullName === 'Eric Broulette' && entered.match(/^Brew/i))
                    || (fullName === 'Christopher Leah' && entered.match(/^Chris/i))
                    || (fullName === 'T-Rave Geary' && (entered === 'T-Rave' || entered.match(/^T-?Rave/i))))
                && this.props.state.mode !== 'expert')
            ){
                e.target.classList.add('winner');
                this.setState({answered: true });
            } else if( e.target.classList.contains('winner')){
                e.target.classList.remove('winner');
            }
        }
    }
    renderAnswer = () => {
        document.querySelector('#next-button').focus();
        return (
            <p className="answer-reveal" role={this.props.role}>
                <strong>
                        {[...this.props.name].map((letter, index) => {
                            return <span className="hooray" key={index} style={{ animationDelay: (index * 0.02) + 's' }}>{letter === ' ' ? '\u00a0' : letter}</span>
                        })}
                    &nbsp;<span className="hooray" style={{ animationDelay: ([...this.props.name].length + 7) * 0.025 + 's', animationDuration: '.6s'}} role="img" alt="" aria-label="Party confetti">🎉</span>
                </strong>
            </p>
        )
    }
    renderSkip = () => {
        document.querySelector('#next-button').focus();
        return (
            <p className="answer-reveal" role={this.props.role}>
                <strong>
                    <span className="fadeInUp">
                        &nbsp;{this.props.name}&nbsp;
                    </span>
                    <span className="sad"  role="img" alt="" aria-label="Red 'X'">❌</span> 
                </strong>
            </p>
        )
    }
    render(){
        return(
            <React.Fragment>
            <div className="answer-container">
                    {(!this.state.skipped && !this.state.answered) ? <input type="text" className={`answer-input ${this.state.warmer ? 'warmer' : ''} ${this.state.colder ? 'colder' : ''}` } answer={this.props.name} onKeyUp={this.checkAnswer} autoFocus placeholder={this.state.skipWarn === true ? "Skip...? (Hit enter)" : "Who's this?"} /> : ''}
                <div id="answer-reveal-container" >
                        {(this.state.answered && !this.state.skipped) && this.renderAnswer()}
                        {(!this.state.answered && this.state.skipped) && this.renderSkip()}
                    <p id="role"><small>{this.state.answered || this.props.state.show_role ? this.props.role + ' – ' + this.props.department : ''}</small></p>
                </div>
            </div>
            {this.props.state.the_end === false ? <NextButton state={this.props.state} randomSelection={this.props.randomSelection} answered={this.state.answered} score={this.props.state.score} skipped={this.state.skipped} handleSkip={this.handleSkip}/> : '' }
            </React.Fragment>

        )
    }
}

export default AnswerBox;
