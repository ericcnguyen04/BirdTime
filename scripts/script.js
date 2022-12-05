const canvas = document.getElementById('game-screen')

// set thecanvas resolution to be the same as the screen
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])
console.log(canvas.height) //648
console.log(canvas.width) //1094


//get rendering context from canvas
const ctx = canvas.getContext('2d')

const gameLoopInterval = setInterval(gameLoop, 60)

// === ! Step 1: OBJECTS ! === //
class Bird {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }
    
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// class Pipe {
//     constructor(x, y, width, h1, h2) {
//         this.x = x
//         this.y = y
//         this.width = width
//         // this.gap = gap
//         this.h1 = h1
//         this.h2 = h2
//         // this.h3 = h3
//         // this.h4 = h4
//     }

//     render() {
//         ctx.fillStyle = this.color
//         ctx.fill(this.x, this.y, this.width, this.h1)
//         ctx.fill(this.x, this.y, this.width, this.h2)
//     }
//}

// randomizing pipes
const pipeGap = 120
const getPipeAvaliability = canvas.height - pipeGap - 40
console.log(getPipeAvaliability + 'aval')

function getRandomInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

console.log(getRandomInteger(0, getPipeAvaliability))

pipeHeight = 20 + getRandomInteger(0, getPipeAvaliability)
pipe2Height = 20 + (getPipeAvaliability - pipeHeight)
console.log(pipe2Height +'pip2 hei' + pipeHeight + ' pip1')

//testing
const testBird = new Bird(250, 270, 50, 50, 'red')
let gameFlight = false
const pipe = new Bird(900, 0, 70, pipeHeight, 'green')
const pipe2 = new Bird(900, canvas.height, 70, -(pipe2Height), 'green')


// ========== //


// === ! Step 2: USER INPUT ! === //
//start button
const start = document.getElementById('start')
const clickRestart = start.addEventListener('click', () => {
    gameFlight = true
    start.innerText = "FLY"
    // pipeMovement(15)
})


//bounce
const pressedKeys = {}
function controlInput(bounce) {
    if (gameFlight == true) {
        // console.log(pressedKeys)
        if (pressedKeys.w) {
            // console.log('bounce')
            gameFlight == true
            testBird.y -= bounce
            pipe.x -= 35
            pipe2.x -= 35
        } else {
            // console.log('falling')
            testBird.y += 15
        }
    }
}

//restart
function restartInput() {
    if (pressedKeys.r) {
        testBird.x = 250
        testBird.y = 270
        start.innerText = "CLICK TO PLAY"
    }
    if (gameFlight == false) { // STARTS OFF IMMEDIATELY
        start.addEventListener('click', () => {
            gameFlight == false
            testBird.x = 250
            testBird.y = 270
            start.innerText = "FLY"
        })
    }
}

//needed game loop interval // line 13
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false)

// === ! Step 3: DEFINE GAME LOOP ! === //

function gameLoop() {
    //clearing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //detecting hits from bird to ground
    if (detectHitGround(testBird)) {
        console.log('gameover')
        gameFlight = false
        start.innerText = "RESTART?"
        restartInput()
    } else if (detectHitPipe(testBird, pipe)) {
        console.log('gameover')
        gameFlight = false
        start.innerText = "RESTART?"
        restartInput()
    } else if (detectHitPipe2(testBird, pipe2)) {
        console.log('gameover')
        gameFlight = false
        start.innerText = "RESTART?"
        restartInput()
    } else {
        controlInput(35)
    }

    //render game objects
    testBird.render()

    // //pipe movement
    // function pipeMovement(speed) {
    //     while (gameFlight === true) {
    //         pipe.x -= speed
    //     }
    // }

    pipe.render()
    pipe2.render()
}

// ========== //


// === ! Step 4: FIND COLLISION / LOSE CONDITION! === // 
function detectHitGround(objOne) {
    const topOfGround = objOne.y + objOne.height >= canvas.height
    // console.log(topOfGround)
    return topOfGround //false til true
}

function detectHitPipe(player, obstacle) {
    const hitTopPipe = player.x + player.width >= obstacle.x && player.x <= obstacle.x + obstacle.width && player.y <= obstacle.y + obstacle.height
    // player.y <= obstacle.y + obstacle.height
    // const hitTopPipe = player.y <= obstacle.y + obstacle.height
    // const hitBotPipe = player.x + player.height ==
    // console.log(hitTopPipe)
    // console.log(hitTopPipe)
    return hitTopPipe //|| hitTopPipe //false til true
}
function detectHitPipe2(player, obstacle) {
    const hitBotPipe = player.x + player.width >= obstacle.x 
    const hitSidePipe = player.x <= obstacle.x + obstacle.width
    const hitAbovePipe = player.y + player.height >= canvas.height - Math.abs(obstacle.height)
    return(hitBotPipe && hitSidePipe && hitAbovePipe)
    
    // player.y <= obstacle.y + obstacle.height
}
// ========== //

