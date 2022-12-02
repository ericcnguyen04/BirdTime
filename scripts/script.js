const canvas = document.getElementById('game-screen')

// set thecanvas resolution to be the same as the screen
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width',getComputedStyle(canvas)['width'])
//console.log(canvas.height) //439
//console.log(canvas.width) //879


//get rendering context from canvas
const ctx = canvas.getContext('2d')


// === ! Step 1: OBJECTS ! === //
class Bird {
    constructor(x, y, width, height, color, flying) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.flying = true
    }
    
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

class Pipe {
    constructor(x, y, width, h1, h2) {
        this.x = x
        this.y = y
        this.width = width
        // this.gap = gap
        this.h1 = h1
        this.h2 = h2
        // this.h3 = h3
        // this.h4 = h4
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fill(this.x, this.y, this.width, this.h1)
        ctx.fill(this.x, this.y, this.width, this.h2)
    }
}

//testing
const testBird = new Bird(250, 270, 50, 50, 'red')
testBird.render()
const testPipe = new Pipe(700, 0, 75, 200, 300)
testPipe.render()

// ========== //


// === ! Step 2: USER INPUT ! === //
function controlInput() {
    if (pressedKeys.spaceBar) {
        console.log('bounce')
    } else {
        console.log('falling')
    }
}

document.addEventListener('keydown', e => pressedKeys[e.key] = true)
// document.addEventListener('keyup', e => pressedKeys[e.key] = false)
controlInput()
// ========== //

// === ! Step 3: DEFINE GAME LOOP ! === //
const pressedKeys = {}

function gameLoop() {
    //clearing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

}

// ========== //


// === ! Step 4: FIND COLLISION / LOSE CONDITION! === // 

// ========== //

