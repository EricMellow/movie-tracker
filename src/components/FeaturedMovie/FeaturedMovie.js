import React, { Component } from 'react';
import './FeaturedMovie.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addFavoriteMovie, deleteFavoriteMovie, setSelectedMovieId } from '../../actions/index';

class FeaturedMovie extends Component {
  
  findFavorite = (id)=>{
    return this.props.favoriteMovies.find((fave)=>{
      return fave.movie_id === id;
    });
  }

  handleFavoriteClick = async () => {
    const selectedMovie = this.props.recentMovies.find(movie => {
      return movie.movie_id === this.props.movieId;
    });
    const isAFavorite = this.findFavorite(selectedMovie.movie_id);

    if (isAFavorite) {
      await this.props.deleteFavoriteMovie(selectedMovie);
      this.deleteFavoriteFromDatabase(selectedMovie);
    } else {
      this.props.addFavorite(selectedMovie);
      this.addFavoriteToDatabase(selectedMovie);
    }

    if (this.props.location.pathname === '/favorites') {
      const movieId = this.props.favoriteMovies.length ? this.props.favoriteMovies[0].movie_id : null;
      this.props.setFeaturedMovie(movieId);
    }
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
      const overview = featuredMovie.overview.substr(0, 300);
      const foundFavorite = this.props.favoriteMovies.find(movie => {
        return movie.movie_id === this.props.movieId;
      })
      const className = foundFavorite ? "featuredMovie favorite" : "featuredMovie";
      const buttonText = foundFavorite ? "Remove Favorite" : "Add to Favorites";


      return (
        <div
          className={className}
          style={background} >
          <div 
            className="favoriteButton"
            onClick={this.handleFavoriteClick}
          >
            <p>{buttonText}</p>
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

const mapStateToProps = (state) => ({
  recentMovies: state.recentMovies,
  movieId: state.selectedMovieId,
  userId: state.userId,
  favoriteMovies: state.favoriteMovies
});

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (selectedMovie) => dispatch(addFavoriteMovie(selectedMovie)),
  deleteFavoriteMovie: (selectedMovie) => dispatch(deleteFavoriteMovie(selectedMovie)),
  setFeaturedMovie: (id) => dispatch(setSelectedMovieId(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeaturedMovie));


