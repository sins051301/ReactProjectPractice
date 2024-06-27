import { useState } from "react";
import styled from "styled-components";

const MainBackground = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2%;
  margin-bottom: 1%;
  justify-content: center;
  border: 1px solid gray;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
`;

const PartialBoard = styled.button`
  width: 10rem;
  height: 10rem;
  border: 1px solid gray;
  font-size: 5rem;
`;


function Board({ onSelectSquare, board }) {
 
  // //항상 상태를 변경할 때는 변경 불가능하게 만들어야 함
  // function handleSelectSquare(rowIndex, colIndex, symbol) {
  //   //스프레드 연산자로 복제
  //   setGameBoard((prevGameBoard) => {
  //     const updateBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updateBoard[rowIndex][colIndex] = symbol;
  //     return updateBoard;
  //   });
  // }
  return (
    <>
      {board.map((row, rowIndex) => {
        return (
          <MainBoard key={rowIndex}>
            {row.map((playerSymbol, colIndex) => (
              <PartialBoard
                key={colIndex}
                onClick={() => {
                  onSelectSquare({ rowIndex, colIndex });
                }}
                disabled={playerSymbol !== null}
              >
                {playerSymbol}
              </PartialBoard>
            ))}
          </MainBoard>
        );
      })}
    </>
  );
}

export default Board;
