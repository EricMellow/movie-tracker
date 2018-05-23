import React, { Component } from 'react';
import './Sidebar.css';
import { connect } from 'react-redux';
import Card from '../Card/Card';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Sidebar extends Component {
  render() {
    const title = this.props.location.pathname === '/' ? 'Recent Movies' : 'Favorite Movies';
    const currentPage = this.props.renderRecent ? this.props.recentMovies : this.props.favoriteMovies;

    const movieCards = currentPage.map(movie => {
      const movieMatch = this.props.recentMovies.find(recentMovie => {
        return recentMovie.movie_id === movie.movie_id;
      })
      const backdrop = movieMatch.backdrop;

      return (
        <div key={movie.movie_id} className="cardContainer">
          <Card 
            title={movie.title} 
            backdrop={backdrop}
            rating={movie.vote_average}
            id={movie.movie_id}
          />
          <hr />
        </div>
      );
    });

    return (
      <div className="sidebar">
        <h1>{title}</h1>
        <div className="sidebarCards">
          {movieCards}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  recentMovies: PropTypes.array,
  favoriteMovies: PropTypes.array,
  renderRecent: PropTypes.bool,
  location: PropTypes.object
};

export const mapStateToProps = (state) => ({
  recentMovies: state.recentMovies,
  favoriteMovies: state.favoriteMovies,
  renderRecent: state.renderRecent
});

export default withRouter(connect(mapStateToProps)(Sidebar));

