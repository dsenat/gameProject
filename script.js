let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

let keys = {};
let objects = [];
let enemies = [];
let healthBoosts = []
let score = 0
let scoreElement =
  document.querySelector("#score");
let startGameButton =
  document.querySelector("button.start-game");
let gameContainer =
  document.querySelector(".game-container");
let menuContainer =
  document.querySelector(".menu-container")
//images
let backgroundImage = document.createElement("img")
backgroundImage.src = "./hospital.jpg"
// backgroundImage.height = 300

let playerImage = document.createElement("img")
playerImage.src = "https://cdn0.iconfinder.com/data/icons/hospital-5/373/hospital011-512.png"
playerImage.width = 100
playerImage.height = 100

let objectImage = document.createElement("img")
objectImage.src = "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55781/person-walking-emoji-clipart-xl.png"

let healthImage = document.createElement("img")
healthImage.src = "https://images.vexels.com/media/users/3/208230/isolated/preview/d12575342c286a1437ee375b4f248fce-first-aid-kit-stroke-icon.png"

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  // y: 350 / 2,
  width: playerImage.width,
  height: playerImage.height,
  speed: 5,
  health: 100
};

//health boost
// let healthBoost = {
//   x: canvas.width,
//   y: Math.random() * (canvas.height - 200) + 20,
//   width: 30,
//   height: 30,
//   color: "#00FF00", //green
//   healthAmount: 20,
//   image: healthImage,
//   speed: 2,
// }

// Event listeners
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
startGameButton.addEventListener('click', startGame);
document.addEventListener("click", (e) => console.log(e.clientY))


// player movement
function handleKeyDown(event) {
  keys[event.keyCode] = true;
}

function handleKeyUp(event) {
  keys[event.keyCode] = false;
}

function handlePlayerMovement() {
  console.log(player.y)
  if (keys[37]) {  // Left arrow key
    player.x -= player.speed;
  }
  if (keys[39]) {  // Right arrow key
    player.x += player.speed;
  }
  if (keys[38]) {  // Up arrow key
    // if(player.y >= 480 ){
    //   player.y = 480
    // }
    // else if(player.y < 480 && player.y >= 240) {
    //   player.y += player.speed
    // }
    if(player.y >= 220 ){

      player.y -= player.speed;
    }
  }
  if (keys[40]) {  // Down arrow key
    player.y += player.speed;
  }
}

function update() {
  draw();
  handlePlayerMovement();
  drawPlayer();
  updateObjects();
  drawObjects();
  drawPeople();
  spawnPeople();
  spawnHealthBoost();
  // console.log(healthBoost)
  checkCollision();
  drawHealthBar()
  requestAnimationFrame(update);
}

// Draw fnctions
function draw() {
  drawHealthBar()
  context.clearRect(0, 0, canvas.width, canvas.height);
  //background/player image
  context.drawImage(playerImage, player.x, player.y, player.width, player.height)

  //gray background 
  context.fillStyle = "#b0b0ba" //Gray
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.drawImage(backgroundImage, 0, 0, canvas.width, 290)

  // Draw walls
  context.fillStyle = "#000000"; // Black
  context.fillRect(0, 0, canvas.width, 20);
  context.fillRect(0, canvas.height - 20, canvas.width, 20);
  context.fillRect(0, 0, 20, canvas.height);
  context.fillRect(canvas.width - 20, 0, 20, canvas.height);
}

//draw player
function drawPlayer() {
  // context.fillStyle = playerImage
  // context.fillRect(player.x, player.y, player.width, player.height);
  context.drawImage(playerImage, player.x, player.y, player.width, player.height)
}
//draw objects
function drawObjects() {
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];
    let objectWidth = 50
    let objectHeight = 50
    // context.fillStyle = obj.color;
    // context.fillRect(obj.x, obj.y, obj.width, obj.height);
    context.drawImage(objectImage, obj.x, obj.y, objectWidth, objectHeight)
  }
  for(let i = 0; i < healthBoosts.length; i++){
    let healthBoost = healthBoosts[i]
    let healthBoostWidth = healthBoost.width
    let healthBoostHeight = healthBoost.height
    context.drawImage(healthBoost.image, healthBoost.x, healthBoost.y, healthBoostWidth, healthBoostHeight)
  }
}
//draw enemies
function drawPeople() {
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    context.fillStyle = enemy.color;
    context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }
}
//health bar
function drawHealthBar() {
  let barWidth = 100;
  let barHeight = 10;
  let healthPercentage = player.health / 100;
  let fillWidth = barWidth * healthPercentage;

  let barX = canvas.width - barWidth - 10
  let barY = 10
  context.fillStyle = "#FF0000";  // Red color for health bar
  context.fillRect(barX, barY, barWidth, barHeight);

  context.fillStyle = "#00FF00";  // Green color for filled health
  context.fillRect(barX, barY, fillWidth, barHeight);
}

//health decrease
function updatePlayerHealth(value) {
  player.health += value;
  if (player.health <= 0) {
    player.health = 0;
    handleGameOver("Game Over! You Died");
  }
  if (player.health >= 100) {
    player.health = 100;
  }
}


// Object and enemy spawning
function spawnPeople() {
  if (Math.random() < 0.02) {
    let obj = {
      x: canvas.width,
      // adjust people going out of screen
      y: Math.floor(Math.random() * (480 - 240) + 240),
      width: 30,
      height: 30,
      color: "#FF0000", //red
      image: objectImage,
      speed: 3
    };
    objects.push(obj);
  }
}
  
  function spawnHealthBoost() {
    if (Math.random() < 0.01) {
      let healthBoost = {
        x: canvas.width,
        y: Math.floor(Math.random() * (480 - 240) + 240),
        width: 40,
        height: 40,
        color: "#0000FF", //blue
        image: healthImage,
        speed: 2,
        healthAmount: 20
      };
      console.log(healthBoost)
      healthBoosts.push(healthBoost);
    }
  }
  
  // Collision detection
function checkCollision() {
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];
    if (
      player.x < obj.x + obj.width &&
      player.x + player.width > obj.x &&
      player.y < obj.y + obj.height &&
      player.y + player.height > obj.y
    ) {
      updatePlayerHealth(-10);
      objects.splice(i, 1)
    }
  }

  // Collision detection between player and enemies
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      // Player collided with enemy decrease health
      updatePlayerHealth(-10);
      objects.splice(i, 1);
    }
  }
  //player & health boost
  for(let i = 0; i < healthBoosts.length; i++){
    let healthBoost = healthBoosts[i]
  if (
    player.x < healthBoost.x + healthBoost.width &&
    player.x + player.width > healthBoost.x &&
    player.y < healthBoost.y + healthBoost.height &&
    player.y + player.height > healthBoost.y
  ) {
    updatePlayerHealth(healthBoost.healthAmount)
    healthBoosts.splice(healthBoosts.indexOf(healthBoost), 1)
  }
} 
 //check collision with walls
  if (
    player.x < 20 ||                                          // Left wall
    player.x + player.width > canvas.width - 20 ||            // Right wall
    player.y < 20 ||                                          // Top wall
    player.y + player.height > canvas.height - 20             // Bottom wall
  ) {
    // player collided with a wall game over
    handleGameOver("Game Over! You collided with a wall.");
    // return;
  }

  // collision between player and objects
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];
    if (
      player.x < obj.x + obj.width &&
      player.x + player.width > obj.x &&
      player.y < obj.y + obj.width &&
      player.y + player.width > obj.y
    ) {
      console.log("dead")
      updatePlayerHealth(-10);
      objects.splice(i, 1);
      // i--
    }
  }



  // Collision detection between player and enemies
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      updatePlayerHealth(-10);
    }
  }
}



function handleGameOver(message) {
  alert(message);
  resetGame();
}

// Reset game
function resetGame() {
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.health = 100;
  player.speed = 5
  objects = [];
  enemies = [];

}

function startGame() {
  scoreElement.innerText = 'Score: 0'
  gameContainer.classList.remove('invisible');
  menuContainer.classList.add('invisible');
  draw();
}

// Object(people) and boosts update functions
function updateObjects() {
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];
    obj.x -= obj.speed;
    if (obj.x + obj.width < 0) {
      objects.splice(i, 1);
      i--;
    }
  }
  for(let i = 0; i < healthBoosts.length; i++){
    let healthBoost = healthBoosts[i]
    healthBoost.x -= healthBoost.speed
    if(healthBoost.x + healthBoost.width < 0){
      healthBoosts.splice(i,1)
      i--
    }
  }
}



requestAnimationFrame(update);

































