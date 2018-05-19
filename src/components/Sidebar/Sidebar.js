import React, { Component } from 'react';
import './Sidebar.css';
import { connect } from 'react-redux';
import { Card } from '../Card/Card';

export class Sidebar extends Component {

  render() {
    const movieCards = this.props.recentMovies.map(movie => {
      return (
        <Card 
          key={movie.id}
          title={movie.title} 
          backdrop={movie.backdrop} 
          rating={movie.rating}
        />
      );
    });

    return (
      <div className="recentMovies">
        <h1>Recent Movies</h1>
        { movieCards }
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  recentMovies: state.recentMovies
});

export default connect(mapStateToProps)(Sidebar);

