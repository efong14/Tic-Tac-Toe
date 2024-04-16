// Note: Figure out reset :(

const rowOne = document.querySelectorAll('.rowOne');
const rowTwo = document.querySelectorAll('.rowTwo');
const rowThree = document.querySelectorAll('.rowThree');
const textContainer = document.querySelector('.textContainer');
const playerStatus = document.querySelector('.playerStatus');
const winnerStatus = document.querySelector('.winnerStatus');
const gameEnd = document.querySelector('.gameEnd');
const p1Name = document.getElementById('p1Name');
const p2Name = document.getElementById('p2Name');

document.getElementById('submit').onclick = () => {
    const game = play(p1Name.value, p2Name.value);
};

document.getElementById('newGame').onclick = () => {
    location.reload();
};

const gameBoard = (function () {
    const rows = 3;
    const columns = 3;
    winner = '';
    board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push('');
        };
    };

    const showBoard = () => board;
    const showCell = (row, column) => board[row][column];
    const getWinner = () => winner;


    const addToken = (row, column, token) => {
        board[row][column] = token;
    }

    const checkWinner = () => {
        // Horizontal check
        for (let i = 0; i < 3; i++){
            if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
                    winner = board[i][1];
                    return;
            };
        };
        // Vertical check
        for (let j = 0; j < 3; j++){
            if (board[0][j] == board[1][j] && board[1][j] == board[2][j]) {
                    winner = board[1][j];
                    return;
            };
        };
        // Diagonal check
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] || board[0][2] ==
            board[1][1] && board[1][1] == board[2][0]) {
                winner = board[1][1];
                return;
            };
        // Tie check
        if (!board[0].includes('') && !board[1].includes('') && !board[2].includes('')) {
            winner = 'Tie!';
            return;
        };
    };

    return {showBoard, showCell, getWinner, addToken, checkWinner};
})();


const boardDisplay = (function(){
    const displayToken = () => {
        let i = 0;
        let j = 0;
        let k = 0;
        rowOne.forEach(cell => {
            cell.textContent = `${gameBoard.showCell(0, i++)}`;
        });
        rowTwo.forEach(cell => {
            cell.textContent = `${gameBoard.showCell(1, j++)}`;
        });
        rowThree.forEach(cell => {
            cell.textContent = `${gameBoard.showCell(2, k++)}`;
        });
    };
    return {displayToken};
})();


function play (name1, name2) {
    const player1 = {
        name: name1,
        token: "X"
    };
    const player2 = {
        name: name2,
        token: "O"
    };

    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;
    };

    const showWinner = () => {
        gameBoard.checkWinner()
        if (gameBoard.getWinner() == '') {
            switchPlayer();
            playerStatus.textContent = `It is now ${currentPlayer.name}'s turn`
        } else if (gameBoard.getWinner() =='Tie!') {
            winnerStatus.textContent = `Tie!`;
            playerStatus.textContent = '';
            gameEnd.showModal();
        } else if (gameBoard.getWinner() !== '') {
            winnerStatus.textContent =`${currentPlayer.name} wins!`;
            playerStatus.textContent = '';
            gameEnd.showModal();
        };
    };

    const turn = (row, column) => {
        if (gameBoard.showCell(row, column) != ''){
            return;
        } else if (gameBoard.getWinner() !== '') {
            return
        };
        gameBoard.addToken(row, column, currentPlayer.token);
        boardDisplay.displayToken();
        showWinner();
    };

    (function boardControl() {
        let i = 0;
        let j = 0;
        let k = 0;
        rowOne.forEach(cell => {
            let y = i++;
            cell.onclick = () => turn(0, y);
        });
        rowTwo.forEach(cell => {
            let y = j++;
            cell.onclick = () => turn(1, y);
        });
        rowThree.forEach(cell => {
            let y = k++;
            cell.onclick = () => turn(2, y);
        });
    })(); 

    playerStatus.textContent = `It is now ${currentPlayer.name}'s turn`;
    
    return {turn};
};













