import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={'square' + props.cssClasses} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        let cssClasses = '';

        if (this.props.winnerRow && this.props.winnerRow.indexOf(i) !== -1)
            cssClasses += ' win';

        return (<Square value={this.props.squares[i]} cssClasses={cssClasses} key={i} onClick={() => this.props.onClick(i)}/>);
    }

    renderBoardRow(i) {
        var squareNumbers = Array(3);
        for (var j = 0; j < 3; j++) {
            squareNumbers[j] = i + j;
        }

        return (
            <div key={i} className="board-row">
                {squareNumbers.map((squareNumber, arrIndex) => {
                    return this.renderSquare(squareNumber);
                })}
            </div>
        );
    }

    render() {
        var rows = [];
        for (var i = 0; i < 9; i += 3) {
            rows.push(this.renderBoardRow(i));
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                lastMove: null
            }],
            moveHistoryOrder: true,
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const lastMove = {
            col: i % 3 + 1,
            row: Math.trunc(i / 3) + 1
        };

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext
            ? 'X'
            : 'O';
        this.setState(prevState => ({
            history: history.concat([{
                squares: squares,
                lastMove: lastMove
            }]),
            stepNumber: history.length,
            xIsNext: !prevState.xIsNext
        }));
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    isCurrent(move) {
        if (move === this.state.stepNumber)
            return 'active';
        else
            return '';
    }

    switchMoveSortOrder() {
        this.setState(prevState => ({
            moveHistoryOrder: !prevState.moveHistoryOrder
        }));
    }

    isDraw() {
        var currentSquares = this.state.history[this.state.stepNumber].squares;

        for (let squareVal of currentSquares) {
            if (squareVal === null) return false;
        }
        return true;
    }

    render() {
        let history = this.state.history;
        const current = history[this.state.stepNumber];
        const winnerRow = calculateWinner(current.squares);

        let moves = history.map((step, move) => {
            let desc = move
                ? 'Move #' + move
                : 'Game start';

            return (
                <div className={this.isCurrent(move)} key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </div>
            );
        });

        if (!this.state.moveHistoryOrder) {
            moves = moves.reverse();
        }

        let status;
        let lastMove = '';
        if (winnerRow) {
            status = 'Winner: ' + current.squares[winnerRow[0]];
        } else if (this.isDraw()) {
            status = 'Draw';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        if (current.lastMove != null)
            lastMove += 'Last move: col: ' + current.lastMove.col + ', row: ' + current.lastMove.row;

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} winnerRow={winnerRow} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <hr/>
                    <div>{lastMove}</div>
                    <div>
                        <button onClick={() => this.switchMoveSortOrder()}>
                            Switch history order
                        </button>
                    </div>
                    <hr />
                    <b>Move History</b>
                    <div>{moves}</div>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>, document.getElementById('root'));

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]) {
            return [a, b, c];
        }
    }

    return null;
}