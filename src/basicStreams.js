import { TICK_RATE } from "./constants.js"

// KEY PRESSES
// Por ahora, tiene el distintcUntilChanged.
// Si despues nos damos cuenta que necesitamos 
// el stream sin eso, lo separamos en 2 streams
export const keyPresses = rxjs.fromEvent(document, "keydown")
    .pipe(rxjs.operators.distinctUntilChanged((prev, curr) => {return prev.keyCode === curr.keyCode}))

export const ticker = rxjs.interval(TICK_RATE)