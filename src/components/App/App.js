import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import key from '../../key.js';
import movieCleaner from '../../cleaners/movieCleaner';

class App extends Component {

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`);
      if (response.status !== 200) {
        throw new Error('Could not retreive data');
      }
      const moviesData = await response.json();
      const cleanMovies = movieCleaner(moviesData);
    } catch (error) {
      console.log({needSomeError});
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
