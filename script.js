let canvas = document.getElementById("gameCanvas")
let context = canvas.getContext("2d")

let playerX = canvas.width / 3
let playerY = canvas.height / 1.5
let playerSize = 25

let stretcherX = playerX - playerSize - 20
let stretcherY = playerY
let stretcherWidth = 70
let stretcherHeight = 20

let movementSpeed = 5

let keys = {}

// document.addEventListener("keyup", keyUpHandler, false )



const handleKeyPress = (e) => {
    if (e.key === 'ArrowUp') {
        playerY -= movementSpeed
        stretcherY -= movementSpeed
    } else if (e.key === 'ArrowDown') {
        playerY += movementSpeed
        stretcherY += movementSpeed
    } else if (e.key === 'ArrowLeft') {
        playerX -= movementSpeed
        stretcherX -= movementSpeed
    } else if (e.key === 'ArrowRight') {
        playerX += movementSpeed
        stretcherX += movementSpeed

    }
}

document.addEventListener("keydown", handleKeyPress)

// function moveAround() {
//     if (keys[37]) {
//         playerX -= movementSpeed
//         stretcherX -= movementSpeed
//     }
//     if (keys[39]) {
//         playerX += movementSpeed
//         stretcherX += movementSpeed
//     }
//     draw()

//     requestAnimationFrame(draw)
// }

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    //players view
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height)

    //draw player
    context.fillStyle = "#00ff00";
    context.fillRect(playerX, playerY, playerSize, playerSize)

    //draw stretcher
    context.fillStyle = "#ff0000"
    context.fillRect(stretcherX, stretcherY, stretcherWidth, stretcherHeight)

    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)

