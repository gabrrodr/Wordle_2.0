import React, { useState, useRef } from "react";
import { Board } from "./Board";
import { handleStatus } from "./Validation";
import "./Board.css"
import "./Wordle.css"

/*const resetGame = () => {
  setTargetWord(words[Math.floor(Math.random() * words.length)]);
};*/

export function WordleGame() {
  //number of rows and cols of the board
  const rows = 6;
  const cols = 5;

  const wordList = ["atrio", "fossa", "dotes", "parvo", "Vasco"];
  //array of guesses (rows and cols)
  const [guesses, setGuesses] = useState(
    Array.from({ length: rows }, () => Array(cols).fill("")));

  //the row we are currently handling and the column
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  //array of status, one status for each tile
  const [status, setStatus] = useState(
    Array.from({length: rows}, () => Array(cols).fill("")));

  //array of references so that the focus can be changed automatically
  const inputRefs = useRef(Array.from({ length: rows }, () => Array.from({ length: cols }, () => React.createRef())));
  
  //randomly select a word from the list that is the answer
  const [targetWord] = useState(
    wordList[Math.floor(Math.random() * wordList.length)]);

  //console.log("Target Word: ", targetWord);

  //every tile is an input field. user types letter and its stored in the guesses array in the correct row and column
  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    const newGuesses = [...guesses];
    if (value.length == 1 && value.match(/[A-Z]/)) {
      newGuesses[currentRow][currentCol] = value;
      setGuesses(newGuesses);
    }
    if (currentCol < cols - 1) {
      setCurrentCol(currentCol + 1);
      const newInput = inputRefs.current[currentRow][currentCol + 1].current;
      if (newInput) {
        inputRefs.current[currentRow][currentCol + 1].current.focus();
      }
    }
  };
    
  //console.log("Current Row: ", currentRow);
  //console.log("Current Col: ", currentCol);
    
  const handleKeyDown = (e) => {
    const newGuesses = [...guesses];

    if (e.key === "Backspace") {
      if (currentCol === cols - 1 && newGuesses[currentRow][currentCol] !== "") {
        newGuesses[currentRow][currentCol] = "";
        setCurrentCol(currentCol - 1);
        //setGuesses(newGuesses);
      } else if (currentCol > 0) {
        newGuesses[currentRow][currentCol - 1] = "";
        setCurrentCol(currentCol - 1);
      } else {
        newGuesses[currentRow][currentCol] = "";
      } 
        setGuesses(newGuesses);
        
        const newInput = inputRefs.current[currentRow][currentCol - 1].current;
        if (newInput) {
          inputRefs.current[currentRow][currentCol - 1].current.focus();
        }
    }

    /*combine current row for it to be a word
    check if the column is filled till the end
    check if the written word matches with the target word
    if it finds a letter that its the same but different index - good
    if it finds a letter that its the same and the same index*/

    if (e.key === "Enter") {
      if (currentCol === cols - 1) {
        const updatedStatus = handleStatus( newGuesses, targetWord, status, currentRow);
        setStatus(updatedStatus);
        if (currentRow < rows - 1) {
          setCurrentRow(currentRow + 1);
          setCurrentCol(0);
          const nextInput = inputRefs.current[currentRow + 1]?.[0]?.current;
          if (nextInput) {
            nextInput.focus();
          }
        }
      }
    }
  };
    
  return (
    <div>
      <h1 className="title">Wordle</h1>
      <Board
        guesses={guesses}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        currentRow={currentRow}
        currentCol={currentCol}
        status={status}
      />
    </div>
  );
}
