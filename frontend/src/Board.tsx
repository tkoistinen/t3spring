import React from "react";
import { Square } from "./Square";

export interface BoardProps {
  boardState: string[];
  setSquare: (index: number) => void;
}

export const Board: React.FC<BoardProps> = ({ boardState, setSquare }) => {
  return (
    <div>
      <div className="board-row">
        <Square index={0} value={boardState[0]} setValue={setSquare} />
        <Square index={1} value={boardState[1]} setValue={setSquare} />
        <Square index={2} value={boardState[2]} setValue={setSquare} />
      </div>
      <div className="board-row">
        <Square index={3} value={boardState[3]} setValue={setSquare} />
        <Square index={4} value={boardState[4]} setValue={setSquare} />
        <Square index={5} value={boardState[5]} setValue={setSquare} />
      </div>
      <div className="board-row">
        <Square index={6} value={boardState[6]} setValue={setSquare} />
        <Square index={7} value={boardState[7]} setValue={setSquare} />
        <Square index={8} value={boardState[8]} setValue={setSquare} />
      </div>
    </div>
  );
};
