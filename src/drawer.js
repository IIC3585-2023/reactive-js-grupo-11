import { TILE_SIZE, bigTileDifference, walls } from "./constants"

const canvas = document.getElementById('pacman')
const ctx = canvas.getContext("2d")

const getRotationAngle = (direction) => {
    const {x, y} = direction
    const angleX = x === -1 ? Math.PI : 0
    const angleY = y === -1 ? Math.PI * (3 / 2) : y === 1 ? Math.PI / 2 : 0
    return angleX + angleY
}

/**
PlayersInformation = 
[
    {
        position: {
            x: ...,
            y: ...
        },
        direction: {
            x: ...,
            y: ...
        },
        sprite: link1},
    },
    ...
]
*/
const drawPlayers = (playersInformation) => {
    playersInformation.forEach( (playerInfo) => {
        if (playerInfo.state === 'dead') return;
        ctx.save()
        const {position, direction, sprite} = playerInfo
        ctx.translate(position.x + TILE_SIZE / 2, position.y + TILE_SIZE / 2)
        ctx.rotate(getRotationAngle(direction))
        ctx.translate(- (position.x + TILE_SIZE / 2), - (position.y + TILE_SIZE / 2))
        ctx.drawImage(sprite, position.x, position.y, TILE_SIZE, TILE_SIZE)
        ctx.restore()
    })
}

const drawGhosts = (ghostsInformation) => {
    ghostsInformation.forEach( (ghostInfo) => {
        const {position, sprite} = ghostInfo
        ctx.drawImage(sprite, position.x, position.y, TILE_SIZE, TILE_SIZE)
    })
}

const drawMap = (tiles, walls, dotMap) => {
    const dotImage = tiles.dotImage
    ctx.fillStyle = "#000075";

    for(let row = 0; row < walls.length; row++){
        for(let col = 0; col < walls[row].length; col++){
            if(walls[row][col] == 1){
                ctx.fillRect(col*TILE_SIZE, row*TILE_SIZE, TILE_SIZE, TILE_SIZE)
            }
            if(dotMap[row][col] == 2){
                ctx.drawImage(dotImage, col*TILE_SIZE + bigTileDifference/2, row*TILE_SIZE + bigTileDifference/2, 
                            TILE_SIZE - bigTileDifference, TILE_SIZE - bigTileDifference);
            }
            if(dotMap[row][col] == 3){
                ctx.drawImage(dotImage, col*TILE_SIZE - bigTileDifference/2, row*TILE_SIZE - bigTileDifference/2,
                             TILE_SIZE + bigTileDifference/2, TILE_SIZE + bigTileDifference/2);
            }
        }
    }
}

export const drawProjectiles = (projectiles, projectileSprite) => {
    projectiles.forEach((projectile) => {

        ctx.save()
        const {position, direction} = projectile
        ctx.translate(position.x + TILE_SIZE / 2, position.y + TILE_SIZE / 2)
        ctx.rotate(getRotationAngle(direction))
        ctx.translate(- (position.x + TILE_SIZE / 2), - (position.y + TILE_SIZE / 2))
        ctx.drawImage(projectileSprite, position.x, position.y, TILE_SIZE, TILE_SIZE)
        ctx.restore()
        // ctx.drawImage(projectileSprite, projectile.position.x, projectile.position.y, TILE_SIZE, TILE_SIZE)
    })
}

export const drawScoreboard = (p1Score, p2Score) => {
    ctx.font = (TILE_SIZE*1.2).toString() + "px Ozone";
    ctx.fillStyle = "#FFCC00";
    ctx.fillText("Score P1: " + p1Score, 0, TILE_SIZE*24)
    ctx.fillStyle = "#00FF00";
    ctx.fillText("Score P2: " + p2Score, 12.5*TILE_SIZE, TILE_SIZE*24)
}

export const drawGameOver = () => {
    ctx.font = (TILE_SIZE*2).toString() + "px Ozone";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("GAME OVER", 5.2*TILE_SIZE, 26*TILE_SIZE)
}

export const draw = (playersInformation, ghostsInformation, dotMap, tiles, projectiles) => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    drawMap(tiles, walls, dotMap)
    drawPlayers(playersInformation)
    drawGhosts(ghostsInformation)
    drawProjectiles(projectiles, tiles.projectile)
    drawScoreboard(playersInformation[0].score, playersInformation[1].score)
}
