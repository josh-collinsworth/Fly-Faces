import React from 'react';
import './AnswerBox.css';
import NextButton from '../NextButton/NextButton';

class AnswerBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answered: false,
            skipped: false
        }
    }
    handleDepartment = () => {
        let department = this.props.department.charAt(0).toUpperCase() + this.props.department.slice(1);
        if (department === 'Customer_experience') {
            department = 'C.S.' 
        }
        if (department === 'Engineering') {
            department = 'Product'
        }
        return department;
    }
    handleSkip = (e) => {
        this.setState({ skipped: true });
        //setTimeout(()=>{
            //console.log(this.state);
        //})
    }
    checkAnswer = (e) => {
        if(e.which === 13 && this.state.answered){
            const score = this.props.state.score;
            score.right++;
            this.setState({ answered: false });
            e.target.value = '';
            setTimeout((e) => {
                this.props.randomSelection(score);
            }, 20);
        }
        const entered = e.target.value;
        const answerInput = document.querySelector('.answer-input')
        const fullName = e.target.getAttribute('answer');
        const firstName = this.props.state.mode === 'expert' ? fullName : fullName.substr(0, fullName.indexOf(" "));
        const match = new RegExp(`^${firstName}$`, 'i');
        if(this.props.state.mode === 'beginner'){
            const guess = e.target.value;
            const guessMatch = new RegExp(`^${firstName}$`.substr(0, guess.length), 'i');
            if(guessMatch.test(guess)){
                answerInput.classList.remove('colder');
                answerInput.classList.add('warmer');   
            } else {
                answerInput.classList.remove('warmer');   
                answerInput.classList.add('colder');
            }
        }
        if (match.test(entered) 
            //Easter eggs follow; answer is correct under any of the below matches AND when 
            || (((fullName === 'John Schuncke' && (entered.match(/^JohnD/i) || entered.match(/^Phil Collins/i)))
                || (fullName === 'Jamie Bell' && entered.match(/^2 ?lunch/i))
                || (fullName === 'Will Mohon' && entered.match(/^Jeff/i))
                || (fullName === 'Elizabeth McGill' && entered.match(/^Betty/i))
                || (fullName === 'Trevan Hetzel' && (entered.match(/^Bulldog/i) || entered.match(/^(The )?Abominable Snowman/i)))
                || (fullName === 'Dan White' && entered.match(/^Papa Blanco/i))
                || (fullName === 'Luke Pettipoole' && entered.match(/^Dadpoole/i))
                || (fullName === 'Kaitlin Grohmann' && entered.match(/^Rage ?Kage/i))
                || (fullName === 'Donovan Roehr' && entered.match(/^Donny/i))
                || (fullName === 'Kimberly Bailey' && entered.match(/^Kimbo( Slice)?/i))
                || (fullName === 'Dan Fitch' && entered.match(/^Dad Fish/i))
                || (fullName === 'Eric Swanson' && entered.match(/^DJ ?Sweetlife/i))
                || (fullName === 'Aaron Hackworth' && entered.match(/^A-A-Ron/i))
                || (fullName === 'Jeremy Paavola' && entered.match(/^Jezza/i))
                || (fullName === 'Genevieve Bachinski' && entered.match(/^Genny Cash/i))
                || (fullName === 'Kristin Wittkamp' && entered.match(/^Stevie Kicks/i))
                || (fullName === 'Elise Fertwagner' && entered.match(/^Josh Collinsworth/i))
                || (fullName === 'Aaron Maan' && entered.match(/^Coke ?milk/i))
                || (fullName === 'Joey Teng' && entered.match(/^Croix ?boi/i))
                || (fullName === 'Juan Aguero' && entered.match(/^Obi Juan/i))
                || (fullName === 'Beth Haubert' && entered === '🐈💨')
                || (fullName === 'T-Rave' && entered === 'T-Rave'))
            && this.props.state.mode !== 'expert')

        ){
            e.target.classList.add('winner');
            this.setState({answered: true });
            const revealedAnswer = document.querySelector('.answer-reveal');
            revealedAnswer.classList.add('hooray');
        } else if( e.target.classList.contains('winner')){
            e.target.classList.remove('winner');
        }
    }
    render(){
        return(
            <React.Fragment>
            <div className="answer-container">
                {!this.state.skipped ? <input className="answer-input" type="text" answer={this.props.name} onKeyUp={this.checkAnswer} autoFocus placeholder="Who's this?" /> : ''}
                <div id="answer-reveal-container" style={{marginTop: this.state.skipped ? '2.8rem' : ''}}>
                    <p><small>{this.state.answered || this.props.state.show_role ? this.props.role + ' – ' + this.handleDepartment() : ''}</small></p>
                    <p className="answer-reveal" role={this.props.role}> 
                        <strong>
                            {this.state.answered && !this.state.skipped ? <span><span role="img" alt="" aria-label="Green checkbox">✅</span> {this.props.name} <span role="img" alt="" aria-label="Party confetti">🎉</span></span> : ''}
                            {!this.state.answered && this.state.skipped ? <span><span role="img" alt="" aria-label="Red 'X'">❌</span> {this.props.name}</span> : ''}
                        </strong>
                    </p>
                </div>
            </div>
            <NextButton state={this.props.state} randomSelection={this.props.randomSelection} answered={this.state.answered} score={this.props.state.score} skipped={this.state.skipped} handleSkip={this.handleSkip}/>
            </React.Fragment>

        )
    }
}

export default AnswerBox;