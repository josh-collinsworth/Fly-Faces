import React from 'react';
import './Face.css';
import AnswerBox from '../AnswerBox/AnswerBox';

class Face extends React.Component {
    removeLoader = () => {
        setTimeout(()=>{
            const loader = document.querySelector('#loader');
            loader.classList.remove('visible');
        }, 120);
    }
    render() {
        return (
            <div className="face">
                <img src={this.props.image} alt="" onLoad={this.removeLoader}/>
                <AnswerBox name={this.props.name} role={this.props.role} department={this.props.department} state={this.props.state} randomSelection={this.props.randomSelection} />
            </div>
        );
    }
}

export default Face;