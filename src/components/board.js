import React from 'react';

export default class Board extends React.Component {
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

function Square(props) {
    return (
        <button className={'square' + props.cssClasses} onClick={props.onClick}>
            {props.value}
        </button>
    );
}