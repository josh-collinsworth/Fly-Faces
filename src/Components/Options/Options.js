import React from 'react';
import './Options.css';

class Options extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ready: false
        }
    }
    handleModeChange = (e) => {
        this.props.handleModeChange(e);
    }
    handleRoleChange = (e) => {
        this.props.handleRoleChange(e);
    }
    handleFilterChange = (e) => {
        this.props.handleFilterChange(e);
        const none = document.querySelector('#team-filter > option:first-of-type');
        none.disabled = true;
    }
    handleRepeatsChange = (e) => {
        this.props.handleRepeatsChange(e);
    }
    handleNewGame = () => {
        if (!this.state.ready) {
            this.setState({ ready: true });
         } else {
            this.setState({ ready: false });
            this.props.newGame();
         }
    }
    handleGameModeChange = (e) => {
        this.props.handleGameModeChange(e);
    }
    handleColorize = () => {
        this.props.handleColorize();
    }
    render() {
        const uncheckedRadio = () => {
            return(
                <span role="img" alt="" aria-label="deselected button">⚪️</span>
            )
        }
        const uncheckedBox = () => {
            return (
                <span role="img" alt="" aria-label="deselected button">⬜️</span>
            )
        }
        const checkedBox = () => {
            return (
                <span role="img" alt="" aria-label="Checked checkbox">✅</span>
            )
        }
        return (
            <aside id="options" className={this.props.state.game_start ? 'started' : ''}>
                <div className="options-container">
                                    
                    <section id="game-mode-section">

                        <h2>Game mode:</h2>

                        <div className="options-wrapper">

                            <div className="option-group">
                                <input type="radio" name="game-mode" id="fly15" value="fly15" onChange={this.props.handleGameModeChange} checked={this.props.state.game_mode === 'fly15'}/>
                                <label htmlFor="fly15">{this.props.state.game_mode === 'fly15' ? <span role="img" alg="" aria-label="Dice">🎲</span> : uncheckedRadio()}<strong>The Flywheel 15 </strong></label>
                                {this.props.state.game_mode === 'fly15' ? <p className="added-info"><small>Quick game with 15 random faces</small></p> : ''}
                            </div>
                            <div className="option-group">
                                <input type="radio" name="game-mode" id="marathon" value="marathon" onChange={this.props.handleGameModeChange} checked={this.props.state.game_mode === 'marathon'}/>
                                <label htmlFor="marathon" >{this.props.state.game_mode === 'marathon' ? <span role="img" alg="" aria-label="Runner">🏃🏽‍♀️</span> : uncheckedRadio()}<strong>Marathon </strong></label>
                                {this.props.state.game_mode === 'marathon' ? <p className="added-info"><small>Every. Single. Flywheeler</small></p> : ''}
                            </div>
                            <div className="option-group">
                                <input type="radio" name="game-mode" id="newbies" value="newbies" onChange={this.props.handleGameModeChange} checked={this.props.state.game_mode === 'newbies'} />
                                <label htmlFor="newbies" >{this.props.state.game_mode === 'newbies' ? <span role="img" alg="" aria-label="Hatching chick">🐣</span> : uncheckedRadio()}<strong>Newbies </strong></label>
                                {this.props.state.game_mode === 'newbies' ? <p className="added-info"><small>20 of our 50 *newest* employees</small></p> : ''}
                            </div>
                            <div className="option-group">
                                <input type="radio" name="game-mode" id="ogs" value="ogs" onChange={this.props.handleGameModeChange} checked={this.props.state.game_mode === 'ogs'} />
                                <label htmlFor="ogs" >{this.props.state.game_mode === 'ogs' ? <span role="img" alg="" aria-label="Old man">👴🏻</span> : uncheckedRadio()}<strong>O.G.s </strong></label>
                                {this.props.state.game_mode === 'ogs' ? <p className="added-info"><small>20 of our 50 *oldest* employees (by hire date; not age. Don't worry, Dan White.)</small></p> : ''}
                            </div>
                            <div className="option-group">
                                <input type="radio" name="game-mode" id="team" value="team" onChange={this.props.handleGameModeChange} checked={this.props.state.game_mode === 'team'} />
                                <label htmlFor="team" >{this.props.state.game_mode === 'team' ? <span role="img" alg="" aria-label="Target">🎯</span> : uncheckedRadio()}<strong>Team </strong></label>
                                {this.props.state.game_mode === 'team' ? <p className="added-info"><small>Run through a single team</small></p> : ''}
                            </div>

                            {this.props.state.game_mode === 'team' ? 
                                <div id="filter-group" className="option-group">
                                    {/* <label htmlFor="team-filter"><small>Choose your team:</small></label> */}
                                    <select id="team-filter" onChange={this.handleFilterChange} required>
                                        <option value="none">Pick a team…</option>
                                        <option value="customer_experience">Customer Success</option>
                                        {/* <option value="engineering">Engineering</option> */}
                                        <option value="marketing">Marketing</option>
                                        <option value="operations">Operations</option>
                                        <option value="people">People</option>
                                        <option value="product">Product</option>
                                        <option value="sales">Sales</option>
                                        <option value="support">Support</option>
                                    </select>
                                    {this.props.state.filter ? <small>Team size/game length: {this.props.state.final_countdown}</small> : ''}
                                </div>  

                            : '' }
                            
                        </div>

                    </section>

                    <hr />

                    <section>

                        <h2>Difficulty:</h2>

                        <div className="options-wrapper">
                            <div id="mode-group" className="option-group">
                                <div>
                                    <input type="radio" name="mode" id="beginner" value="beginner" onChange={this.handleModeChange} checked={this.props.state.mode === 'beginner'} />
                                    <label htmlFor="beginner">{this.props.state.mode === 'beginner' ? <span role="img" alt="" aria-label="Happy face">😄</span> : uncheckedRadio() }<strong>Beginner</strong></label>
                                    {this.props.state.mode === 'beginner' ? <p className="added-info"><small>(Hints as you type, nicknames sometimes allowed)</small></p> : ''}
                                </div>
                                <div>
                                    <input type="radio" name="mode" id="normal" value="normal" onChange={this.handleModeChange} checked={this.props.state.mode === 'normal'} />
                                    <label htmlFor="normal">{this.props.state.mode === 'normal' ? <span role="img" alt="" aria-label="Slightly smiling face">🙂</span> : uncheckedRadio()}<strong>Normal</strong></label>
                                    {this.props.state.mode === 'normal' ? <p className="added-info"><small>(No hints, first names only, nicknames sometimes allowed)</small></p> : ''}
                                </div>
                                <div>
                                    <input type="radio" name="mode" id="expert" value="expert" onChange={this.handleModeChange} checked={this.props.state.mode === 'expert'} />
                                    <label htmlFor="expert">{this.props.state.mode === 'expert' ? <span role="img" alt="" aria-label="Screaming face">😱</span> : uncheckedRadio()}<strong>Expert</strong></label>
                                    {this.props.state.mode === 'expert' ? <p className="added-info"><small>(No hints, first and last names, no nicknames)</small></p> : ''}
                                </div>
                            </div>
                        </div>

                    </section>

                    <hr />

                    <section>

                        <h2>Other options:</h2>

                        <div className="options-wrapper">

                            <div id="show-role-group" className="option-group">
                                <input type="checkbox" id="show-role" onChange={this.handleRoleChange} checked={this.props.state.show_role}/>
                                <label htmlFor="show-role" >{this.props.state.show_role === true ? checkedBox() : uncheckedBox()}Always show role and team&ensp;<small></small></label>
                            </div>      

                            <div id="avoid-repeats-group" className="option-group">
                                <input type="checkbox" id="avoid-repeats" onChange={this.handleRepeatsChange} checked={this.props.state.avoid_repeats}/>
                                <label htmlFor="avoid-repeats" >{this.props.state.avoid_repeats === true ? checkedBox() : uncheckedBox()}Avoid repeats&ensp;<small>(Disable to embrace chaos)</small></label>
                            </div>

                            <div id="colorize-group" className="option-group">
                                <input type="checkbox" id="colorize" onChange={this.handleColorize} checked={this.props.state.colorize} />
                                <label htmlFor="colorize" >{this.props.state.colorize === true ? checkedBox() : uncheckedBox()}Randomize colors&ensp;<small>(More fun; less legible)</small></label>
                            </div>

                        </div>

                    </section>

                    <hr />  

                    <div id="reset-group" className="option-group">
                        {this.state.ready ? <p role="alert">Ready?</p> : ''}
                        <button id="reset" onClick={this.handleNewGame}>
                            {this.state.ready ? 'Yes, ' : null}Let's Go!
                        
                        </button>
                    </div>

                </div>
            </aside>
        );
    }
}

export default Options;