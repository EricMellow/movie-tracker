import React, { Component }from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { toggleRenderRecent } from "../../actions/index";

export class Header extends Component {

  render() {
    return (
      <div className="header">
        <img src={ require('../Header/movie-tracker-logo.png')} className="logo" />
        <nav>
          <NavLink to='/login' className="navLink">Sign Up/Login</NavLink> 
          <NavLink 
            to='/favorites' 
            className="navLink"
            onClick={() => this.props.toggleRender(false)}
          >Favorites</NavLink>
          <NavLink 
            to='/' 
            className="navLink"
            onClick={() => this.props.toggleRender(true)}
          >Recent Movies</NavLink>
        </nav>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  toggleRender: (bool) => dispatch(toggleRenderRecent(bool))
});

export default connect(null, mapDispatchToProps)(Header)