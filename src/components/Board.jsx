import { useEffect, useRef, useState } from "react"

const Board = ({mainMatrix, changeMainMatrix, index, checkMainWinner, turn, setTurn, winner, changeWinner, setOverlay, setMenu, reset}) => {

    const firstUpdate = useRef(true)
    
    useEffect(()=>{
        if (!firstUpdate.current){
        setTimeout(()=>{setMatrix([[0, 0, 0],
                  [0, 0, 0],
                  [0, 0,  0]])}, 1500)
        }
        else {
            firstUpdate.current = false
        }
    }, [reset])
    const [matrix, setMatrix] = useState([[0, 0, 0],
                                         [0, 0, 0],
                                         [0, 0,  0]])

    const move = (row, column) => {
        var newMatrix = [...matrix]
        if (matrix[row][column] === 0 && winner===0){
            newMatrix[row][column]=turn?1:-1
            setMatrix(newMatrix)
            setTurn(!turn)
            if (checkWinner())
            {   
                newMatrix = [...mainMatrix]
                newMatrix[index[0]][index[1]] = turn?1:-1
                changeMainMatrix(newMatrix)
                if (checkMainWinner()) {
                    console.log(`Gano ${turn?"X":"Circle"}`)
                    changeWinner(turn?1:-1)
                    setTimeout(()=>setOverlay("overlay active"), 1500)
                    setTimeout(()=>setMenu("menu menu-active"), 2500)
                }
                
            }
           
        }
    }

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

    return (
        <div className={`board ${mainMatrix[index[0]][index[1]] === 0?"": mainMatrix[index[0]][index[1]] === 1?"main-x":"main-circle"}`}>
            {matrix.map((level, row)=>level.map((cell, column)=><div onClick={()=>move(row, column)} key={row*3+column} className={`cell ${reset?"cell-reset":""} ${matrix[row][column]===0?"empty":matrix[row][column]===1?"x":"circle"}`}></div>))}
        </div>
    )
}

export default Board/*  */