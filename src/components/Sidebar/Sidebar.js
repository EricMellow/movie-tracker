import React, { Component } from 'react';
import './Sidebar.css';
import { connect } from 'react-redux';
import Card from '../Card/Card';

export class Sidebar extends Component {

  render() {
    const currentPage = this.props.renderRecent ? this.props.recentMovies : this.props.favoriteMovies;
    const movieCards = currentPage.map(movie => {
      console.log(movie)
      return (
        <Card 
          key={movie.id}
          title={movie.title} 
          backdrop={movie.backdrop} 
          rating={movie.rating}
          id={movie.id}
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

