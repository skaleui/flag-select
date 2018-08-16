import React, { Component } from 'react';
import FlagContainer from './components/FlagContainer';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Flag Picker</h1>
          <p className="App-subtitle">The app will help you learn flag around the world in 3 steps.</p>
        </header>
        <div>
          <FlagContainer/>
        </div>
      </div>
    );
  }
}

export default App;
