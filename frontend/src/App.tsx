import React from "react";
import "./App.css";
import { Board } from "./Board";
import axios from "axios";

interface historyMove {
  move: number;
  board: string[];
  nextPlayer: string;
}

const Game: React.FC = () => {
  const [boardState, setBoardState] = React.useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [nextPlayer, setNextPlayer] = React.useState<string>("X");
  const [winner, setWinner] = React.useState<string>("");
  const [history, setHistory] = React.useState<historyMove[]>([
    { move: 0, board: boardState, nextPlayer: nextPlayer },
  ]);
  const [moveNumber, setMoveNumber] = React.useState<number>(1);

  let status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;

  const setSquare = async (index: number) => {
    if (winner === "" && boardState[index] === "") {
      let tempBoard: string[] = [...boardState];
      tempBoard[index] = nextPlayer;
      let tempNextPlayer = nextPlayer === "X" ? "O" : "X";
      let tempHistoryMove = {
        move: moveNumber,
        board: tempBoard,
        nextPlayer: tempNextPlayer,
      };
      setBoardState(tempBoard);
      setNextPlayer(tempNextPlayer);
      calculateWinner(tempBoard);
      setMoveNumber(moveNumber + 1);
      setHistory([...history, tempHistoryMove]);
      axios.put(`https://tutorial.tylerkoistinen.com/game1/`, tempHistoryMove);
    }
  };

  const calculateWinner = (currentBoard: string[]) => {
    const winningStates = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningStates.forEach((line) => {
      if (
        currentBoard[line[0]] !== "" &&
        currentBoard[line[0]] === currentBoard[line[1]] &&
        currentBoard[line[0]] === currentBoard[line[2]]
      ) {
        setWinner(currentBoard[line[0]]);
      }
    });
  };

  const historyButtonClick = (move: historyMove) => {
    setBoardState(move.board);
    setHistory(history.slice(0, move.move));
    setMoveNumber(move.move);
    setNextPlayer(move.nextPlayer);
    setWinner("");
  };

  const serverUpdateClick = async () => {
    let returnedData = await axios.get(
      `https://tutorial.tylerkoistinen.com/game1/`
    );
    let newMove: historyMove = returnedData.data;

    setBoardState(newMove.board);
    setNextPlayer(newMove.nextPlayer);
    setMoveNumber(newMove.move + 1);
    setHistory([...history, newMove]);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board boardState={boardState} setSquare={setSquare} />
      </div>
      <div className="game-info">
        <button onClick={() => serverUpdateClick()}>
          Check Server For Updates
        </button>
        <div>{status}</div>
        <ol>
          {history.map((move) => {
            return (
              <li key={move.move}>
                <button onClick={() => historyButtonClick(move)}>
                  Go to move #{move.move}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

function App() {
  return <div className="App">{<Game />}</div>;
}

export default App;
