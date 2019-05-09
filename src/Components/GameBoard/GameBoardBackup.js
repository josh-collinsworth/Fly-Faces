import React from 'react';
import './GameBoard.css';
import Face from '../Face/Face';
import Options from '../Options/Options';
import Header from '../Header/Header';
import Endgame from '../Endgame/Endgame';
import Loader from '../Loader/Loader';

//Variables to change for local development
const appDomain = 'localhost:3000';
const appProtocol = 'http';


class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game_start: false,
            ready: false,
            loading: true,
            loadingMessage: 'Reaching out to Namely for authentication...',

            colorize: true,
            colors: ['#50c6db', '#51bb7b', '#f0ce15', '#f47820', '#ef4e65', '#e0368c', '#8350a0'],
            current_color: '#50c6db',

            answer: '',

            fly_faces: [],
            random_face: { name: 'b', img: 'p', role: 'm', department: 't' },
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
            if (!this.state.the_end && this.state.game_start) {
                return "This game is over if you leave the page. You sure?";
            }
        };
    }
    handleModeChange = (e) => {
        this.setState({ mode: e.target.value });
    }
    handleRoleChange = (e) => {
        this.state.show_role === true ? this.setState({ show_role: false }) : this.setState({ show_role: true });
    }
    handleFilterChange = (e) => {
        this.setState({ filter: e.target.value });
        this.setRepeatCount();
    }
    handleRepeatsChange = (e) => {
        this.state.avoid_repeats === true ? this.setState({ avoid_repeats: false }) : this.setState({ avoid_repeats: true });
        this.setRepeatCount();
    }
    loadStart = () => {
        this.setState({ loading: true });
    }
    loadFinish = () => {
        this.setState({ loading: false });
    }
    setRepeatCount = (e) => {
        setTimeout(() => {
            if (this.state.filter) {

                const groupCount = this.state.fly_faces.filter(face => {
                    return face.department === this.state.filter
                });
                this.setState({ repeat_limit: groupCount.length });
                this.setState({ final_countdown: (groupCount.length) });
            } else {
                this.setState({ repeat_limit: this.state.fly_faces.length });
                if (this.state.avoid_repeats) {
                    this.setState({ final_countdown: this.state.fly_faces.length });
                }
            }
        }, 20)
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
        setTimeout(() => {
            this.setState({ final_countdown: this.state.final_countdown + 1 });
        }, 20);
        setTimeout(() => {
            const options = document.querySelector('#options');
            options.style.display = 'none';
        }, 500)
    }

    handleGameModeChange = (e) => {
        this.setState({ game_mode: e.target.value });
        if (e.target.value !== 'team') {
            this.setState({ filter: false });
        }
        switch (e.target.value) {
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
        if (this.state.final_countdown <= 0) {
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
            if (this.state.avoid_repeats) {
                let recentArray = this.state.recent_faces;
                recentArray.push(x);
                if (recentArray.length >= this.state.repeat_limit) {
                    recentArray.shift();
                }
                this.setState({ recent_faces: recentArray });
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
        this.setState({ score: points, final_countdown: this.state.final_countdown - 1, last_face: this.state.random_face })
        const loader = document.querySelector('#loader');
        if (this.state.colorize) {
            const dot = document.querySelector(".loader-dot");
            loader.style.backgroundColor = this.state.current_color;
            dot.style.backgroundColor = this.state.current_color;
        }
        if (!this.state.loading) {
            this.loadStart();
        }
        setTimeout(() => {
            if (this.state.colorize) {
                const color = Math.floor(Math.random() * this.state.colors.length);
                this.setState({ current_color: this.state.colors[color] });
                const body = document.querySelector('body');
                body.style.backgroundColor = this.state.current_color;
            }
            this.pickAFace();
        }, 120);
    }
    initialize = (error = false) => {
        this.loadStart();
        setTimeout(() => {

            //We're gonna need a lot of variables in this auth flow
            let authCode = window.location.href.match(/\?code=([^&]+)/);
            if (authCode) authCode = authCode[1];
            const clientID = `aLqEQUSDghqvKamgshUfsn5sxtpg9FsUGT3Mv0ZLRGyOSJOOp6F784uR6gTG3ucl`;
            const clientSecret = `VZzypbnsg2xKl7cNgVtZ6xJTD45lWU7ysbtmSvaA71PVeU3v446ggz4963PmQbO2`;
            const APIURL = `https://getflywheel.namely.com/api/v1/oauth2/token`;
            const refresh_token = localStorage.getItem('flyfacesrefreshtoken');
            let accessToken;
            let fullAPIResponse = [];

            //This async function does most of our authentication heavy lifting
            let makeTheAPICall = async (token, refresh_token) => {

                //If a refresh token is provided as an argument, we follow this flow instead of re-authenticating for a new token
                //At the end of this, the function will be recursively re-called with a token (first arg)
                if (refresh_token) {
                    let requestBody = `grant_type=refresh_token&client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refresh_token}&redirect_uri=&redirect_uri=${appProtocol}%3A%2F%2F${appDomain}`;

                    fetch(`https://cors-anywhere.herokuapp.com/${APIURL}`, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: 'POST',
                        body: encodeURI(requestBody)
                    })
                        .then(response => response.json())
                        .then(response => {
                            if (response.access_token) {
                                accessToken = response.access_token;
                                localStorage.setItem('flyfacesrefreshtoken', response.refresh_token);
                                makeTheAPICall(accessToken);
                                this.setState({ loadingMessage: `Authentication successful. Getting Fly Faces (this may take a moment...)` });
                            } else {
                                this.initialize(true);
                                return;
                            }
                        })
                    //If there's NOT a refresh token, we just use the original token
                } else {

                    //Create an array for the multiple API URLs we'll need to hit…
                    let urls = [];

                    //…then populate the array with a loop. (Increase `i<5` when the company grows to include 50 more employees per increment.)
                    for (let i = 1; i < 6; i++) {
                        urls.push(`https://cors-anywhere.herokuapp.com/https://getflywheel.namely.com/api/v1/profiles.json?per_page=50&page=${i}&filter[user_status]=active`)
                    }

                    //Get all those URLs.
                    Promise.all(urls.map(url =>
                        fetch(url, {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    return Promise.resolve(response);
                                } else {
                                    return Promise.reject(new Error(response.statusText));
                                }
                            })
                            .then(response => response.json())
                            .catch(error => {
                                this.setState({ loadingMessage: 'Error connecting to Namely. (See console for details; try refreshing.)' })
                            })
                    ))
                        //Put all those separate responses into one big array
                        .then(finish => {
                            this.setState({ loadingMessage: 'Cleaning up...' })
                            finish.forEach(array => {
                                fullAPIResponse = fullAPIResponse.concat(array.profiles);
                            });
                            return (fullAPIResponse);
                        })
                        //Put each profile into the proper format the app is expecting (and strip out all the other info)
                        .then(profiles => profiles.map(face => {
                            if (face && face.image) {
                                const newFace = {}
                                //.trim and .replace help account for rogue spaces in the name
                                newFace.name = face.full_name.trim().replace(/ {1,}/g, ' ');
                                newFace.img = face.image.thumbs["300x300"];
                                newFace.role = face.job_title.title ? face.job_title.title : '[No role listed]';
                                newFace.department = face.team_positions ? face.team_positions[0].team_name : '[No team listed]';
                                return newFace;
                            } else {
                                return null;
                            }
                        }))
                        //Get rid of any array items that aren't forrmatted properrly
                        .then(faces => faces.filter(face => (face !== null && face !== undefined)))
                        //Finally, set up the game with our array of faces
                        .then(finalArray => {
                            this.setState({ loadingMessage: 'Ready!' });
                            this.setState({ fly_faces: finalArray });
                            this.setARandomFace();
                        });
                }
            }

            //The refresh token is stored in the browser to avoid re-approving the Namely API
            if (!localStorage.getItem('flyfacesrefreshtoken')) {

                //Handling the original auth flow; logic to fix things if the original query string fails on refresh or re-visit
                if (!window.location.href.match(/\?code=[a-zA-Z0-9]+/) || error) {
                    window.location.replace(`https://getflywheel.namely.com/api/v1/oauth2/authorize?response_type=code&client_id=aLqEQUSDghqvKamgshUfsn5sxtpg9FsUGT3Mv0ZLRGyOSJOOp6F784uR6gTG3ucl&redirect_uri=${appProtocol}%3A%2F%2F${appDomain}`)
                }

                let requestBody = `grant_type=authorization_code&client_id=${clientID}&client_secret=${clientSecret}&code=${authCode}`;

                fetch(`https://cors-anywhere.herokuapp.com/${APIURL}`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: 'POST',
                    body: encodeURI(requestBody)
                })
                    .then(response => response.json())
                    .then(response => {
                        if (response.access_token) {
                            accessToken = response.access_token;
                            localStorage.setItem('flyfacesrefreshtoken', response.refresh_token);
                            makeTheAPICall(accessToken);
                            this.setState({
                                loadingMessage: `Authentication successful. Getting Fly Faces (this may take a moment...)`
                            });
                        } else {
                            this.initialize(true);
                            return;
                        }
                    })
            } else {
                makeTheAPICall(null, refresh_token);
            }


        }, 200);
    }
    setARandomFace = () => {
        let length = this.state.fly_faces.length - 1;
        const x = Math.floor(Math.random() * (length + 1));
        const randomFace = this.state.fly_faces[x];

        this.setState({ random_face: randomFace });
    }
    componentDidMount() {
        this.initialize();
    }
    resetBoardForNewGame = () => {
        this.setARandomFace();
        this.setState({
            game_start: false,
            loading: false,
            ready: false,
            colorize: true,
            answer: '',
            recent_faces: [],
            last_face: {},
            new_hires: false,
            random_face: { name: "b", img: "p", role: "m", department: "t" },
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
        });
        const options = document.querySelector('#options');
        options.style.display = 'flex';
    }
    getReady = (ready) => {
        this.setState({ ready: ready });
    }
    render() {
        return (
            <div id="game-board">
                <Loader state={this.state} />
                <Endgame state={this.state} resetBoardForNewGame={this.resetBoardForNewGame} />
                <Options getReady={this.getReady} ready={this.state.ready} handleNewHires={this.handleNewHires} handleColorize={this.handleColorize} handleGameModeChange={this.handleGameModeChange} state={this.state} handleModeChange={this.handleModeChange} handleRoleChange={this.handleRoleChange} handleFilterChange={this.handleFilterChange} handleRepeatsChange={this.handleRepeatsChange} handleNarrowChange={this.handleNarrowChange} handleNarrowNumberChange={this.handleNarrowNumberChange} newGame={this.newGame} />
                <Header score={this.state.score} countdown={this.state.final_countdown} />
                <Face name={this.state.random_face.name} image={this.state.random_face.img} role={this.state.random_face.role} department={this.state.random_face.department} key={this.state.random_face.name} state={this.state} next={this.randomSelection} randomSelection={this.randomSelection} loadStart={this.loadStart} loadFinish={this.loadFinish} />
            </div>
        );
    }
}

export default GameBoard;