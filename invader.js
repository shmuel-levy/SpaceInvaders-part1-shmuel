'use strict'

var gIsAlienFreeze = true
var gAlienDirection = 'right'
var gAliensTopRow = 0
var gAliensBottomRow = ALIEN_ROW_COUNT - 1

function createInvaders(board) {
    gGame.alienCount = 0
    for (var i = 0; i < ALIEN_ROW_COUNT; i++) {
        for (var j = 0; j < ALIEN_ROW_LENGTH; j++) {
            board[i][j] = INVADER
            gGame.alienCount++
        }
    }
    updateAliensCount(gGame.alienCount)
}

function handleAlienHit(board, pos) {
    updateCell(board, pos, SKY)
    gGame.alienCount--
    gGame.score += ALIEN_POINTS
    updateAliensCount(gGame.alienCount)
    updateScore(gGame.score)
    if (gGame.alienCount === 0) {
        gameOver(true)
    }
}

function shiftBoardRight(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = board[i].length - 1; j > 0; j--) {
            if (board[i][j - 1] === INVADER) {
                updateCell(board, { i, j }, INVADER)
                updateCell(board, { i, j: j - 1 }, SKY)
            }
        }
    }
}

function shiftBoardLeft(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j < board[i].length - 1; j++) {
            if (board[i][j + 1] === INVADER) {
                updateCell(board, { i, j }, INVADER)
                updateCell(board, { i, j: j + 1 }, SKY)
            }
        }
    }
}

function shiftBoardDown(board) {
    if (gAliensBottomRow >= board.length - 2) {
        gameOver(false)
        return
    }
    for (var i = gAliensBottomRow; i >= gAliensTopRow; i--) {
        for (var j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] === INVADER) {
                updateCell(board, { i: i + 1, j }, INVADER)
                updateCell(board, { i, j }, SKY)
            }
        }
    }
    gAliensTopRow++
    // console.log('gAliensTopRow:',gAliensTopRow);
    gAliensBottomRow++
    // console.log('gAliensBottomRow:',gAliensBottomRow);
    renderBoard(board)
}
function moveInvaders() {
    if (gIsAlienFreeze || !gGame.isOn) return
    var isEdge = false
    if (gAlienDirection === 'right') {
        for (var i = gAliensTopRow; i <= gAliensBottomRow; i++) {
            if (gBoard[i][BOARD_SIZE - 1] === INVADER) {
                isEdge = true
                break
            }
        }
    } else {
        for (var i = gAliensTopRow; i <= gAliensBottomRow; i++) {
            if (gBoard[i][0] === INVADER) {
                isEdge = true
                break
            }
        }
    }
    if (isEdge) {
        shiftBoardDown(gBoard)
        gAlienDirection = gAlienDirection === 'right' ? 'left' : 'right'
    } else {
        if (gAlienDirection === 'right') {
            shiftBoardRight(gBoard, gAliensTopRow, gAliensBottomRow)
        } else {
            shiftBoardLeft(gBoard, gAliensTopRow, gAliensBottomRow)
        }
    }
    checkGameOver()
}

