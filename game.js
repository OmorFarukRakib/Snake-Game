import { draw as drawFood, update as updateFood } from './food.js'
import { outsideGrid } from './grid.js'
import { draw as drawSnake, getSnakeHead, snakeIntersection, SNAKE_SPEED, update as updateSnake } from './snake.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')



///////////////////////

var dancingSnakeLeftPos = 0;
const dancingSnakeTopPos = () => {
  return Math.floor(Math.random() * 100)

}

function dancingSnakeTopPosition() {
  var dancingSnake = document.getElementsByClassName('dancing-snake')
  if(dancingSnakeLeftPos > 120){
    dancingSnakeLeftPos = -20;
    var newTopPos = dancingSnakeTopPos();
    dancingSnake[0].style.top = `${newTopPos}%`

  }
  let newLeft = dancingSnakeLeftPos += 0.22;
  // dancingSnake.style.left = newSpeed
  dancingSnake[0].style.left = `${newLeft}%`
  // console.log(dancingSnake[0].style);
  // dancingSnake.addEventListener('clicked', ok);
  // console.log("hoiseeeee");
}


//////////////////////

const highScoreRenderInScreen = () => {
  if(localStorage.getItem("snake-game-high-score")){
    let highScoreSpan = document.getElementById("high-score-span"); 
    highScoreSpan.textContent = localStorage.getItem("snake-game-high-score");
  }
}


function main(currentTime) {

  highScoreRenderInScreen();
  dancingSnakeTopPosition()

  if (gameOver) {
    alert("NOOB!!!! YOU LOST!!! ");
    window.location = 'https://omorfarukrakib.github.io/Snake-Game/'
//     if (confirm('You lost. Press ok to restart.')) {
//       window.location = 'https://omorfarukrakib.github.io/Snake-Game/'
//     }
//     return
  }




  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
