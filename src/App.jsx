import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const [matrix, setMatrix] = useState([[0, 0, 0],
    [0, 0, 0],
    [0, 0,  0]])
  const [turn, setTurn] = useState(true)
  
  const [mainClass, setMainClass] = useState("")
  const [winner, setWinner] = useState(0)
  const [overlay, setOverlay] = useState("overlay")
  const [menu, setMenu] = useState("menu")
  const [reset, setReset] = useState(false)

  const checkWinner = () => {
       
  if (matrix[0][0] !== 0) {
    if (matrix[0][0] === matrix[0][1] && matrix[0][0] === matrix[0][2]) {
      setMainClass("ltor-top")
      return true 
    }

    if (matrix[0][0] === matrix[1][0] && matrix[0][0] === matrix[2][0]) {
      setMainClass("ttob-left")
      return true
    }

    if (matrix[0][0] === matrix[1][1] && matrix[0][0] === matrix[2][2]) {
      setMainClass("ltor-corner")
      return true
    }
  }
  if ((matrix[0][1] !== 0) && (matrix[0][1] === matrix[1][1] && matrix[0][1] === matrix[2][1])){
    setMainClass("ttob-middle")
    return true
  }
  if (matrix[0][2] !== 0) {
    if (matrix[0][2] === matrix[1][2] && matrix[0][2] === matrix[2][2]) {
      setMainClass("ttob-right")
      return true

    }
    if (matrix[0][2] === matrix[1][1] && matrix[0][2] === matrix[2][0]) {
      setMainClass("rtol-corner")
      return true

    }
  }
  if (matrix[1][0] !== 0 && (matrix[1][0] === matrix[1][1] && matrix[1][0] === matrix[1][2])) {
    setMainClass("ltor-middle")
    return true
  }
  if (matrix[2][0] !== 0 && (matrix[2][0] === matrix[2][1] && matrix[2][0] === matrix[2][2])) {
    setMainClass("ltor-bottom")
    return true
  }
  return false
  }

  const restartAfterWin = ()=> {
    setMenu("menu")
    setTimeout(()=>setOverlay("overlay"),1000)
    setTimeout(()=>setWinner(0), 1500)
    setTimeout(()=>setReset(true),1000)
    setTimeout(()=>setReset(false), 2500)
    setTimeout(()=>{
      setMatrix([[0, 0, 0],
      [0, 0, 0],
      [0, 0,  0]])
      setMainClass("")
    }, 1000)
  }

  const restart = () => {

    setTimeout(()=>setWinner(0), 1500)
    setReset(true)
    setTimeout(()=>setReset(false), 500)
    setMatrix([[0, 0, 0],
      [0, 0, 0],
      [0, 0,  0]])
      setMainClass("")
  }
 
  return (
    <div className="App">
      <div className="img-div">
        <img onClick={()=>restart()} src="restart.svg" alt="" />
      </div>
      <main>
        <div id="main-board" className={mainClass}>
          {matrix.map((level, row)=>level.map((cell, column)=><Board reset={reset} setMenu={setMenu} setOverlay={setOverlay} changeWinner={setWinner} winner={winner} turn={turn} setTurn={setTurn} checkMainWinner={checkWinner} index={[row, column]} mainMatrix={matrix} changeMainMatrix={setMatrix} key={row*3+column}/>))}
        </div>
        <div className={menu}>
          <h2>{winner===1?"X":"Circle"} won!</h2>
          <p>Do you want to play again?</p>
          <button onClick={()=>{restartAfterWin()}}>Yes</button>
        </div>
        <div className={overlay}></div>
      </main>
    </div>
  );
}

export default App;
