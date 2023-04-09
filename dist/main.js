/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/basicStreams.js":
/*!*****************************!*\
  !*** ./src/basicStreams.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"keyPresses\": () => (/* binding */ keyPresses),\n/* harmony export */   \"ticker\": () => (/* binding */ ticker)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n\n\n// KEY PRESSES\n// Por ahora, tiene el distintcUntilChanged.\n// Si despues nos damos cuenta que necesitamos \n// el stream sin eso, lo separamos en 2 streams\nconst keyPresses = rxjs.fromEvent(document, \"keydown\")\n    .pipe(rxjs.operators.distinctUntilChanged((prev, curr) => {return prev.keyCode === curr.keyCode}))\n\nconst ticker = rxjs.interval(_constants_js__WEBPACK_IMPORTED_MODULE_0__.TICK_RATE)\n\n//# sourceURL=webpack:///./src/basicStreams.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DIRS\": () => (/* binding */ DIRS),\n/* harmony export */   \"SPEED\": () => (/* binding */ SPEED),\n/* harmony export */   \"TICK_RATE\": () => (/* binding */ TICK_RATE),\n/* harmony export */   \"TILE_SIZE\": () => (/* binding */ TILE_SIZE),\n/* harmony export */   \"bigTileDifference\": () => (/* binding */ bigTileDifference),\n/* harmony export */   \"walls\": () => (/* binding */ walls)\n/* harmony export */ });\nconst TILE_SIZE = 30;\n\nconst bigTileDifference = 10\n\n// tick_rate = 20 -> 50fps\nconst TICK_RATE = 20;\n\nconst DIRS = {\n    \"w\": [0, -1],\n    \"a\": [-1, 0],\n    \"s\": [0, 1],\n    \"d\": [1, 0],\n}\n\nconst SPEED = 2;\n\nconst walls = [\n    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],\n    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],\n    [1, 3, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 3, 1],\n    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],\n    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],\n    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],\n    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],\n    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],\n    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],\n    [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],\n    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],\n    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],\n    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],\n    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],\n    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],\n    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],\n    [1, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 3, 1],\n    [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],\n    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],\n    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],\n    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],\n    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n];\n\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/drawer.js":
/*!***********************!*\
  !*** ./src/drawer.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"draw\": () => (/* binding */ draw)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\n\nconst canvas = document.getElementById('pacman')\nconst ctx = canvas.getContext(\"2d\")\n\nconst getRotationAngle = (direction) => {\n    const {x, y} = direction\n    const angleX = x === -1 ? Math.PI : 0\n    const angleY = y === -1 ? Math.PI * (3 / 2) : y === 1 ? Math.PI / 2 : 0\n    return angleX + angleY\n}\n\n/**\nPlayersInformation = \n[\n    {\n        position: {\n            x: ...,\n            y: ...\n        },\n        direction: {\n            x: ...,\n            y: ...\n        },\n        sprite: link1},\n    },\n    ...\n]\n*/\nconst drawPlayers = (playersInformation) => {\n    playersInformation.forEach( (playerInfo) => {\n        ctx.save()\n        const {position, direction, sprite} = playerInfo\n        ctx.translate(position.x + _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE / 2, position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE / 2)\n        ctx.rotate(getRotationAngle(direction))\n        ctx.translate(- (position.x + _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE / 2), - (position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE / 2))\n        ctx.drawImage(sprite, position.x, position.y, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE)\n        ctx.restore()\n    })\n}\n\nconst drawGhosts = (ghostsInformation) => {\n    ghostsInformation.forEach( (ghostInfo) => {\n        const {position, direction, sprite} = ghostInfo\n        ctx.drawImage(sprite, position.x, position.y, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE)\n    })\n}\n\nconst drawMap = (tiles, walls) => {\n    const dotImage = tiles.dotImage\n    ctx.fillStyle = \"#000075\";\n\n    for(let row = 0; row < walls.length; row++){\n        for(let col = 0; col < walls[row].length; col++){\n            if(walls[row][col] == 1){\n                ctx.fillRect(col*_constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE, row*_constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE)\n            }\n            if(walls[row][col] == 2){\n                ctx.drawImage(dotImage, col*_constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.bigTileDifference/2, row*_constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.bigTileDifference/2, \n                            _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE - _constants__WEBPACK_IMPORTED_MODULE_0__.bigTileDifference, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE - _constants__WEBPACK_IMPORTED_MODULE_0__.bigTileDifference);\n            }\n            if(walls[row][col] == 3){\n                ctx.drawImage(dotImage, col*_constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE - _constants__WEBPACK_IMPORTED_MODULE_0__.bigTileDifference/2, row*_constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE - _constants__WEBPACK_IMPORTED_MODULE_0__.bigTileDifference/2,\n                             _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.bigTileDifference/2, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.bigTileDifference/2);\n            }\n        }\n    }\n}\n\nconst draw = (playersInformation, ghostsInformation, tiles) => {\n    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)\n    drawMap(tiles, _constants__WEBPACK_IMPORTED_MODULE_0__.walls)\n    drawPlayers(playersInformation)\n    drawGhosts(ghostsInformation)\n}\n\n\n//# sourceURL=webpack:///./src/drawer.js?");

/***/ }),

/***/ "./src/ghosts.js":
/*!***********************!*\
  !*** ./src/ghosts.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createGhost\": () => (/* binding */ createGhost)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n/* harmony import */ var _basicStreams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basicStreams.js */ \"./src/basicStreams.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\n\n\n\nconst validDirections = [\n    {\n        x: 1,\n        y: 0,\n    }, {\n        x: -1,\n        y: 0,\n    }, {\n        x: 0,\n        y: 1,\n    }, {\n        x: 0,\n        y: -1\n    }\n]\n\nconst getPossibleNextDirections = (ghostState) => {\n    // Filter directions that would cause a collision\n    return validDirections.filter( (direction) => {\n        const desiredNextPosition = {\n            x: ghostState.position.x + direction.x * _constants_js__WEBPACK_IMPORTED_MODULE_0__.SPEED,\n            y: ghostState.position.y + direction.y * _constants_js__WEBPACK_IMPORTED_MODULE_0__.SPEED,\n        }\n        return !(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.checkCollision)(desiredNextPosition, _constants_js__WEBPACK_IMPORTED_MODULE_0__.walls)\n    })\n}\n\nconst decideNextState = (ghostState, possibleNextDirections) => {\n    // Map directions to states\n    const possibleNextStates = possibleNextDirections.map((direction) => {\n        return {\n            position: {\n                x: ghostState.position.x + direction.x * _constants_js__WEBPACK_IMPORTED_MODULE_0__.SPEED,\n                y: ghostState.position.y + direction.y * _constants_js__WEBPACK_IMPORTED_MODULE_0__.SPEED,\n            },\n            direction: direction\n        }\n    })\n    const {x: prevX, y: prevY} = ghostState.direction\n\n    // Remove the one state that would cause ghost to go backwards\n    // i.e., if it is going right, remove the state that would make it\n    // go left.\n    const filteredStates = possibleNextStates.filter( (state) => {\n        return (state.direction.x !== prevX && state.direction.y !== prevY) || (state.direction.x === prevX && state.direction.y === prevY)\n    })\n\n    // If there are filteredStates, choose one of those at random. If there arent any, that means that the\n    // only possible next state is the one that makes de ghost go backwards. In that case, choose that one,\n    // because it is the only possible next state.\n    return filteredStates.length > 0 ? filteredStates[Math.floor(Math.random() * filteredStates.length)] : possibleNextStates[0]\n}\n\nconst createGhost = (initialState, ghostNumber) => {\n\n    // Ghost Position Stream\n    const ghostPositionStream = _basicStreams_js__WEBPACK_IMPORTED_MODULE_1__.ticker.pipe(\n        rxjs.scan((previousState, tick) => {\n            const possibleNextStates = getPossibleNextDirections(previousState)\n            return decideNextState(previousState, possibleNextStates)\n        }, initialState),\n    )\n\n    let img = new Image();\n    img.src = `../assets/sprites/ghosts/ghost${ghostNumber}.png`;\n\n    return {positionStream: ghostPositionStream, sprite: img}\n}\n\n\n//# sourceURL=webpack:///./src/ghosts.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pacman_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pacman.js */ \"./src/pacman.js\");\n/* harmony import */ var _basicStreams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basicStreams.js */ \"./src/basicStreams.js\");\n/* harmony import */ var _drawer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawer.js */ \"./src/drawer.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n/* harmony import */ var _ghosts_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ghosts.js */ \"./src/ghosts.js\");\n\n\n\n\n\n\n\n// DEFINE PLAYERS\nconst p1Keys = {\n    movement: ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],\n    shoot: 'KeyL'\n}\n\nconst p1InitialState = {\n    position: {\n        x: 1 * _constants_js__WEBPACK_IMPORTED_MODULE_3__.TILE_SIZE,\n        y: 1 * _constants_js__WEBPACK_IMPORTED_MODULE_3__.TILE_SIZE\n    },\n    direction: {\n        x: 0,\n        y: 0\n    }\n}\n\nconst p2Keys = {\n    movement: ['KeyW', 'KeyA', 'KeyS', 'KeyD'],\n    shoot: 'KeyL'\n}\n\nconst p2InitialState = {\n    position: {\n        x: 19 * _constants_js__WEBPACK_IMPORTED_MODULE_3__.TILE_SIZE,\n        y: 1 * _constants_js__WEBPACK_IMPORTED_MODULE_3__.TILE_SIZE\n    },\n    direction: {\n        x: 0,\n        y: 0\n    }\n}\n\nconst p1Data = (0,_pacman_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(p1Keys, p1InitialState, 1)\nconst p2Data = (0,_pacman_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(p2Keys, p2InitialState, 2)\n\n\n// DEFINE GHOSTS\nconst ghost1InitialState = {\n    position: {\n        x: 1 * _constants_js__WEBPACK_IMPORTED_MODULE_3__.TILE_SIZE,\n        y: 21 * _constants_js__WEBPACK_IMPORTED_MODULE_3__.TILE_SIZE\n    },\n    direction: {\n        x: 1,\n        y: 0\n    }\n}\n\nconst ghost2InitialState = {\n    position: {\n        x: 19 * _constants_js__WEBPACK_IMPORTED_MODULE_3__.TILE_SIZE,\n        y: 21 * _constants_js__WEBPACK_IMPORTED_MODULE_3__.TILE_SIZE\n    },\n    direction: {\n        x: -1,\n        y: 0\n    }\n}\n\nconst ghost3InitialState = {\n    position: {\n        x: 1 * _constants_js__WEBPACK_IMPORTED_MODULE_3__.TILE_SIZE,\n        y: 15 * _constants_js__WEBPACK_IMPORTED_MODULE_3__.TILE_SIZE\n    },\n    direction: {\n        x: 1,\n        y: 0\n    }\n}\n\nconst ghost4InitialState = {\n    position: {\n        x: 19 * _constants_js__WEBPACK_IMPORTED_MODULE_3__.TILE_SIZE,\n        y: 15 * _constants_js__WEBPACK_IMPORTED_MODULE_3__.TILE_SIZE\n    },\n    direction: {\n        x: -1,\n        y: 0\n    }\n}\n\nconst ghost1Data = (0,_ghosts_js__WEBPACK_IMPORTED_MODULE_4__.createGhost)(ghost1InitialState, 1)\nconst ghost2Data = (0,_ghosts_js__WEBPACK_IMPORTED_MODULE_4__.createGhost)(ghost2InitialState, 2)\nconst ghost3Data = (0,_ghosts_js__WEBPACK_IMPORTED_MODULE_4__.createGhost)(ghost3InitialState, 3)\nconst ghost4Data = (0,_ghosts_js__WEBPACK_IMPORTED_MODULE_4__.createGhost)(ghost4InitialState, 4)\n\nconst ghostDataStream = ghost1Data.positionStream.pipe(\n    rxjs.withLatestFrom(ghost2Data.positionStream, ghost3Data.positionStream, ghost4Data.positionStream)\n)\n\nconst ghostSprites = [\n    ghost1Data.sprite,\n    ghost2Data.sprite,\n    ghost3Data.sprite,\n    ghost4Data.sprite\n]\n\n// Buscar donde hace sentido que este esta imagen, quiza\n// agregamos un file que tenga todas las imagenes y les\n// haga load o algo asi\nconst dotImage = new Image()\ndotImage.src = '../assets/tiles/dot.png'\n\ndotImage.onload = () => {\n    _basicStreams_js__WEBPACK_IMPORTED_MODULE_1__.ticker.pipe(\n        // Despues, agregar el shoot stream, pero no con withlatestfrom,\n        // quiza con un merge o algo asi\n        rxjs.withLatestFrom(p1Data.positionStream, p2Data.positionStream, ghostDataStream),\n    ).subscribe({\n        next: ([tick, p1State, p2State, ghostStates]) => {\n            const p1Info = {\n                position: p1State.position,\n                direction: p1State.direction,\n                sprite: p1Data.sprite\n            }\n\n            const p2Info = {\n                position: p2State.position,\n                direction: p2State.direction,\n                sprite: p2Data.sprite\n            }\n\n            const ghostsInfo = ghostStates.map( (state, idx) => {\n                return {\n                    position: state.position,\n                    direction: state.direction,\n                    sprite: ghostSprites[idx]\n                }\n            })\n\n            ;(0,_drawer_js__WEBPACK_IMPORTED_MODULE_2__.draw)([p1Info, p2Info], ghostsInfo, {dotImage: dotImage})\n        },\n        error: console.log\n    })\n}\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/pacman.js":
/*!***********************!*\
  !*** ./src/pacman.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createPlayer\": () => (/* binding */ createPlayer)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n/* harmony import */ var _basicStreams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basicStreams.js */ \"./src/basicStreams.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\n\n\n\n\nconst createPlayer = (playerKeys, initialState, playerNumber) => {\n    // Direction Stream\n    const playerDirectionStream = _basicStreams_js__WEBPACK_IMPORTED_MODULE_1__.keyPresses.pipe(\n        rxjs.filter(event => playerKeys.movement.includes(event.code)),\n        rxjs.operators.map((event) => {\n            const idx = playerKeys.movement.indexOf(event.code)\n            switch(idx) {\n                case 0:\n                    // Move Up\n                    return {x: 0, y: -1}\n                case 1:\n                    // Move left\n                    return {x: -1, y: 0}\n                case 2:\n                    // Move down\n                    return {x: 0, y: 1}\n                case 3:\n                    // Move right\n                    return {x: 1, y: 0}\n                default:\n                    // Default case should never occur\n                    return {x: 0, y: 0}\n            }\n        }),\n        rxjs.startWith({x: 0, y: 0})\n    )\n\n    // Player Position Stream\n    const playerPositionStream = _basicStreams_js__WEBPACK_IMPORTED_MODULE_1__.ticker.pipe(\n        rxjs.withLatestFrom(playerDirectionStream),\n        rxjs.scan((previousState, [tick, direction]) => {\n            const desiredNextState = {\n                position: {\n                    x: previousState.position.x + direction.x * _constants_js__WEBPACK_IMPORTED_MODULE_0__.SPEED,\n                    y: previousState.position.y + direction.y * _constants_js__WEBPACK_IMPORTED_MODULE_0__.SPEED,\n                },\n                direction: direction\n            }\n            const previousDirectionNextState = {\n                position: {\n                    x: previousState.position.x + previousState.direction.x * _constants_js__WEBPACK_IMPORTED_MODULE_0__.SPEED,\n                    y: previousState.position.y + previousState.direction.y * _constants_js__WEBPACK_IMPORTED_MODULE_0__.SPEED \n                },\n                direction: previousState.direction\n            }\n            // TODO: IF COLISION RETURN LAST ELSE RETURN NEW\n            return (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.checkCollision)(desiredNextState.position, _constants_js__WEBPACK_IMPORTED_MODULE_0__.walls) ? (\n                        (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.checkCollision)(previousDirectionNextState.position, _constants_js__WEBPACK_IMPORTED_MODULE_0__.walls) ? previousState : previousDirectionNextState) :\n                        desiredNextState\n        }, initialState),\n    )\n\n    // Shoot Stream\n    const shootStream = _basicStreams_js__WEBPACK_IMPORTED_MODULE_1__.keyPresses.pipe(\n        rxjs.filter(event => playerKeys.shoot === event.code),\n        rxjs.throttleTime(1000)\n    )\n\n    let img = new Image();\n    img.src = `../assets/sprites/pacman/pacman${playerNumber}.png`;\n\n    return {positionStream: playerPositionStream, shootStream: shootStream, sprite: img}\n}\n\n\n//# sourceURL=webpack:///./src/pacman.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkCollision\": () => (/* binding */ checkCollision)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\n\n\nconst checkCollision = (playerPos, map) => {\n\n    const rec1_x = playerPos.x\n    const rec1_y = playerPos.y\n    const rec1_w = _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE\n    const rec1_h = _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE\n\n    for(let row = 0; row < map.length; row++){\n        for(let col = 0; col < map[row].length; col++){\n\n            if(map[row][col] != 1) continue\n\n            const rec2_x = col*_constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE\n            const rec2_y = row*_constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE\n            const rec2_w = _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE\n            const rec2_h = _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE\n\n            if(\n                rec1_x < rec2_x + rec2_w &&\n                rec1_x + rec1_w > rec2_x &&\n                rec1_y < rec2_y + rec2_h &&\n                rec1_y + rec1_h > rec2_y\n            ) return true\n        }\n    }\n    return false\n}\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;