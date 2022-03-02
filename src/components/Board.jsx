import { useState } from "react"

const Board = ({mainMatrix, changeMatrix, index, checkMainWinner, checkMainTie, turn, setTurn}) => {
    
    const [matrix, setMatrix] = useState([[0, 0, 0],
                                         [0, 0, 0],
                                         [0, 0,  0]])

    const move = (row, column) => {
        var newMatrix = [...matrix]
        if (matrix[row][column] === 0){
            newMatrix[row][column]=turn?1:-1
            setMatrix(newMatrix)
            setTurn(!turn)
            if (checkWinner())
            {   
                newMatrix = [...mainMatrix]
                newMatrix[index[0]][index[1]] = turn?1:-1
                changeMatrix(newMatrix)
                if (checkMainWinner()) {
                    console.log(`Gano ${turn?"X":"Circle"}`)
                }
                if (checkMainTie()) {
                    console.log("General Tie")
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
        <div className={`board ${mainMatrix[index[0]][index[1]] === 0?"": mainMatrix[index[0]][index[1]] === 1?"main-x":"main-circle"}`}>
            {matrix.map((level, row)=>level.map((cell, column)=><div onClick={()=>move(row, column)} key={row*3+column} className={`cell ${matrix[row][column]===0?"empty":matrix[row][column]===1?"x":"circle"}`}></div>))}
        </div>
    )
}

export default Board/*  */