function gameBoard () {
    const rows = 3
    const columns = 3
    board = []

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push('')
        }
    }

    const showBoard = () => board;
    const addToken = (row, column, token) => {
        board[row][column] = token
    }

    return {showBoard, addToken}
}

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
        currentPlayer = player1 ? currentPlayer = player2 : currentPlayer = player1;
    }

    const board = gameBoard();
    const turn = (row, column) => {
        board.addToken(row, column, currentPlayer.token);
        console.log(`${currentPlayer.name} places token on row ${row} column ${column}`)
        console.log(board.showBoard());
        switchPlayer();
    }

    return {turn}
}

const test = play("Patrick", "John");
test.turn(0,0);
test.turn(1,1)
