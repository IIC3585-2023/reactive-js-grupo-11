import { TILE_SIZE, SPEED, walls, PROJECTILE_SPEED, SHOOT_COOLDOWN, DEAD_COOLDOWN, DEATH_PENALTY} from "./constants"


const checkCollision = (tileType, returnPos) => (playerPos, map) => {

    const rec1_x = playerPos.x
    const rec1_y = playerPos.y
    const rec1_w = TILE_SIZE
    const rec1_h = TILE_SIZE

    for(let row = 0; row < map.length; row++){
        for(let col = 0; col < map[row].length; col++){

            if(map[row][col] != tileType) continue

            const rec2_x = col*TILE_SIZE
            const rec2_y = row*TILE_SIZE
            const rec2_w = TILE_SIZE
            const rec2_h = TILE_SIZE

            if(
                rec1_x < rec2_x + rec2_w &&
                rec1_x + rec1_w > rec2_x &&
                rec1_y < rec2_y + rec2_h &&
                rec1_y + rec1_h > rec2_y
            ) return returnPos ? [row, col] : true
        }
    }
    return false
}

const checkCollisionWall = checkCollision(1, false);
const checkCollisionDot = checkCollision(2, true);
export {checkCollisionWall, checkCollisionDot};

export const resolvePlayerPosition = (gameState, direction, playerNumber) => {
    const previousState = gameState.players[playerNumber]
    if (gameState.players[playerNumber].state === 'dead') {
        gameState.players[playerNumber].position = previousState.position
        gameState.players[playerNumber].direction = previousState.direction
        return
    }
    const desiredNextState = {
        position: {
            x: previousState.position.x + direction.x * SPEED,
            y: previousState.position.y + direction.y * SPEED,
        },
        direction: direction,
    }
    const previousDirectionNextState = {
        position: {
            x: previousState.position.x + previousState.direction.x * SPEED,
            y: previousState.position.y + previousState.direction.y * SPEED 
        },
        direction: previousState.direction
    }

    const nextPosition = checkCollisionWall(desiredNextState.position, walls) ? (
                            checkCollisionWall(previousDirectionNextState.position, walls) ? previousState : previousDirectionNextState) :
                            desiredNextState
    gameState.players[playerNumber].position = nextPosition.position
    gameState.players[playerNumber].direction = nextPosition.direction
}

export const solveCollisionDot = (gameState) => {
    const dotMap = gameState.dots
    const playersStates = gameState.players;
    playersStates.forEach(playerState => {
        const collision = checkCollisionDot(playerState.position, dotMap);
        if(collision){
            dotMap[collision[0]][collision[1]] = 0;
            playerState.score += 100
        }
    });
}

export const checkGameEnd = (gameState) => {
    const dots = gameState.dots
    const rowsWithDots = dots.map( (row) => {
        return row.reduce((previous, next) => {
            return previous || next !== 0
        }, false)
    })
    return !rowsWithDots.some((element) => element)
}

export const collisionPlayerGhost = (player, ghosts) => {
    if (player.state === 'dead') return false
    const playerX = player.position.x;
    const playerY = player.position.y;
    const ghostCollisions = ghosts.map((ghost) => {
        return (
            playerX < ghost.position.x + TILE_SIZE &&
            playerX + TILE_SIZE > ghost.position.x &&
            playerY < ghost.position.y + TILE_SIZE &&
            playerY + TILE_SIZE > ghost.position.y
        )
    })
    return ghostCollisions.reduce((prev, curr) => curr || prev, false)
}

export const resolveShootEvents = ([ticker, ...shootStreams], gameState) => {
    let projectiles = shootStreams.map((shootStream, idx) => {
        if(shootStream.type !== "keydown") return false;
        if(gameState.players[idx].shootCooldown !== 0 || gameState.players[idx].state === 'dead') return false
        const newPosition = {}
        gameState.players[idx].shootCooldown = SHOOT_COOLDOWN;
        newPosition.x = gameState.players[idx].direction.x*TILE_SIZE + gameState.players[idx].position.x
        newPosition.y = gameState.players[idx].direction.y*TILE_SIZE + gameState.players[idx].position.y
        return {
            direction : gameState.players[idx].direction,
            position : newPosition
        }
    })
    return projectiles.filter((el) => el)
}

export const resolveProjectilePositions = (gameState) => {
    return gameState.projectiles.map((projectile) => {
        return {
            position:
            {
                x: projectile.position.x + projectile.direction.x*PROJECTILE_SPEED,
                y: projectile.position.y + projectile.direction.y*PROJECTILE_SPEED
            },
            direction: projectile.direction
        }
        })
        .filter((projectile) => {
            return !checkCollisionWall(projectile.position, walls)
    });
}

export const killPlayer = (gameState, playerId, initialPlayerState) => {
    gameState.players[playerId].position.x = initialPlayerState.position.x
    gameState.players[playerId].position.y = initialPlayerState.position.y
    gameState.players[playerId].direction.x = initialPlayerState.direction.x
    gameState.players[playerId].direction.y = initialPlayerState.direction.y
    gameState.players[playerId].state = 'dead'
    gameState.players[playerId].deadCooldown = DEAD_COOLDOWN
    gameState.players[playerId].score -= DEATH_PENALTY
    console.log(`New score is ${gameState.players[playerId].score}`)
}

export const resolveProjectileHit = (gameState, initialGameState) => {
    const projectilesHit = []
    for(let i = 0; i < gameState.players.length; i++){
        if (gameState.players[i].state === 'dead') continue
        for(let j = 0; j < gameState.projectiles.length; j++){
            if(
                gameState.players[i].position.x < gameState.projectiles[j].position.x + TILE_SIZE &&
                gameState.players[i].position.x + TILE_SIZE > gameState.projectiles[j].position.x &&
                gameState.players[i].position.y < gameState.projectiles[j].position.y + TILE_SIZE &&
                gameState.players[i].position.y + TILE_SIZE > gameState.projectiles[j].position.y
            ){
                // Ver si lo cambiamos por stun player
                killPlayer(gameState, i, initialGameState.players[i])
                if(!projectilesHit.includes(j)) projectilesHit.push(j)
            }
        }
    }
    const remainingProjectiles = []
    for(let i = 0; i < gameState.projectiles.length; i++){
        if(!projectilesHit.includes(i)) remainingProjectiles.push(gameState.projectiles[i])
    }
    return remainingProjectiles
}

export const reduceCooldown = (gameState) => {
    gameState.players.forEach((player) => {
        player.shootCooldown = Math.max(0, player.shootCooldown - 1)
        player.deadCooldown = Math.max(0, player.deadCooldown - 1)
        if (player.deadCooldown === 0) {
            player.state = 'normal'
        }
    })
}