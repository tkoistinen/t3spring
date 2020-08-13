import React from "react";

export interface SquareProps {
  index: number;
  value: string;
  setValue: (index: number) => void;
}

export const Square: React.FC<SquareProps> = ({ index, value, setValue }) => {
  return (
    <button className="square" onClick={() => setValue(index)}>
      {value}
    </button>
  );
};
