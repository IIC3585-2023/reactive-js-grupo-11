import { TICK_RATE } from "./constants.js"

// KEY PRESSES
// Por ahora, tiene el distintcUntilChanged.
// Si despues nos damos cuenta que necesitamos 
// // el stream sin eso, lo separamos en 2 streams
// export const keyPresses = rxjs.fromEvent(document, "keydown")
//     .pipe(rxjs.operators.distinctUntilChanged((prev, curr) => {return prev.keyCode === curr.keyCode}))

const keyDowns = rxjs.fromEvent(document, "keydown")
const keyUps = rxjs.fromEvent(document, "keyup")

export const keyPresses = rxjs.merge(keyUps, keyDowns)
    .pipe(
        rxjs.groupBy(event => event.keyCode),
        rxjs.mergeMap(group => group.pipe(rxjs.distinctUntilChanged((prev, curr) => {return prev.type === curr.type})))
)

export const ticker = rxjs.interval(TICK_RATE)