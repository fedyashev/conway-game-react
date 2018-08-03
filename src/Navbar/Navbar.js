import React from 'react';

const Navbar = ({handleClickNextGen}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-2">
      <span className="navbar-brand">Conway's game</span>
      <a className="btn btn-primary" onClick={handleClickNextGen}>Next Gereration</a>
    </nav>
  );
};

export default Navbar;