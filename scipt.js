// Note: Fix tie check

const rowOne = document.querySelectorAll('.rowOne');
const rowTwo = document.querySelectorAll('.rowTwo');
const rowThree = document.querySelectorAll('.rowThree')
;

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
        if (board[row][column] != '') {
            return;
        };
        board[row][column] = token;
    }

    const checkWinner = () => {
        // Tie check
        if (!board[0].includes('') && !board[1].includes('') && !board[2].includes('')) {
            winner = 'Tie!';
            return;
        };
        // Diagonal check
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] || board[0][2] ==
            board[1][1] && board[1][1] == board[2][0]) {
                winner = board[1][1];
                return;
            };
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
            console.log(`It is now ${currentPlayer.name}'s turn`);
        } else if (gameBoard.getWinner() =='Tie!') {
            console.log(`Tie!`)
        } else if (gameBoard.getWinner() !== '') {
            console.log(`${currentPlayer.name} wins!`)
        };
    };

    const turn = (row, column) => {
        if (gameBoard.showCell(row, column) != ''){
            return;
        };
        gameBoard.addToken(row, column, currentPlayer.token);
        boardDisplay.displayToken();
        console.log(`${currentPlayer.name} places token on row ${row} column ${column}`)
        console.log(gameBoard.showBoard());
        showWinner()
    };

    console.log(`It is now ${currentPlayer.name}'s turn`);
    console.log(gameBoard.showBoard())
    
    return {turn};
};



const test = play("Patrick", "John");

// WinTest
// Horizontal P1
// test.turn(0,2)
// test.turn(2,0)
// test.turn(0,1)
// test.turn(1,0)
// test.turn(0,0)

// Horizontal P2
// test.turn(0,2)
// test.turn(1,0)
// test.turn(2,1) 
// test.turn(1,1)
// test.turn(0,0)
// test.turn(1,2)


// Vertical P1
// test.turn(0,0)
// test.turn(0,1)
// test.turn(1,0)
// test.turn(2,1)
// test.turn(2,0)


// Vertical P2
// test.turn(0,2)
// test.turn(0,0)
// test.turn(1,1)
// test.turn(2,0)
// test.turn(2,2)
// test.turn(1,0)

// Diagonal p1
// test.turn(0,0)
// test.turn(0,1)
// test.turn(1,1)
// test.turn(1,0)
// test.turn(2,2)

// Diagonal p2
// test.turn (0,2)
// test.turn(0,0)
// test.turn(0,1)
// test.turn(1,1)
// test.turn(1,0)
// test.turn(2,2)

// Tie
// test.turn(0,1)
// test.turn(0,0)
// test.turn(1,2)
// test.turn(1,0)
// test.turn(1,1)
// test.turn(0,2)
// test.turn(2,0)
// test.turn(2,1)
// test.turn(2,2)












