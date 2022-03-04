import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const [matrix, setMatrix] = useState([[0, 0, 0],
    [0, 0, 0],
    [0, 0,  0]])
  const [turn, setTurn] = useState(true)
  
  const [mainClass, setMainClass] = useState("")
  
 
  const checkWinner = () => {
       
  if (matrix[0][0] !== 0) {
    if (matrix[0][0] === matrix[0][1] && matrix[0][0] === matrix[0][2]) {
      setMainClass("ltor-top")
    } 
    if (matrix[0][0] === matrix[1][0] && matrix[0][0] === matrix[2][0]) {
      setMainClass("ttob-left")
    } 
    if (matrix[0][0] === matrix[1][1] && matrix[0][0] === matrix[2][2]) {
      setMainClass("ltor-corner")
    }
  }
  if ((matrix[0][1] !== 0) && (matrix[0][1] === matrix[1][1] && matrix[0][1] === matrix[2][1])){
    setMainClass("ttob-middle")
  }
  if (matrix[0][2] !== 0) {
    if (matrix[0][2] === matrix[1][2] && matrix[0][2] === matrix[2][2]) {
      setMainClass("ttob-right")
    }
    if (matrix[0][2] === matrix[1][1] && matrix[0][2] === matrix[2][0]) {
      setMainClass("rtol-corner")
  }
  }
  if (matrix[1][0] !== 0 && (matrix[1][0] === matrix[1][1] && matrix[1][0] === matrix[1][2])) {
    setMainClass("ltor-middle")
  }
  if (matrix[2][0] !== 0 && (matrix[2][0] === matrix[2][1] && matrix[2][0] === matrix[2][2])) {
    setMainClass("ltor-bottom")
  }
  return 0
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
      <main className={mainClass}>
        {matrix.map((level, row)=>level.map((cell, column)=><Board turn={turn} setTurn={setTurn} checkMainTie={checkTie} checkMainWinner={checkWinner} index={[row, column]} mainMatrix={matrix} changeMatrix={setMatrix} key={row*3+column}/>))}
      </main>
    </div>
  );
}

export default App;
