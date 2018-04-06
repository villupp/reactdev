import React from 'react';
import Board from './board';

export default class Game extends React.Component {
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

        if (this.calculateWinner(squares) || squares[i]) {
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

    restartGame() {
        this.setState({
            history: [{
                squares: Array(9).fill(null),
                lastMove: null
            }],
            moveHistoryOrder: true,
            stepNumber: 0,
            xIsNext: true
        });
    }

    render() {
        let history = this.state.history;
        const current = history[this.state.stepNumber];
        const winnerRow = this.calculateWinner(current.squares);

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
                    <div>
                        <button onClick={() => this.restartGame()}>
                            Restart game
                        </button>
                    </div>
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

    calculateWinner(squares) {
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
}