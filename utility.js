'use strict'

function createCell(gameObject = null) { 
    return { 
      type: SKY, 
      gameObject: gameObject 
    } 
  } 
   
   
  function getElCell(pos) { 
    return document.querySelector(`[data-i='${pos.i}'][data-
  j='${pos.j}']`) 
  } 