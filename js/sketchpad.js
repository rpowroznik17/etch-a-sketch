const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#ad7bc9';

let mouseDown = false;
let colorPicker;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

const canvas = document.querySelector('#canvas');
const creationBtn = document.querySelector('#creation-btn');
const colorBtn = document.querySelector('#color-btn');
const eraseBtn = document.querySelector('#erase-btn');
const rainbowModeBtn = document.querySelector('#rainbow-mode-btn');
const clearBtn = document.querySelector('#clear-btn');
const showGridBtn = document.querySelector('#show-grid-btn');


creationBtn.addEventListener('click', changeSizeOfTheBoard);
colorBtn.onclick = () => setCurrentMode('color');
eraseBtn.onclick = () => setCurrentMode('erase');
rainbowModeBtn.onclick = () => setCurrentMode('rainbow');
clearBtn.addEventListener('click', clearTheBoard);
showGridBtn.addEventListener('click', showGrid);

function createBoard(sideLength) {
    const board = document.createElement('div');
    board.classList.add('board');
    board.style['grid-template-columns'] = `repeat(${sideLength}, 1fr)`;
    board.style['grid-template-rows'] = `repeat(${sideLength}, 1fr)`;
    
    fillBoardWithEmptyFields(sideLength, board);
    canvas.appendChild(board);
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
    colorPicker.value = DEFAULT_COLOR;
    colorPicker.addEventListener('input', setCurrentColor);
}

function setCurrentColor(e) {
    currentColor = e.target.value;
}

canvas.onmousedown = () => (mouseDown = true);
canvas.onmouseup = () => (mouseDown = false);

function fillBoardWithEmptyFields(sideLength, board) {
    const size = sideLength ** 2;
    
    for (let i = 0; i < size; i ++) {
        const newField = document.createElement('div');
        newField.classList.add('board-field');
        newField.addEventListener('mouseover', changeColor);
        newField.addEventListener('mousedown', changeColor);
        board.appendChild(newField);
    }
}

function showGrid() {
    const boardFields = document.querySelectorAll('.board-field');
    boardFields.forEach(field => field.classList.toggle('board-field-border'));
}

function setCurrentMode(newMode) {
    activateMode(newMode);
    currentMode = newMode;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomRGB() {
    let R = getRandomInt(255);
    let G = getRandomInt(255);
    let B = getRandomInt(255);

    return `rgb(${R}, ${G}, ${B})`;
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'erase') {
        e.target.style.backgroundColor = '#fff';
    } else if (currentMode === 'rainbow') {
        e.target.style.backgroundColor = getRandomRGB();
    }
}

function activateMode(newMode) {
    if (currentMode === 'color') {
        colorBtn.classList.remove('active');
    } else if (currentMode === 'rainbow') {
        rainbowModeBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraseBtn.classList.remove('active');
    }
    
    if (newMode === 'color') {
        colorBtn.classList.add('active');
    } else if (newMode === 'rainbow') {
        rainbowModeBtn.classList.add('active');
    } else if (newMode === 'eraser') {
        eraseBtn.classList.add('active');
    }
}

window.addEventListener('load', createBoard(DEFAULT_SIZE));
window.addEventListener('load', setupColorPicker);
window.addEventListener('load', activateMode(DEFAULT_MODE));