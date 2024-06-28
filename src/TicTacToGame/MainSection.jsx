import { useState } from "react";
import styled from "styled-components";
import Board from "./components/Board";
import User from "./User";
import Title from "./Title";
import PlayerInfo from "./components/PlayerInfo";
import Log from "./components/Log";
import { Winning_Combinations } from "./Winning_Combinations";
import GameOver from "./components/GameOver";
const MainBackground = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PlayersWrap = styled.ol`
  width: 40rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
//배열 자체를 주어야 하기때문에 {gameTurns} 전달하면 안됨

//부모 컴포넌트로 상태 끌어올리기
const PLAYERS = {
  X: "player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arrays) => [...arrays])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of Winning_Combinations) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function MainSection() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";
    //마지막 턴이 x였을 경우
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
    }
    return currentPlayer;
  }

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasdraw = gameTurns.length === 9 && !winner;
  //굳이 중복된 상태를 쓸 필요없음
  //const [hasWinner, setHasWinner] = useState(false);
  const activePlayer = deriveActivePlayer(gameTurns);
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        //앞에 추가함으로써 마지막에 접근하기 용이
        //앞에 것이 가장 최신 것이므로
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        //이전 객체 복사
        ...prevPlayers,
        //새로운 속성을 추가
        //키값 value값
        [symbol]: newName,
      };
    });
  }
  return (
    <MainBackground>
      <Title></Title>
      <PlayersWrap>
        <PlayerInfo
          initialName={players["X"]}
          mark={"X"}
          isActive={activePlayer === "X"}
          onChangeName={handlePlayerNameChange}
        ></PlayerInfo>
        <PlayerInfo
          initialName={players["O"]}
          mark={"O"}
          isActive={activePlayer === "O"}
          onChangeName={handlePlayerNameChange}
        ></PlayerInfo>
      </PlayersWrap>
      {(winner || hasdraw) && (
        <GameOver winner={winner} RematchClick={handleRestart}></GameOver>
      )}
      <Board onSelectSquare={handleSelectSquare} board={gameBoard}></Board>
      <Log turns={gameTurns}></Log>
    </MainBackground>
  );
}

export default MainSection;
