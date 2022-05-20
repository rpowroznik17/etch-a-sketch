let isMouseDown = false;
let colorPicker;
let defaultColor = '#4287f5';
let currentColor = defaultColor;

window.addEventListener('load', createBoard(16));
window.addEventListener('load', setupColorPicker);

const creationBtn = document.querySelector('#creation-btn');
creationBtn.addEventListener('click', changeSizeOfTheBoard);

const clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', clearTheBoard);

const rubberBtn = document.querySelector('#rubber-btn');
rubberBtn.addEventListener('click', () => {
    currentColor = '#fff';
});

// const drawBtn = document.querySelector('#draw-btn');
// drawBtn.addEventListener('click', () => {
//     drawingColor = currentColor;
// });


function createBoard(sideLength) {
    const board = document.createElement('div');
    board.classList.add('board');
    board.style['grid-template-columns'] = `repeat(${sideLength}, 1fr)`;
    board.style['grid-template-rows'] = `repeat(${sideLength}, 1fr)`;
    board.addEventListener('mousedown', startDrawing);
    board.addEventListener('mouseup', stopDrawing);
    
    fillBoardWithEmptyFields(sideLength, board);
    document.body.appendChild(board);
}

function changeSizeOfTheBoard() {
    const board = document.querySelector('.board');
    board.remove()
    const sideLength = prompt('Enter the length of side of the sketchpad: ');
    createBoard(sideLength);
}

function clearTheBoard() {
    const fields = document.querySelectorAll('.board-field');
    fields.forEach(field => field.style['background-color'] = '#fff');
}

function setupColorPicker() {
    colorPicker = document.querySelector('#colorPicker');
    colorPicker.value = defaultColor;
    colorPicker.addEventListener('input', changeColor);
}

function changeColor(e) {
    currentColor = e.target.value;
}

// function createNewBoard() {
//     if (checkIfBoardExists()) {
//         const board = document.querySelector('.board');
//         board.remove();
//     }

//     const sideLength = prompt('Enter the length of side of the sketchpad: ');

//     const board = document.createElement('div');
//     board.classList.add('board');
//     board.style['grid-template-columns'] = `repeat(${sideLength}, 1fr)`;
//     board.style['grid-template-rows'] = `repeat(${sideLength}, 1fr)`;
//     board.addEventListener('mousedown', startDrawing);
//     board.addEventListener('mouseup', stopDrawing);
    
//     fillBoardWithEmptyFields(sideLength, board);
//     document.body.appendChild(board); 
// }

// function checkIfBoardExists() {
//     const board = document.querySelector('.board');
//     if (board === null) {
//         return false;
//     }
//     return true;
// }

function fillBoardWithEmptyFields(sideLength, board) {
    const size = sideLength ** 2;

    for (let i = 0; i < size; i ++) {
        const newField = document.createElement('div');
        newField.classList.add('board-field');
        newField.addEventListener('mouseenter', draw)
        board.appendChild(newField);
    }
}

function draw(e) {
    if (isMouseDown) {
        e.target.style['background-color'] = currentColor;
    }
}

function startDrawing() {
    isMouseDown = true;
}

function stopDrawing(){
    isMouseDown = false;
}