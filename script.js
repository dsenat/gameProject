let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

let playerSize = 25;
let stretcherWidth = 70;
let stretcherHeight = 20;

let movementSpeed = 30;

let playerX = canvas.width / 2 - playerSize / 2;
let playerY = canvas.height - playerSize;

let stretcherX = canvas.width / 2 - stretcherWidth / 2;
let stretcherY = canvas.height - stretcherHeight / 2;


let playerRow = 6;
let playerCol = 1;

let stretcherRow = 6;
let stretcherCol = 2;

const mapWidth = 10;
const mapHeight = 8;

const cellWidth = canvas.width / mapWidth;
const cellHeight = canvas.height / mapHeight;

const mapData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];


// Draw map
function drawMap() {
    for (let row = 0; row < mapHeight; row++) {
        for (let col = 0; col < mapWidth; col++) {
            const cell = mapData[row][col];
            const x = col * cellWidth;
            const y = row * cellHeight;

            if (cell === 1) {
                // Draw walls
                context.fillStyle = '#82A6B1'; //lightblue
                context.fillRect(x, y, cellWidth, cellHeight);
            } else {
                // Draw floors
                context.fillStyle = '#FFFFFF'; //white
                context.fillRect(x, y, cellWidth, cellHeight);

                // Random obstacles
                if (Math.random() < 0.1) {
                    context.fillStyle = "#FF0000"; //red
                    context.fillRect(x + cellWidth * 0.25, y + cellHeight * 0.25, cellWidth * 0.5, cellHeight * 0.5);
                }

                // Random events?
                if (Math.random() < 0.05) {
                    context.fillStyle = "#00FF00"; //green
                    context.beginPath();
                    context.arc(x + cellWidth * 0.5, y + cellHeight * 0.5, cellWidth * 0.4, 0, 2 * Math.PI);
                    context.fill();
                }
            }
        }
    }
    //player and stretcher attached
    const positionX = playerCol * cellWidth + playerSize;
    const positionY = playerRow * cellHeight + (cellHeight - playerSize) / 2;

    context.fillStyle = "#66462C"; //brown player
    context.fillRect(positionX, positionY, playerSize, playerSize);

    const stretcherX = positionX + playerSize;
    const stretcherY = positionY + (playerSize - stretcherHeight) / 2;

    context.fillStyle = "#E072A4"; //pink stretcher
    context.fillRect(stretcherX, stretcherY, stretcherWidth, stretcherHeight);

}
//arrow function & buttons                                                                                                                                                                                                                                                                 
const handleKeyPress = (e) => {
    const key = e.key || e.keyCode;

    if (key === "ArrowUp" || key === "38") {
        playerRow -= 1;
        stretcherRow -= 1;
    } else if (key === "ArrowDown" || key === "40") {
        playerRow += 1;
        stretcherRow += 1;
    } else if (key === "ArrowLeft" || key === "37") {
        playerCol -= 1;
        stretcherCol -= 1;
    } else if (key === "ArrowRight" || key === "39") {
        playerCol += 1;
        stretcherCol += 1;
    }

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawMap();
};


document.addEventListener("keydown", handleKeyPress);

//collision detection

drawMap();









































