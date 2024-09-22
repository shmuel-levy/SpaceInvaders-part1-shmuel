'use strict'
const EMPTY = ''
const BOARD_SIZE = 14

var gGame
var gBoard

function init(){
    showMenu()
}

function startGame(){
    document.querySelector('.menu').style.display='none'
    document.querySelector('.board-container').style.display = 'table'
    document.querySelector('.headers').style.display = 'block'
    gGame = {
        isOn: true,
        isVictory : false,
        alienCount : 0
    }
    gBoard = buildBoard()
    createInvaders(gBoard)
    createHero(gBoard)
    renderBoard(gBoard)
}

function buildBoard(){
    const board = []
    for(var i = 0;i<BOARD_SIZE;i++){
        board.push([])
        for(var j = 0;j<BOARD_SIZE;j++){
            board[i][j] = EMPTY
            // console.log('board:',board);
        }
    }
    return board
}

function renderBoard(board){
    var strHTML = ''
    for (var i = 0;i<board.length;i++){
        strHTML+= '<tr>'
        for (var j = 0; j < board[i].length; j++){
            const cell = board[i][j]
            if(i===board.length -1){
                strHTML+= `<td class="cell floor">${cell}</td>`
            } else {
                strHTML+=`<td class="cell">${cell}</td>`
            }
        }
         strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function updateCell(pos,value){
    gBoard[pos.i][pos.j] =value
    renderBoard(gBoard)
    // console.log('gBoard:',gBoard);
}

function gameOver(){
    gGame.isOn=false
    openModal()
}

function openModal() {
    document.querySelector('.modal').style.display = "block"
    document.querySelector('.modal .msg').innerText = gGame.isVictory ? "You Won!" : "Game Over";
}

function showMenu() {
    document.querySelector('.menu').style.display = 'block'
    document.querySelector('.board-container').style.display = 'none'
    document.querySelector('.headers').style.display = 'none'
}

