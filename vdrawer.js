// import { TILE_SIZE, bigTileDifference, walls } from "./constants"

const canvas = document.getElementById('pacman')
const ctx = canvas.getContext("2d")

/**
PlayersInformation = 
[
  {x: ..., y: ..., sprite: link1},
  {x: ..., y: ..., sprite: link2},
  ...
]
*/
const drawPlayers = (playersInformation) => {
    playersInformation.forEach( (playerInfo) => {
        const {x, y, sprite} = playerInfo
        ctx.drawImage(sprite, x, y, TILE_SIZE, TILE_SIZE)
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

const draw = (playersInformation, tiles) => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    drawMap(tiles, walls)
    drawPlayers(playersInformation)
}
