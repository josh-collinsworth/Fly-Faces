import React from 'react';
import './Face.css';
import AnswerBox from '../AnswerBox/AnswerBox';

class Face extends React.Component {
    removeLoader = () => {
        this.props.loadFinish();
    }
    imageLoaded = () => {
        this.removeLoader();
    }
    imageError = () => {
        this.props.imageError();
    }
    render() {
        return (
            <div className="face">
                <img src={`https://getflywheel.namely.com${this.props.image}`} alt="" onLoad={this.imageLoaded} onError={this.imageError}/>
                <AnswerBox name={this.props.name} role={this.props.role} department={this.props.department} state={this.props.state} randomSelection={this.props.randomSelection} />
            </div>
        );
    }
}

export default Face;
