import React, { Component } from 'react';
import './FeaturedMovie.css';
import { connect } from 'react-redux';

class FeaturedMovie extends Component {
  
  render() {
    const featuredMovie = this.props.recentMovies.find(movie=>{
      
      return movie.id === this.props.movieId
    })
    console.log(featuredMovie)
    return (
      <div className="featuredMovie">
        FEATURED MOVIE
      </div>
    )
  }
}

const mapStateToProps = (state)=>({
  recentMovies: state.recentMovies,
  movieId: state.selectedMovieId
})

export default connect(mapStateToProps)(FeaturedMovie);


