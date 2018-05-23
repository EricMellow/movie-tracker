import React, { Component } from 'react';
import './RecentMovies.css';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import FeaturedMovie from '../FeaturedMovie/FeaturedMovie';
import PropTypes from 'prop-types';

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

RecentMovies.propTypes = {
  recentMovies: PropTypes.array
};


export const mapStateToProps = (state) => ({
  recentMovies: state.recentMovies
});

export default connect(mapStateToProps)(RecentMovies);

