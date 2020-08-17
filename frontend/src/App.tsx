import React, { useEffect } from "react";
import "./App.css";
import { Board } from "./Board";
import axios from "axios";

interface historyMove {
  move: number;
  board: string[];
  nextPlayer: string;
  winner: string;
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

  let status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;

  const fetchData = async () => {
    let returnedData = await axios.get(`http://localhost:8080/game1/`);
    let newMove: historyMove = returnedData.data;

    setBoardState(newMove.board);
    setNextPlayer(newMove.nextPlayer);
    setWinner(newMove.winner);
  };

  const setSquare = async (index: number) => {
    if (winner === "" && boardState[index] === "") {
      let tempBoard: string[] = [...boardState];
      tempBoard[index] = nextPlayer;
      await axios.put(`http://localhost:8080/game1/`, tempBoard);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clearBoardClick = async () => {
    await axios.delete(`http://localhost:8080/game1/`);
    fetchData();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board boardState={boardState} setSquare={setSquare} />
      </div>
      <div className="game-info">
        <button onClick={() => clearBoardClick()}>
          Clear Board
        </button>
        <div>{status}</div>
      </div>
    </div>
  );
};

function App() {
  return <div className="App">{<Game />}</div>;
}

export default App;
