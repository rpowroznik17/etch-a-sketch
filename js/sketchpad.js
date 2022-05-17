const creationBtn = document.querySelector('#creation-btn');
creationBtn.addEventListener('click', createNewBoard);

function createNewBoard() {
    const sideLength = prompt('Enter the length of side of the sketchpad: ');

    const board = document.createElement('div');
    board.classList.add('board');
    // board.style.cssText = `grid-template-columns: repeat(${sideLength}, 1fr);`;
    // board.style.cssText = `grid-template-rows: repeat(${sideLength} 1fr)`;
    board.style.display = 'grid';
    board.style['grid-template-columns'] = `repeat(${sideLength}, 1fr)`;
    board.style['grid-template-rows'] = `repeat(${sideLength}, 1fr)`;
    
    fillBoardWithFields(sideLength, board);
    document.body.appendChild(board); 
}

function fillBoardWithFields(sideLength, board) {
    const size = sideLength ** 2;

    for (let i = 0; i < size; i ++) {
        const newField = document.createElement('div');
        newField.classList.add('board-field');
        board.appendChild(newField);
    }
}