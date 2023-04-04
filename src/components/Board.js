import {useMemo, useState} from "react";

import Square from "./Square";
import Disc from "./Disc";

import "./Board.css"

const Board = ({discs, possibleMoves, makeMove}) => {
    const [activeDisc, setActiveDisc] = useState(null);
    const squares = useMemo(
        () => discs.map((row, rowIndex) => row.map((disc, columnIndex) => ({
            key: `${rowIndex}_${columnIndex}`,
            color: (rowIndex + columnIndex) % 2 === 0 ? "white" : "black",
            disc: disc
                ? {
                    ...disc,
                    draggable: possibleMoves.some(move =>
                        move.rowIndex === rowIndex &&
                        move.columnIndex === columnIndex
                    ),
                }
                : null,
            droppable: activeDisc
                ? possibleMoves.some(move =>
                    move.newRowIndex === rowIndex &&
                    move.newColumnIndex === columnIndex &&
                    move.rowIndex === activeDisc.rowIndex &&
                    move.columnIndex === activeDisc.columnIndex
                )
                : false
        }))),
        [activeDisc, possibleMoves]
    )

    const onDrag = (e, {rowIndex, columnIndex}) => {
        // Insurance in case of race conditions with mouse and drag events
        setActiveDisc({rowIndex, columnIndex});

        e.dataTransfer.setData("rowIndex", rowIndex);
        e.dataTransfer.setData("columnIndex", columnIndex);
    };

    const onDrop = (e, {rowIndex: newRowIndex, columnIndex: newColumnIndex}) => {
        e.preventDefault();
        const rowIndex = Number(e.dataTransfer.getData("rowIndex"));
        const columnIndex = Number(e.dataTransfer.getData("columnIndex"));

        const move = possibleMoves.find(move =>
            move.rowIndex === rowIndex &&
            move.columnIndex === columnIndex &&
            move.newRowIndex === newRowIndex &&
            move.newColumnIndex === newColumnIndex
        )
        makeMove(move);
    }

    return (
        <div className="board">
            {squares.map((row, rowIndex) => row.map((square, columnIndex) => (
                <Square
                    key={square.key}
                    color={square.color}
                    droppable={square.droppable}
                    onDrop={e => onDrop(e, {rowIndex, columnIndex})}
                >
                    {square.disc && (
                        <Disc
                            king={square.disc.king}
                            player={square.disc.player}
                            draggable={square.disc.draggable}
                            onMouseOver={() => setActiveDisc({rowIndex, columnIndex})}
                            onMouseOut={() => setActiveDisc(null)}
                            onDragStart={(e) => onDrag(e, {rowIndex, columnIndex})}
                            onDragEnd={() => setActiveDisc(null)}
                        />
                    )}
                </Square>
            )))}
        </div>
    )
};

export default Board;