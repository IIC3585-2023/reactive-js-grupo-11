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