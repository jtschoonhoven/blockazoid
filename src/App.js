import './App.css';
import React, { Component } from 'react';

import GameBoard from './GameBoard';


class App extends Component {

    render() {
        return (
            <div className="bz-app">
                <GameBoard />
            </div>
        );
    }
}

export default App;
