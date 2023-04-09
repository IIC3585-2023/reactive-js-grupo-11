const { 
    merge,
    interval, 
    fromEvent,
    mergeMap,
    filter,
    withLatestFrom,
    scan
} = rxjs;

const {
    groupBy,
    map,
    distinctUntilChanged
} = rxjs.operators


const canvas = document.getElementById('pacman')
const ctx = canvas.getContext("2d")

//map height = 600
//map width = ?

const ghost_img = new Image()
ghost_img.src = 'assets/sprites/ghosts/blue_ghost.png'
ghost_img.onload = () => {
    ctx.drawImage(ghost_img, 0, 0, 30, 30)
}

// KEY PRESSES
const keyDowns = fromEvent(document, "keydown")
// const keyUps = fromEvent(document, "keyup")

// const keyPresses = merge(keyUps, keyDowns)
//   .pipe(
//     groupBy(event => event.keyCode),
//     mergeMap(group => group.pipe(distinctUntilChanged((prev, curr) => {return prev.type === curr.type}))),
//     // map(event => event)
//   )
const keyPresses = keyDowns
  .pipe(
    distinctUntilChanged((prev, curr) => {return prev.keyCode === curr.keyCode}),
    // map(event => event)
  )

// GAME TICKER
const TICKER_INTERVAL = 500
const ticker = interval(TICKER_INTERVAL)


const p1Keys = ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight']
const p1KeyPresses = keyPresses.pipe(
    filter(event => p1Keys.includes(event.code))
)

const p1Direction = p1KeyPresses.pipe(
    map((event) => {
        switch(event.code) {
            case "ArrowUp":
                return {x: 0, y: -1}
            case "ArrowDown":
                return {x: 0, y: 1}
            case "ArrowLeft":
                return {x: -1, y: 0}
            case "ArrowRight":
                return {x: 1, y: 0}
            default:
                return {x: 0, y: 0}
        }
    })
)

const P1Speed = {x: 5, y: 5}
const initialP1Position = {x: 30, y: 30}

const p1Position = ticker.pipe(
    withLatestFrom(p1Direction),
    scan((previousPosition, [tick, direction]) => {
        return {
            x: previousPosition.x + direction.x * P1Speed.x,
            y: previousPosition.y + direction.y * P1Speed.y
        }
    }, initialP1Position)
).subscribe({
    next: (value) => {
        drawGhost(value)
        drawMap(['Tiles/dot.png'], walls)
        console.log(value.x, value.y, checkColision(value, walls))
    },
    error: console.log
})

// const p2Keys = ['KeyA', 'KeyS', 'KeyD', 'KeyW']
// const p2KeyPresses = keyPresses.pipe(
//     filter(event => p2Keys.includes(event.code))
// )


const drawGhost = (value) => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    ctx.drawImage(ghost_img, value.x, value.y, 25, 25)
}

walls = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 3, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 3, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 3, 1],
    [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

//Ver como cambiar esto
let loadedImages = false

const tileSize = 30
const bigTileDifference = 10

function loadImage(imagePath) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = imagePath; });
}

function loadImages(imagePathList){
    return Promise.all(imagePathList.map(imagePath => loadImage(imagePath)));
}

function checkColision(ghostPos, map){

    rec1_x = ghostPos.x
    rec1_y = ghostPos.y
    rec1_w = tileSize
    rec1_h = tileSize

    for(row = 0; row < map.length; row++){
        for(col = 0; col < map[row].length; col++){

            if(map[row][col] != 1) continue

            rec2_x = col*tileSize
            rec2_y = row*tileSize
            rec2_w = tileSize
            rec2_h = tileSize

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

async function drawMap (imagesPathList, wallArray){
    if(!loadedImages) loadedImages = await loadImages(imagesPathList)

    //Image for yellow dots
    dotImage = loadedImages[0];

    ctx.fillStyle = "#000075";

    for(row = 0; row < wallArray.length; row++){
        for(col = 0; col < wallArray[row].length; col ++){
            // console.log(row, col, walls[row][col], walls.length, walls[row].length)
            if(wallArray[row][col] == 1){
                ctx.fillRect(col*tileSize, row*tileSize, tileSize, tileSize)
            }
            if(wallArray[row][col] == 2){
                ctx.drawImage(dotImage, col*tileSize + bigTileDifference/2, row*tileSize + bigTileDifference/2, 
                            tileSize - bigTileDifference, tileSize - bigTileDifference);
            }
            if(wallArray[row][col] == 3){
                ctx.drawImage(dotImage, col*tileSize - bigTileDifference/2, row*tileSize - bigTileDifference/2,
                             tileSize + bigTileDifference/2, tileSize + bigTileDifference/2);
            }
        }
    }
    // ctx.stroke()
}

drawMap(['Tiles/dot.png'], walls)