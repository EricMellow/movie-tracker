import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="header">
      <nav>
        <NavLink to='/favorites' className="navLink">Favorites</NavLink>
        <NavLink to='/login' className="navLink">Login</NavLink>

      </nav>
    </div>
  );
};

