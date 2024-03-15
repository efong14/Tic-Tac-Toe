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

const test = gameBoard();
test.addToken(0,0, 'o')
test.addToken(0,1, 'x')
console.log (test.showBoard())