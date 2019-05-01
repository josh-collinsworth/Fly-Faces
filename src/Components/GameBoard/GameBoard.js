import React from 'react';
import './GameBoard.css';
import Face from '../Face/Face';
import Options from '../Options/Options';
import Header from '../Header/Header';
import Endgame from '../Endgame/Endgame';
import Loader from '../Loader/Loader';


class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game_start: false,

            loading: true,

            colorize: false,
            colors: ['#50c6db', '#51bb7b', '#f0ce15', '#f47820', '#ef4e65', '#e0368c', '#8350a0'],
            current_color: '#50c6db',

            answer: '',

            fly_faces: [],
            random_face: {name: 'b', img: 'p', role: 'm', department: 't'},
            recent_faces: [],
            last_face: {},
            new_hires: false,

            mode: 'normal',
            show_role: true,

            avoid_repeats: true,
            repeat_limit: 20,
            
            filter: false,
            narrow: false,
            narrow_count: 20,
            score: {
                right: 0,
                wrong: 0,
            },
            game_mode: 'fly15',
            final_countdown: 15,
            the_end: false
        }
        window.onbeforeunload = (e) => {
            if(!this.state.the_end){
                return "This game is over if you leave the page. You sure?";
            }
        };
    }
    handleModeChange = (e) => {
        this.setState({ mode: e.target.value });
    }
    handleRoleChange = (e) => {
        this.state.show_role === true ? this.setState({show_role: false}) : this.setState({show_role: true});
    }
    handleFilterChange = (e) => {
        this.setState({ filter: e.target.value });
        this.setRepeatCount();
    }
    handleRepeatsChange = (e) => {
        this.state.avoid_repeats === true ? this.setState({avoid_repeats: false}) : this.setState({avoid_repeats: true});
        this.setRepeatCount();
    }
    loadStart = () => {
        this.setState({ loading: true });
    }
    loadFinish = () => {
        this.setState({ loading: false });
    }
    setRepeatCount = (e) => {
        setTimeout(()=>{
            if(this.state.filter){
                const groupCount = this.state.fly_faces.filter(face => face.department === this.state.filter);
                this.setState({ repeat_limit: groupCount.length });
                this.setState({ final_countdown: (groupCount.length) });
            } else {
                this.setState({ repeat_limit: this.state.fly_faces.length });
                if (this.state.avoid_repeats) {
                    this.setState({ final_countdown: this.state.fly_faces.length });
                }
            }
        },20)
    }
    newGame = () => {
        this.setState({
            score: {
                right: 0,
                wrong: 0,
            },
            game_start: true
        });
        this.randomSelection({ right: 0, wrong: 0 });
        this.setState({ final_countdown: this.state.final_countdown });
    }

    handleGameModeChange = (e) => {
        this.setState({ game_mode: e.target.value });
        if(e.target.value !== 'team'){
            this.setState({ filter: false });
        }
        switch(e.target.value){
            case 'fly15':
                this.setState({ final_countdown: 15, repeat_limit: 15 });
                break;
            case 'marathon':
                this.setState({ final_countdown: this.state.fly_faces.length });
                this.setState({ repeat_limit: this.state.fly_faces.length });
                break;
            case 'newbies':
                this.setState({ final_countdown: 20, repeat_limit: 20 });
                break;
            case 'ogs':
                this.setState({ final_countdown: 20, repeat_limit: 20 });
                break;
            default:
                this.setState({ final_countdown: 15, repeat_limit: 15 });
        }
    } 
    handleColorize = () => {
        this.setState({ colorize: this.state.colorize ? false : true });
    }

    theEnd = () => {
        this.setState({ the_end: true });
    }
    pickAFace = () => {
        if(this.state.final_countdown <= 0){
            this.theEnd();
            return;
        }
        let length = this.state.fly_faces.length - 1;
        let randomFace = {};
        const x = Math.floor(Math.random() * (length + 1));
        if (
            //Either there is no filter, or there is and the picked face matches the filter
            ((!this.state.filter || (this.state.fly_faces[x].department === this.state.filter)) 
            && 
            //Either we're avoiding repeats, or we're not but it's ok because we haven't seen this face yet
            (this.state.avoid_repeats === false || !this.state.recent_faces.includes(x)))
            &&
            //Either we're not narrowing down the search, or we are and this face is in the narrowed-down list
            (this.state.narrow === false || x >= (length - this.state.narrow_count))
            &&
            this.state.fly_faces[x] !== this.state.last_face
            &&
            (this.state.game_mode !== 'ogs' || x <= 50)
            &&
            (this.state.game_mode !== 'newbies' || x >= (this.state.fly_faces.length - 50))
        ) {
            randomFace = this.state.fly_faces[x];
            if(this.state.avoid_repeats){
                let recentArray = this.state.recent_faces;
                recentArray.push(x);
                if(recentArray.length >= this.state.repeat_limit){
                    recentArray.shift();
                }
                this.setState({recent_faces: recentArray});
            }
        } else {
            setTimeout(() => {
                this.pickAFace();
            }, 5);
            return;
        }
        this.setState({ random_face: randomFace });
    }
    randomSelection = (points) => {
        this.setState({score: points, final_countdown: this.state.final_countdown - 1, last_face: this.state.random_face})
        !this.state.loading && this.loadStart();
        setTimeout(()=>{
            if (this.state.colorize){
                const color = Math.floor(Math.random() * this.state.colors.length);
                this.setState({ current_color: this.state.colors[color] });
                const body = document.querySelector('body');
                body.style.backgroundColor = this.state.current_color;
            }
            this.pickAFace();
        }, 120);
    }
    initialize = () => {
        this.loadStart();
        setTimeout(() => {
            const authURL = 'https://getflywheel.namely.com/api/v1/oauth2/authorize?response_type=code&client_id=aLqEQUSDghqvKamgshUfsn5sxtpg9FsUGT3Mv0ZLRGyOSJOOp6F784uR6gTG3ucl&redirect_uri=https%3A%2F%2Ffly-faces.now.sh';
            
            fetch(authURL, {
                mode: "no-cors"
            }).then(response => alert(response));

            // const url = 'https://getflywheel.namely.com/api/v1/profiles.json';
            // fetch(url)
            // .then(response => {
            //     console.log(response);
            //     if(response.ok){
            //         return response.json();
            //     } else {
            //         document.write(response.status + ' ' + response.statusText);
            //     }
            //     return;
            // })
            // .then(jsonresponse => jsonresponse[0].acf.team_member)
            // .then(response => response.map(face => {
            //     return { name: face.team_member_name, img: face.team_member_image.sizes.medium, role: face.team_member_role, department: face.team_member_department };
            // }))
            // .then(finalArray => {
            //     let length = finalArray.length - 1;
            //     const x = Math.floor(Math.random() * (length + 1));
            //     const randomFace = finalArray[x];

            //     this.setState({ random_face: randomFace, fly_faces: finalArray });
            // });
        }, 200);
    }
    componentDidMount() {
        this.initialize();
    }
    render() {
        return (
            <div id="game-board">
                <Loader state={this.state}/>
                <Endgame state={this.state}/>
                <Options handleNewHires={this.handleNewHires} handleColorize={this.handleColorize} handleGameModeChange={this.handleGameModeChange} state={this.state} handleModeChange={this.handleModeChange} handleRoleChange={this.handleRoleChange} handleFilterChange={this.handleFilterChange} handleRepeatsChange={this.handleRepeatsChange} handleNarrowChange={this.handleNarrowChange} handleNarrowNumberChange={this.handleNarrowNumberChange} newGame={this.newGame}/>
                <Header score={this.state.score} countdown={this.state.final_countdown}/>
                <Face name={this.state.random_face.name} image={this.state.random_face.img} role={this.state.random_face.role} department={this.state.random_face.department} key={this.state.random_face.name} state={this.state} next={this.randomSelection}  randomSelection={this.randomSelection} loadStart={this.loadStart} loadFinish={this.loadFinish}/>
            </div>
        );
    }
}

export default GameBoard;