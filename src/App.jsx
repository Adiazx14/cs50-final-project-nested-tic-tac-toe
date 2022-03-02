import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const [matrix, setMatrix] = useState([[0, 0, 0],
    [0, 0, 0],
    [0, 0,  0]])
  const [turn, setTurn] = useState(true)
  
  const checkWinner = () => {
       
  if ((matrix[0][0] !== 0) && ((matrix[0][0] === matrix[0][1] && matrix[0][0] === matrix[0][2]) || (matrix[0][0] === matrix[1][0] && matrix[0][0] === matrix[2][0]) || (matrix[0][0] === matrix[1][1] && matrix[0][0] === matrix[2][2]))) {
      return true
    }
  if ((matrix[0][1] !== 0) && (matrix[0][1] === matrix[1][1] && matrix[0][1] === matrix[2][1])) {

    return true
  }
  if ((matrix[0][2] !== 0) && ((matrix[0][2] === matrix[1][2] && matrix[0][2] === matrix[2][2]) || (matrix[0][2] === matrix[1][1] && matrix[0][2] === matrix[2][0]))) {
    return true
  }
  if (matrix[1][0] !== 0 && (matrix[1][0] === matrix[1][1] && matrix[1][0] === matrix[1][2])) {
    return true
  }
  if (matrix[2][0] !== 0 && (matrix[2][0] === matrix[2][1] && matrix[2][0] === matrix[2][2])) {
    return true
  }
  return false
  }

    const checkTie = () => {
        var tie = true
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (matrix[i][j] === 0) {
                    return false
                }
            }
        }
        return tie
    }

    const restart = () => {

        setMatrix([[0, 0, 0],
                  [0, 0, 0],
                  [0, 0,  0]])
    }
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        {matrix.map((level, row)=>level.map((cell, column)=><Board turn={turn} setTurn={setTurn} checkMainTie={checkTie} checkMainWinner={checkWinner} index={[row, column]} mainMatrix={matrix} changeMatrix={setMatrix} key={row*3+column}/>))}
      </main>
    </div>
  );
}

export default App;
