import React, { Component } from 'react';
import Field from '../Field/Field.js';
import Navbar from '../Navbar/Navbar.js';

const rows = 10;
const cols = 10;

class App extends Component {

  lifeProcess = null;

  state = {
    message: "Hello, React!",
    field: [],
    fieldSize : 50,
    isRunning: false,
    delay: 100
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const size = this.state.fieldSize;
    this.setState({
      ...this.state,
      field: this._setInitialField(size, size)
    });
  }

  handleClickCell = (i, j) => () => {
    const newField = [...this.state.field];
    newField[i][j] = newField[i][j] === 0 ? 1 : 0;
    this.setState({
      ...this.state,
      field: newField
    });
  }

  handleClickNextGen = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      field: this._nextGeneration()
    });   
  }

  handleClickStart = () => {
    this.setState({
      ...this.state,
      isRunning: true
    });
    this.lifeProcess = setInterval(() => {
      this.setState({
        ...this.state,
        field: this._nextGeneration()
      });
    }, this.state.delay);
  }

  handleClickStop = () => {
    clearInterval(this.lifeProcess);
    this.setState({
      ...this.state,
      isRunning: false
    });
  }

  handleClickNew = () => {
    if (!this.state.isRunning) {
      const size = this.state.fieldSize;
      this.setState({
        ...this.state,
        field: this._setInitialField(size, size)
      });
    }
  }

  handleClickClear = () => {
    if (!this.state.isRunning) {
      const size = this.state.fieldSize;
      this.setState({
        ...this.state,
        field: this._setEmptyField(size, size)
      });
    }
  }

  _setInitialField(rows, cols) {
    const field = new Array(rows);
    for (let i = 0; i < field.length; i++) {
      field[i] = new Array(cols);
      for (let j = 0; j < field[i].length; j++) {
        field[i][j] = Math.random() * 2 > 1 ? 1 : 0;
      }
    }
    return field;
  }

  _setEmptyField(rows, cols) {
    const field = new Array(rows);
    for (let i = 0; i < field.length; i++) {
      field[i] = new Array(cols);
      for (let j = 0; j < field[i].length; j++) {
        field[i][j] = 0;
      }
    }
    return field;
  }

  _nextGeneration = () => {
    const { field, fieldSize } = this.state;
    const tmp = this._setEmptyField(fieldSize, fieldSize);
    const MIN_NEIGHBORS = 2;
    const MAX_NEIGHBORS = 3;
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field.length; j++) {
        if (field[i][j] === 1) {
          tmp[i][j] = (this._getNeighborsCount(i, j) < MIN_NEIGHBORS || this._getNeighborsCount(i, j) > MAX_NEIGHBORS) ? 0 : 1;
        } else {
          if (this._getNeighborsCount(i, j) === MAX_NEIGHBORS) {
            tmp[i][j] = 1;
          }
        }
      }
    }
    return tmp;
  }

  _getNeighborsCount = (i, j) => {
    const { field, fieldSize } = this.state;
    let count = 0;
    if (i - 1 >= 0) {
      if (j - 1 >= 0 && field[i - 1][j - 1] === 1) count++;
      if (j >= 0 && field[i - 1][j] === 1) count++;
      if (j + 1 <= fieldSize - 1 && field[i - 1][j + 1] === 1) count++;
    }
    if (i + 1 <= fieldSize - 1) {
      if (j - 1 >= 0 && field[i + 1][j - 1] === 1) count++;
      if (j >= 0 && field[i + 1][j] === 1) count++;
      if (j + 1 <= fieldSize - 1 && field[i + 1][j + 1] === 1) count++;
    }
    if (j - 1 >= 0 && field[i][j - 1] === 1) count++;
    if (j + 1 <= fieldSize - 1 && field[i][j + 1] === 1) count++;
    return count;
  }

  render() {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const delta = 100;
    const cellSize = Math.floor((Math.min(height, width) - delta) / this.state.fieldSize);
    //console.log(height, width, cellSize);
    return (
      <div className="row">
        <div className="col-12">
          <Navbar isRunning={this.state.isRunning}
                  handleClickNextGen={this.handleClickNextGen} 
                  handleClickStart={this.handleClickStart}
                  handleClickStop={this.handleClickStop}
                  handleClickNew={this.handleClickNew}
                  handleClickClear={this.handleClickClear}/>
          {
            this.state.field &&
              <div className="">
                <Field field={this.state.field}
                       cellSize={cellSize}
                       handleClickCell={this.handleClickCell} />
              </div>
          }
        </div>
      </div>
    );
  }
}

export default App;


