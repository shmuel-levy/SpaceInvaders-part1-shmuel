'use strict'

const PLAYER = '♆'
const LASER = '⤊'
var gHero = {
    pos: { i: 12, j: 5 },
    isShoot: false
}

function createHero(board) {
    gHero.pos.i = board.length - 2
    gHero.pos.j = Math.floor(board[board.length - 2].length / 2)
    board[gHero.pos.i][gHero.pos.j] = PLAYER
}

function moveHero(event) {
    const playerPos = findPlayerPos()
    // console.log('playerPos:',playerPos);
    switch (event.key) {
        case 'ArrowLeft':
            if (playerPos.j > 0) {
                updateCell(playerPos, EMPTY)
                playerPos.j--
                updateCell(playerPos, PLAYER)
            }
            break
            case 'ArrowRight':
                if(playerPos.j<BOARD_SIZE-1){
                    updateCell(playerPos,EMPTY)
                    playerPos.j++
                    updateCell(playerPos,PLAYER)
                }
                break
    }
}

function findPlayerPos(){
    return gHero.pos
}