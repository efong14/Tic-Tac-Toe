function gameBoard () {
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

    return {showBoard, getWinner, addToken, checkWinner}
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

    const board = gameBoard();
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;
    }

    const showWinner = () => {
        board.checkWinner()
        if (board.getWinner() == '') {
            switchPlayer();
            console.log(`It is now ${currentPlayer.name}'s turn`);
        } else if (board.getWinner !== '') {
            console.log(`${currentPlayer.name} wins!`)
        }
    }

    const turn = (row, column) => {
        board.addToken(row, column, currentPlayer.token);
        console.log(`${currentPlayer.name} places token on row ${row} column ${column}`)
        console.log(board.showBoard());
        showWinner()
    }

    console.log(`It is now ${currentPlayer.name}'s turn`);
    console.log(board.showBoard())

    return {turn}
}

const test = play("Patrick", "John");

