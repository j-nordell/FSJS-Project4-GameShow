class Phrase {
  /**
   * 
   * @param {string} phrase 
   */
  constructor(phrase) {
    this.phrase = phrase;
  }

  addPhraseToDisplay() {
    let phraseHtml = '';
    let phraseUl = document.getElementById("phrase").getElementsByTagName("ul")[0];
    console.log(this.phrase);

    for(let i = 0; i < this.phrase.length; i++) {
      if(this.phrase[i] !== " ") {
        phraseHtml +=  `<li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>`;
      } else {
        phraseHtml += `<li class="hide space"> </li>`;
      }
    }

    phraseUl.innerHTML = phraseHtml;
  }

  checkLetter() {

  }

  showMatchedLetter() {
    
  }
}