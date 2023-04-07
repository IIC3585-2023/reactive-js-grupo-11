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

const walls = [

    [40, 0, 5, 210],   //Left Upper outer wall

    [40, 210, 70, 5],

    [110, 210, 5, 70],

    [40, 280, 70, 5],

    [40, 280, 5, 70], //Left Middle outer wall

    [40, 350, 70, 5],

    [110, 350, 5, 70],

    [40, 420, 70, 5],

    [40, 420, 5, 210], //Left Lower outer wall

    [40, 0, 700, 5],

    [740, 0, 5, 210],

    [670, 210, 70, 5],

    [670, 210, 5, 70],

    [670, 280, 70, 5],

    [670, 280, 70, 5],

    [740, 280, 5, 70],

    [670, 350, 70, 5],

    [670, 350, 5, 70],

    [670, 420, 70, 5],

    [740, 420, 5, 210],

    [40, 630, 700, 5]

    //Inner Elements
]

walls.forEach(wall => {
    ctx.rect(...wall)
})
ctx.stroke()


const ghost_img = new Image()
ghost_img.src = 'assets/sprites/ghosts/blue_ghost.png'
ghost_img.onload = () => {
    ctx.drawImage(ghost_img, 100, 100, 25, 25)
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
const TICKER_INTERVAL = 20
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
const initialP1Position = {x: 100, y: 100}

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

// interval(10).subscribe({
//     next: draw_ghost,
//     complete: () => console.log('complete')
// })