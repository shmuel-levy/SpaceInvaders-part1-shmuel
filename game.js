'use strict'

var gGame
var gBoard
var gInvadersInterval
var shootSound = new Audio('blaster-2-81267.mp3')
var backgroundMusic = new Audio("invasion-march-star-wars-style-cinematic-music-219585.mp3")

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
    gAliensBottomRow = ALIEN_ROW_COUNT - 1
    gAlienMoveDirection = 'right'
    gIsAlienFreeze = false

    if (gInvadersInterval)
    clearInterval(gInvadersInterval)
    gInvadersInterval = setInterval(moveInvaders, ALIEN_SPEED)
    backgroundMusic.play()
}

function buildBoard() {
    const board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([])
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = SKY
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            const cell = board[i][j]
            const cellClass = i === board.length - 1 ? 'cell floor' : 'cell'
            strHTML += `<td class="${cellClass} cell-${i}-${j}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function gameOver(isWin) {
    gGame.isOn = false
    clearInterval(gInvadersInterval)
    backgroundMusic.pause()
    const message = isWin ? "You Won!" : "Game Over!"
    openModal(message)
}


function openModal(message) {
    document.querySelector('.modal').style.display = "block"
    document.querySelector('.modal .msg').innerText = message
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
    for (let j = 0; j < BOARD_SIZE; j++) {
        if (gBoard[heroRow][j] === INVADER) {
            gameOver(false)
            return
        }
    }
}