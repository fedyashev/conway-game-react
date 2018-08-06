import React, { Component } from 'react';

class Cell extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isPopulate !== this.props.isPopulate;
  }

  render() {
    const {isPopulate, cellSize, handleClickCell} = this.props;
    return (
      <div className={`${isPopulate ? 'cell__gray' : 'cell__white'}`}
          style={{width: cellSize, height: cellSize}}
          onClick={handleClickCell}>
      </div>      
    );
  }
}

export default Cell;