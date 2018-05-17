import React, { Component } from 'react';
import './RecentMovies.css';
import { connect } from 'react-redux';
import {Card} from '../Card/Card';


export class RecentMovies extends Component {
  render() {

    const movieCards = this.props.recentMovies.map(movie => {
      return (
        <Card 
          key={movie.id}
          title={movie.title} 
          backdrop={movie.backdrop} 
          overview={movie.overview}/>
      );
    });

    return (
      <div className="recentMovies">
        RECENT MOVIES!
        {movieCards}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recentMovies: state.recentMovies
});

export default connect(mapStateToProps)(RecentMovies);

