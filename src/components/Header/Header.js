import React, { Component } from 'react';
import './Header.css';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { toggleRenderRecent, logout, setSelectedMovieId } from "../../actions/index";
import PropTypes from 'prop-types';

export class Header extends Component {
  constructor() {
    super();

    this.state = {
      favoritesError: false
    };
  }

  handleLoginLogoutClick = () => {
    if (this.props.userId) {
      this.props.logout();
      this.setRecentFeaturedMovie();
      this.props.history.push('/');
    }
  }

  handleFavoritesClick = (event) => {
    if (this.props.favoriteMovies.length) {
      this.setFavoriteFeaturedMovie();
      this.props.toggleRender(false);
    } else {
      this.toggleError(event);
    }
  }

  toggleError = (event) => {
    event.preventDefault();
    this.setState({
      favoritesError: true
    });
    setTimeout(() => {
      this.setState({
        favoritesError: false
      });
    }, 2000);
  }

  handleRecentsClick = () => {
    this.setRecentFeaturedMovie();
    this.props.toggleRender(true);
  }

  handleLogoClick = () => {
    this.handleRecentsClick();
    this.props.history.push('/');
  }

  setFavoriteFeaturedMovie = () => {
    const movieId = this.props.favoriteMovies[0].movie_id;
    this.props.setFeaturedMovie(movieId);
  }

  setRecentFeaturedMovie = () => {
    const movieId = this.props.recentMovies[0].movie_id;
    this.props.setFeaturedMovie(movieId);
  }

  render() {
    const loginLogoutText = this.props.userId ? 'Sign Out' : 'Sign Up/Login';
    const path = this.props.userId ? '/' : '/login';

    return (
      <div className="header">
        <img
          src={require('../Header/movie-tracker-logo.png')}
          className="logo" onClick={this.handleLogoClick}
        />
        <nav>
          <NavLink
            to={path}
            className="navLink"
            onClick={this.handleLoginLogoutClick}
          >{loginLogoutText}</NavLink>
          <NavLink
            to='/favorites'
            className="navLink"
            onClick={this.handleFavoritesClick}
          >Favorites</NavLink>
          {this.state.favoritesError ?
            <div className="favoritesError">
              Add favorite movies to view favorites.
            </div> :
            null
          }
          <NavLink
            to='/'
            className="navLink"
            onClick={this.handleRecentsClick}
          >Recent Movies</NavLink>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  toggleRender: PropTypes.func,
  logout: PropTypes.func,
  setFeaturedMovie: PropTypes.func,
  userId: PropTypes.number,
  favoriteMovies: PropTypes.array,
  selectedMovieId: PropTypes.number,
  recentMovies: PropTypes.array,
  history: PropTypes.object
};

export const mapDispatchToProps = (dispatch) => ({
  toggleRender: (bool) => dispatch(toggleRenderRecent(bool)),
  logout: () => dispatch(logout()),
  setFeaturedMovie: (id) => dispatch(setSelectedMovieId(id))
});

export const mapStateToProps = (state) => ({
  userId: state.userId,
  favoriteMovies: state.favoriteMovies,
  selectedMovieId: state.selectedMovieId,
  recentMovies: state.recentMovies
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

