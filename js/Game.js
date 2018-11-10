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
    this.missed = missed;
    this.currentPhrase = null;
  }

  /**
   * Get a random phrase from the phrases array and return it
   * @return {string} randomPhrase from phrases array
   */
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)].toUpperCase();
  }

  /**
   * Check to see if the button (or key) used by the player
   * matches a letter in the Phrase
   * @param {Object} e the global event object 
   */
  handleInteraction(e) {
  
    let letter = e.type == "keydown" ? e.key.toUpperCase() : e.target.innerText.toUpperCase();
    let allowedLetters = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    let hasLetter = false;

    if(allowedLetters.includes(letter)) {
      hasLetter = this.currentPhrase.checkLetter(letter);
    } 
    // hasLetter ? this.currentPhrase.showMatchedLetter(letter) : this.removeLife();
    if(hasLetter) {
      this.currentPhrase.showMatchedLetter(letter);
      this.checkForWin();
    } else {
      this.removeLife();
    }
  }

  /**
   * Remove a life from lives remaining if lives is not 0
   */
  removeLife() {
    this.missed += 1;
    if(this.missed == 5) {
      this.gameOver("lose");
    }

    let heartList = document.getElementsByClassName("tries");
    heartList[5 - this.missed].style.display = "none";
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
    if(win) {this.gameOver("win")};
  }

  /**
   * Display the win/lose message as appropriate
   * @param {string} - "win" for win and "lose" for lose
   */
  gameOver(winLose) {
    alert(`You ${winLose}`);
  }

  /**
   * Start the game
   */
  startGame() {
    let randomPhrase = this.getRandomPhrase();
    this.currentPhrase = new Phrase(randomPhrase);
    this.currentPhrase.addPhraseToDisplay();
  }
}