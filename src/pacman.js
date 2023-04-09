import { SPEED, walls } from "./constants.js";
import { keyPresses, ticker } from "./basicStreams.js";
import { checkColision } from "./utils.js";


export const createPlayer = (playerKeys, initialPosition, playerNumber) => {
    // Direction Stream
    const playerDirectionStream = keyPresses.pipe(
        rxjs.filter(event => playerKeys.movement.includes(event.code)),
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
        rxjs.startWith({x: 0, y: 0})
    )

    // Player Position Stream
    const playerPositionStream = ticker.pipe(
        rxjs.withLatestFrom(playerDirectionStream),
        rxjs.scan((previousPosition, [tick, direction]) => {
            const desiredNextPosition = {
                x: previousPosition.x + direction.x * SPEED,
                y: previousPosition.y + direction.y * SPEED
            }
            // TODO: IF COLISION RETURN LAST ELSE RETURN NEW
            return checkColision(desiredNextPosition, walls) ? previousPosition : desiredNextPosition
        }, initialPosition)
    )

    // Shoot Stream
    const shootStream = keyPresses.pipe(
        rxjs.filter(event => playerKeys.shoot === event.code),
        rxjs.throttleTime(1000)
    )

    let img = new Image();
    img.src = `../assets/sprites/pacman/pacman${playerNumber}.png`;

    return {positionStream: playerPositionStream, shootStream: shootStream, sprite: img}
}
