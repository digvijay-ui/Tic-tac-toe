let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Neon sound effects (optional, can be muted)
const moveSound = new Audio('https://cdn.pixabay.com/audio/2022/10/16/audio_12b6fae3b2.mp3');
const winSound = new Audio('https://cdn.pixabay.com/audio/2022/10/16/audio_12b6fae3b2.mp3');
const drawSound = new Audio('https://cdn.pixabay.com/audio/2022/10/16/audio_12b6fae3b2.mp3');
moveSound.volume = 0.2; winSound.volume = 0.3; drawSound.volume = 0.2;

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  msgContainer.style.opacity = 0;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#00fff7";
    } else {
      box.innerText = "X";
      box.style.color = "#ff00ea";
    }
    // Neon click animation
    box.classList.add("neon-click");
    setTimeout(() => box.classList.remove("neon-click"), 350);
    moveSound.currentTime = 0; moveSound.play();
    turnO = !turnO;
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  msgContainer.style.opacity = 0;
  setTimeout(() => { msgContainer.style.opacity = 1; }, 10);
  drawSound.currentTime = 0; drawSound.play();
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.color = "#ff00ea";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  msgContainer.style.opacity = 0;
  setTimeout(() => { msgContainer.style.opacity = 1; }, 10);
  winSound.currentTime = 0; winSound.play();
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        // Neon win animation
        pattern.forEach(idx => {
          boxes[idx].classList.add("neon-win");
          setTimeout(() => boxes[idx].classList.remove("neon-win"), 1200);
        });
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);