export const getBestMove = ({captureMoves, nonCaptureMoves}) => {
    // If there are capture moves
    if (captureMoves.length) {
        // Choose move with max amount of captured discs
        return captureMoves.reduce((maxCaptureMove, captureMove) => {
            return captureMove.capture.length > maxCaptureMove.capture.length
                ? captureMove
                : maxCaptureMove
        });
    }

    // If there are moves which result in disc becoming king
    const becomeKingMove = nonCaptureMoves.find(move => move.becomeKing);
    if (becomeKingMove) {
        return becomeKingMove;
    }

    // Choose random move
    const randomMoveIndex = Math.floor(Math.random() * nonCaptureMoves.length);
    return nonCaptureMoves[randomMoveIndex];
}