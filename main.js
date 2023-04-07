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

const walls = [
    [10, 10, 100, 5],
    [40, 100, 5, 250]
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