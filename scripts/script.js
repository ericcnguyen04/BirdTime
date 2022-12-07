const canvas = document.getElementById('game-screen')

// set thecanvas resolution to be the same as the screen
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])
//console.log(canvas.height + 'h') //648
//console.log(canvas.width + 'w') //1094


//get rendering context from canvas
const ctx = canvas.getContext('2d')

//background
background = new Image()
background.src = 'background3.png'
background.width = canvas.width
background.height = canvas.height

//sound
const audio = new Audio('point.mp3')
const audioFail = new Audio('fail.mp3')


const gameLoopInterval = setInterval(gameLoop, 16)

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

// randomizing pipes height
const easy = document.getElementById('easy')
const normal = document.getElementById('normal')
const hard = document.getElementById('hard')

let pipeGap = 400
let getPipeAvaliability = canvas.height - pipeGap - 40
console.log(easy.checked)
console.log(normal.checked)
function difficultySelect () {
    if (normal.checked) {
        // console.log('normal mode')
        pipeGap = 140
    } else if (hard.checked) {
        pipeGap = 110
    } else if (easy.checked) {
        console.log('ez mode')
        pipeGap = 250
    }
    getPipeAvaliability = canvas.height - pipeGap - 40
}
console.log(pipeGap)
// console.log(getPipeAvaliability + 'aval')

function getRandomInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// console.log(getRandomInteger(0, getPipeAvaliability))
pipeHeight = 20 + getRandomInteger(0, getPipeAvaliability)
pipe2Height = 20 + (getPipeAvaliability - pipeHeight)
//console.log(pipe2Height +'pip2 hei' + pipeHeight + ' pip1')

// skins
function colorSelect() {
    color = document.querySelector('input[name="color"]:checked').id
    // console.log(color)
    testBird.color = color
}

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

function disableButtonDuringFlight () {
    if (start.innerText === true) {
        start.removeEventListener
    }
}

//bounce
const pressedKeys = {}
function controlInput(bounce) {
    if (gameFlight == true) {
        // console.log(pressedKeys)
        if (pressedKeys.w) {
            // console.log('bounce')
            gameFlight == true
            testBird.y -= bounce
            pipe.x -= 15
            pipe2.x -= 15
        } else if (pressedKeys.s) {
            testBird.y += 15
        } else {
            // console.log('falling')
            testBird.y += 5
        }
    }
}

//restart
function restartInput() {
    if (pressedKeys.r) {
        testBird.x = 250
        testBird.y = 270
        pipe.x = 900
        pipe2.x = 900
        start.innerText = "CLICK TO PLAY"
        score = 0
    }
    if (gameFlight === false) { // STARTS OFF IMMEDIATELY
        start.addEventListener('click', () => {
            gameFlight == false
            testBird.x = 250
            testBird.y = 270
            pipe.x = 900
             pipe2.x = 900
            start.innerText = "FLY"
            start.removeEventListener
            score = 0
        })
    }
}

//needed game loop interval // line 13
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false)

// === ! Step 3: DEFINE GAME LOOP ! === //
score = 0
function gameLoop() {
    //clearing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0)
    disableButtonDuringFlight()
    colorSelect()
    difficultySelect()
    
    if (pipe.x <= 0) { //loops
        pipe.x = 900
        pipe2.x = 900
        
        pipe.height = 20 + getRandomInteger(0, getPipeAvaliability)
        pipe2.height = -(20 + (getPipeAvaliability - pipe.height))
        audio.play()
        score++
        //console.log(pipe2)
    }
    //detecting hits from bird to ground
    if (detectHitGround(testBird)) {
        // console.log('gameover')
        audioFail.play()
        gameFlight = false
        start.innerText = "RESTART?"
        restartInput()
    } else if (detectHitPipe(testBird, pipe)) {
        // console.log('gameover')
        audioFail.play()
        gameFlight = false
        start.innerText = "RESTART?"
        restartInput()
    } else if (detectHitPipe2(testBird, pipe2)) {
        // console.log('gameover')
        audioFail.play()
        gameFlight = false
        start.innerText = "RESTART?"
        restartInput()
    } else {
        controlInput(15)
    }

    //score
    scoreDisplay = document.getElementById('score')
    scoreDisplay.innerText = `${score}`
    // console.log(score)
    
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
    // console.log(pipe2)
    // console.log(pipe)
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
    // console.log(hitAbovePipe + hitSidePipe + hitBotPipe)
    return(hitBotPipe && hitSidePipe && hitAbovePipe)
    
    // player.y <= obstacle.y + obstacle.height
}
// ========== //

