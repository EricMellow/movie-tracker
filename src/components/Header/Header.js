import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="header">
      <nav>
        <NavLink to='/login' className="navLink">Sign Up/Login</NavLink> 
        <NavLink to='/favorites' className="navLink">Favorites</NavLink>
        <NavLink to='/' className="navLink">Recent Movies</NavLink>
      </nav>
    </div>
  );
};

