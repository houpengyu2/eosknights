import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Search from './components/Search';
import Main from './components/Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Search></Search>
          <Main></Main>
        </div>
      </Router>
    );
  }
}

export default App;
