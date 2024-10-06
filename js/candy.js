'use strict'

'use strict'

const CANDY = '🍬'
const CANDY_POINTS = 50
const CANDY_DURATION = 5000 
const CANDY_INTERVAL = 10000 
const FREEZE_DURATION = 5000 

var gCandyInterval
var gCandyTimeoutId

function startCandySpawn() {
    gCandyInterval = setInterval(spawnCandy, CANDY_INTERVAL)
}

function stopCandySpawn() {
    clearInterval(gCandyInterval)
    if (gCandyTimeoutId) {
        clearTimeout(gCandyTimeoutId)
    }
}

function spawnCandy() {
    const emptyPositions = getEmptyPositionsInFirstRow(gBoard)
    if (emptyPositions.length === 0) return

    const randomPos = emptyPositions[Math.floor(Math.random() * emptyPositions.length)]
    updateCell(gBoard, randomPos, CANDY)

    gCandyTimeoutId = setTimeout(() => {
        if (gBoard[randomPos.i][randomPos.j] === CANDY) {
            updateCell(gBoard, randomPos, SKY)
        }
    }, CANDY_DURATION)
}

function getEmptyPositionsInFirstRow(board) {
    const emptyPositions = []
    for (let j = 0; j < board[0].length; j++) {
        if (board[0][j] === SKY) {
            emptyPositions.push({ i: 0, j })
        }
    }
    return emptyPositions
}

function handleCandyHit(pos) {
    updateCell(gBoard, pos, SKY)
    gGame.score += CANDY_POINTS
    updateScore(gGame.score)
    freezeAliens()
}

function freezeAliens() {
    gIsAlienFreeze = true
    setTimeout(() => {
        gIsAlienFreeze = false
    }, FREEZE_DURATION)
}