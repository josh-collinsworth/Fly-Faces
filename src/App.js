import React from 'react';
import './App.css';
import GameBoard from './Components/GameBoard/GameBoard';

const App = () => {
  //Replace appDomain and appProtocol for local development
  const appDomain = 'fly-faces.now.sh';
  // const appDomain = 'localhost:3000';
  const appProtocol = 'https';    
  return (
      <div className="App">
        <GameBoard appDomain={appDomain} appProtocol={appProtocol} />
      </div>
    );
}

export default App;
