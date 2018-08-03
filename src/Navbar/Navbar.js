import React from 'react';

const Navbar = ({handleClickNextGen, isRunning, handleClickStart, handleClickStop, handleClickNew, handleClickClear}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-2">
      <span className="navbar-brand">Conway's game</span>
      
      {
        isRunning
          ?
            <a className="btn btn-danger" onClick={handleClickStop}>Stop</a>
          :
            <div>
              <a className="btn btn-primary mr-2" onClick={handleClickNextGen}>Next</a>
              <a className="btn btn-success mr-2" onClick={handleClickStart}>Start</a>
              <a className="btn btn-warning mr-2" onClick={handleClickNew}>New</a>
              <a className="btn btn-info" onClick={handleClickClear}>Clear</a>
            </div>
      }
      
      
    </nav>
  );
};

export default Navbar;