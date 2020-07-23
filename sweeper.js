"use strict";

const smilingFace = '😀';
const coolFace = '😎';
const skullFace = '💀';
const flag = '⚑';
const mine = '🧨';
var gElSmiley = document.querySelector(".smiley").innerHTML;


var gLevel = { size: 4, mines: 2 };
var gBoard = new Array();
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    firstMoveDone: false
}
var gSecInterval;
initGame();

/* var elBoard = document.getElementById('sweeperBoard');
 elBoard.addEventListener('contextmenu', e => {
  e.preventDefault();
  return false;
}, false); */


function initGame() {
    buildBoard();
    renderInitialBoard();
    clearInterval(gSecInterval);
    gGame.secsPassed = 0;
    gElSmiley = smilingFace;
    gGame.isOn = true;
}

function buildBoard() {
    for (var i = 0; i < gLevel.size; i++) {
        gBoard[i] = [];
        for (var j = 0; j < gLevel.size; j++) {
            gBoard[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            /* elTD.addEventListener('mouseup', e => {
                e.preventDefault();
                if (e === 2) cellMarked(gBoard[i][j], i, j);
                if (e === 0) cellClicked(gBoard[i][j], i, j);
                return false;
            }, false); */
        }
    }
}

function setMines(iFirstCell, jFirstCell) {
    var empties = [];
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            /* if (!gBoard[i][j].isMine) */
            empties.push({ i: gBoard[i], j: gBoard[j] })
        }
    }
    for (var numOfMinesSet = 0; numOfMinesSet < gLevel.mines; numOfMinesSet++) {
        do {
            var randomIdx = getRandomIntInclusive(0, empties.length - 1);
            var randomPosI = empties[randomIdx].i;
            var randomPosJ = empties[randomIdx].j;
        }
        while (randomPosI === iFirstCell && randomPosJ === jFirstCell)
        gBoard[randomPosI][randomPosJ].isMine = true;
        gMines[numOfMinesSet] = { i: randomPosI, j: randomPosJ };
    }
}

function setMinesNeighsCount(iPos, jPos) // Count the number of mines around each cell to enable the non-mine cells to be properly rendered
{
    var neighMinesCount = 0;
    for (var i = iPos - 1; i <= iPos.i + 1; i++) {
        if (i < 0 || i >= gLevel.size) continue;
        for (var j = jPos.j - 1; j <= jPos.j + 1; j++) {
            if (i === iPos, j === jPos) continue;
            if (j >= 0 && j < gLevel.size && gBoard[i][j].isMine) neighMinesCount++;
        }
    }
    return neighMinesCount;
}

function renderInitialBoard() // render the board as a <table> on the page
{
    var HTMLstr = '';
    for (var i = 0; i < gLevel.size; i++) {
        HTMLstr += '<tr>';
        for (var j = 0; j < gLevel.size; j++) {
            HTMLstr += '<td onclick="cellClicked(this)" oncontextmenu = "cellMarked(this)" id = "row' + i + 'col' + j + '"> </td>\n';
        }
        HTMLstr += '</tr>\n';
    }
    console.log(HTMLstr); // checks if the variable holds the correct rendering
    var elTable = document.querySelector('.matrice').innerHTML;
    elTable = HTMLstr;
}

function cellClicked(elCell, i, j) // called when a cell (<td> element) is clicked with the left mouse button
{
    if (!gGame.isOn) return;
    if (!gGame.firstMoveDone) {
        gSecInterval = setInterval(() => {
            //    while (gGame.isOn)
            gGame.secsPassed++;
            var elTime = document.querySelector(".time-passed");
            elTime = gGame.secsPassed;
        }, 1000);
        setMines();
        for (var i = 0; i < gLevel.size; i++) {
            for (var j = 0; j < gLevel.size; j++) {
                gBoard[i][j].minesAroundCount = setMinesNeighsCount(i, j);
            }
        }
        gGame.firstMoveDone = true;
    }
    elCell.isShown = true;
    gGame.isShown++;
    if (elCell.isMine) {
        var elMine = selectCellHTML(i, j);
        elMine = mine;

        gameOver();
        return;
    }
    else if (elCell.minesAroundCount !== 0) {
        var elNumber = selectCell(i, j).innerText;
        elNumber = elCell.minesAroundCount;
        czechVictory();
    }
    else {
        expandShown(i, j);
    }
}

function cellMarked(elCell, i, j) /* called when a cell is clicked with the right mouse button. Marks a suspected mine.
                                Search the internet as to how to do that without showing the context menu, which is 
                                what browsers (and Unix-family operation systems) usually use the right-mouse button for. */ {
    if (gGame.isOn = false) return;
    elCell.isMarked === true;
    var elFlag = selectCellHTML(i, j);
    elFlag = flag;
    gGame.markedCount++;
    return elCell;
}

function setLevel(num) {
    switch (num) {
        case 2:
            gLevel.size = 8;
            gLevel.mines = 12;
        case 3:
            gLevel.size = 12;
            gLevel.mines = 30;
        default:
            gLevel.size = 4;
            gLevel.mines = 2;
    }
    initGame();
}

function czechVictory() {
    if (gGame.shownCount < (gLevel.size ** 2 - gLevel.mines)) return;
    gGame.isOn = false;
    clearInterval(gSecInterval);
    gElSmiley = coolFace;
    alert('You won!');
}

function gameOver() {
    gGame.isOn = false;
    clearInterval(gSecInterval);
    gElSmiley = skullFace;
    showAllMines();
    alert('Game Over!');
}

function expandShown(iPos, jPos) {
    for (var i = iPos - 1; i <= iPos + 1; i++) {
        if (i < 0 || i >= gLevel.size) continue;
        for (var idx2 = jPos - 1; idx2 <= jPos + 1; idx2++) {
            if (jPos < 0 || jPos >= gLevel.size) continue;
            if (i === iPos && j === jPos) continue;
            if (gBoard[i][j].minesAroundCount > 0) {
                gGame.shownCount++;
                gBoard[i][j].isShown = true;

            }
            else expandShown(i, j);
        }
    }
}

function showAllMines() {
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            var currCell = gBoard[i][j];
            if (currCell.isMine) {
                currCell.isShown = true;
                if (currCell.isMarked) currCell.isMarked = false;
                console.log(currCell);
            }
        }
    }
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectCellHTML(i, j) {
    var elHTML = selectTableCell(i, j).innerHTML;
    return elHTML;
}

function selectTableCell(i, j) {
    var elTableCell = document.getElementById('row' + i + 'col' + j);
    return elTableCell;
}