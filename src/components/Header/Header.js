import React, { Component } from 'react';
import './Header.css';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { toggleRenderRecent, logout, setSelectedMovieId } from "../../actions/index";

export class Header extends Component {

  handleLoginClick = () => {
    if (this.props.userId) {
      this.props.logout();
      this.props.history.push('/');
    }
  }

  handleFavoritesClick = () => {
    const movieId = this.props.favoriteMovies.length ? this.props.favoriteMovies[0].movie_id : null;
    this.props.setFeaturedMovie(movieId);
    this.props.toggleRender(false);
  }

  handleRecentsClick = () => {
    // const movieId = this.props.recentMovies.length ? this.props.recentMovies[0].movie_id : null;
    // this.props.setFeaturedMovie(movieId);
    this.props.toggleRender(true)
  }

  render() {
    const loginLogoutText = this.props.userId ? 'Sign Out' : 'Sign Up/Login';
    const path = this.props.userId ? '/' : '/login';

    return (
      <div className="header">
        <img src={require('../Header/movie-tracker-logo.png')} className="logo" />
        <nav>
          <NavLink
            to={path}
            className="navLink"
            onClick={this.handleLoginClick}
          >{loginLogoutText}</NavLink>
          <NavLink
            to='/favorites'
            className="navLink"
            onClick={this.handleFavoritesClick}
          >Favorites</NavLink>
          <NavLink
            to='/'
            className="navLink"
            onClick={this.handleRecentsClick}
          >Recent Movies</NavLink>
        </nav>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  toggleRender: (bool) => dispatch(toggleRenderRecent(bool)),
  logout: () => dispatch(logout()),
  setFeaturedMovie: (id) => dispatch(setSelectedMovieId(id))
});

const mapStateToProps = (state) => ({
  userId: state.userId,
  favoriteMovies: state.favoriteMovies,
  selectedMovieId: state.selectedMovieId
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

