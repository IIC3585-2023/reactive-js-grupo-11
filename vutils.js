// import { TILE_SIZE } from "./constants"


const checkColision = (playerPos, map) => {

    const rec1_x = playerPos.x
    const rec1_y = playerPos.y
    const rec1_w = TILE_SIZE
    const rec1_h = TILE_SIZE

    for(let row = 0; row < map.length; row++){
        for(let col = 0; col < map[row].length; col++){

            if(map[row][col] != 1) continue

            const rec2_x = col*TILE_SIZE
            const rec2_y = row*TILE_SIZE
            const rec2_w = TILE_SIZE
            const rec2_h = TILE_SIZE

            if(
                rec1_x < rec2_x + rec2_w &&
                rec1_x + rec1_w > rec2_x &&
                rec1_y < rec2_y + rec2_h &&
                rec1_y + rec1_h > rec2_y
            ) return true
        }
    }
    return false
}