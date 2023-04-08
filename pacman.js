import { TILE_SIZE, SPEED } from "./constants.js";

let img = new Image();
img.src = 'https://i.stack.imgur.com/LgVd6.png';

export const pacman = {
	x: 3*TILE_SIZE,
    y: 6*TILE_SIZE,
    width: TILE_SIZE,
    height: TILE_SIZE,
    x_vel: 0,
    y_vel: 0,
	speed: SPEED,
    sprite: img,

    move: function() {
        this.x += this.x_vel*this.speed;
        this.y += this.y_vel*this.speed;
    }
}
