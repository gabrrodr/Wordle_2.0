import React from "react";
import "./Board.css";
import './Tile.css';
import { Tile } from "./Tile";

//result = prompt(title, [default]);
//confirm(question);
//alert(message);'

// const variable. i assigned a function to it so it makes it a react functional component
// guesses is the parameter of the function
// guesses comes from the App component. the guesses the user tries
// guesses is an array of rows
//each row is an array of letters
// map is going to iterate over the guesses array and transform into a grid

export function Board({ guesses, handleInputChange, handleKeyDown, currentRow, currentCol, status }) {
  return (
    <div className="grid">
      {guesses.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((letter, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              letter={letter}
              isActive={rowIndex === currentRow && colIndex === currentCol}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`tile${status[rowIndex]?.[colIndex]}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
