import { SPEED, walls } from "./constants.js";
import { ticker } from "./basicStreams.js";
import { checkCollisionWall } from "./utils.js";

const validDirections = [
    {
        x: 1,
        y: 0,
    }, {
        x: -1,
        y: 0,
    }, {
        x: 0,
        y: 1,
    }, {
        x: 0,
        y: -1
    }
]

const getPossibleNextDirections = (ghostState) => {
    // Filter directions that would cause a collision
    return validDirections.filter( (direction) => {
        const desiredNextPosition = {
            x: ghostState.position.x + direction.x * SPEED,
            y: ghostState.position.y + direction.y * SPEED,
        }
        return !checkCollisionWall(desiredNextPosition, walls)
    })
}

const decideNextState = (ghostState, possibleNextDirections) => {
    // Map directions to states
    const possibleNextStates = possibleNextDirections.map((direction) => {
        return {
            position: {
                x: ghostState.position.x + direction.x * SPEED,
                y: ghostState.position.y + direction.y * SPEED,
            },
            direction: direction
        }
    })
    const {x: prevX, y: prevY} = ghostState.direction

    // Remove the one state that would cause ghost to go backwards
    // i.e., if it is going right, remove the state that would make it
    // go left.
    const filteredStates = possibleNextStates.filter( (state) => {
        return (state.direction.x !== prevX && state.direction.y !== prevY) || (state.direction.x === prevX && state.direction.y === prevY)
    })

    // If there are filteredStates, choose one of those at random. If there arent any, that means that the
    // only possible next state is the one that makes de ghost go backwards. In that case, choose that one,
    // because it is the only possible next state.
    return filteredStates.length > 0 ? filteredStates[Math.floor(Math.random() * filteredStates.length)] : possibleNextStates[0]
}

export const createGhost = (initialState, ghostNumber) => {

    // Ghost Position Stream
    const ghostPositionStream = ticker.pipe(
        rxjs.scan((previousState, tick) => {
            const possibleNextStates = getPossibleNextDirections(previousState)
            return decideNextState(previousState, possibleNextStates)
        }, initialState),
    )

    let img = new Image();
    img.src = `../assets/sprites/ghosts/ghost${ghostNumber}.png`;

    return {positionStream: ghostPositionStream, sprite: img}
}
