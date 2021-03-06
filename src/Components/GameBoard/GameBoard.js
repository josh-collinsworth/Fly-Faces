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
            ready: false,
            loading: true,
            loadingMessage: `🔄 Redirecting to Namely for authentication…`,

            colorize: true,
            colors: ['#50c6db', '#51bb7b', '#f0ce15', '#f47820', '#ef4e65', '#e0368c', '#8350a0'],
            current_color: '#50c6db',

            answer: '',

            fly_faces: [],
            random_face: {name: 'b', img: 'p', role: 'm', department: 't'},
            recent_faces: [],
            last_face: {},
            new_hires: false,
            new_hire_count: 35,

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
            if(!this.state.the_end && this.state.game_start){
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
    handleNewHireCountChange = (e) => {
        this.setState({ new_hire_count: e.target.value })
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
        },20)
    }
    newGame = () => {
        this.setState({
            score: {
                right: 0,
                wrong: 0,
            },
            game_start: true,
            loadingMessage: this.randomEmojiFace() + ' Getting a random Fly Face…'
        });
        this.randomSelection({ right: 0, wrong: 0 });
        setTimeout(()=>{
            this.setState({ final_countdown: this.state.final_countdown + 1 });
        }, 20);
        setTimeout(()=>{
            const options = document.querySelector('#options');
            options.style.display = 'none';
        },500)
    }
    randomEmojiFace = () => {
        const faces = ['👧🏽','👩','👦🏾','👨🏽','👩🏿‍🦱','👨🏾‍🦱','👩🏽‍🦰','👱🏾‍','️👱🏽‍','️👩🏾‍🦲','👨🏽‍🦲','🧔🏼','👵🏾','🧓🏼','👳🏾‍','👳🏿‍','👩','🧕🏾','👷🏽‍','️💂🏼‍','️💂🏻‍️','👨🏼‍🍳','👩🏻‍🎓','👩🏽‍🎤','👨🏽‍🏭','👩🏼‍💻','👨🏾‍💻','👩🏽‍🔬','👨🏾‍🚀','👰🏽','🤵🏻','🧛🏻‍️','🧝🏾‍'];
        const randomFaceIndex = Math.floor(Math.random() * (faces.length - 1));
        return faces[randomFaceIndex];
    }
    imageError = () => {
        this.setState({ loadingMessage: '❌ Unable to load the image. Try refreshing. If this keeps happening, let Collinsworth know about it. NOTE: blocking cookies will prevent this from working!' })
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
            (this.state.game_mode !== 'newbies' || x >= (this.state.fly_faces.length - this.state.new_hire_count))
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
        const loader = document.querySelector('#loader');
        if(this.state.colorize){
            const dot = document.querySelector(".loader-dot");
            loader.style.backgroundColor = this.state.current_color;
            dot.style.backgroundColor = this.state.current_color;
        }
        if(!this.state.loading){
            this.setState({ loadingMessage: this.randomEmojiFace() + ' Getting a random Fly Face…' })
            this.loadStart();
        }
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
    initialize = (initError = false) => {
        this.loadStart();
        setTimeout(() => {

            //We're gonna need a lot of variables in this auth flow
            let authCode = window.location.href.match(/\?code=([^&]+)/);
            if (authCode) authCode = authCode[1];
            const refresh_token = localStorage.getItem('flyfacesrefreshtoken');
            let accessToken;

            if (refresh_token) { // This ain't our first rodeo, so we just need to re-auth with the refresh token

                // AAAACTUALLY this is not good practice. Removing from the app for security's sake; leaving commented out for posterity.

                localStorage.removeItem('flyfacesrefreshtoken');
                this.initialize();
                return;

                // this.setState({loadingMessage: `🔁 Re-authenticating with Namely…`});
                // console.log('[Fly Faces] Token found; pinging Namely')
                // fetch(`api/refresh.js?refresh_token=${refresh_token}`)
                //     .then(response => response.json())
                //     .then(jsonResponse => {
                //         let response = JSON.parse(jsonResponse);
                //         if(response.error){
                //             this.setState({ loadingMessage: `Error: ${response.error}`});
                //             return;
                //         }
                //         const access_token = response.access_token;
                //         makeTheAPICall(access_token);
                //     });

            } else { // No refresh token; going at this like it may be the first time

                this.setState({ loadingMessage: `🔎 Verifying Namely authentication…` });

                if (!window.location.href.match(/\?code=[a-zA-Z0-9]+/) || initError) {
                    window.location.replace(`https://getflywheel.namely.com/api/v1/oauth2/authorize?response_type=code&client_id=kuzrsHJeAi7ogEnl99ci9v3ePJeaHim8wbG0erKzcP3WRonP8aTgPHdfuV3diCx9&redirect_uri=${this.props.appProtocol}%3A%2F%2F${this.props.appDomain}`)
                }

                console.log('[Fly Faces] No refresh token; authenticating');
                fetch(`api/initial_auth.js?auth_code=${authCode}`)
                .then(response => {
                    console.log(response);
                    return response.json()
                })
                .then(jsonResponse => {
                    console.log(jsonResponse)
                    let response = JSON.parse(jsonResponse);
                    if(response.error && !initError){
                        this.setState({ loadingMessage: `Error: ${response.error}` });
                        if(response.error_description){
                            this.setState({ loadingMessage: this.state.loadingMessage + ' - ' + JSON.stringify(response.error_description) });
                        }
                        if (JSON.stringify(response.error_description).includes('access grant')){
                            this.initialize(true);
                        }
                        return;
                    }
                    if (response.access_token) {
                        accessToken = response.access_token;
                        //localStorage.setItem('flyfacesrefreshtoken', response.refresh_token);
                        makeTheAPICall(accessToken);
                    } else {
                        this.initialize(true);
                        return;
                    }
                })
                .catch(error => {
                    this.setState({ loadingMessage: `❌ Namely Authentication Error. Try refreshing, and be sure nothing is blocking cookies. If that doesn't help, clear you browser cache, and/or or see the console for more details.`});
                    console.log(error);
                });
            }

            //This function does most of our authentication heavy lifting
            let makeTheAPICall = (token) => {
                this.setState({
                    loadingMessage: `🔐 Authentication successful.`
                });
                setTimeout(() => {
                    this.setState({
                        loadingMessage: `🔜 Retrieving Namely API data (might take a moment…)`
                    });
                }, 1500)
                console.log(`[Fly Faces] Making the API Call...`);
                fetch(`/api/api_call.js?token=${token}`)
                .then(response => response.json())
                .then(finalArray => {
                    if(finalArray.length >= 245){
                        alert(`UH OH! Looks like Flywheel's grown beyond what this app can handle in its current build! Please let Josh Collinsworth know so he can fix that. Meanwhile: some of the newest employees might not show up in the game.`)
                    }
                    this.setState({
                        loadingMessage: '💥 Ready!',
                        fly_faces: finalArray,
                        loading: false
                    });
                    this.setARandomFace();
                }).catch(err => {
                    this.setState({ loadingMessage: `⚠️ Oops! Something went wrong. Try refreshing, or check the console for more info.`   });
                    console.log(err);
                });
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
        const options = document.querySelector('#options');
        options.style.display = 'flex';

        setTimeout(() => {
            this.setState({
                game_start: false,
                loading: false,
                ready: false,
                colorize: true,
                answer: '',
                recent_faces: [],
                last_face: {},
                new_hires: false,
                random_face: { name: "b", img: "/p", role: "m", department: "t" },
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
        }, 200);

    }
    getReady = (ready) => {
        this.setState({ready: ready});
    }
    render() {
        return (
            <div id="game-board">
                <Loader state={this.state}/>
                <Endgame state={this.state} resetBoardForNewGame={this.resetBoardForNewGame}/>
                <Options getReady={this.getReady} ready={this.state.ready} handleNewHires={this.handleNewHires} handleColorize={this.handleColorize} handleGameModeChange={this.handleGameModeChange} state={this.state} handleModeChange={this.handleModeChange} handleRoleChange={this.handleRoleChange} handleFilterChange={this.handleFilterChange} handleRepeatsChange={this.handleRepeatsChange} handleNarrowChange={this.handleNarrowChange} handleNarrowNumberChange={this.handleNarrowNumberChange} newGame={this.newGame} handleNewHireCountChange={this.handleNewHireCountChange}/>
                <Header score={this.state.score} countdown={this.state.final_countdown}/>
                <Face name={this.state.random_face.name} image={this.state.random_face.img} role={this.state.random_face.role} department={this.state.random_face.department} key={this.state.random_face.name} state={this.state} next={this.randomSelection}  randomSelection={this.randomSelection} loadStart={this.loadStart} loadFinish={this.loadFinish} imageError={this.imageError}/>
            </div>
        );
    }
}

export default GameBoard;
