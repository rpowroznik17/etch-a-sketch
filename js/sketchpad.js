let isMouseDown = false;

const creationBtn = document.querySelector('#creation-btn');
creationBtn.addEventListener('click', createNewBoard);

function createNewBoard() {
    if (checkIfBoardExists()) {
        const board = document.querySelector('.board');
        board.remove();
    }

    const sideLength = prompt('Enter the length of side of the sketchpad: ');

    const board = document.createElement('div');
    board.classList.add('board');
    board.style['grid-template-columns'] = `repeat(${sideLength}, 1fr)`;
    board.style['grid-template-rows'] = `repeat(${sideLength}, 1fr)`;
    board.addEventListener('mousedown', startDrawing);
    board.addEventListener('mouseup', stopDrawing);
    
    fillBoardWithEmptyFields(sideLength, board);
    document.body.appendChild(board); 
}

function checkIfBoardExists() {
    const board = document.querySelector('.board');
    if (board === null) {
        return false;
    }
    return true;
}

function fillBoardWithEmptyFields(sideLength, board) {
    const size = sideLength ** 2;

    for (let i = 0; i < size; i ++) {
        const newField = document.createElement('div');
        newField.classList.add('board-field');
        newField.addEventListener('mouseenter', draw)
        board.appendChild(newField);
    }
}

function draw(e){
    if (isMouseDown) {
        e.target.style['background-color'] = '#000';
    }
}

function startDrawing() {
    isMouseDown = true;
}

function stopDrawing(){
    isMouseDown = false;
}