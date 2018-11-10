class Game {
  /**
   * Constructor for the Game class
   * Creates a new instance of Game with properties missed and
   * an array oh phrases
   * @param {number} missed 
   * @param {Array[Object]} phrases 
   */
  constructor(missed, phrases) {
    this.missed = missed;
    this.phrases = phrases;
    this.usedPhrases = [];
    this.missed = missed;
    this.currentPhrase = null;
    this.lastPhrase = null;
    this.allowedLetters = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];
  }

  /**
   * Get a random phrase from the phrases array and return it
   * Logic to ensure the same phrase doesn't appear twice in a row
   * Logic to ensure that every phrase is displayed once before repeating barring a refresh of the browser
   * @return {string} randomPhrase from phrases array
   */
  getRandomPhrase() {

    // When phrases is empty refill it from the used phrases pool and empty used phrases array
    if(this.phrases.length === 0) {
      this.phrases = this.usedPhrases;
      this.usedphrases = [];
      return getRandomQuote(); // Recursion to get a random phrase once everything is set up
  } else {
      let randomIndex = Math.floor(Math.random() * this.phrases.length);
      // if the the currently selected index contains the same phrase that was shown last time, pick another
      // This is otherwise possible when the phrases is refilled from the used phrases
      while(this.phrases[randomIndex] == this.lastPhrase) {
        randomIndex = Math.floor(Math.random() * this.phrases.length);
      }
      // remove the random phrase from the phrases list and add it to used phrases list
      const randomPhrase = this.phrases.splice(randomIndex, 1)[0].toUpperCase(); // This simultaneously gets the object at a random index and removes it from the quotes array
      this.usedPhrases.push(randomPhrase);
      return randomPhrase;
  }
}

  /**
   * Check to see if the button (or key) used by the player
   * matches a letter in the Phrase
   * @param {Object} e the global event object 
   */
  handleInteraction(e) {
  
    let letter = e.type == "keydown" ? e.key.toUpperCase() : e.target.innerText.toUpperCase();
    let hasLetter = false;
    let overlay = document.getElementById("overlay");
   
    // Added so the user can play entirely using the keyboard instead of clicking the start game button
    if(e.keyCode == 13 && overlay.style.display != "none") {
      overlay.style.display = "none";
      this.resetGame();
    }

    // Check against the allowed characters in guesses to prevent loss of life
    // when non-letter keys are pressed. Also prevents loss of life if an incorrect
    // letter is pressed more than once
    if(this.allowedLetters.includes(letter)) {
      hasLetter = this.currentPhrase.checkLetter(letter);
      let index = this.allowedLetters.indexOf(letter);
      this.allowedLetters.splice(index, 1);
      this.disableLetterButton(letter);

      if(hasLetter) {
        this.currentPhrase.showMatchedLetter(letter);
        this.checkForWin();
      } else {
        this.removeLife();
      }
    } 
    
  }

  /**
   * Remove a life from lives remaining if lives is not 0
   */
  removeLife() {
    this.missed += 1;
    if(this.missed == 5) {
      this.gameOver("lose");
    } else {
      let heartList = document.getElementsByClassName("tries");
      heartList[5 - this.missed].style.display = "none";
    }
  }

  /**
   * Check to see if the player has guessed all letters
   * @return {boolean} - returns whether the game has been won or not
   */
  checkForWin() {
    let win = true;
    let letterBoxes = document.getElementsByClassName("letter");

    for(let box of letterBoxes) {
      if(box.style.color != "rgb(0, 0, 0)") {
        win = false;
      }
    }
  
    if(win) {
      this.gameOver("win");
    }
  }

  /**
   * Display the win/lose message as appropriate
   * @param {string} - "win" for win and "lose" for lose
   */
  gameOver(winLose) {
    let message = winLose == "win" ? 
      winningMessages[Math.floor(Math.random() * winningMessages.length)] :
      losingMessages[Math.floor(Math.random() * losingMessages.length)];

    let overlay = document.getElementById("overlay");
    overlay.style.display = "inherit";
    overlay.classList.remove("win", "lose");
    overlay.classList.add(winLose);
    document.getElementById("game-over-message").innerText = message;
    document.getElementById("btn__reset").innerHTML = "Play again";
   }

   /**
    * Disable the on screen button for this letter
    * @param {string} letter - The letter we need to disable the button for
    */
  disableLetterButton(letter) {
    let buttons = document.getElementsByClassName("key");
    for(let button of buttons) {
      if(button.innerText == letter) {
        button.disabled = true;
      }
    }
  }

  /**
   * Start the game
   */
  startGame() {
    let randomPhrase = this.getRandomPhrase();
    this.currentPhrase = new Phrase(randomPhrase);
    this.currentPhrase.addPhraseToDisplay();
  }

  /**
   * Simple method to ensure hearts are enabled
   */
  enableHearts() {
    let hearts = document.getElementsByClassName("tries");
    for(let heart of hearts) {
      heart.style.display = "";
    }
  }

  /**
   * Method to re-enable all previously disabled buttons upon reset
   */
  enableButtons() {
    let buttons = document.getElementsByClassName("key");
    for(let button of buttons) {
      button.disabled = false;
    }
  }

  /**
   * Reset the game to mostly its initial values. Because not everything
   * will be reset to beginning values it's important to have this in place.
   */
  resetGame() {
    document.getElementById("btn__reset").innerHTML = "Play again";
    this.lastPhrase = this.currentPhrase;
    this.enableButtons();
    this.enableHearts();
    this.missed = 0;
    this.allowedLetters = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];
    this.startGame();
  }
}