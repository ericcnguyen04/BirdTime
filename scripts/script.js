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
// }

//testing
const testBird = new Bird(250, 270, 50, 50, 'red')
const ground = new Bird(0, 550, canvas.width, 300, 'brown')
let gameFlight = true
// const testPipe = new Pipe(700, 0, 75, 200, 300)
// testPipe.render()

// ========== //


// === ! Step 2: USER INPUT ! === //
const pressedKeys = {}
function controlInput(bounce) {
    if (gameFlight == true) {
        console.log(pressedKeys)
        if (pressedKeys.w) {
            // console.log('bounce')
            testBird.y -= bounce
        } else {
            // console.log('falling')
            testBird.y += 15
        }
    } if (gameFlight != false) {
        testBird.y == ground.x
    }
}
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false)
// document.addEventListener('click', (w) => controlInput(100))
// document.addEventListener('click', e => controlInput(65))
// document.addEventListener("keydown", e => {
//     console.log(e.key)
//     if (e.key === 'w') {
//         testBird.y += 65
//     }
// })

    // document.addEventListener("keydown", e => {
    //     if (e.key ==)
    //     })
// ========== //

// === ! Step 3: DEFINE GAME LOOP ! === //

function gameLoop() {
    //clearing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //detecting hits from bird to ground
    if (detectHitGround(testBird)) {
        console.log('gameover')
        gameFlight = false
    } else {
        controlInput(35)
    }
    //render game objects

    testBird.render()

}

// ========== //


// === ! Step 4: FIND COLLISION / LOSE CONDITION! === // 
function detectHitGround(objOne) {
    const topOfGround = objOne.y + objOne.height >= canvas.height
    console.log(topOfGround)
    return topOfGround //false til true
}
// ========== //

