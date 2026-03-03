let btnColors = ["red", "yellow", "green", "purple"];

let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;

let startBtn = document.querySelector(".start");
let h2 = document.querySelector("h2");
let maxScore = 0;


startBtn.addEventListener("click", function(){
  if (started == false){
    started = true;
    startBtn.classList.add("hidden");
    levelUp();
  }
});


function gameFlash(btn){
  btn.classList.add("gameflash");
  setTimeout(() => {
    btn.classList.remove("gameflash");
  }, 250);
}

function userFlash(btn){
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}


function levelUp(){
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // random button flash
  let randIdx = Math.floor(Math.random()*4);
  let randColor = btnColors[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);
  gameFlash(randBtn);
  gameSeq.push(randColor);
}

function checkAns(idx){
  if (userSeq[idx] == gameSeq[idx]){
    if (userSeq.length == gameSeq.length){
      setTimeout(() => {
        levelUp();
      }, 1000);
    }
  }
  else{
    h2.innerHTML = `Game Over! Your current score is "<b>${level}</b>"`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    updateMaxScore();
    reset();
  }
}

function btnPress(){
  if (!started) return;
  
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
  btn.addEventListener("click", btnPress);
}

function updateMaxScore(){
  maxScore = Math.max(level, maxScore);
  document.querySelector("h3 span").innerText = maxScore;
}

function reset(){
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  startBtn.innerText = "Restart";
  startBtn.classList.remove("hidden");
}


