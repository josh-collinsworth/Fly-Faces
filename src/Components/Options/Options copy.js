import React from 'react';
import './Options.css';

class Options extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            reset_confirm: false
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
    }
    handleRepeatsChange = (e) => {
        this.props.handleRepeatsChange(e);
    }
    handleNarrowChange = (e) => {
        this.props.handleNarrowChange(e);
    }
    handleNarrowNumberChange = (e) => {
        this.props.handleNarrowNumberChange(e);
    }
    handleReset = () => {
        if (!this.state.reset_confirm) {
            this.setState({ reset_confirm: true });
         } else {
            this.setState({ reset_confirm: false });
            this.props.resetScore();
         }
    }
    handleLengthChange = (e) => {
        this.props.handleLengthChange(e);
    }
    render() {
        return (
            <aside id="options">
                <div className="options-container">
                
                <hr />

                    <h2>Difficulty:</h2>


                    <div id="mode-group" className="option-group">
                        <div>
                            <input type="radio" name="mode" id="beginner" value="beginner" onChange={this.handleModeChange} checked={this.props.state.mode === 'beginner'}/>
                            <label htmlFor="beginner">{this.props.state.mode === 'beginner' ? '😄 ' : '⚪️ '}<strong>BEGINNER <small>(Hints as you type)</small></strong></label> 
                        </div>
                        <div>
                            <input type="radio" name="mode" id="normal" value="normal" onChange={this.handleModeChange} checked={this.props.state.mode === 'normal'}/>
                                <label htmlFor="normal">{this.props.state.mode === 'normal' ? '🙂 ' : '⚪️ '}<strong>NORMAL <small>(No hints, first names only)</small></strong></label> 
                        </div>
                        <div>
                            <input type="radio" name="mode" id="expert" value="expert" onChange={this.handleModeChange} checked={this.props.state.mode === 'expert'}/>
                                <label htmlFor="expert">{this.props.state.mode === 'expert' ? '😱 ' : '⚪️ '}<strong>EXPERT <small>(No hints, first and last names)</small></strong></label> 
                        </div>
                    </div>  

                    <hr />

                    <div id="filter-group" className="option-group">
                        <label htmlFor="team-filter">Filter by team:</label>
                        <select id="team-filter" onChange={this.handleFilterChange}>
                            <option value="none">None (random)</option>
                            <option value="customer_experience">Customer Success</option>
                            {/* <option value="engineering">Engineering</option> */}
                            <option value="marketing">Marketing</option>
                            <option value="operations">Operations</option>
                            <option value="people">People</option>
                            <option value="product">Product</option>
                            <option value="sales">Sales</option>
                            <option value="support">Support</option>
                        </select>
                    </div>  

                    <hr />

                    <h2>Game length: {this.props.state.final_countdown + this.props.state.score.right + this.props.state.score.wrong} <small>({this.props.state.final_countdown} to go.)</small></h2>

                    <div id="game-length-group" className="option-group">
                        <input id="game-length" type="range" min={this.props.state.score.right + this.props.state.score.wrong + 1} max={this.props.state.fly_faces.length} onChange={this.handleLengthChange}/>
                        <label htmlFor="game-length"></label>
                    </div>  

                    <hr />


                    <h2>Other options:</h2>


                    <div id="show-role-group" className="option-group">
                        <input type="checkbox" id="show-role" onChange={this.handleRoleChange} checked={this.props.state.show_role}/>
                        <label htmlFor="show-role" >{this.props.state.show_role === true ? '✅ ' : '⬜️ '}Always show role and team</label>
                    </div>      

                    <div id="avoid-repeats-group" className="option-group">
                        <input type="checkbox" id="avoid-repeats" onChange={this.handleRepeatsChange} checked={this.props.state.avoid_repeats}/>
                        <label htmlFor="avoid-repeats" >{this.props.state.avoid_repeats === true ? '✅ ' : '⬜️ '}Avoid repeats <small>({this.props.state.filter === 'none' ? 'Show at least 20 faces before repeating' : 'Show whole team before repeating'})</small></label>
                    </div>

                    <div id="narrow-group" className="option-group">
                        <input type="checkbox" id="narrow" onChange={this.handleNarrowChange} checked={this.props.state.narrow}/>
                        <label htmlFor="narrow" >{this.props.state.narrow === true ? '✅ ' : '⬜️ '}Only show most recent hires</label>
                        {this.props.state.narrow === true ? <div id="narrow-number-group" className="option-group"><label htmlFor="narrow-number">Show most recent: </label><input type="number" id="narrow-number" step="1" min="10" max="100" onChange={this.handleNarrowNumberChange} value={this.props.state.narrow_count}/></div> : null }
                    </div>

                    <hr />  

                    <div id="reset-group" className="option-group">
                        {this.state.reset_confirm ? <p role="alert">Reset your score start a new game?</p> : ''}
                        <button id="reset" onClick={this.handleReset}>
                            {this.state.reset_confirm ? 'Yes, ' : null}New game with options
                        
                        </button>
                    </div>

                </div>
            </aside>
        );
    }
}

export default Options;