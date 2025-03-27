import "./Board.css"

export function handleStatus(guesses, targetWord, status, currentRow) {
  
    //transform in upper to be able to compare
    targetWord = targetWord.toUpperCase();
    const currentGuess = guesses[currentRow].join("").toUpperCase();
    //console.log("Current Guess: ", currentGuess);

    const statusArray = [...status];
    const targetLetters = targetWord.split("");

    for (let i = 0; i < currentGuess.length; i++) {
        if (currentGuess[i] === targetWord[i]) {
            statusArray[currentRow][i] = "correct";
            targetLetters[i] = null;
        } 
    }
    
    //console.log("after correct check: ", statusArray);
        
    for (let i = 0; i < currentGuess.length; i++) {
        if (statusArray[currentRow][i] === "correct") {
            continue;
        }
        if (targetLetters.indexOf(currentGuess[i]) !== -1) {
            statusArray[currentRow][i] = "present";
            targetLetters[targetLetters.indexOf(currentGuess[i])] = null;
        } else {
            statusArray[currentRow][i] = "absent";
        }
    }
    //console.log("Final status: ", statusArray);
    return statusArray;
}

