
import { DIRS, TILE_SIZE, LEVEL } from "./constants.js";
import { pacman } from "./pacman.js";

// check collisions
function checkWallCollision(packman_vel_dir,vel_dir,i,j, i_add, j_add) {
    if ( pacman[packman_vel_dir] == vel_dir) {
        if (LEVEL[i+i_add][j+j_add] == "w") {
            return true;
        }
    } 
    return false;
}

function checkCollision() {
    const j = Math.floor((pacman.x+pacman.x_vel)/TILE_SIZE);
    const i = Math.floor((pacman.y+pacman.y_vel)/TILE_SIZE);
    console.log(`${pacman.x} ${pacman.y} ${i} ${j} ${pacman.x_vel} ${pacman.y_vel}`)
    
    if ( checkWallCollision("x_vel", 1, i, j, 0, 1) ) {
        pacman["x_vel"] = 0
    }
    if ( checkWallCollision("x_vel", -1, i, j, 0, 0) ) {
        pacman["x_vel"] = 0
    }
    if ( checkWallCollision("y_vel", 1, i, j, 1, 0) ) {
        pacman["y_vel"] = 0
    }
    if ( checkWallCollision("y_vel", -1, i, j, 0, 1) ) {
        pacman["y_vel"] = 0
    }

    return true
}

// key presses events

const keyPresses = Rx.Observable.fromEvent(document, 'keydown');

// keyPresses.subscribe(() =>  console.log([pacman.x, pacman.y]));

keyPresses.subscribe( (event) => {
    pacman.x_vel = DIRS[event.key][0];
    pacman.y_vel = DIRS[event.key][1];
})


// execute every frame

Rx.Observable.interval(1/60*1000).subscribe(() => {
    if (checkCollision()){
        pacman.move();
    }
    draw();
});



// drawing

let canvas;
let context;

window.onload = init;

function init(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    draw();
}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawLevel();

    context.drawImage(pacman.sprite, pacman.x, pacman.y, pacman.width, pacman.height);
}

function drawLevel() {
    for (let i = 0; i < LEVEL.length; i++) {
        for (let j = 0; j < LEVEL[i].length; j++) {
            if (LEVEL[i][j] == "w") {
                context.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE, TILE_SIZE)
            }
        }
    }
}
// END GAME BRANCH
const { 
    merge,
    interval, 
    fromEvent,
    mergeMap,
    filter,
    withLatestFrom,
    scan
} = rxjs;

const {
    groupBy,
    map,
    distinctUntilChanged
} = rxjs.operators


const canvas = document.getElementById('pacman')
const ctx = canvas.getContext("2d")

const walls = [
    [10, 10, 100, 5],
    [40, 100, 5, 250]
]

walls.forEach(wall => {
    ctx.rect(...wall)
})
ctx.stroke()


const ghost_img = new Image()
ghost_img.src = 'assets/sprites/ghosts/blue_ghost.png'
ghost_img.onload = () => {
    ctx.drawImage(ghost_img, 100, 100, 25, 25)
}

// KEY PRESSES
const keyDowns = fromEvent(document, "keydown")
// const keyUps = fromEvent(document, "keyup")

// const keyPresses = merge(keyUps, keyDowns)
//   .pipe(
//     groupBy(event => event.keyCode),
//     mergeMap(group => group.pipe(distinctUntilChanged((prev, curr) => {return prev.type === curr.type}))),
//     // map(event => event)
//   )
const keyPresses = keyDowns
  .pipe(
    distinctUntilChanged((prev, curr) => {return prev.keyCode === curr.keyCode}),
    // map(event => event)
  )

// GAME TICKER
const TICKER_INTERVAL = 20
const ticker = interval(TICKER_INTERVAL)


const p1Keys = ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight']
const p1KeyPresses = keyPresses.pipe(
    filter(event => p1Keys.includes(event.code))
)

const p1Direction = p1KeyPresses.pipe(
    map((event) => {
        switch(event.code) {
            case "ArrowUp":
                return {x: 0, y: -1}
            case "ArrowDown":
                return {x: 0, y: 1}
            case "ArrowLeft":
                return {x: -1, y: 0}
            case "ArrowRight":
                return {x: 1, y: 0}
            default:
                return {x: 0, y: 0}
        }
    })
)

const P1Speed = {x: 5, y: 5}
const initialP1Position = {x: 100, y: 100}

const p1Position = ticker.pipe(
    withLatestFrom(p1Direction),
    scan((previousPosition, [tick, direction]) => {
        return {
            x: previousPosition.x + direction.x * P1Speed.x,
            y: previousPosition.y + direction.y * P1Speed.y
        }
    }, initialP1Position)
).subscribe({
    next: (value) => {
        drawGhost(value)
    },
    error: console.log
})

// const p2Keys = ['KeyA', 'KeyS', 'KeyD', 'KeyW']
// const p2KeyPresses = keyPresses.pipe(
//     filter(event => p2Keys.includes(event.code))
// )


const drawGhost = (value) => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    ctx.drawImage(ghost_img, value.x, value.y, 25, 25)
}

// interval(10).subscribe({
//     next: draw_ghost,
//     complete: () => console.log('complete')
// })

