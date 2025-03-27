import React, { useState, useRef, useEffect } from "react";
import { Board } from "./Board";
import { handleStatus } from "./Validation";
import "./Board.css"
import "./Wordle.css"

export function WordleGame() {
  const rows = 6;
  const cols = 5;

  const [wordList, setWordList] = useState([]);
  const [guesses, setGuesses] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );

  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  //array of status, one status for each tile
  const [status, setStatus] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );

  const [gameOver, setGameOver] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);

  //array of references so that the focus can be changed automatically
  const inputRefs = useRef(
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => React.createRef())
    )
  );

  const [targetWord, setTargetWord] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.datamuse.com/words?sp=?????&max=1000");
        const data = await response.json();
        const words = data.map((word) => word.word);
        setWordList(words);
        setTargetWord(words[Math.floor(Math.random() * words.length)].toUpperCase());
      } catch (error) {
        console.log(error);
        setWordList(["APPLE", "GRAPE", "STONE", "PLANE", "TABLE"]);
        setTargetWord(words[Math.floor(Math.random() * words.length)]);
      }
    };
    fetchData();
  }, []);

  const fetchNewTargetWord = () => {
    if (wordList.length > 0) {
    const newWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(newWord.toUpperCase());
    };
  };
  
  const resetGame = () => {
    setGuesses(Array.from({ length: rows }, () => Array(cols).fill("")));
    setStatus(Array.from({ length: rows }, () => Array(cols).fill("")));
    setCurrentRow(0);
    setCurrentCol(0);
    setGameOver(false);
    setPlayAgain(false);
    fetchNewTargetWord();
  };

  const handleInputChange = (e) => {
    if (gameOver === false) {
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
    }
  };

  const handleKeyDown = (e) => {
    const newGuesses = [...guesses];

    if (e.key === "Backspace" && gameOver === false) {
      if (
        currentCol === cols - 1 &&
        newGuesses[currentRow][currentCol] !== ""
      ) {
        newGuesses[currentRow][currentCol] = "";
        setCurrentCol(currentCol - 1);
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

    if (e.key === "Enter" && guesses[currentRow].every((g) => g !== "")) {
      if (currentCol === cols - 1) {
        const updatedStatus = handleStatus(
          newGuesses,
          targetWord,
          status,
          currentRow
        );
        setStatus(updatedStatus);
        if (updatedStatus[currentRow].every((s) => s === "correct")) {
          setGameOver(true);
          setPlayAgain(true);
          alert("You win!");
          return;
        }
        if (currentRow < rows - 1) {
          setCurrentRow(currentRow + 1);
          setCurrentCol(0);
          const nextInput = inputRefs.current[currentRow + 1]?.[0]?.current;
          if (nextInput) {
            nextInput.focus();
          }
        }
        if (
          currentRow === rows - 1 &&
          currentCol === cols - 1 &&
          updatedStatus[currentRow].every((s) => s !== "correct")
        ) {
          setGameOver(true);
          setPlayAgain(true);
          alert("Game Over! The word was " + targetWord);
          return;
        }
      }
    }

  };

  return (
    <div>
      <h1 className="title">Wordle</h1>
      <Board
        guesses={guesses}
        gameOver={gameOver}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        currentRow={currentRow}
        currentCol={currentCol}
        status={status}
      />
      {playAgain && (
        <button onClick={resetGame} className="play-again-button">
          Play Again
        </button>
      )}
    </div>
  );
}
