import React from 'react';
import './Loader.css';

const Loader = ({state}) => (
    
    <div id="loader" className={state.loading ? 'visible' : ''}>
        <div className="outer-loader">
            <div className="inner-loader">
                <div className="loader-dot">
                </div>
            </div>
        </div>
        <br />
        <p className="loadingMessage">{state.loadingMessage}</p>
    </div>
);

export default Loader;
