import React, { Component }from 'react';
import './Header.css';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { toggleRenderRecent, logout } from "../../actions/index";

export class Header extends Component {

  handleClick = () => {
    if (this.props.userId) {
      this.props.logout();
      console.log(this.props)
      this.props.history.push('/');
    }
  }

  render() {
    const loginLogoutText = this.props.userId ? 'Sign Out' : 'Sign Up/Login';
    const path = this.props. userId ? '/' : '/login';
    
    return (
      <div className="header">
        <img src={ require('../Header/movie-tracker-logo.png')} className="logo" />
        <nav>
          <NavLink 
            to={path} 
            className="navLink"
            onClick={this.handleClick}
            >{loginLogoutText}</NavLink> 
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
  toggleRender: (bool) => dispatch(toggleRenderRecent(bool)),
  logout: ()=> dispatch(logout())
});

const mapStateToProps = (state) => ({
  userId: state.userId
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

