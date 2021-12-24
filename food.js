import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition()
const EXPANSION_RATE = 5
var span = document.getElementById("score-span"); 
var score = 0;


const updateScore =() => {
  score +=5;
  span.textContent = `${score}`;
  if(localStorage.getItem("snake-game-high-score")){
    if(score > localStorage.getItem("snake-game-high-score")){
      localStorage.setItem("snake-game-high-score", score);
    }
  }
  else{
    localStorage.setItem("snake-game-high-score", score);
  }
}


export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)
    updateScore();
    food = getRandomFoodPosition()
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}