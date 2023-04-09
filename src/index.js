import { createPlayer } from "./pacman.js";
import { ticker } from "./basicStreams.js";
import { draw } from "./drawer.js";
import { TILE_SIZE, SHOOT_COOLDOWN, TICK_RATE } from "./constants.js";
import { createGhost } from "./ghosts.js";
import { collisionPlayerGhost, resolvePlayerPosition, solveCollisionDot, resolveShootEvents, resolveProjectilePositions, reduceCooldown} from "./utils.js";


let dotMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0],
    [0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
    [0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// DEFINE PLAYERS
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
        x: 1,
        y: 0
    },
    score: 0,
    state: 'normal',
    shootCooldown : 0
}

const p2Keys = {
    movement: ['KeyW', 'KeyA', 'KeyS', 'KeyD'],
    shoot: 'KeyF'
}

const p2InitialState = {
    position: {
        x: 19 * TILE_SIZE,
        y: 1 * TILE_SIZE
    },
    direction: {
        x: -1,
        y: 0
    },
    score: 0,
    state: 'normal',
    shootCooldown : 0
}

const p1Data = createPlayer(p1Keys, p1InitialState.direction, 1)
const p2Data = createPlayer(p2Keys, p2InitialState.direction, 2)

const playerShootStream =  ticker.pipe(
    rxjs.withLatestFrom(p1Data.shootStream, p2Data.shootStream)
)

// DEFINE GHOSTS
const ghost1InitialState = {
    position: {
        x: 1 * TILE_SIZE,
        y: 21 * TILE_SIZE
    },
    direction: {
        x: 1,
        y: 0
    }
}

const ghost2InitialState = {
    position: {
        x: 19 * TILE_SIZE,
        y: 21 * TILE_SIZE
    },
    direction: {
        x: -1,
        y: 0
    }
}

const ghost3InitialState = {
    position: {
        x: 1 * TILE_SIZE,
        y: 15 * TILE_SIZE
    },
    direction: {
        x: 1,
        y: 0
    }
}

const ghost4InitialState = {
    position: {
        x: 19 * TILE_SIZE,
        y: 15 * TILE_SIZE
    },
    direction: {
        x: -1,
        y: 0
    }
}

const ghost1Data = createGhost(ghost1InitialState, 1)
const ghost2Data = createGhost(ghost2InitialState, 2)
const ghost3Data = createGhost(ghost3InitialState, 3)
const ghost4Data = createGhost(ghost4InitialState, 4)

const ghostDataStream = ghost1Data.positionStream.pipe(
    rxjs.withLatestFrom(ghost2Data.positionStream, ghost3Data.positionStream, ghost4Data.positionStream)
)


const ghostSprites = [
    ghost1Data.sprite,
    ghost2Data.sprite,
    ghost3Data.sprite,
    ghost4Data.sprite
]

const intialGameState = {
    players: [
        structuredClone(p1InitialState),
        structuredClone(p2InitialState),
    ],
    ghosts: [
        ghost1InitialState,
        ghost2InitialState,
        ghost3InitialState,
        ghost4InitialState
    ],
    projectiles: []
}

// Buscar donde hace sentido que este esta imagen, quiza
// agregamos un file que tenga todas las imagenes y les
// haga load o algo asi
const dotImage = new Image()
dotImage.src = '../assets/tiles/dot.png'

dotImage.onload = () => {
    ticker.pipe(
        // Despues, agregar el shoot stream, pero no con withlatestfrom,
        // quiza con un merge o algo asi
        rxjs.withLatestFrom(p1Data.directionStream, p2Data.directionStream, ghostDataStream, playerShootStream),
        rxjs.scan((previousGameState, [tick, p1Direction, p2Direction, ghostStates, playerShootStream]) => {
               
            const gameState = previousGameState
            const newProjectiles = resolveShootEvents(playerShootStream, gameState);

            gameState.projectiles.push(...newProjectiles);

            resolveProjectilePositions(gameState)
            
            gameState.projectiles.length != 0 ? console.log(gameState.projectiles) : ""

            resolvePlayerPosition(gameState, p1Direction, 0)
            resolvePlayerPosition(gameState, p2Direction, 1)
            gameState.ghosts = ghostStates

            solveCollisionDot(gameState, dotMap);

            const newPositions = gameState.players.map((player, idx) => {
                return collisionPlayerGhost(player, gameState.ghosts) ? intialGameState.players[idx].position : player.position          
            })

            newPositions.forEach((pos, idx) => gameState.players[idx].position = pos);
            reduceCooldown(gameState)
            return gameState

        }, structuredClone(intialGameState))
    ).subscribe({
        next: (gameState) => {
            const p1Info = {
                position: gameState.players[0].position,
                direction: gameState.players[0].direction,
                sprite: p1Data.sprite
            }

            const p2Info = {
                position: gameState.players[1].position,
                direction: gameState.players[1].direction,
                sprite: p2Data.sprite
            }

            const ghostsInfo = gameState.ghosts.map( (state, idx) => {
                return {
                    position: state.position,
                    direction: state.direction,
                    sprite: ghostSprites[idx]
                }
            })

            draw([p1Info, p2Info], ghostsInfo, dotMap, {dotImage: dotImage})
        },
        error: console.log
    })
}