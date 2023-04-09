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
        ctx.save()
        const {position, direction, sprite} = playerInfo
        ctx.translate(position.x + TILE_SIZE / 2, position.y + TILE_SIZE / 2)
        ctx.rotate(getRotationAngle(direction))
        ctx.translate(- (position.x + TILE_SIZE / 2), - (position.y + TILE_SIZE / 2))
        ctx.drawImage(sprite, position.x, position.y, TILE_SIZE, TILE_SIZE)
        ctx.restore()
    })
}

const drawMap = (tiles, walls) => {
    const dotImage = tiles.dotImage
    ctx.fillStyle = "#000075";

    for(let row = 0; row < walls.length; row++){
        for(let col = 0; col < walls[row].length; col++){
            if(walls[row][col] == 1){
                ctx.fillRect(col*TILE_SIZE, row*TILE_SIZE, TILE_SIZE, TILE_SIZE)
            }
            if(walls[row][col] == 2){
                ctx.drawImage(dotImage, col*TILE_SIZE + bigTileDifference/2, row*TILE_SIZE + bigTileDifference/2, 
                            TILE_SIZE - bigTileDifference, TILE_SIZE - bigTileDifference);
            }
            if(walls[row][col] == 3){
                ctx.drawImage(dotImage, col*TILE_SIZE - bigTileDifference/2, row*TILE_SIZE - bigTileDifference/2,
                             TILE_SIZE + bigTileDifference/2, TILE_SIZE + bigTileDifference/2);
            }
        }
    }
}

export const draw = (playersInformation, tiles) => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    drawMap(tiles, walls)
    drawPlayers(playersInformation)
}
