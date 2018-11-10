const game = new Game(0, phrases);
const startButton = document.getElementById('btn__reset');

startButton.addEventListener('click', (e) => {
  startButton.innerText == "Start Game" ? game.startGame() : game.resetGame();
  document.getElementById('overlay').style.display = "none";
});

function addLetterListeners() {
  const keys = document.getElementsByClassName("key");
  for(let key of keys) {
    key.addEventListener("click", (e) => {
      game.handleInteraction(e);
    });
   }

   document.addEventListener("keydown", (e) => {
    game.handleInteraction(e);
   });
}

addLetterListeners();