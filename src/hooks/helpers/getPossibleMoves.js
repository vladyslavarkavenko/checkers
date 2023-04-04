import {checkIfSquareValid} from "./checkIfSquareValid";
import {checkIfBecomeKing} from "./checkIfBecomeKing";

export const getPossibleMoves = (disc, discs, onlyCaptureMoves = false) => {
    const {rowIndex, columnIndex, player, king} = disc;

    const possibleMoves = [];

    // King can go back and force, regular discs can only move towards the enemy
    const possibleDifRows = king ? [+1, -1] : [player];
    possibleDifRows.forEach(difRow => {
        const possibleRowIndex = rowIndex + difRow;

        // Every disc can move left and right
        const possibleDifColumn = [+1, -1];
        possibleDifColumn.forEach(difColumn => {
            const possibleColumnIndex = columnIndex + difColumn;
            // Check if valid square
            if (!checkIfSquareValid(possibleRowIndex, possibleColumnIndex)) {
                return;
            }

            // Detect if there is disc
            const disc = discs[possibleRowIndex][possibleColumnIndex];
            if (!disc) {
                // If there is no disc, we want to mark move as non capture
                if (!onlyCaptureMoves) {
                    const move = {
                        newRowIndex: possibleRowIndex,
                        newColumnIndex: possibleColumnIndex,
                        capture: []
                    }
                    move.becomeKing = checkIfBecomeKing(move, player);
                    possibleMoves.push(move);
                }
                return;
            }

            // If there is disc, but it is player's disc, move is not possible
            if (disc.player === player) {
                return;
            }
            // If there is enemy disc, check if next square is empty
            const captureDisc = {
                rowIndex: possibleRowIndex,
                columnIndex: possibleColumnIndex,
            }

            // Check if valid square
            const nextRowIndex = captureDisc.rowIndex + difRow;
            const nextColumnIndex = captureDisc.columnIndex + difColumn;
            if (!checkIfSquareValid(nextRowIndex, nextColumnIndex)) {
                return;
            }

            const nextDisc = discs[nextRowIndex][nextColumnIndex];
            if (nextDisc) {
                return;
            }

            // We want to mark move as capture
            const possibleMove = {
                newRowIndex: nextRowIndex,
                newColumnIndex: nextColumnIndex,
                capture: [captureDisc]
            }
            possibleMove.becomeKing = checkIfBecomeKing(possibleMove, player);
            possibleMoves.push(possibleMove);

            // Recursively check if more discs can be captured
            const nextPossibleDisc = {
                player,
                king: king || possibleMove.becomeKing,
                rowIndex: possibleMove.newRowIndex,
                columnIndex: possibleMove.newColumnIndex,
            };
            // We don't want to capture same discs again
            const restDiscs = discs.map(row => row.slice());
            possibleMove.capture.forEach(capturedDisc => {
                restDiscs[capturedDisc.rowIndex][capturedDisc.columnIndex] = null;
            })

            // When we capture at least one disc we can continue only with capture moves
            const nextPossibleMoves = getPossibleMoves(nextPossibleDisc, restDiscs, true);
            // Add all previously captured discs and becomeKing state
            possibleMoves.push(...nextPossibleMoves.map(move => ({
                ...move,
                becomeKing: possibleMove.becomeKing || move.becomeKing,
                capture: [...possibleMove.capture, ...move.capture]
            })));
        });
    });

    // Reset start position for all moves to initial square
    return possibleMoves.map(possibleMove => ({
        ...possibleMove,
        rowIndex,
        columnIndex,
    }));
}
