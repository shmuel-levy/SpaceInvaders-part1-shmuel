'use strict'

var gHero = {
    pos: { i: 12, j: 5 },
    isShoot: false
}

var gLaserInterval

function createHero(board) {
    gHero.pos.i = board.length - 2
    gHero.pos.j = Math.floor(board[board.length - 2].length / 2)
    board[gHero.pos.i][gHero.pos.j] = PLAYER
}

function moveHero(event) {
    const playerPos = gHero.pos
    switch (event.key) {
        case 'ArrowLeft':
            if (playerPos.j > 0) {
                updateCell(gBoard, playerPos, SKY)
                playerPos.j--
                updateCell(gBoard, playerPos, PLAYER)
            }
            break
        case 'ArrowRight':
            if (playerPos.j < BOARD_SIZE - 1) {
                updateCell(gBoard, playerPos, SKY)
                playerPos.j++
                updateCell(gBoard, playerPos, PLAYER)
            }
            break
        case ' ':
            if (!gHero.isShoot) {
                shoot(playerPos)
            }
            break
    }
}

function shoot(playerPos) {
    if (gHero.isShoot) return
    gHero.isShoot = true
    var laserPos = { i: playerPos.i - 1, j: playerPos.j }
    shootSound.play()

    gLaserInterval = setInterval(() => {
        updateCell(gBoard, laserPos, SKY)
        laserPos.i--
        if (laserPos.i < 0) {
            clearInterval(gLaserInterval)
            gHero.isShoot = false
            return
        }
        if (gBoard[laserPos.i][laserPos.j] === INVADER) {
            handleAlienHit(gBoard, laserPos)
            clearInterval(gLaserInterval)
            gHero.isShoot = false
            return
        }
        updateCell(gBoard, laserPos, LASER);
    }, 100)
}