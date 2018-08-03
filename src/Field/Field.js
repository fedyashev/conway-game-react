import React from "react";
import Cell from '../Cell/Cell.js';

const Field = ({field, cellSize, handleClickCell}) => (
  <table className='field'>
    <tbody>
      {
        field.map((row, i) =>
          <tr className='cellsrow' key={i}>
            {
              field[i].map((cell, j) =>
                <Cell key={j}
                      isPopulate={cell ? true : false}
                      cellSize={cellSize}
                      handleClickCell={handleClickCell(i, j)}/>
              )
            }
          </tr>
        )
      }
    </tbody>
  </table>
);

export default Field;