const board = document.getElementById('chessboard');
const pieces = {
    'rook': '♖', 'knight': '♘', 'bishop': '♗', 'queen': '♕', 'king': '♔', 'pawn': '♙',
    'rook-black': '♜', 'knight-black': '♞', 'bishop-black': '♝', 'queen-black': '♛', 'king-black': '♚', 'pawn-black': '♟︎'
};

// Tableau de position des pièces
let boardState = [
    ['rook-black', 'knight-black', 'bishop-black', 'queen-black', 'king-black', 'bishop-black', 'knight-black', 'rook-black'],
    ['pawn-black', 'pawn-black', 'pawn-black', 'pawn-black', 'pawn-black', 'pawn-black', 'pawn-black', 'pawn-black'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
];

// Fonction pour créer l'échiquier
function createBoard() {
    const boardColors = ['white', 'black'];
    let toggle = 0;

    // Parcourir l'échiquier et placer les pièces
    for (let i = 0; i < 8; i++) {
        toggle = i % 2;
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.className = `square ${boardColors[toggle % 2]}`;
            toggle++;
            square.dataset.row = i;
            square.dataset.col = j;

            // Placer la pièce si elle existe à cette position
            const piece = boardState[i][j];
            if (piece) {
                const pieceElement = document.createElement('div');
                pieceElement.className = `piece`;
                pieceElement.textContent = pieces[piece];
                pieceElement.draggable = true;
                square.appendChild(pieceElement);

                // Ajout des événements pour le drag and drop
                pieceElement.addEventListener('dragstart', handleDragStart);
                pieceElement.addEventListener('dragend', handleDragEnd);
            }

            square.addEventListener('dragover', handleDragOver);
            square.addEventListener('drop', handleDrop);

            board.appendChild(square);
        }
    }
}

// Création du plateau
createBoard();

let draggedPiece = null;
let originSquare = null;

function handleDragStart(e) {
    draggedPiece = e.target; // La pièce que l'on déplace
    originSquare = draggedPiece.parentElement; // La case d'origine
    setTimeout(() => draggedPiece.classList.add('dragging'), 0);
}

function handleDragEnd() {
    setTimeout(() => draggedPiece.classList.remove('dragging'), 0);
    draggedPiece = null;
}

function handleDragOver(e) {
    e.preventDefault(); // Empêche le comportement par défaut pour permettre le drop
}

function handleDrop(e) {
    e.preventDefault();
    
    // Vérifier si la case où on dépose est vide
    const targetSquare = e.target;

    if (targetSquare.classList.contains('square') && !targetSquare.firstChild) {
        targetSquare.appendChild(draggedPiece); // Déplacer la pièce
        // Mise à jour du plateau
        const originRow = originSquare.dataset.row;
        const originCol = originSquare.dataset.col;
        const targetRow = targetSquare.dataset.row;
        const targetCol = targetSquare.dataset.col;

        // Mettre à jour l'état du board
        boardState[targetRow][targetCol] = boardState[originRow][originCol];
        boardState[originRow][originCol] = '';

        console.log(boardState); // Pour voir le nouvel état du plateau
    }
}
