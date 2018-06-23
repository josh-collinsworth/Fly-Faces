import React from 'react';
import './Loader.css';

const Loader = () => (
    
    <div id="loader" className="visible">
        <div className="outer-loader">
            <div className="inner-loader">
                <div className="loader-dot">
                </div>
            </div>
        </div>
    </div>
);

export default Loader;