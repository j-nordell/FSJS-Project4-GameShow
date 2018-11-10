class Phrase {
  /**
   * Constructor for the Phrase class
   * @param {string} phrase 
   */
  constructor(phrase) {
    this.phrase = phrase;
  }

  /**
   * Adds the HTML to the DOM to represent the boxes which form the phrase
   */
  addPhraseToDisplay() {
    let phraseHtml = '';
    let phraseUl = document.getElementById("phrase").getElementsByTagName("ul")[0];

    for(let i = 0; i < this.phrase.length; i++) {
      if(this.phrase[i] !== " ") {
        phraseHtml +=  `<li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>`;
      } else {
        phraseHtml += `<li class="hide space"> </li>`;
      }
    }

    phraseUl.innerHTML = phraseHtml;
  }

  /**
   * Checks to see if the phrase contains the letter sent
   * @param {string} letter   - The letter generated by the user's event
   * @return {boolean}  - returns true or false based on the phrase containing the guessed letter
   */
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }

  /**
   * Shows any letters that match the user's guess
   * @param {string} letter 
   */
  showMatchedLetter(letter) {
    let itemList = document.querySelectorAll("#phrase li");
    for(let item of itemList) {
      if(item.innerText == letter) {
        item.classList.add("show");
      }
    }
  }
}