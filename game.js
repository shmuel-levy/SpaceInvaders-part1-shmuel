'use strict'
var gGame
var gBoard
var gInvadersInterval
function init() {
    showMenu()
}

function startGame() {
    document.querySelector('.menu').style.display = 'none'
    document.querySelector('.board-container').style.display = 'table'
    document.querySelector('.headers').style.display = 'block'
    gGame = {
        isOn: true,
        isVictory: false,
        alienCount: 0,
        score: 0
    }
    gBoard = buildBoard()
    createInvaders(gBoard)
    createHero(gBoard)
    renderBoard(gBoard)
    updateScore(gGame.score)

    gAliensTopRow = 0
    gAliensBottomRow = ALIEN_POINTS - 1
    gAlienDirection = 'right'
    gIsAlienFreeze = false

    if (gInvadersInterval)
    clearInterval(gInvadersInterval)
    gInvadersInterval = setInterval(moveInvaders, ALIEN_SPEED)
}

function buildBoard() {
    const board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([])
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = SKY
            // console.log('board:',board);
        }
    }
    return board
}

function renderBoard(board) {
    let strHTML = ''
    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (let j = 0; j < board[i].length; j++) {
            const cell = board[i][j]
            const cellClass = i === board.length - 1 ? 'cell floor' : 'cell'
            strHTML += `<td class="${cellClass}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function gameOver(isWin) {
    gGame.isOn = false
    clearInterval(gInvadersInterval)
    const msg = isWin ? 'You Won' : 'Game Over!'
    openModal(msg)
}

function openModal(msg) {
    document.querySelector('.modal').style.display = "block"
    document.querySelector('.modal .msg').innerText = msg
}

function closeModal() {
    document.querySelector('.modal').style.display = "none"
}

function restartGame() {
    closeModal()
    gIsAlienFreeze = true
    clearInterval(gInvadersInterval)
    startGame()
}

function showMenu() {
    document.querySelector('.menu').style.display = 'block'
    document.querySelector('.board-container').style.display = 'none'
    document.querySelector('.headers').style.display = 'none'
}

function checkGameOver() {
    const heroRow = gBoard.length - 2
    for (var i = 0; i < BOARD_SIZE; i++) {
        if (gBoard[heroRow][i] === INVADER) {
            gameOver(false)
            return
        }
    }
}

