"use strict";

var gBoard = [];
var gLevel = {size: 4, mines: 2};
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0, 
    secsPassed: 0
}
gSecInterval; 

function initGame() {
gGame.secsPassed = 0;
gboard = buildBoard();
gGame.isOn = true; 
gSecInterval = setInterval(() => {
    while (gGame.isOn) gGame.secsPassed++;
}, 1000);
}

function buildBoard() {
for (var i = 0; i < gLevel.size; i++)
{
    gBoard.push([]);
    for (var j = 0; j < gLevel.size; j++)
    {
        gBoard[i][j] = {
        minesAroundCount: 0, 
        isShown: false,
        isMine: false,
        isMarked: false
        }
    }
    setMines();
    for (var i = 0; i < gLevel.size; i++)
    {
        for (var j = 0; j < gLevel.size; j++)
        {
            gBoard[i][j].minesAroundCount = setMinesNeighsCount (i, j);
        }
    }
    return gBoard;
}
}

function setMines ()
{
    var empties = [];
    for (var i=0; i < gLevel.size; i++ )
    {
        for (var j = 0; j < gLevel.size; j++)
        {
            if (!gBoard[i][j].isMine) empties.push ({i: gBoard[i], j: gBoard[j]})
        }
    }
    for (var minesSet = 0; minesSet < gLevel.mines; minesSet++)
    {
    var randomIdx = getRandomIntInclusive (0, empties.length-1);
    var randomPosI = empties[randomIdx].i;
    var randomPosJ = empties[randomIdx].j;
    gBoard[randomPosI][randomPosJ].isMine = true; 
    }
}

function setMinesNeighsCount(iPos, jPos) // Count the number of mines around each cell to enable the non-mine cells to be properly rendered
{
    var neighMinesCount = 0;
    for (var i = iPos-1; i <= iPos.i+1 ; i++)
    {
        for (var j = jPos.j-1; j <= jPos.j+1 ; j++)
        {
            if (i >= 0 && i < gLevel.size && j >= 0 && j < gLevel.size)
            {
                if (gBoard[i][j].isMine === true) neighMinesCount++;
            }
        }
    }
    return neighMinesCount;
}

function renderBoard (board) // render the board as a <table> on the page
{
    var HTMLstr = '<table> <tbody>';
    for (var i = 0; i < board.length; i++)
    {
        HTMLstr += <tr>;
        for (var j = 0; j 
        HTMLstr += </tr>; 
    }
    HTMLstr += '</tbody> </table>';
}

function cellClicked (elCell, i, j) // called when a cell (<td> element) is clicked with the left mouse button
{

}

function cellMarked (elCell) /* called when a cell is clicked with the right mouse button. Marks a suspected mine.
                                Search the internet as to how to do that without showing the context menu, which is 
                                how browsers (and Unix-family operation systems) usually use the right-mouse button for. */ 
{

}

function czechVictory ()
{
    if (gGame.shownCount < (gLevel.size ** 2 - gLevel.mines)) return;
    else {
        alert ('You won!');
    }
}

function expandShown (board, elCell, i, j)
{

}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}