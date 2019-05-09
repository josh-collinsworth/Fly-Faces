import React from 'react';
import './Loader.css';

const Loader = ({state, appDomain, appProtocol}) => (
    
    <div id="loader" className={state.loading ? 'visible' : ''}>
        <div className="outer-loader">
            <div className="inner-loader">
                <div className="loader-dot">
                </div>
            </div>
        </div>
        <br />
        <p>{appProtocol}://{appDomain}</p>
        {!state.game_start ? <p className="loadingMessage">{state.loadingMessage}</p> : ''}
    </div>
);

export default Loader;