import React from 'react';
import './Options.css';

class Options extends React.Component {
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
        if (!this.props.ready) {
            this.handleReady(true);
         } else {
            this.handleReady(false);
            this.props.newGame();
         }
    }
    handleGameModeChange = (e) => {
        this.props.handleGameModeChange(e);
    }
    handleColorize = () => {
        this.props.handleColorize();
    }
    handleNewHires = () => {
        this.props.handleNewHires();
    }
    handleReady = (ready) => {
        this.props.getReady(ready);
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
                                <label htmlFor="fly15">{this.props.state.game_mode === 'fly15' ? <span role="img" alt="" aria-label="Dice">🎲</span> : uncheckedRadio()}<strong>The Flywheel 15 </strong></label>
                                {this.props.state.game_mode === 'fly15' ? <p className="added-info"><small>Quick game with 15 completely random faces</small></p> : ''}
                            </div>
                            <div className="option-group">
                                <input type="radio" name="game-mode" id="marathon" value="marathon" onChange={this.props.handleGameModeChange} checked={this.props.state.game_mode === 'marathon'}/>
                                <label htmlFor="marathon" >{this.props.state.game_mode === 'marathon' ? <span role="img" alt="" aria-label="Runner">🏃🏽‍♀️</span> : uncheckedRadio()}<strong>Marathon </strong></label>
                                {this.props.state.game_mode === 'marathon' ? <p className="added-info"><small>Every. Single. Flywheeler. <span role="img" aria-label="screaming face">😱</span></small></p> : ''}
                            </div>
                            <div className="option-group">
                                <input type="radio" name="game-mode" id="newbies" value="newbies" onChange={this.props.handleGameModeChange} checked={this.props.state.game_mode === 'newbies'} />
                                <label htmlFor="newbies" >{this.props.state.game_mode === 'newbies' ? <span role="img" alt="" aria-label="Hatching chick">🐣</span> : uncheckedRadio()}<strong>Newbies </strong></label>
                                {this.props.state.game_mode === 'newbies' ?
                                    <div>
                                        <p className="added-info">
                                            <small>20 of our <span className="highlight">{this.props.state.new_hire_count}</span>*newest* employees</small>
                                        </p>
                                        <div className="added-info">
                                            <label htmlFor="new-hire-count"><small>How new?</small></label>
                                            <input type="range" id="new-hire-count" onChange={this.props.handleNewHireCountChange} value={this.props.state.new_hire_count} min="20" max="50" />
                                        </div>
                                    </div>
                                : ''}
                            </div>
                            <div className="option-group">
                                <input type="radio" name="game-mode" id="ogs" value="ogs" onChange={this.props.handleGameModeChange} checked={this.props.state.game_mode === 'ogs'} />
                                <label htmlFor="ogs" >{this.props.state.game_mode === 'ogs' ? <span role="img" alt="" aria-label="Old man">👴🏻</span> : uncheckedRadio()}<strong>O.G.s </strong></label>
                                {this.props.state.game_mode === 'ogs' ? <p className="added-info"><small>20 of the 50 Flywheelers with the most bottlecaps</small></p> : ''}
                            </div>
                            <div className="option-group">
                                <input type="radio" name="game-mode" id="team" value="team" onChange={this.props.handleGameModeChange} checked={this.props.state.game_mode === 'team'} />
                                <label htmlFor="team" >{this.props.state.game_mode === 'team' ? <span role="img" alt="" aria-label="Target">🎯</span> : uncheckedRadio()}<strong>Team </strong></label>
                                {this.props.state.game_mode === 'team' ? <p className="added-info"><small>Run through every member of a single team</small></p> : ''}
                            </div>

                            {this.props.state.game_mode === 'team' ?
                                <div id="filter-group" className="option-group">
                                    {/* <label htmlFor="team-filter"><small>Choose your team:</small></label> */}
                                    <select id="team-filter" onChange={this.handleFilterChange} required>
                                        <option value="">Choose…</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Services">Services</option>
                                        <option value="Australia Support">Australia Support</option>
                                        <option value="People">People</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Hosting Ops">Hosting Ops</option>
                                        <option value="Customer Success">Customer Success</option>
                                        <option value="North America Support">North America Support</option>
                                        <option value="Europe Support">Europe Support</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Product">Product</option>
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
                                    {this.props.state.mode === 'beginner' ? <p className="added-info"><small>(Requires first names only. Provides hints as you type; sometimes allows nicknames)</small></p> : ''}
                                </div>
                                <div>
                                    <input type="radio" name="mode" id="normal" value="normal" onChange={this.handleModeChange} checked={this.props.state.mode === 'normal'} />
                                    <label htmlFor="normal">{this.props.state.mode === 'normal' ? <span role="img" alt="" aria-label="Slightly smiling face">🙂</span> : uncheckedRadio()}<strong>Normal</strong></label>
                                    {this.props.state.mode === 'normal' ? <p className="added-info"><small>(Requires first names only. No hints; nicknames sometimes allowed)</small></p> : ''}
                                </div>
                                <div>
                                    <input type="radio" name="mode" id="expert" value="expert" onChange={this.handleModeChange} checked={this.props.state.mode === 'expert'} />
                                    <label htmlFor="expert">{this.props.state.mode === 'expert' ? <span role="img" alt="" aria-label="Screaming face">😱</span> : uncheckedRadio()}<strong>Expert</strong></label>
                                    {this.props.state.mode === 'expert' ? <p className="added-info"><small>(Full name required. No hints; no nicknames)</small></p> : ''}
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
                                <label htmlFor="show-role" >{this.props.state.show_role === true ? checkedBox() : uncheckedBox()}Always show role and team&ensp;<small>(If available)</small></label>
                            </div>

                            <div id="colorize-group" className="option-group">
                                <input type="checkbox" id="colorize" onChange={this.handleColorize} checked={this.props.state.colorize} />
                                <label htmlFor="colorize" >{this.props.state.colorize === true ? checkedBox() : uncheckedBox()}Randomize colors&ensp;<small>(Disable to always keep the background Flywheel blue)</small></label>
                            </div>

                            <div id="avoid-repeats-group" className="option-group">
                                <input type="checkbox" id="avoid-repeats" onChange={this.handleRepeatsChange} checked={this.props.state.avoid_repeats}/>
                                <label htmlFor="avoid-repeats" >{this.props.state.avoid_repeats === true ? checkedBox() : uncheckedBox()}Avoid repeats&ensp;<small>(Don't show the same face more than once per game. Disable to embrace chaos)</small></label>
                            </div>


                        </div>

                    </section>

                    <hr />

                    <div id="reset-group" className="option-group">
                        {this.props.ready ? <p role="alert">Ready?</p> : ''}
                        <button id="reset" onClick={this.handleNewGame}>
                            {this.props.ready ? 'Yes, ' : null}Let's Go!

                        </button>
                    </div>

                </div>
            </aside>
        );
    }
}

export default Options;
