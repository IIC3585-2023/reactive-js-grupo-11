import { createPlayer } from "./pacman.js";
import { ticker } from "./basicStreams.js";
import { draw } from "./drawer.js";
import { TILE_SIZE } from "./constants.js";

const p1Keys = {
    movement: ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
    shoot: 'KeyL'
}

const p1InitialState = {
    position: {
        x: 1 * TILE_SIZE,
        y: 1 * TILE_SIZE
    },
    direction: {
        x: 0,
        y: 0
    }
}

const p2Keys = {
    movement: ['KeyW', 'KeyA', 'KeyS', 'KeyD'],
    shoot: 'KeyL'
}

const p2InitialState = {
    position: {
        x: 19 * TILE_SIZE,
        y: 1 * TILE_SIZE
    },
    direction: {
        x: 0,
        y: 0
    }
}

const p1Data = createPlayer(p1Keys, p1InitialState, 1)
const p2Data = createPlayer(p2Keys, p2InitialState, 2)

// Buscar donde hace sentido que este esta imagen, quiza
// agregamos un file que tenga todas las imagenes y les
// haga load o algo asi
const dotImage = new Image()
dotImage.src = '../assets/tiles/dot.png'

dotImage.onload = () => {
    ticker.pipe(
        rxjs.withLatestFrom(p1Data.positionStream, p2Data.positionStream),
    ).subscribe({
        next: ([tick, p1Position, p2Position]) => {
            const p1Info = {
                x: p1Position.x,
                y: p1Position.y,
                sprite: p1Data.sprite
            }

            const p2Info = {
                x: p2Position.x,
                y: p2Position.y,
                sprite: p2Data.sprite
            }

            draw([p1Info, p2Info], {dotImage: dotImage})
        },
        error: console.log
    })
}


