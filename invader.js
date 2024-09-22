'use strict'

const INVADER = '👽'
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3

var gIntervalAliens
var gIsAlienFreeze = true

function createInvaders(board) {
    gGame.alienCount = 0
    for (var i = 0; i < ALIEN_ROW_COUNT; i++) {
        for (var j = 0; j < ALIEN_ROW_LENGTH; j++) {
            board[i][j] = INVADER
            gGame.alienCount++
        }
    }
    updateAliensCount()
}

function handleAlienHit(pos) {
    updateAliensCount()
    if (gGame.alienCount === 0) {
        gameOver(true)
    }
}

function shiftBoardRight(board, fromI, toI) {

} 
function shiftBoardLeft(board, fromI, toI) {

} 
function shiftBoardDown(board, fromI, toI) {

}
function moveInvaders() {
}

function updateAliensCount() {
    document.querySelector('.aliens-count').innerText = gGame.alienCount
}