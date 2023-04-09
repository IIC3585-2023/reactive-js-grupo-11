import { TILE_SIZE, SPEED, walls, PROJECTILE_SPEED, SHOOT_COOLDOWN } from "./constants"


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
    // TODO: IF COLISION RETURN LAST ELSE RETURN NEW
    const nextPosition = checkCollisionWall(desiredNextState.position, walls) ? (
                            checkCollisionWall(previousDirectionNextState.position, walls) ? previousState : previousDirectionNextState) :
                            desiredNextState
    gameState.players[playerNumber].position = nextPosition.position
    gameState.players[playerNumber].direction = nextPosition.direction
}

export const solveCollisionDot = (gameState, dotMap) => {
    const playersStates = gameState.players;
    playersStates.forEach(playerState => {
        const collision = checkCollisionDot(playerState.position, dotMap);
        if(collision){
            dotMap[collision[0]][collision[1]] = 0;
            playerState.score += 100
        }
    });
}

export const collisionPlayerGhost = (player, ghosts) => {
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
        if(gameState.players[idx].shootCooldown !== 0) return false
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
    const projectiles = gameState.projectiles.map((projectile) => {
        return {
            position:
            {
                x: projectile.position.x + projectile.direction.x*PROJECTILE_SPEED,
                y: projectile.position.y + projectile.direction.y*PROJECTILE_SPEED
            },
            direction: projectile.direction
        }
        })
        .map((pro) => {
            console.log(pro);
            return pro
        })
        .filter((projectile) => {
            !checkCollisionWall(projectile.position, walls)
    });
    console.log(projectiles)
    gameState.projectiles.length = 0;
    gameState.projectiles = structuredClone(projectiles);
}

export const reduceCooldown = (gameState) => {
    gameState.players.forEach((player) => {
        player.shootCooldown = Math.max(0, player.shootCooldown - 1)
    })
}