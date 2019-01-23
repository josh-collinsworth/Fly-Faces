import React from 'react';
import './Loader.css';

const Loader = ({state}) => (
    
    <div id="loader" className={state.loading ? 'visible' : ''} style={{ backgroundColor: state.colorize ? state.current_color : '#50c6db'}}>
        <div className="outer-loader">
            <div className="inner-loader">
                <div className="loader-dot" style={{ backgroundColor: state.colorize ? state.current_color : '#50c6db' }}>
                </div>
            </div>
        </div>
    </div>
);

export default Loader;