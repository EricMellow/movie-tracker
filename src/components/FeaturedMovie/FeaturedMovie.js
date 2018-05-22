import React, { Component } from 'react';
import './FeaturedMovie.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addFavoriteMovie, deleteFavoriteMovie, setSelectedMovieId } from '../../actions/index';

export class FeaturedMovie extends Component {
  constructor() {
    super();

    this.state = {
      promptLogin: false
    };
  }

  handleFavoriteClick = async (event) => {
    const selectedMovie = this.props.recentMovies.find(movie => {
      return movie.movie_id === this.props.movieId;
    });

    await this.toggleStoreFavorite(selectedMovie);
    this.toggleFeaturedMovie();
    this.togglePromptLogin();
  }

  toggleStoreFavorite = async (selectedMovie) => {
    const isAFavorite = this.findFavorite(selectedMovie.movie_id);

    if (isAFavorite) {
      await this.deleteFavorite(selectedMovie)
    } else if (this.props.userId) {
      await this.addFavorite(selectedMovie)
    }
  }

  toggleFeaturedMovie = () => {
    if (this.props.location.pathname === '/favorites') {
      const movieId = this.props.favoriteMovies.length ? this.props.favoriteMovies[0].movie_id : null;
      this.props.setFeaturedMovie(movieId);
    }
  }

  togglePromptLogin = () => {
    if (!this.props.userId) {
      this.setState({
        promptLogin: true
      })
      setTimeout(() => {
        this.setState({
          promptLogin: false
        })
      }, 2000);
    }
  }

  findFavorite = (id)=>{
    return this.props.favoriteMovies.find((favorite)=>{
      return favorite.movie_id === id;
    });
  }

  deleteFavorite = (selectedMovie) => {
    this.props.deleteFavoriteMovie(selectedMovie);
    this.deleteFavoriteFromDatabase(selectedMovie);
  }

  addFavorite = (selectedMovie) => {
    this.props.addFavoriteMovie(selectedMovie);
    this.addFavoriteToDatabase(selectedMovie);
  }

  addFavoriteToDatabase = async (selectedMovie) => { 
    const url = 'http://localhost:3000/api/users/favorites/new';

    await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        movie_id: selectedMovie.movie_id,
        user_id: this.props.userId,
        title: selectedMovie.title,
        poster_path: selectedMovie.poster,
        release_date: selectedMovie.release,
        vote_average: selectedMovie.vote_average,
        overview: selectedMovie.overview
      })
    });
  }

  deleteFavoriteFromDatabase = async (selectedMovie) => {
    const url = `http://localhost:3000/api/users/${this.props.userId}/favorites/${selectedMovie.movie_id}`;

    await fetch(url, {
      method: 'DELETE'
    });
  }

  render() {
    const featuredMovie = this.props.recentMovies.find(movie => {
      return movie.movie_id === this.props.movieId;
    });

    if (featuredMovie) {
      const image = `https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop}`;
      const background = { backgroundImage: `url( ${image} )` };
      const overview = featuredMovie.overview.substr(0, 125);
      const foundFavorite = this.props.favoriteMovies.find(movie => {
        return movie.movie_id === this.props.movieId;
      })
      const className = foundFavorite ? "featuredMovie favorite" : "featuredMovie";
      const buttonText = foundFavorite ? "Remove Favorite" : "Add to Favorites";

      return (
        <div className={className} style={background}>
          { this.state.promptLogin ? 
            <div className="loginRequest">
              Please Sign Up / Login to add favorites.
            </div> :
            null
          }
          <div className="favoriteButton" onClick={this.handleFavoriteClick}>
            <p>{buttonText}</p>
            <div className="faveIcon"></div>
          </div>
          <div className="movieOverview">
            <h2>{featuredMovie.title}</h2>
            <p>{overview} ...</p>
          </div>
        </div>
      );
    } else {
      return (
        <p>LOADING</p>);
    }
  }
}

export const mapStateToProps = (state) => ({
  recentMovies: state.recentMovies,
  movieId: state.selectedMovieId,
  userId: state.userId,
  favoriteMovies: state.favoriteMovies
});

export const mapDispatchToProps = (dispatch) => ({
  addFavoriteMovie: (selectedMovie) => dispatch(addFavoriteMovie(selectedMovie)),
  deleteFavoriteMovie: (selectedMovie) => dispatch(deleteFavoriteMovie(selectedMovie)),
  setFeaturedMovie: (id) => dispatch(setSelectedMovieId(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeaturedMovie));


