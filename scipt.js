const rowOne = document.querySelectorAll('.rowOne')
const rowTwo = document.querySelectorAll('.rowTwo')
const rowThree = document.querySelectorAll('.rowThree')
const gameBoard = (function () {
    const rows = 3
    const columns = 3
    winner = ''
    board = []

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push('')
        }
    }

    const showBoard = () => board;
    const showCell = (row, column) => board[row][column]
    const getWinner = () => winner;

    const addToken = (row, column, token) => {
        board[row][column] = token;
    }

    const checkWinner = () => {
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] || board[0][2] ==
            board[1][1] && board[1][1] == board[2][0]) {
                winner = board[1][1]
            };

        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == board[i][j+1] && board[i][j+1] == board[i][j+2]){
                    winner = board[i][j]
                } return;
            };
        };

        for (let j = 0; j < 3; j++){
            for (let i = 0; i < 3; i++) {
                if (board[i][j] == board[i][j+1] && board[i][j+1] == board[i][j+2]){
                    winner = board[i][j]
                } return;
            };
        };
    };

    return {showBoard, showCell, getWinner, addToken, checkWinner};
})();


const boardDisplay = (function(){
    let i = 0
    const displayOne = () => {
        rowOne.forEach(cell => {
            cell.textContent = `${gameBoard.showCell(0, i++)}`
        });
    };

    const displayTwo = () => {
        rowTwo.forEach(cell => {
            cell.textContent = `${gameBoard.showCell(1, i++)}`
        });
    };

    const displayThree = () => {
        rowThree.forEach(cell => {
            cell.textContent = `${gameBoard.showCell(0, i++)}`
        });
    };
    return {displayOne, displayTwo, displayThree}
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
    }

    const showWinner = () => {
        gameBoard.checkWinner()
        if (gameBoard.getWinner() == '') {
            switchPlayer();
            console.log(`It is now ${currentPlayer.name}'s turn`);
        } else if (gameBoard.getWinner !== '') {
            console.log(`${currentPlayer.name} wins!`)
        }
    }

    const turn = (row, column) => {
        gameBoard.addToken(row, column, currentPlayer.token);
        console.log(`${currentPlayer.name} places token on row ${row} column ${column}`)
        console.log(gameBoard.showBoard());
        showWinner()
    }

    console.log(`It is now ${currentPlayer.name}'s turn`);
    console.log(gameBoard.showBoard())
    
    return {turn}
}



const test = play("Patrick", "John");
test.turn(0,0)
test.turn(0,1)
test.turn(0,2)
boardDisplay.displayOne();










