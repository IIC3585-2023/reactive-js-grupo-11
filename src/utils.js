import { TILE_SIZE, SPEED, walls } from "./constants"


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
