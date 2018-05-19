import React, { Component } from 'react';
import './FeaturedMovie.css';
import { connect } from 'react-redux';
import { addFavoriteMovie } from '../../actions/index'

class FeaturedMovie extends Component {

  handleFavoriteClick = () => {
    const selectedMovie = this.props.recentMovies.find(movie => {
      return movie.id === this.props.movieId;
    });
    this.props.addFavorite(selectedMovie);
  }


  render() {
    const featuredMovie = this.props.recentMovies.find(movie => {
      return movie.id === this.props.movieId;
    });
    if (featuredMovie) {
      const image = `https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop}`;
      const background = { backgroundImage: `url( ${image} )` };
      const overview = featuredMovie.overview.substr(0, 300);

      return (
        <div className="featuredMovie" style={background} >
          <div className="favoriteButton" onClick={this.handleFavoriteClick}>
            <p>Add to Favorites</p>
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
  movieId: state.selectedMovieId
});

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (selectedMovie) => dispatch(addFavoriteMovie(selectedMovie))
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedMovie);


