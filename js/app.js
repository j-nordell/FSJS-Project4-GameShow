const game = new Game(0, phrases);
const startButton = document.getElementById('btn__reset');
const overlay = document.getElementById("overlay");

startButton.addEventListener('click', (e) => {
  startButton.innerText == "Start Game" ? game.startGame() : game.resetGame();
  overlay.classList.add("animated", "slideOutUp");
});

document.addEventListener("keydown", (e) => {
  if(e.keyCode == 13 && !game.started) {
   startButton.innerText == "Start Game" ? game.startGame() : game.resetGame();
   overlay.classList.add("animated", "slideOutUp");
  }
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