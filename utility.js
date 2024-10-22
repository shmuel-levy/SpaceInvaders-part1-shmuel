'use strict'

const SKY = ' '
const BOARD_SIZE = 14
const INVADER = '👽'
const PLAYER = '♆'
const LASER = '⤊'
const ALIEN_POINTS = 10
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
const ALIEN_SPEED = 500

function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function getElCell(pos, value) {
    const elCell = document.querySelector(`.cell-${pos.i}-${pos.j}`)
    elCell.innerHTML = value
}

function updateCell(board, pos, value) {
    board[pos.i][pos.j] = value
    renderBoard(board)
}

function updateScore(score) {
document.querySelector('.count-score').innerText = score
    
}

function updateAliensCount(count) {
    document.querySelector('.aliens-count').innerText = count
}