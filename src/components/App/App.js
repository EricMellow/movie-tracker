import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import key from '../../key.js';
import movieCleaner from '../../cleaners/movieCleaner';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header/Header';
import { FavoriteMovies } from '../FavoriteMovies/FavoriteMovies';
import RecentMovies from '../RecentMovies/RecentMovies';
import { addRecentMovies } from '../../actions/index';

class App extends Component {

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    const endPoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`;
    try {
      const response = await fetch(endPoint);
      if (response.status !== 200) {
        throw new Error('Could not retreive data');
      }
      const rawRecentMovieData = await response.json();
      const recentMovieData = movieCleaner(rawRecentMovieData);

      this.props.setRecentMovies(recentMovieData);
    } catch (error) {
      console.log({error});
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <section className="mainContainer" >
          <Route exact path='/' component={ RecentMovies } />
          <Route exact path='/favorites' component={ FavoriteMovies } />
        </section> 
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  setRecentMovies: (recentMovieData) => dispatch(addRecentMovies(recentMovieData))
});

export default connect(null, mapDispatchToProps, null, {pure: false})(App);
