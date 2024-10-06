'use strict'

var gHero = {
    pos: { i: 12, j: 5 },
    isShoot: false,
    superAttacksLeft: 3,
    isSuperMode: false
}

var gLaserInterval

const REGULAR_LASER = '⤊'
const SUPER_LASER = '^'
const REGULAR_LASER_SPEED = 100
const SUPER_LASER_SPEED = 50

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
        case 'n':
            if (!gHero.isShoot) {
                shootWithNeighbors(playerPos)
            }
            break
        case 'x':
            if (gHero.superAttacksLeft > 0) {
                activateSuperMode()
            }
            break
    }
}

function shoot(playerPos) {
    if (gHero.isShoot) return
    gHero.isShoot = true
    var laserPos = { i: playerPos.i - 1, j: playerPos.j }

    shootSound.play()

    const laserSymbol = gHero.isSuperMode ? SUPER_LASER : REGULAR_LASER
    const laserSpeed = gHero.isSuperMode ? SUPER_LASER_SPEED : REGULAR_LASER_SPEED

    gLaserInterval = setInterval(() => {
        updateCell(gBoard, laserPos, SKY)
        laserPos.i--
        if (laserPos.i < 0 || gBoard[laserPos.i][laserPos.j] === INVADER || gBoard[laserPos.i][laserPos.j] === CANDY) {
            clearInterval(gLaserInterval)
            gHero.isShoot = false
            if (laserPos.i >= 0) {
                if (gBoard[laserPos.i][laserPos.j] === INVADER) {
                    handleAlienHit(gBoard, laserPos)
                } else if (gBoard[laserPos.i][laserPos.j] === CANDY) {
                    handleCandyHit(laserPos)
                }
            }
            if (gHero.isSuperMode) {
                deactivateSuperMode()
            }
            return
        }
        updateCell(gBoard, laserPos, laserSymbol)
    }, laserSpeed)
}
function shootWithNeighbors(playerPos) {
    if (gHero.isShoot) return
    gHero.isShoot = true
    var laserPos = { i: playerPos.i - 1, j: playerPos.j }

    shootSound.play()

    gLaserInterval = setInterval(() => {
        updateCell(gBoard, laserPos, SKY)
        laserPos.i--
        if (laserPos.i < 0 || gBoard[laserPos.i][laserPos.j] === INVADER) {
            clearInterval(gLaserInterval)
            gHero.isShoot = false
            if (laserPos.i >= 0) {
                handleAlienHitWithNeighbors(gBoard, laserPos)
            }
            return
        }
        updateCell(gBoard, laserPos, LASER)
    }, 100)
}

function handleAlienHitWithNeighbors(board, pos) {
    const neighbors = [
        { i: pos.i - 1, j: pos.j },
        { i: pos.i + 1, j: pos.j },
        { i: pos.i, j: pos.j - 1 },
        { i: pos.i, j: pos.j + 1 },
        { i: pos.i - 1, j: pos.j - 1 },
        { i: pos.i - 1, j: pos.j + 1 },
        { i: pos.i + 1, j: pos.j - 1 },
        { i: pos.i + 1, j: pos.j + 1 },
    ]

    handleAlienHit(board, pos)

    for (let neighbor of neighbors) {
        if (neighbor.i >= 0 && neighbor.i < BOARD_SIZE &&
            neighbor.j >= 0 && neighbor.j < BOARD_SIZE &&
            board[neighbor.i][neighbor.j] === INVADER) {
            handleAlienHit(board, neighbor)
        }
    }
}

function activateSuperMode() {
    if (gHero.superAttacksLeft > 0) {
        gHero.isSuperMode = true
        gHero.superAttacksLeft--
        updateSuperAttacksDisplay()
        
    }
}

function deactivateSuperMode() {
    gHero.isSuperMode = false
    
}

function updateSuperAttacksDisplay() {
    const superAttacksDisplay = document.querySelector('.super-attacks')
    if (superAttacksDisplay) {
        superAttacksDisplay.textContent = `Super Attacks: ${gHero.superAttacksLeft}`
    }
}