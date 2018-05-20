import React, { Component } from 'react';
import './Sidebar.css';
import { connect } from 'react-redux';
import Card from '../Card/Card';

export class Sidebar extends Component {

  render() {
    const currentPage = this.props.renderRecent ? this.props.recentMovies : this.props.favoriteMovies;
    const movieCards = currentPage.map(movie => {
      const movieMatch = this.props.recentMovies.find( recentMovie => {
        return recentMovie.movie_id === movie.movie_id
      })
      const backdrop = movieMatch.backdrop;
     
      return (
        <Card 
          key={movie.movie_id}
          title={movie.title} 
          backdrop={backdrop}
          rating={movie.vote_average}
          id={movie.movie_id}
        />
      );
    });

    return (
      <div className="sidebar">
        <h1>Recent Movies</h1>
        { movieCards }
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  recentMovies: state.recentMovies,
  favoriteMovies: state.favoriteMovies,
  renderRecent: state.renderRecent
});

export default connect(mapStateToProps)(Sidebar);

