import {BOARD_SIZE, PLAYER} from "../../const";

export const checkIfBecomeKing = (move, player) => {
    return player === PLAYER.BLACK
        ? move.newRowIndex === 0
        : move.newRowIndex === BOARD_SIZE - 1;
}