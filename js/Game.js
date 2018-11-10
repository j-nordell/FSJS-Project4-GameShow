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
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /**
   * Check to see if the button (or key) used by the player
   * matches a letter in the Phrase
   * @param {Object} e the global event object 
   */
  handleInteraction(e) {
    console.log(e.target);
  }

  /**
   * Remove a life from lives remaining if lives is not 0
   */
  removeLife() {
  
  }

  /**
   * Check to see if the player has guessed all letters
   */
  checkForWin() {

  }

  /**
   * Display the win/lose message as appropriate
   */
  gameOver() {

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