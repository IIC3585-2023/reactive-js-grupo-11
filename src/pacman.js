// import { SPEED, walls } from "./constants.js";
import { keyPresses } from "./basicStreams.js";
// import { checkCollision } from "./utils.js";


export const createPlayer = (playerKeys, initialDirection, playerNumber) => {
    // Direction Stream
    const playerDirectionStream = keyPresses.pipe(
        rxjs.filter(event => playerKeys.movement.includes(event.code)),
        rxjs.filter(event => event.type === 'keydown'),
        rxjs.operators.map((event) => {
            const idx = playerKeys.movement.indexOf(event.code)
            switch(idx) {
                case 0:
                    // Move Up
                    return {x: 0, y: -1}
                case 1:
                    // Move left
                    return {x: -1, y: 0}
                case 2:
                    // Move down
                    return {x: 0, y: 1}
                case 3:
                    // Move right
                    return {x: 1, y: 0}
                default:
                    // Default case should never occur
                    return {x: 0, y: 0}
            }
        }),
        rxjs.startWith(initialDirection)
    )

    // Shoot Stream
    const shootStream = keyPresses.pipe(
        rxjs.filter(event => playerKeys.shoot === event.code),
        rxjs.startWith({type : "null"})
    )

    let img = new Image();
    img.src = `../assets/sprites/pacman/pacman${playerNumber}.png`;

    return {directionStream: playerDirectionStream, shootStream: shootStream, sprite: img}
}
