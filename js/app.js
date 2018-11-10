const game = new Game(0, phrases);
const startButton = document.getElementById('btn__reset');

startButton.addEventListener('click', (e) => {
  startButton.innerText == "Start Game" ? game.startGame() : game.resetGame();
  let overlay = document.getElementById("overlay");
  overlay.style.opacity = 0;
  overlay.style.display = "none";
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