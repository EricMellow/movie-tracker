import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import key from '../../key.js';
import movieCleaner from '../../cleaners/movieCleaner';
import { Route } from 'react-router-dom';
import { Header } from '../Header/Header';
import { FavoriteMovies } from '../FavoriteMovies/FavoriteMovies';
import { RecentMovies } from '../RecentMovies/RecentMovies';

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
      console.log({error});
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <section className="main" >
          <Route exact path='/' component={ RecentMovies } />
          <Route exact path='/favorites' component={ FavoriteMovies } />
        </section> 
      </div>
    );
  }
}

export default App;
