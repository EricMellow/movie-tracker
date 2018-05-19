import React, { Component } from 'react';
import './RecentMovies.css';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import FeaturedMovie from '../FeaturedMovie/FeaturedMovie';

export class RecentMovies extends Component {
  render() {
    return (
      <div className="recentMovies">
        <Sidebar />
        <FeaturedMovie />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  recentMovies: state.recentMovies
});

export default connect(mapStateToProps)(RecentMovies);

