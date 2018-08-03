import React from 'react';

const Cell = ({isPopulate, cellSize, handleClickCell}) => {
  return(
    <td className={`cell ${isPopulate ? 'cell__gray' : 'cell__white'}`}
        style={{width: cellSize, height: cellSize}}
        onClick={handleClickCell}>
    </td>
  );
};

export default Cell;