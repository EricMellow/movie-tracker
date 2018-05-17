import React from 'react';
import logo from './logo.svg';
import './Header.css';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="header">
      <nav>
        <NavLink to='/favorites' className="navLink">Favorites</NavLink>
      </nav>
    </div>
  );
};
